import React from 'react'
import BlogCard from 'components/single/BlogCard/BlogCard'
import Paginator from 'components/sections/Paginator/Paginator'
import { useRouter } from 'next/router'
import { POSTS_PER_PAGE } from 'config'
import { trpc } from '@utils/trpc'
import { Category } from '@prisma/client'
import BlogLoading from 'components/single/BlogLoading/BlogLoading'

type Props = {
  category?: Category
}

const Blogs = ({ category }: Props ) => {
  const router = useRouter()

  const { data: posts, isLoading} = trpc.useQuery(['posts.all'])

  if (isLoading) {
    return <BlogLoading />
  }

  if (!posts?.length) {
    return <p className='dark:text-zinc-400'>No posts found</p>
  }

  const filteredPosts = category ? posts.filter(post => post.category_id === category.id) : posts
  const page = parseInt(router.query.page as string) || 1
  const postsStart = (page - 1) * POSTS_PER_PAGE
  const postsToShow = filteredPosts.slice(postsStart, postsStart + POSTS_PER_PAGE)
  
  return (
    <section className='container mx-auto'>
      <div className='flex flex-col gap-8'>
        {postsToShow?.map(post => {
          return <BlogCard post={post} key={post.id} />
        })}
      </div>

      <Paginator posts={posts.length} />
    </section>
  )
}

export default Blogs