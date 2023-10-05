"use client"
import React, {useState} from "react";
import {Box, Typography, TextField, Button} from '@mui/material'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Reset() {
    const router = useRouter()
    const {data: session} = useSession();

    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const onReset = () => {
        if (isValidEmail(email)) {
            setError(false);
            router.push("/")
        } else {
            setError(true);
        }
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
                alignItems: "center",
                justifyContent: "flex-start",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                    height: "30%",
                    backgroundColor: "#FAFAFA",
                    marginLeft: "15px",
                    borderRadius: "24px 24px",
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
                            <Typography sx={{fontSize: "12px", color: "black"}}>ESPERAMOS VERLO PRONTO</Typography>
                            <Typography sx={{fontSize: "20px", color: "black"}}>Recuperar contraseña</Typography>
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
                                label="Email"
                                variant="outlined"
                                error={error}
                                helperText={error ? 'Formato de email invalido : ejemplo@email.com' : ''}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            width: "80%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Button
                                onClick={() => onReset()}
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    height: "60px",
                                    textTransform: "capitalize",
                                    color: "white",
                                    backgroundColor: "black",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    "&:hover": {
                                        backgroundColor: "grey",
                                        color: "white"
                                    }
                                }}>Continuar</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}