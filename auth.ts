import NextAuth             from "next-auth"
import { PrismaAdapter }    from "@auth/prisma-adapter"
import { prisma }           from "@/prisma"
import GitHub               from "next-auth/providers/github"
import Google               from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter : PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub({
        clientId     : process.env.GITHUB_ID!,
        clientSecret : process.env.GITHUB_SECRET!,
    })
],
})