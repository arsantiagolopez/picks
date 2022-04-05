import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UserEntity } from "../../../types";
import { clientPromise } from "../../../utils/mongodb";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      // Google one-click login
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        profile(profile) {
          return {
            id: profile?.sub,
            name: profile?.name,
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            email: profile?.email,
            image: profile?.picture,
          };
        },
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.SECRET,
    session: {
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 60 * 60 * 24 * 30, // 1 month
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      updateAge: 60 * 60 * 24 * 30, // 1 month
    },
    pages: {
      signIn: "/signin",
      error: "/",
    },
    // Debugging
    debug: process.env.NODE_ENV === "development",
    // Callbacks
    callbacks: {
      // Return userId on session
      async session({ session, user }) {
        session = {
          user: { ...session?.user, ...user } as UserEntity,
          expires: session?.expires,
        };

        return session;
      },
    },
  });
}
