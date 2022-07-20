import { CategorySchema } from "@schema/category.schema";
import { TRPCError } from "@trpc/server";
import slugify from "slugify";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const categoryRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      const allCategory = await ctx.prisma.category.findMany({
        include: {
          posts: {
            select: {
              id: true,
            },
          },
        },
      });
      return allCategory;
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

    if (!ctx.session.profile.is_admin || !ctx.session.profile.is_active) {
      console.log("Admin");
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to do this action",
      });
    }

    return next();
  })
  .mutation("create", {
    input: CategorySchema,
    async resolve({ ctx, input }) {
      const category = await ctx.prisma.category.create({
        data: {
          name: input.name,
          slug: slugify(input.name).toLocaleLowerCase(),
        },
      });

      return category;
    },
  })
  .mutation("deleteById", {
    input: z.object({
      category_id: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.category.delete({
        where: {
          id: input.category_id,
        },
      });

      return { success: true };
    },
  });
