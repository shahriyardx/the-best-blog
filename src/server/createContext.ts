import { NextApiRequest, NextApiResponse } from "next";

export const createContext = ({ req, res }: { req: NextApiRequest, res: NextApiResponse}) => {
    return {
        req, res
    }
}

export type Context = ReturnType<typeof createContext>