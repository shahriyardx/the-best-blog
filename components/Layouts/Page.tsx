import React, { useState } from "react";
import Script from "next/script";
import { signIn, signOut, useSession } from "next-auth/react";
import SidebarLink from "components/single/SidebarLink/SidebarLink";
import Header from "components/sections/Header/Header";
import Sidebar from "components/sections/Sidebar/Sidebar";
import CategoriesSkeleaton from "components/single/Skeleaton/CategoriesSkeleaton";
import { useSelector } from "react-redux";
import { RootState } from "src/redux";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const Page = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const [allcat, setAllCat] = useState<boolean>(false);
  const { value: categories, isLoading } = useSelector((state: RootState) => state.categories)

  return (
    <>
      <Header />
      <div
        className="
        container mx-auto grid grid-cols-1 
        sm:grid-cols-sidebarLayout gap-5 px-5 
        sm:px-7 md:px-10 mt-3 sm:mt-5 md:mt-10
      "
      >
        <Sidebar>
          <div className="flex flex-col gap-2">
            <SidebarLink href="/">Home</SidebarLink>
            <SidebarLink href="/about">About</SidebarLink>
            <SidebarLink href="/contact">Contact</SidebarLink>
          </div>

          <div>
            <h3 className="uppercase font-semibold text-lg">👜 Categories</h3>
            <div className="flex flex-col gap-2 mt-3">
              {isLoading && <CategoriesSkeleaton />}
              {categories?.slice(0, allcat ? undefined : 5).map((category) => (
                <SidebarLink key={category.id} href={`/c/${category.slug}`}>
                  {category.name}
                </SidebarLink>
              ))}

              <div>
                <button
                  onClick={() => setAllCat(!allcat)}
                  className="
                    flex items-center gap-2 underline 
                    decoration-1 underline-offset-2 font-bold
                  "
                >
                  {allcat ? "Show Less" : "Show All"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="uppercase font-semibold text-lg">🔗 Links</h3>
            <div className="flex flex-col gap-2 mt-3">
              {status === "unauthenticated" || !session ? (
                <button
                  onClick={() => signIn("github")}
                  className="
                    flex items-center gap-2 underline decoration-dashed decoration-1
                    underline-offset-2
                  "
                >
                  Login
                </button>
              ) : (
                <>
                  <SidebarLink href="/u/posts">Profile</SidebarLink>
                  {session.profile.is_admin && session.profile.is_active && (
                    <SidebarLink href="/admin/">Admin</SidebarLink>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="
                      flex items-center gap-2 underline decoration-dashed 
                      decoration-1 underline-offset-2 text-red-500
                    "
                  >
                    <>Logout ({session.profile.username})</>
                  </button>
                </>
              )}
            </div>
          </div>
        </Sidebar>
        <div className="pb-10 min-h-[90vh]">{children}</div>
      </div>

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RQWQCR0TTX"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-RQWQCR0TTX');
        `}
      </Script>
    </>
  );
};

export default Page;
