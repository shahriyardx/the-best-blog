import { createRouter } from "../createRouter";
import { categoryRouter } from "./category.router";
import { postRouter } from "./post.router";

export const appRouter = createRouter()
    .merge('posts.', postRouter)
    .merge('category.', categoryRouter)
    .query('hello', {
        resolve: () => {
            return "Hello from trpc server"
        }
    })

export type AppRouter = typeof appRouter