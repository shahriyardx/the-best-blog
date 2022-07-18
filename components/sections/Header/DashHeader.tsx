import React, { useContext } from 'react'
import ThemeToggle from 'components/single/ThemeToggle/ThemeToggle'
import { BiMenu } from 'react-icons/bi'
import Link from 'next/link'
import SidebarContext from '@utils/SidebarContext'

const DashHeader = () => {
  const { toggle } = useContext(SidebarContext)

  return (
    <header className='bg-orange-200 dark:bg-zinc-800'>
      <div className='container mx-auto px-5 sm:px-7 md:px-10 py-3 flex items-center'>
        <BiMenu
          onClick={toggle}
          className='text-3xl mr-3 cursor-pointer sm:hidden -mb-1 dark:text-zinc-300' 
        />
        <Link href="/admin" passHref>
          <a className='text-2xl font-semibold text-zinc-800 dark:text-zinc-300'>Dashboard</a>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  )
}

export default DashHeader