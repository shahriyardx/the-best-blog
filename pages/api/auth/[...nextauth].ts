import { User } from "@prisma/client";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "src/server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const github_profile = await fetch(
          `https://api.github.com/user/${token.sub}`
        ).then((data) => data.json());
        let db_user = await prisma.user.findUnique({
          where: {
            github_id: token.sub,
          },
        });

        if (!db_user) {
          db_user = await prisma.user.create({
            data: {
              email: user.email as string,
              username: github_profile.login,
              github_id: token.sub as string,
            },
          });
        }

        token.profile = db_user;
      }

      return token;
    },
    session({ session, token }) {
      session.profile = token.profile as User;
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
};

export default NextAuth(authOptions);
