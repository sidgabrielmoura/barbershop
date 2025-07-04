import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "@/lib/prisma"

const handler = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async session({session, user}){
            session.user = {
                ...session.user,
                id: user.id
            } as any

            return session
        }
    }
})

export { handler as GET, handler as POST }