import { createRouter } from "../createRouter";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createRouter()
  .query('posts', {
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not logged in"
        })
      }

      const posts = await ctx.prisma.post.findMany({
        where: {
          author_id: ctx.session.profile.id
        },
        select: {
          id: true,
          title: true,
          short_description: true
        }
      })
      return posts
    }
  })
  .query('postById', {
    input: z.object({
      post_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not logged in"
        })
      }

      const post = await ctx.prisma.post.findFirst({
        where: {
          id: input.post_id
        },
      })

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found"
        })
      }

      if (post.author_id !== ctx.session.profile.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You dont have permission to access this"
        })
      }

      return post
    }
  })
  