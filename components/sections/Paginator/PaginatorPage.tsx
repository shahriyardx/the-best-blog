import Link from 'next/link'
import React from 'react'

type Props = {
  number: number,
  active?: boolean
}

const PaginatorPage = ({ number, active }: Props) => {
  return (
    <Link
      href={`/?page=${number}`} 
      
    >
      <a
        className={`
          flex justify-center items-center w-10 h-10 text-lg
          rounded-full bg-zinc-800 aspect-square cursor-pointer text-zinc-300 dark:text-white
        hover:bg-zinc-700 ${active && 'bg-zinc-300 !text-black hover:bg-zinc-400'}
        `}
      >
        {number}
      </a>
    </Link>
  )
}

export default PaginatorPage