import { createRouter } from "../createRouter";
import { TRPCError } from "@trpc/server";
import { CategorySchema } from "@schema/category.schema";
import slugify from 'slugify'
import { z } from "zod";

export const categoryRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      const allCategory = await ctx.prisma.category.findMany()
      return allCategory
    }
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      console.log("Session")
      throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to be logged in to create a category"
      })
    }

    console.log(ctx.session.profile)

    if (!ctx.session.profile.is_admin) {
      console.log("Admin")
      throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to delete category"
      })
    }

    return next()
  })
  .mutation('create', {
    input: CategorySchema,
    async resolve({ ctx, input }) {
      const category = await ctx.prisma.category.create({
        data: {name: input.name, slug: slugify(input.name).toLocaleLowerCase()}
      })

      return category
    }
  })
  .mutation('deleteById', {
    input: z.object({ 
      category_id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.category.delete({
        where: {
          id: input.category_id
        }
      })

      return { success: true }
    }
  })
  