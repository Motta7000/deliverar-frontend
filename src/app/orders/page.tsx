"use client"
import React, {useState, useEffect} from "react";
import {Box, Typography} from '@mui/material'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


export default function Orders() {
    const router = useRouter()
    const {data: session} = useSession();

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography>Orders</Typography>
        </Box>
    )
}