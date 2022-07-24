import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { AppRouter } from "src/server/route/app.router";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@utils/SidebarContext";
import { NextComponentType } from "next";
import RequireAuth from "components/auth/requireAuth";
import { Toaster } from "react-hot-toast";
import RequireAdmin from "components/auth/requireAdmin";
import { wrapper } from "src/redux/store";
import { useDispatch } from "react-redux";
import { trpc } from "@utils/trpc";
import { setCategories } from "src/redux/category.slice";
import { useEffect } from "react";
import NextProgress from "next-progress";

type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    requireAuth?: boolean;
    requireAdmin?: boolean;
  };
};

const TheBest = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  const dispatch = useDispatch();
  const { data: categories, isLoading } = trpc.useQuery(["category.all"], {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories, dispatch]);

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        {Component.requireAuth ? (
          <RequireAuth>
            <Component {...pageProps} />
          </RequireAuth>
        ) : Component.requireAdmin ? (
          <RequireAdmin>
            <Component {...pageProps} />
          </RequireAdmin>
        ) : (
          <Component {...pageProps} />
        )}
        <Toaster />
        <NextProgress />
      </SidebarProvider>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url =
      process.env.NODE_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
        : `http://localhost:3000/api/trpc`;

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      links,
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }

        return {};
      },
      transformer: superjson,
    };
  },
  ssr: false,
})(wrapper.withRedux(TheBest));
