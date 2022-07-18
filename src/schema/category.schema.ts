import z from 'zod'

export const CategorySchema = z.object({
    name: z.string()
})

export type CategoryInput = z.TypeOf<typeof CategorySchema>