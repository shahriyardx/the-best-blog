import { createRouter } from "../createRouter";
import { adminRouter } from "./admin.router";
import { categoryRouter } from "./category.router";
import { commentRouter } from "./comment.router";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .merge("posts.", postRouter)
  .merge("category.", categoryRouter)
  .merge("comments.", commentRouter)
  .merge("user.", userRouter)
  .merge("admin.", adminRouter)
  .query("hello", {
    resolve: () => {
      return "Hello from trpc server";
    },
  });

export type AppRouter = typeof appRouter;
