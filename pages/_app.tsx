import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import superjson from 'superjson'
import { AppRouter } from 'src/server/route/app.router'
import { SessionProvider } from 'next-auth/react'
import { SidebarProvider } from '@utils/SidebarContext'
import { NextComponentType } from 'next'
import RequireAuth from 'components/auth/requireAuth'
import { Toaster } from 'react-hot-toast'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { requireAuth: boolean }
}

const TheBest = ({ Component, pageProps: {session, ...pageProps} }: CustomAppProps) => {
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        {Component.requireAuth 
          ? (
            <RequireAuth>
              <Component {...pageProps} />
            </RequireAuth>
          ) : (
            <Component {...pageProps} />
          )
        }
        <Toaster />
      </SidebarProvider>
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc` 
      : `http://localhost:3000/api/trpc`
    
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url
      })
    ]
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60
          }
        }
      },
      links,
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1'
          }
        }

        return {}
      },
      transformer: superjson
    }
  },
  ssr: false
})(TheBest)
