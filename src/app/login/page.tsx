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

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            //const response = await axios.post("/api/users/login", user);
            //console.log("Login success", response.data);
            //toast.success("Login success");
            //router.push("/profile");
        } catch (error:any) {
            //console.log("Login failed", error.message);
            //toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            //setButtonDisabled(false);
        } else{
            //setButtonDisabled(true);
        }
    }, [user]);

    return (
        <Box sx={{display:"flex", width:"100%", height:"100%", backgroundColor:"blue"}}>
            <Typography>Log In</Typography>
        </Box>
    )
}