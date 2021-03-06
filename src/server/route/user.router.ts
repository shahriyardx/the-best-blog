import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const userRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not logged in",
      });
    }
    return next();
  })
  .query("posts", {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          author_id: ctx.session?.profile.id as string,
        },
        select: {
          id: true,
          title: true,
          short_description: true,
          visibility: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return posts;
    },
  })
  .query("postById", {
    input: z.object({
      post_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findFirst({
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
          message: "You dont have permission to access this post",
        });
      }

      return post;
    },
  })
  .query("myNotifications", {
    async resolve({ ctx }) {
      const notifications = await ctx.prisma.notification.findMany({
        where: {
          to_id: ctx.session?.profile.id,
        },
        include: {
          from: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          status: "desc",
        },
      });

      return notifications;
    },
  });
