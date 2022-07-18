import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "src/server/route/app.router";

export const trpc = createReactQueryHooks<AppRouter>();
