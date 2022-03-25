import { NextPage } from "next";

export interface StyleProps {
  [key: string]: any;
}

export type ProtectedPage<Props> = NextPage<Props> & { isProtected?: boolean };

export * from "./entities";
