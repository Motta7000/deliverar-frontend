import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {cookies} from "next/headers";

function objectToString(data: any): string {
    return JSON.stringify(data);
}

const create = async (data: any) => {
    cookies().set({
        name: 'user',
        value: objectToString(data),
    })
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Contraseña", type: "password"},
            },
            authorize: async (credentials, req) => {
                const res = await fetch("http://localhost:8000/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"},
                });
                const user = await res.json();

                console.log("user router", user)

                if (res.ok && user) {
                    await create(user);
                    return user;
                } else {
                    return Promise.resolve(null);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async jwt({token, user, session}) {
            if (user) {
                return {...token, user: user.user, token: user.token};
            }
            return token
        },
        async session({session, token, user}) {
            return {
                ...session,
                user: token
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
});

export {handler as GET, handler as POST};
