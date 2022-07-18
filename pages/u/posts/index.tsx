import React from 'react'
import { NextPage } from 'next'
import { useQuery } from 'react-query'
import ProfilePosts from 'components/sections/Profile/Posts/ProfilePosts'
import ProfilePage from 'components/Layouts/ProfilePage'
import { API_BASE } from 'config'
import SEO from 'components/single/SEO'


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