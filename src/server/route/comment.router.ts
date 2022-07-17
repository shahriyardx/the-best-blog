import { createRouter } from "../createRouter";
import z from 'zod'

export const commentRouter = createRouter()
  .query('byPostId', {
    input: z.object({
      post_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          post_id: input.post_id
        }
      })

      return comments
    }
  })