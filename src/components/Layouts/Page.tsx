import SidebarLink from '@components/SidebarLink/SidebarLink'
import Header from '@sections/Header/Header'
import Sidebar from '@sections/Sidebar/Sidebar'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

const Page = ({ children }: Props) => {
  const { data: session, status } = useSession()
  const [allcat, setAllCat] = useState<boolean>(false)

  return (
    <>
      <Header />
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-sidebarLayout gap-5 px-5 sm:px-7 md:px-10 mt-3 sm:mt-5 md:mt-10'>
        <Sidebar>
          <div className='flex flex-col gap-2'>
            <SidebarLink href='/'>Home</SidebarLink>
            <SidebarLink href='/about'>About</SidebarLink>
            <SidebarLink href='/contact'>Contact</SidebarLink>
          </div>
          
          <div>
            <h3 className='uppercase font-semibold text-lg'>👜 Categories</h3>
            <div className='flex flex-col gap-2 mt-3'>
              {/* {Object
                .keys(CATEGORIES)
                .slice(0, allcat ? Object.keys(CATEGORIES).length : 5)
                .map(name => (
                  <SidebarLink key={name} href={`/c/${name}`}>{CATEGORIES[name]}</SidebarLink>
                )
              )} */}

              <div>
                <button
                  onClick={() => setAllCat(!allcat)}
                  className='
                    flex items-center gap-2 underline 
                    decoration-1 underline-offset-2 font-bold
                  '
                >
                  {allcat ? "Show Less" : "Show All"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className='uppercase font-semibold text-lg'>🔗 Links</h3>
            <div className='flex flex-col gap-2 mt-3'>
              {status === 'unauthenticated' || !session
                ? (
                  <button
                    onClick={() => signIn('github')}
                    className='
                      flex items-center gap-2 underline decoration-dashed decoration-1
                      underline-offset-2
                    '
                  >
                    Login
                  </button>
                ) : (
                  <>
                    <SidebarLink href='/profile/posts'>My Posts</SidebarLink>
                    <button
                      onClick={() => signOut()}
                      className='
                        flex items-center gap-2 underline decoration-dashed decoration-1
                        underline-offset-2 text-red-500
                      '
                    >
                      <>
                        Logout ({session.profile.username})
                      </>
                    </button>
                  </>
                )
              }

            </div>
          </div>
        </Sidebar>
        <div className='pb-10 min-h-[90vh]'>
          {children}
        </div>
      </div>
    </>
  )
}

export default Page