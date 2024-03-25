import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from 'next-auth/providers/github'

export const authConfig =  {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ]
} satisfies NextAuthConfig