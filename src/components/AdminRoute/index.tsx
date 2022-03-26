import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { UserSession } from "../../types";

interface Props {
  children: JSX.Element;
}

interface Session {
  data: UserSession;
  status: string;
}

const AdminRoute: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession() as unknown as Session;
  const loading = status === "loading";

  const router = useRouter();

  const isAdmin = !!session?.user?.isAdmin;

  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isAdmin) {
      router.push("/");
    } // If not authenticated, force log in
  }, [isAdmin, loading]);

  if (isAdmin) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <></>;
};

export { AdminRoute };
