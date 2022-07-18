import { TRPCError } from "@trpc/server";
import z from "zod";
import { createRouter } from "../createRouter";

export const commentRouter = createRouter()
  .query("byPostId", {
    input: z.object({
      post_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          post_id: input.post_id,
        },
      });

      return comments;
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      console.log("Session");
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not logged in",
      });
    }
    return next();
  })
  .mutation("deletebyId", {
    input: z.object({
      comment_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.comment_id,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      if (comment.author_id !== ctx.session?.profile.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete this comment",
        });
      }

      await ctx.prisma.comment.delete({
        where: {
          id: input.comment_id,
        },
      });

      return { success: true };
    },
  });
