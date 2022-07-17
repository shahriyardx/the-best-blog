import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { CategoryInput } from '../schema/category.schema'
import { PostInput } from '../schema/post.schema'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { register: regPost, handleSubmit: hsp } = useForm<PostInput>()
  const { register: regCat, handleSubmit: hsc } = useForm<CategoryInput>()
  const { data: categories, isLoading, refetch } = trpc.useQuery(['category.all'])
  const { data: posts, isLoading: postsLoading, refetch: refetchPosts } = trpc.useQuery(['posts.all'])

  const { mutate, error } = trpc.useMutation(['category.create'], {
    onSuccess: () => {
      console.log("Post added")
      refetchPosts()
    },
    
  })

  const { mutate: mutatePost, error: postError } = trpc.useMutation(['posts.create'], {
    onSuccess: () => {
      console.log("Category added")
      refetch()
    }
  })


  const addPost = (data: PostInput) => {
    mutatePost(data)
  }

  const addCategory = (data: CategoryInput) => {
    mutate(data)
  }

  return (
    <div>
      {postsLoading && <>Loading/...</>}
      {posts?.map(post => <h2 key={post.id}>{post.title} {post.author.username}</h2>)}
      <h1>Add Post</h1>
      <form onSubmit={hsp(addPost)}>
        <input type="text" placeholder='Title' {...regPost('title')}/>
        <input type="text" placeholder='SD' {...regPost('short_description')}/>
        <input type="text" placeholder='content' {...regPost('content')} />
        <input type="text" placeholder='visi' {...regPost('visibility')}/>
        {!isLoading && (<select {...regPost('category_id')}>
          {categories?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>)}
        <button type='submit'>Add Post</button>
      </form>

      <h1>Add Category</h1>
      <form onSubmit={hsc(addCategory)}>
        <input type="text" placeholder='name' {...regCat('name')}/>
        <input type="text" placeholder='slug' {...regCat('slug')} />
        <button type='submit'>Add Category</button>
      </form>
    </div>
  )
}

export default Home
