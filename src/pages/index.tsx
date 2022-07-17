import SEO from '@components/SEO'
import Blogs from '@sections/Blogs/Blogs'
import Page from '@layouts/Page'
import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
    <Page>
      <SEO />
      <Blogs />
    </Page>
  )
}

export default Home
