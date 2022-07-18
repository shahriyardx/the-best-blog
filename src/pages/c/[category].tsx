import SEO from '@components/SEO'
import Blogs from '@sections/Blogs/Blogs'
import Page from '@layouts/Page'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { trpc } from 'src/utils/trpc'
import Link from 'next/link'
import { BiChevronLeft } from 'react-icons/bi'


const CategoryPosts: NextPage = () => {
  const router = useRouter()
  const { data: categories, isLoading } = trpc.useQuery(['category.all'])
  
  if (isLoading) {
    return <Page>Loading...</Page>
  }
  
  const category = categories?.find(cat => cat.id === router.query.category)
  if (!category) {
    router.push('/')
  }

  return (
    <Page>
      <SEO title={`Category : ${category?.id}`} />
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-4xl font-bold dark:text-zinc-200 flex gap-2'>
          <span>
            Category {"=>"}
          </span>
          <span className='text-blue-500'>
            {category?.name}
          </span>
        </h1>

        <Link href='/'>
          <a className='px-5 py-3 text-lg flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-300 rounded-full'>
            <BiChevronLeft className='text-2xl' />
            <span>
              Go Back
            </span> 
          </a>
        </Link>
      </div>
      <Blogs category={category}/>
    </Page>
  )
}

export default CategoryPosts
