import { IUser } from "@database/schemas/User"
import NextAuth, { DefaultSession } from "next-auth"

// export const GithubProfile = object
//     id: z.string().uuid(),
//     emil: z.string(),
//     username: z.string(),
//     github_id: z.string(),
//     is_admin: z.boolean().default(false),
//     is_active: z.boolean().default(false),
//     created_at: z.date(),
//     updated_at: z.date()
// })

export const GithubProfile = {
    id: string,
    emil: string,
    username: string,
    github_id: string,
    is_admin: Boolean,
    is_active: Boolean,
    created_at: Date,
    updated_at: Date,
}


declare module "next-auth" {
  interface Session {
    profile: GithubProfile & DefaultSession["user"]
  }
}