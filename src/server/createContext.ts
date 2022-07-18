import { inferAsyncReturnType } from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { prisma } from "./db/client";

export const createContext = async ({
  req,
  res,
}: {
  req?: NextApiRequest;
  res?: NextApiResponse;
}) => {
  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions));

  return {
    req,
    res,
    prisma,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
