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
  });
