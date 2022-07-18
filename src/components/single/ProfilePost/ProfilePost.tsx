import { Dialog, Transition } from '@headlessui/react'
import { Post } from '@prisma/client'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { trpc } from 'src/utils/trpc'


type Props = {
  post: Pick<Post, "id" | "title" | "short_description">
  refetch: () => void
}

const ProfilePost = ({ post, refetch }: Props ) => {
  const [open, setOpen] = useState<boolean>(false)
  const { mutate } = trpc.useMutation(['posts.deleteById'], {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      setOpen(false)
      toast.success("Post deleted")
      refetch()
    }
  })
  
  const deletePost = () => {
    console.log(post.id)
    mutate({ post_id: post.id })
  }

  return (
    <div className='p-5 rounded-md dark:bg-zinc-800 bg-[bisque]'>
      <h2
        className='text-2xl font-bold dark:text-zinc-300'
      >
        {post.title}
      </h2>
      <p className='dark:text-zinc-400 mt-2 mb-4'>
        {post.short_description}
      </p>
      <div className='flex gap-2 text-lg'>
        <Link href={`/u/posts/edit/${post.id}`} passHref>
          <a className='text-black dark:text-zinc-300'>Edit</a>
        </Link>

        <button onClick={() => setOpen(true)} className='text-red-500'>Delete</button>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete post <span className='text-blue-500'>{post.title}</span>?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This action can&apos;t be reverted once confimed. Do you want to proceed?
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={deletePost}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-black hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Delete
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                     Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ProfilePost