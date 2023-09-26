import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import {callback, session} from "next-auth/core/routes";

const handler = NextAuth({
    providers: [
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
    /*callbacks: {
        session: async ({session}) => {
            session.customValue = new Date().toISOString();
            return Promise.resolve(session);
        },
    },*/
});

export {handler as GET, handler as POST};