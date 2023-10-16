import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: "credentials",
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Contraseña", type: "password"}
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const user = {id: "42", name: "Dave", password: "123456", email: "example@gmail.com", role: "cliente"};
                if (credentials?.email === user.name && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }

                /*const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }*/
                return {id: 1, name: 'John Smith', email: 'example@gmail.com', password: '123456'}
                // Return null if user data could not be retrieved
                //return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
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
    session: {
        // Add your session strategy here
        strategy: "jwt",
        // Additional session options if needed
    },
});

export {handler as GET, handler as POST};