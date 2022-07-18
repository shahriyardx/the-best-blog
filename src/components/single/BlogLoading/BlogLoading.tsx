import BlogCardSkeleaton from "@components/BlogCard/BlogCardSkeleaton"
import Page from "@layouts/Page"

const BlogLoading = () => {
  return (
    <Page>
      <div className='flex flex-col gap-8'>
        <BlogCardSkeleaton />
        <BlogCardSkeleaton />
        <BlogCardSkeleaton />
        <BlogCardSkeleaton />
        <BlogCardSkeleaton />
      </div>
    </Page>
  )
}

export default BlogLoading