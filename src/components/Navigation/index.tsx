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
  const { data: session, status } = useSession() as unknown as Session;

  const isAuthenticated = status !== "loading" && session;

  const authenticatedProps = { session };

  return isAuthenticated ? (
    <Authenticated {...authenticatedProps} />
  ) : (
    <NotAuthenticated />
  );
};

export { Navigation };
