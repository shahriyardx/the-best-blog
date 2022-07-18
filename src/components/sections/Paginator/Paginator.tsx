import { IPost } from '@database/schemas/Post'
import { POSTS_PER_PAGE } from 'config'
import { useRouter } from 'next/router'
import React from 'react'
import PaginatorPage from './PaginatorPage'

type Props = {
  posts: IPost[]
}

const Paginator = ({ posts }: Props ) => {
  const router = useRouter()
  
  const pages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const page = Number(router.query.page) || 1

  return (
    <div className='flex items-center flex-wrap gap-3 mt-10' >
      {pages > 1 && (
        [...new Array(pages)].map((_, index) => {
          return <PaginatorPage number={index + 1} key={index} active={page === index + 1} />
        })
      )}
    </div>
  )
}

export default Paginator