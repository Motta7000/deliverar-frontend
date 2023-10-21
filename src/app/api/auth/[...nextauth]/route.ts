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

            authorize: async (credentials) => {

                const res = await fetch("http://localhost:8000/api/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })

                const user = await res.json()

                const jwt = require('jsonwebtoken');
                const secretKey = process.env.BACKEND_SECRET_JWT as string;
                const decodedUser = jwt.verify(user.token, secretKey);


                if (res.status === 200 && decodedUser) {
                    return decodedUser
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    //Add custom values into the session, custom attributes about the user for example
    callbacks: {
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        /*async signIn(user, account, profile) {
            return user;
        },

        async session({session, token}) {
            // You can manipulate the session object here
            return session;
        },
        async jwt({token, user}) {
            // You can manipulate the JWT token here
            return token;
        },*/
    },
});

export {handler as GET, handler as POST};