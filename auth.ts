import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Github from 'next-auth/providers/github'
import { db } from './lib/db'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Github credentials are missing");
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
})