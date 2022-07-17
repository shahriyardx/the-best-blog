import * as trpcnext from '@trpc/server/adapters/next'
import { appRouter } from '../../../server/route/app.router'
import { createContext } from '../../../server/createContext'

export default trpcnext.createNextApiHandler({ 
    router: appRouter,
    createContext,
    onError({ error }) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
            console.error("Something went wrong", error)
        } else {
            console.error(error)
        }
    }
})