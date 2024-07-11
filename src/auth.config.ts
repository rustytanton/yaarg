import type { NextAuthConfig } from "next-auth"
import Resend from 'next-auth/providers/resend'

export default { 
    providers: [Resend({
        from: "no-reply@rustytanton.com"
    })],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            return session
        }
    }
} satisfies NextAuthConfig