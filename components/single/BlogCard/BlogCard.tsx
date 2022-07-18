import React from 'react'
import Link from 'next/link'
import { Category, Post } from '@prisma/client'

interface Props {
  post: Post & { Category: Category }
}

const BlogCard = ({ post }: Props) => {
  return (
    <div>
      <Link href={`/p/${post.id}`} passHref>
        <a
          className='
            text-2xl underline font-bold dark:text-zinc-300
            underline-offset-2 decoration-zinc-400 decoration-1 block
          '
        >
          {post.title}
        </a>
      </Link>
      <Link href={`/c/${post.Category.slug}`} passHref>
        <a 
          className='
            uppercase inline-block
            tracking-wider text-zinc-400 mt-3
          '
          >
            {post.Category?.name}
        </a>
      </Link>
      <p className='text-zinc-700 dark:text-zinc-500 mt-1'>
        {post.short_description}
      </p>
    </div>
  )
}

export default BlogCard