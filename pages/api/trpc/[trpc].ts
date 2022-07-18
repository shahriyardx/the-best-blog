import * as trpcnext from "@trpc/server/adapters/next";
import { createContext } from "src/server/createContext";
import { appRouter } from "src/server/route/app.router";

export default trpcnext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error("Something went wrong", error);
    } else {
      console.error(error);
    }
  },
});
