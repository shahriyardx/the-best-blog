import React from 'react'
import { NextPage } from 'next'
import Page from 'components/Layouts/Page'
import SEO from 'components/single/SEO'

const About: NextPage = () => {
  return (
    <Page>
      <SEO title='Contact' />
      <h1 className='text-3xl font-semibold dark:text-zinc-300'>Currently we are on the <span className='text-blue-500'>Moon</span></h1>
      <p className='dark:text-zinc-400 mt-2'>Still want to contact? Please take a spaceship and come to moon 🚀</p>
    </Page>
  )
}

export default About