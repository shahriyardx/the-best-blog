import React from 'react'
import { trpc } from '@utils/trpc'
import ProfilePost from 'components/single/ProfilePost/ProfilePost'

const ProfilePosts = () => {
  const { data: posts, refetch } = trpc.useQuery(['user.posts'])

  return (
    <section className='container mx-auto mt-10'>
      <div className='flex flex-col gap-8'>
        {posts?.map(post => <ProfilePost post={post} key={post.id} refetch={refetch} /> )}
      </div>
    </section>
  )
}

export default ProfilePosts