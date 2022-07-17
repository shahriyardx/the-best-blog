import React from 'react'
import BlogCard from '@components/BlogCard/BlogCard'
import Paginator from '@sections/Paginator/Paginator'
import { useRouter } from 'next/router'
import { POSTS_PER_PAGE } from 'config'
import BlogCardSkeleaton from '@components/BlogCard/BlogCardSkeleaton'
import { trpc } from 'src/utils/trpc'

type Props = {
  category?: string
}

const Blogs = ({ category }: Props ) => {
  const router = useRouter()

  const { data: allPosts, isLoading} = trpc.useQuery(['posts.all'])
  const posts = allPosts || []

  const filteredPosts = posts
  const page = Number(router.query.page) || 1
  const postsStart = (page -1) * POSTS_PER_PAGE

  const postsToShow = filteredPosts.slice(postsStart, postsStart + POSTS_PER_PAGE)
  return (
    <section className='container mx-auto'>
      {!isLoading && postsToShow.length < 1 && <p className='dark:text-zinc-400'>No posts found</p>}
      
      <div className='flex flex-col gap-8'>
        {isLoading && (
          <>
            <BlogCardSkeleaton />
            <BlogCardSkeleaton />
            <BlogCardSkeleaton />
            <BlogCardSkeleaton />
            <BlogCardSkeleaton />
          </>
        )}
        
        {postsToShow?.map(post => {
          return <BlogCard post={post} key={post.id} />
        })}
      </div>

      <Paginator posts={posts} />
    </section>
  )
}

export default Blogs