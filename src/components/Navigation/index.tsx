import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { Authenticated } from "./Authenticated";
import { NotAuthenticated } from "./NotAuthenticated";

interface Props {}

const Navigation: FC<Props> = () => {
  const { data: session } = useSession();

  const isAdmin = session?.user?.isAdmin || session?.user?.isSuperAdmin;

  const authenticatedProps = { session };

  return isAdmin ? (
    <Authenticated {...authenticatedProps} />
  ) : (
    <NotAuthenticated />
  );
};

export { Navigation };
