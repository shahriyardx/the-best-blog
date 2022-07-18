import { IUser } from "@database/schemas/User"
import NextAuth, { DefaultSession } from "next-auth"
import { User } from '@prisma/client'

declare module "next-auth" {
  interface Session {
    profile: User & DefaultSession["user"]
  }
}