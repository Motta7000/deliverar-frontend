"use client";
import React, {useEffect, useState} from "react";
import {Typography, Box, Icon, TextField, Button} from "@mui/material"
import {signIn, useSession} from "next-auth/react";
import Divider from "@mui/material/Divider";
import NextLink from "next/link";
import Link from "next/link";

export default function Signup() {
    const {data: session} = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(session)
    const googleIcon = (
        <Icon sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img alt="edit" src="/images/google-icon.svg" style={{width: "100%", height: "100%"}}/>
        </Icon>
    );
    const facebookIcon = (
        <Icon sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img alt="edit" src="/images/facebook-icon.svg" style={{width: "100%", height: "100%"}}/>
        </Icon>
    );

    const onCreate = () => {
        console.log("email: ", email)
        console.log("password: ", password)
        console.log("create")
    }

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            backgroundImage: `url("/images/background-barrio.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <Box sx={{
                display: "flex",
                width: "50%",
                height: "100vh",
                alignItems: "center",
                justifyContent: "flex-end"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                    padding: "10px",
                    marginRight: "15px",
                    gap: "20px",
                    backdropFilter: "blur(10px)",
                    border: "1px solid grey"
                }}>
                    <Typography sx={{fontSize: "40px"}}>Entregas Premium, Autonomas y Confiables</Typography>
                    <Typography>Ofrecemos un servicio de entregas de máxima calidad con un toque de innovación y
                        seguridad. Nuestra flota de vehículos autónomos garantiza una entrega eficiente y confiable
                        en todo momento. </Typography>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                width: "50%",
                height: "100vh",
                alignItems: "flex-end",
                justifyContent: "flex-start",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    height: "80%",
                    backgroundColor: "#FAFAFA",
                    marginLeft: "15px",
                    borderRadius: "24px 24px 0px 0px",
                    alignItems: "center",
                    gap: "30px",
                    padding: "15px"
                }}>
                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        gap: "15px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Box sx={{display: "flex", flexDirection: "column", width: "80%"}}>
                            <Typography sx={{fontSize: "12px", color: "black"}}>BIENVENIDO
                                NUEVAMENTE</Typography>
                            <Typography sx={{fontSize: "20px", color: "black"}}>Crear Cuenta</Typography>
                        </Box>
                        <Box
                            component="form"
                            sx={{display: "flex", flexDirection: "column", gap: "10px", width: "80%"}}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }}
                                id="outlined-basic"
                                label="Nombre"
                                variant="outlined"/>
                            <TextField
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"/>
                            <TextField InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} id="outlined-basic" label="Contraseña" variant="outlined"/>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            width: "80%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Button
                                onClick={() => onCreate()}
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    height: "60px",
                                    textTransform: "capitalize",
                                    color: "white",
                                    backgroundColor: "black",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "grey",
                                        color: "white"
                                    }
                                }}>Registrarse</Button>
                        </Box>
                    </Box>
                    <Divider sx={{display: "flex", width: "80%", justifyContent: "center", alignItems: "center"}}
                             orientation="horizontal">
                        <Typography sx={{color: "black"}}>Or</Typography>
                    </Divider>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "80%",
                        gap: "15px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Button sx={{
                            width: "100%",
                            textTransform: "capitalize",
                            color: "black",
                            padding: "10px 20px",
                            border: "0.5px solid #616161",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                            "&:hover": {
                                backgroundColor: "grey",
                                color: "white"
                            }
                        }} startIcon={googleIcon} onClick={() => signIn()}>Ingresar Con Google</Button>
                        <Button
                            sx={{
                                width: "100%",
                                textTransform: "capitalize",
                                color: "black",
                                padding: "10px 20px",
                                border: "0.5px solid #616161",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "16px",
                                "&:hover": {
                                    backgroundColor: "grey",
                                    color: "white"
                                }
                            }} startIcon={facebookIcon} onClick={() => signIn()}>Ingresar Con Facebook</Button>
                    </Box>
                    <Box sx={{
                        display: "flex", alignItems: "center", gap: "10px"
                    }}>
                        <Typography sx={{textTransform: "capitalize", color: "black", fontSize: "15px"}}>Ya tenes
                            cuenta?</Typography>
                        <Link href={"/login"}>
                            <Typography sx={{
                                marginLeft: "auto",
                                textTransform: "capitalize",
                                color: "black",
                                cursor: "pointer",
                                textDecoration: "underline",
                                "&:hover": {textDecoration: "underline dotted"}
                            }}>INICIA SESION</Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}