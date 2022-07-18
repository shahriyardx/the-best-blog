import ProfilePage from "components/Layouts/ProfilePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Children } from "types/common";

type Props = {
  children: Children 
}

const RequireAdmin = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <ProfilePage>
        <p>Loading...</p>
      </ProfilePage>
    )
  }

  if (status === "unauthenticated" || !session?.profile.is_admin || !session?.profile.is_active) {
    router.push("/");
  }

  return children as JSX.Element;
};

export default RequireAdmin;