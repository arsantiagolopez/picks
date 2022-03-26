import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { UserSession } from "../../types";
import { Authenticated } from "./Authenticated";
import { NotAuthenticated } from "./NotAuthenticated";

interface Session {
  data: UserSession;
  status: string;
}

interface Props {}

const Navigation: FC<Props> = () => {
  const { data: session } = useSession() as unknown as Session;

  const isAdmin = session?.user?.isAdmin || session?.user?.isSuperAdmin;

  const authenticatedProps = { session };

  return isAdmin ? (
    <Authenticated {...authenticatedProps} />
  ) : (
    <NotAuthenticated />
  );
};

export { Navigation };
