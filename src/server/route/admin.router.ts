import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const adminRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (
      !ctx.session ||
      !ctx.session.profile.is_active ||
      !ctx.session.profile.is_active
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not admin",
      });
    }

    return next();
  })
  .query("posts", {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        select: {
          id: true,
          title: true,
          author: {
            select: {
              username: true,
            },
          },
          Category: {
            select: {
              name: true,
            },
          },
        },
      });

      return posts;
    },
  })
  .mutation("deletePostById", {
    input: z.object({
      post_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.post.delete({
        where: {
          id: input.post_id,
        },
      });

      return { success: true };
    },
  })
  .query("allUsers", {
    async resolve({ ctx }) {
      const users = await ctx.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          is_admin: true,
          is_active: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return users;
    },
  })
  .mutation("makeUserAdmin", {
    input: z.object({
      user_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.user.update({
        where: {
          id: input.user_id,
        },
        data: {
          is_admin: true,
        },
      });

      return { success: true };
    },
  })
  .mutation("removeUserAdmin", {
    input: z.object({
      user_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.user.update({
        where: {
          id: input.user_id,
        },
        data: {
          is_admin: false,
        },
      });

      return { success: true };
    },
  })
  .mutation("activateUser", {
    input: z.object({
      user_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.user.update({
        where: {
          id: input.user_id,
        },
        data: {
          is_active: true,
        },
      });

      return { success: true };
    },
  })
  .mutation("deactivateUser", {
    input: z.object({
      user_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.user.update({
        where: {
          id: input.user_id,
        },
        data: {
          is_active: false,
        },
      });

      return { success: true };
    },
  })
  .mutation("deleteUserById", {
    input: z.object({
      user_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.user.delete({
        where: {
          id: input.user_id,
        },
      });

      return { success: true };
    },
  });
