"use client";
import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material"
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Home() {
    return (
        <Box sx={{display:"flex", width:"100%", height:"100%", backgroundColor:"blue"}}>
            <Typography>Home Page</Typography>
        </Box>
    )
}