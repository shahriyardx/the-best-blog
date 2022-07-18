import ProfilePost from '@components/ProfilePost/ProfilePost'
import { IPost } from '@database/schemas/Post'
import React from 'react'

type Props = {
  posts: IPost[]
  refetch: () => void
}

const ProfilePosts = ({ posts, refetch }: Props) => {
  return (
    <section className='container mx-auto mt-10'>
      <div className='flex flex-col gap-8'>
        {posts.map((post: IPost) => (
          <ProfilePost post={post} key={post._id} refetch={refetch}/>
        ))}
      </div>
    </section>
  )
}

export default ProfilePosts