import {Box, Typography, TextField, Button} from '@mui/material'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
//import Login from "@/app/login/page";
import {Navbar} from "@/components";

export default function Login() {
    return (
        <>
            <Navbar/>
            <Box sx={{display: "flex", width: "100%", height: "100vh", backgroundColor: "yellow"}}>
                <Box sx={{
                    display: "flex",
                    width: "50%",
                    height: "100vh",
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        height: "150px",
                        backgroundColor: "green",
                        marginRight: "15px"
                    }}>
                        <Typography>Entregas Premium, Autonomas y Confiables</Typography>
                        <Typography>Ofrecemos un servicio de entregas de máxima calidad con un toque de innovación y
                            seguridad. Nuestra flota de vehículos autónomos garantiza una entrega eficiente y confiable
                            en todo momento. </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    width: "50%",
                    height: "100vh",
                    backgroundColor: "blue",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        height: "80%",
                        backgroundColor: "green",
                        marginLeft: "15px",
                        borderRadius: "24px 24px 0px 0px",
                        alignItems: "center",
                        gap: "10px",
                        padding: "15px"
                    }}>
                        <Box sx={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "column",
                            backgroundColor: "red",
                            gap: "15px",
                            justifyContent: "center",
                        }}>
                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                <Typography>BIENVENIDO NUEVAMENTE</Typography>
                                <Typography>Ingresar a la Cuenta</Typography>
                            </Box>
                            <Box
                                component="form"
                                sx={{display: "flex", flexDirection: "column", gap: "10px"}}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Email" variant="outlined"/>
                                <TextField id="outlined-basic" label="Contraseña" variant="outlined"/>
                            </Box>

                            <Button variant="text" sx={{
                                marginLeft: "auto",
                                textTransform: 'none'
                            }}>Olvido su
                                contraseña?</Button>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" sx={{width: "100%"}}>Continuar</Button>
                            </Stack>
                        </Box>
                        <Divider orientation="horizontal" flexItem>
                            Or
                        </Divider>
                        <Box sx={{display: "flex", flexDirection: "column", width: "100%", backgroundColor: "yellow"}}>
                            {/*<Login/>
                            <Login/>
                            <Login/>*/}
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                            <Typography>Nuevo Usuario?</Typography>
                            <Button variant="text" sx={{
                                marginLeft: "auto",
                                textTransform: 'none'
                            }}>REGISTRATE ACA</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


/*"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material"
import {useRouter} from "next/navigation";
import {useSession, signIn, signOut} from "next-auth/react";
import {UserCard} from "../userCard";

interface User {
    email: "",
    password: "",
    username: "",
}

export default function Login() {

    // get session from next-auth
    const {data: session} = useSession();

    // useSession uses React Context

    // if the user exists -> show a Sign Out button and their information
    if (session) {
        return (
            <>
                <button onClick={() => signOut()} type="button">Sign Out of Google</button>
                {/!* Pass session info to server component *!/}
                <UserCard user={session?.user}/>
            </>
        )
    } else {
        return (
            <>
                <button onClick={() => signIn()} type="button">Sign In with Google</button>
            </>
        )
    }


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
}*/
