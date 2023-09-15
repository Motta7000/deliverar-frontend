"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material"
import Link from "next/link";
import {useRouter} from "next/navigation";

interface User {
    email: "",
    password: "",
    username: "",
}

export default function Signup() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            //const response = await axios.post("/api/users/signup", user);
            //console.log("Signup success", response.data);
            //router.push("/login");
            
        } catch (error:any) {
            //console.log("Signup failed", error.message);
            
            //toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            //setButtonDisabled(false);
        } else {
            //setButtonDisabled(true);
        }
    }, [user]);

    return (
        <Box sx={{display:"flex", width:"100%", height:"100%", backgroundColor:"blue"}}>
            <Typography>Sign Up</Typography>
        </Box>
    )
}