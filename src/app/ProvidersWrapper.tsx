"use client"
import './globals.css'
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

export default function ProvidersWrapper({children}: {
    children: ReactNode
}) {
    return (
        <SessionProvider>
            {children} {/* Our entire app -> has access to NextAuth */}
        </SessionProvider>
    )
}
