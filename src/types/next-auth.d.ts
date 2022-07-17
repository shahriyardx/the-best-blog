import { IUser } from "@database/schemas/User"
import NextAuth, { DefaultSession } from "next-auth"

export const GithubProfile = z.object({
    id: z.string().uuid(),
    emil: z.string(),
    username: z.string(),
    github_id: z.string(),
    is_admin: z.boolean().default(false),
    is_active: z.boolean().default(false),
    created_at: z.date(),
    updated_at: z.date()
})

declare module "next-auth" {
  interface Session {
    profile: z.TypeOf<typeof GithubProfile> & DefaultSession["user"]
  }
}