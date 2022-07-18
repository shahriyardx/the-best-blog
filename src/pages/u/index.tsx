import React from 'react'
import { NextPage } from 'next'
import { useQuery } from 'react-query'
import ProfilePosts from '@sections/Profile/Posts/ProfilePosts'
import ProfilePage from '@layouts/ProfilePage'
import { API_BASE } from 'config'
import SEO from '@components/SEO'


const Posts: NextPage & { requireAuth: boolean } = () => {
  
  return (
    <ProfilePage>
      <SEO title='Your posts' />
      <ProfilePosts />
    </ProfilePage>
  )
}

Posts.requireAuth = true 
export default Posts