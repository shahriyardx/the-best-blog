import { signIn, useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { trpc } from '@utils/trpc'
import { CommentInput } from '@schema/comment.schema'
type Props = {
  post_id: string
  refetch: () => void
  setShowCommentForm: Dispatch<SetStateAction<boolean>>
}

const CommentForm = ({ post_id, setShowCommentForm, refetch }: Props) => {
  const { data: session } = useSession()
  const { register, reset, handleSubmit } = useForm<CommentInput>()
  const [commenting, setCommenting] = useState<boolean>(false)

  const { mutate: addComment } = trpc.useMutation(['posts.addComment'], {
    onSuccess: () => {
      refetch()
      reset()
    }
  })
  const createComment = async (data: CommentInput) => {
    addComment({...data, post_id})
  }
  return (
    <div className='py-10 max-w-[65ch]'>
      {!session && (
        <h2 className='text-3xl dark:text-zinc-300 font-semibold'>
          <span className="text-blue-500 underline cursor-pointer" onClick={() => signIn('github')}>Login</span> to comment
        </h2>
      )}
      {session && (<form onSubmit={handleSubmit(createComment)}>
        <textarea 
          className='w-full bg-[bisque] dark:bg-zinc-800 dark:text-white' 
          rows={5} 
          placeholder="Write your comment here..." 
          {...register('content', {
            required: true
            }
          )} 
        />

        <div className='flex items-center gap-3'>
          <button 
            type='submit' 
            className='px-5 py-3 bg-orange-400 hover:bg-orange-500 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 disabled:cursor-not-allowed mt-2 rounded-md'
            disabled={commenting}
          >
            Comment
          </button>

          <button 
            onClick={() => setShowCommentForm(false)}
            className='px-5 py-3 hover:bg-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-800 disabled:cursor-not-allowed mt-2 rounded-md'
          >
            Cancel
          </button>
        </div>
      </form>)}
    </div>
  )
}

export default CommentForm