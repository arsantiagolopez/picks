import { NextPage } from "next";

export interface StyleProps {
  [key: string]: any;
}

export type ProtectedPage<Props> = NextPage<Props> & { isProtected?: boolean };
export type AdminPage<Props> = NextPage<Props> & { isAdmin?: boolean };

export * from "./entities";
