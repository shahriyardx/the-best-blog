import { CommentSchema } from "@schema/comment.schema";
import { PostSchema, PostUpdateSchema } from "@schema/post.schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const postRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          visibility: "PUBLIC",
        },
        include: {
          Category: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return posts;
    },
  })
  .query("byId", {
    input: z.object({
      post_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.post.findFirst({
        where: {
          visibility: {
            in: ["PUBLIC", "UNLISTED"],
          },
          id: input.post_id,
        },
        select: {
          id: true,
          title: true,
          short_description: true,
          content: true,
          created_at: true,
          Category: true,
          likes: {
            select: {
              user_id: true,
              post_id: true,
            },
          },
          comments: {
            select: {
              id: true,
              author: {
                select: {
                  username: true,
                  id: true,
                },
              },
              author_id: true,
              post_id: true,
              content: true,
            },
          },
          author: {
            select: {
              username: true,
            },
          },
        },
      });

      return posts;
    },
  })
  .query("byCategoryId", {
    input: z.object({
      category_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          category_id: input.category_id,
        },
        include: {
          Category: true,
        },
      });

      return posts;
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not logged in",
      });
    }
    return next();
  })
  .mutation("create", {
    input: PostSchema,
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.create({
        data: { ...input, author_id: ctx.session?.profile.id as string },
      });

      return post;
    },
  })
  .mutation("addComment", {
    input: CommentSchema,
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.post_id,
        },
        select: {
          id: true,
          author_id: true,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      const comment = await ctx.prisma.comment.create({
        data: { ...input, author_id: ctx.session?.profile.id as string },
      });

      if (post.author_id !== ctx.session?.profile.id) {
        await ctx.prisma.notification.create({
          data: {
            type: "COMMENT",
            to_id: post.author_id,
            from_id: ctx.session?.profile.id as string,
            post_id: post.id,
          },
        });
      }

      return comment;
    },
  })
  .mutation("toggleLike", {
    input: z.object({
      post_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      const liked = await ctx.prisma.like.findFirst({
        where: {
          post_id: input.post_id,
          user_id: ctx.session?.profile.id as string,
        },
      });

      if (liked) {
        await ctx.prisma.like.delete({
          where: {
            id: liked.id,
          },
        });

        return { success: true };
      }
      await ctx.prisma.like.create({
        data: {
          post_id: input.post_id,
          user_id: ctx.session?.profile.id as string,
        },
      });

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.post_id,
        },
      });

      if (!post || !ctx.session?.profile) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong",
        });
      }

      if (post.author_id !== ctx.session?.profile.id) {
        await ctx.prisma.notification.create({
          data: {
            type: "LIKE",
            from_id: ctx.session.profile.id,
            to_id: post.author_id,
            post_id: post.id,
          },
        });
      }

      return { success: true };
    },
  })
  .mutation("deleteById", {
    input: z.object({
      post_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.post_id,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      if (post.author_id !== (ctx.session?.profile.id as string)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete this post",
        });
      }

      await ctx.prisma.post.delete({
        where: {
          id: input.post_id,
        },
      });

      return { success: true };
    },
  })
  .mutation("updateById", {
    input: PostUpdateSchema,
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.post_id,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      if (post.author_id !== (ctx.session?.profile.id as string)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete this post",
        });
      }

      const { post_id, ...postData } = input;

      await ctx.prisma.post.update({
        where: {
          id: input.post_id,
        },
        data: postData,
      });

      try {
        await ctx.res?.revalidate(`/p/${post.id}`);
      } catch (_) {}

      return { success: true };
    },
  });
