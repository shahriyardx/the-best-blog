import { createRouter } from "../createRouter";
import { PostSchema, PostUpdateSchema } from '../../schema/post.schema'
import { TRPCError } from "@trpc/server";
import { CommentSchema } from "../../schema/comment.schema";
import { z } from "zod";

export const postRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          visibility: "PUBLIC",
        },
        include: {
          Category: true
        }
      })
      return posts
    }
  })
  .query('byId', {
    input: z.object({
      post_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.post.findFirst({
        where: {
          visibility: {
            in: ['PUBLIC', 'UNLISTED'],
          },
          id: input.post_id
        },
        include: {
          Category: true,
          likes: {
            select: {
              user_id: true,
              post_id: true
            }
          },
          comments: {
            select: {
              id: true,
              author: {
                select: {
                  username: true,
                  id: true
                }
              },
              author_id: true,
              post_id:  true,
              content: true
            }
          },
          author: {
            select: {
              username: true
            }
          }
        }
      })

      return posts
    }
  })
  .query('byCategoryId', {
    input: z.object({
      category_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          category_id: input.category_id
        },
        include: {
          Category: true
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
  .mutation('toggleLike', {
    input: z.object({
      post_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be logged in to like posts"
        })
      }

      const liked = await ctx.prisma.like.findFirst({
        where: {
          post_id: input.post_id,
          user_id: ctx.session.profile.id
        }
      })

      if (liked) {
        await ctx.prisma.like.delete({
          where: {
            id: liked.id
          }
        })
      } else {
        await ctx.prisma.like.create({
          data: {
            post_id: input.post_id,
            user_id: ctx.session.profile.id
          }
        })
      }

      return { success: true }
    }
  })
  .mutation('deleteById', {
    input: z.object({
      post_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not logged in"
        })
      }

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.post_id
        }
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
          message: "You are not allowed to delete this post"
        })
      }

      await ctx.prisma.post.delete({
        where: {
          id: input.post_id
        }
      })

      return { success: true }
    }
  })
  .mutation('updateById', {
    input: PostUpdateSchema,
    async resolve({ ctx, input}) {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not logged in"
        })
      }

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.post_id
        }
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
          message: "You are not allowed to delete this post"
        })
      }
      
      const {post_id, ...postData} = input

      await ctx.prisma.post.update({
        where: {
          id: input.post_id
        },
        data: postData
      })

      return { success: true }
    }
  })