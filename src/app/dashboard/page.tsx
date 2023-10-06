"use client"
import React, {useState} from "react";
import {Box, Typography} from '@mui/material'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Dashboard() {
    const router = useRouter()
    const {data: session} = useSession();

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            backgroundImage: `url("/images/background-barrio.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <Typography>Dashboard</Typography>
        </Box>
    )
}