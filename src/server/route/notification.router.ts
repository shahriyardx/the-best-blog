import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const notificationRouter = createRouter()
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
  .mutation("markRead", {
    input: z.object({
      to_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.notification.updateMany({
        where: {
          to_id: input.to_id,
        },
        data: {
          status: "READ",
        },
      });
    },
  });
