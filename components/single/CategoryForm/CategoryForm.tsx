import { trpc } from "@utils/trpc"
import { useRef } from "react"
import { FormEvent } from "react"

const CategoryForm = ({ refetch }: { refetch: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { mutate, } = trpc.useMutation(['category.create'], {
    onSuccess: () => {
      formRef.current?.reset()
      refetch()
    }
  })

  const addCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //@ts-ignore
    const category_name = e.target.category.value
    mutate({ name: category_name })
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-zinc-300">Add Category</h1>

      <form onSubmit={e => addCategory(e)} className="mt-5" ref={formRef}>
        <div className="flex items-center gap-2">
          <input 
            type="text"
            name="category"
            placeholder="Category Name" 
            className="
              bg-[bisque] dark:bg-zinc-800 
              text-zinc-800 dark:text-white py-3
            " 
          />
          <button type="submit" className="
            bg-orange-500 hover:bg-orange-600 border-2 border-orange-600 
            dark:border-zinc-600 text-white dark:bg-zinc-700 
            hover:dark:bg-zinc-600 px-5 py-3
            "
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm