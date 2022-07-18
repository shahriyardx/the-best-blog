import React, { useEffect, useState } from 'react'
import ProfilePage from '@layouts/ProfilePage'
import TextEditor from '@components/TextEditor/TextEditor';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import SEO from '@components/SEO';
import { PostInput } from 'src/schema/post.schema';
import { trpc } from 'src/utils/trpc';
import toast from 'react-hot-toast';

const EditPost = () => {
  const router = useRouter()
  const postId = router.query.postId as string
  const [value, setValue] = useState<string>("")
  const { data: categories, isLoading: catLoading } = trpc.useQuery(['category.all'])
  const { data: post, isLoading: postLoading } = trpc.useQuery(['user.postById', {post_id: postId }])
  const { mutate } = trpc.useMutation(['posts.updateById'], {
    onSuccess: () => {
      toast.success("Post updated")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostInput>()

  useEffect(() => {
    if (!post) return
    reset(post)
    setValue(post.content)
  }, [post, reset])

  if (postLoading || catLoading) {
    return (
      <ProfilePage><span className='dark:text-zinc-300'>Loading...</span></ProfilePage>
    )
  }

  if (!post) {
    return router.push("/u/posts")
  }

  const updatePost = (data: PostInput) => {
    const postData = {...data, content: value, post_id: post.id}
    mutate(postData)
  }

  return (
    <ProfilePage>
      <SEO title={`${post.title}`} />
      <form 
        onSubmit={handleSubmit(updatePost)}
        className='flex flex-col gap-5'
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='flex flex-col'>
            <label htmlFor="title" className='dark:text-zinc-200'>Title</label>
            <input 
              id='title'
              type="text" 
              placeholder='Title'
              className='placeholder-transparent bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white'
              {...register('title', {
                required: {
                  value: true,
                  message: 'Title is required'
                }
              })}
            />
            <p className='text-sm text-red-500'>{errors.title?.message}</p>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="description" className='dark:text-zinc-200'>Description</label>
            <input 
              type="text" 
              id='description'
              placeholder='Description'
              className='placeholder-transparent bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white' 
              {...register('short_description', {
                required: {
                  value: true,
                  message: 'Description is required'
                }
              })}
            />
            <p className='text-sm text-red-500'>{errors.short_description?.message}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='flex flex-col'>
            <label htmlFor="category" className='dark:text-zinc-200'>Category</label>
            <select 
              id="category" 
              className='bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white'
              {...register('category_id', {
                required: true
              })}
            >
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="visibility" className='dark:text-zinc-200'>Visibility</label>
            <select 
              id="visibility" 
              className='bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white'
              {...register('visibility', {
                required: true
              })}
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
              <option value="UNLISTED">Unlisted</option>
            </select>
          </div>
        </div>

        <TextEditor value={value} setValue={(value: string | undefined) => setValue(value || "")} />
        
        <div>
          <button className='px-5 py-3 bg-[orange] text-white dark:bg-zinc-700'>
            Update Post
          </button>
        </div>
      </form>
    </ProfilePage>
  )
}

EditPost.requireAuth = true
export default EditPost
