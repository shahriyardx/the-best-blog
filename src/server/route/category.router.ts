import { createRouter } from "../createRouter";
import { TRPCError } from "@trpc/server";
import { CategorySchema } from "../../schema/category.schema";

export const categoryRouter = createRouter()
  .mutation('create', {
    input: CategorySchema,
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You need to be logged in to create a category"
        })
      }
      const category = await ctx.prisma.category.create({
        data: input
      })

      return category
    }
  })
  .query('all', {
    async resolve({ ctx }) {
      const allCategory = await ctx.prisma.category.findMany()
      return allCategory
    }
  })