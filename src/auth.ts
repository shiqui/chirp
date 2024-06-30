import NextAuth, { NextAuthConfig } from "next-auth";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/db/schema/users";
import GitHub from "next-auth/providers/github";

export const authConfig = {
  providers: [GitHub],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Middleware for route protection
      // const isLoggedIn = !!auth?.user;
      // const paths = ["/"];
      // const isProtected = paths.some((path) =>
      //   nextUrl.pathname.startsWith(path)
      // );
      // if (isProtected && !isLoggedIn) {
      //   const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
      //   redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
      //   return Response.redirect(redirectUrl);
      // }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [GitHub],
});
