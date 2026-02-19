import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false

            const allowedEmails = (process.env.ADMIN_EMAILS || "")
                .split(",")
                .map(email => email.trim())

            if (allowedEmails.includes(user.email)) {
                return true
            }

            console.log(`Access denied for email: ${user.email}`)
            return false
        },
    },
    pages: {
        signIn: '/auth/signin', // Optional: Custom sign-in page
    },
    session: {
        strategy: "jwt",
    },
}
