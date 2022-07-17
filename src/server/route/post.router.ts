import { createRouter } from "../createRouter";
import { PostSchema } from '../../schema/post.schema'
import { TRPCError } from "@trpc/server";
import { CommentSchema } from "../../schema/comment.schema";

export const postRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          visibility: "PUBLIC",
        },
        select: {
          id: true,
          title: true,
          author: true
        }
      })

      return posts
    }
  })
  .mutation('create', {
    input: PostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be logged in to create a post"
        })
      }
      const post = await ctx.prisma.post.create({
        data: {...input, author_id: ctx.session.profile.id}
      })

      return post
    }
  })
  .mutation('addComment', {
    input: CommentSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be logged in to add comments"
        })
      }

      const comment = await ctx.prisma.comment.create({
        data: {...input, author_id: ctx.session.profile.id}
      })

      return comment
    }
  })