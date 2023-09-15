"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material"


export default function VerifyEmail() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            //await axios.post('/api/users/verifyemail', {token})
            //setVerified(true);
        } catch (error:any) {
            //setError(true);
            //console.log(error.reponse.data);
            
        }

    }

    useEffect(() => {
        //const urlToken = window.location.search.split("=")[1];
        //setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

return (
        <Box sx={{display:"flex", width:"100%", height:"100%", backgroundColor:"blue"}}>
            <Typography>Verify Email</Typography>
        </Box>
    )

}