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
  