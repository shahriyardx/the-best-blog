import { createRouter } from "../createRouter";
import z from 'zod'
import { TRPCError } from "@trpc/server";

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
  .mutation('deletebyId', {
    input: z.object({
      comment_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be logged in to delete comment"
        })
      }

      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.comment_id
        }
      })

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found"
        })
      }

      if (comment.author_id !== ctx.session.profile.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete this comment"
        })
      }

      await ctx.prisma.comment.delete({
        where: {
          id: input.comment_id
        }
      })

      return { success: true }
    }
  })
