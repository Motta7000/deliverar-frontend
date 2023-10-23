import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Contraseña", type: "password"}
            },

            /*authorize: async (credentials) => {

                const res = await fetch("http://localhost:8000/api/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })

                const user = await res.json()
                console.log("user", user)

                if (res.ok) {
                    return user
                }
            }*/
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    //Add custom values into the session, custom attributes about the user for example
    callbacks: {
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
});

export {handler as GET, handler as POST};