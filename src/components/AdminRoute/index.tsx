import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

interface Props {
  children: JSX.Element;
}

const AdminRoute: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();
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

  // Session is being fetched, or not admin.
  // If not admin, useEffect() will redirect.
  return <></>;
};

export { AdminRoute };
