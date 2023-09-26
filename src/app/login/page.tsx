"use client"
import {Box, Typography, TextField, Button, Icon} from '@mui/material'
import Divider from '@mui/material/Divider';
import {signIn, useSession} from "next-auth/react";
import Link from "next/link";
import NextLink from "next/link";

export default function Login() {
    const {data: session} = useSession();
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
                //backgroundColor: "red",
                alignItems: "center",
                justifyContent: "flex-end"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
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
                    height: "70%",
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
                            <Typography sx={{fontSize: "20px", color: "black"}}>Ingresar a la Cuenta</Typography>
                        </Box>
                        <Box
                            component="form"
                            sx={{display: "flex", flexDirection: "column", gap: "10px", width: "80%"}}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} id="outlined-basic" label="Email"
                                       variant="outlined"/>
                            <TextField InputProps={{
                                style: {
                                    borderRadius: "10px",
                                }
                            }} id="outlined-basic" label="Contraseña" variant="outlined"/>
                        </Box>
                        <Box sx={{display: "flex", width: "80%"}}>
                            <Button variant="text" sx={{
                                textTransform: 'none', marginLeft: "auto"
                            }}>Olvido su
                                contraseña?</Button>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            width: "80%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Button variant="contained" sx={{
                                width: "100%",
                                height: "60px",
                                textTransform: "capitalize",
                                color: "white",
                                backgroundColor: "black",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "16px",
                                "&:hover": {
                                    backgroundColor: "grey",
                                    color: "white"
                                }
                            }}>Continuar</Button>
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
                        }} startIcon={facebookIcon} onClick={() => signIn()}>Ingresar Con Facebook</Button>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Typography sx={{textTransform: "capitalize", color: "black", fontSize: "15px"}}>Nuevo
                            Usuario?</Typography>
                        <NextLink href='/' passHref>
                            <Link display={'flex'} alignItems={'center'} href="/signup">
                                <Typography sx={{
                                    marginLeft: "auto",
                                    textTransform: "capitalize",
                                    color: "black",
                                    cursor: "pointer",
                                    "&:hover": {textDecoration: "underline dotted"}
                                }}>REGISTRATE ACA</Typography>
                            </Link>
                        </NextLink>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}