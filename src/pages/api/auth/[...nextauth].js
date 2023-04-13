import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const res = await fetch("https://hive-deployment.onrender.com/users/login", {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.status === 200 && user) {
                    return {
                        id: user._id,
                        name: user.firstName,
                        surname: user.lastName,
                        email: user.email,
                        tokens: {
                            accessToken: user.tokens.access_token,
                            refreshToken: user.tokens.refresh_token
                        },
                        rooms: user.rooms
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async redirect({ url, baseUrl }) {
            return url
        },
        async session({ session, user, token }) {
            session.user = token.user
            return session
        },
    }
}
export default NextAuth(authOptions)