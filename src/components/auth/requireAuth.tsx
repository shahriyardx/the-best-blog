import ProfilePage from "@layouts/ProfilePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Children } from "types/common";

type Props = {
  children: Children 
}

const RequireAuth = ({ children }: Props) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <ProfilePage>
        <p>Loading...</p>
      </ProfilePage>
    )
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return children as JSX.Element;
};

export default RequireAuth;