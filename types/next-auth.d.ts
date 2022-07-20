import { User } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    profile: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profile: User;
  }
}
