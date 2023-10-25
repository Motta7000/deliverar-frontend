"use client";
import React, {useContext, useEffect, useState} from "react";
import {Box, Typography, TextField, Button, Icon} from "@mui/material";
import Divider from "@mui/material/Divider";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {ModalMessage} from "@/components/ModalMessage";
import {LoginUser} from "@/app/services/userDataService";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalDescription, setModalDescription] = useState<string>("");
    const [openPopup, setOpenPopup] = useState(false);

    const googleIcon = (
        <Icon
            sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <img
                alt="edit"
                src="/images/google-icon.svg"
                style={{width: "100%", height: "100%"}}
            />
        </Icon>
    );

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const validatePassword = (password: string) => {
        if (!password.trim()) {
            return false;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/;
        return !passwordRegex.test(password);
    };

    const handleEmailChange = (e: {
        target: {
            value: any;
        };
    }) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setErrors({...errors, email: !newEmail});
    };

    const handlePasswordChange = (e: {
        target: {
            value: any;
        };
    }) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setErrors({...errors, password: !newPassword});
    };

    const onLogin = async () => {
        /*if (!email || !password) {
            setErrors({...errors, email: !email, password: !password});
            return;
        }
        console.log("errors", !isValidEmail(email))
        if (!isValidEmail(email)) {
            setErrors({...errors, email: !email});
            return;
        }
        if (!validatePassword(password)) {
            setErrors({...errors, password: !password});
            return;
        }*/
        const res = await LoginUser({email: email, password: password});
        console.log("res", res)
        if (res.status === 200) {
            await signIn("credentials", {
                email: email,
                password: password,
                callbackUrl: "/dashboard",
            });
        } else {
            setModalTitle("Ocurrio un error!");
            setModalDescription("Por favor verifica que el email sea valido e intenta nuevamente. Si el problema persiste, por favor contactanos.");
            setOpenPopup(true);
        }
        console.log("res", res)
        // Chequear que la contraseña tenga  una mayuscula, un numero y un caracter especial.
        /*if (!isValidEmail(email)) {
                setErrors({...errors, email: true});
                return;
            }
            if (password.length < 7) {
                setErrors({...errors, password: true});
                return;
            }*/
        // const response = await LoginUser({email: email, password: password});
        // const userData = await response.json()
        // if (userData.code === 400) {
        //     return
        // } else {
        //     console.log("entre")
        //     setUser(userData);
        //     router.push("/dashboard");
        // }
    };

    const onLoginWithGoogle = async () => {
        await signIn("google", {callbackUrl: "/dashboard"});
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                backgroundImage: `url("/images/background-barrio.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "50%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                        padding: "10px",
                        marginRight: "15px",
                        gap: "20px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid grey",
                    }}
                >
                    <Typography sx={{fontSize: "40px"}}>
                        Entregas Premium, Autonomas y Confiables
                    </Typography>
                    <Typography>
                        Ofrecemos un servicio de entregas de máxima calidad con un toque de
                        innovación y seguridad. Nuestra flota de vehículos autónomos
                        garantiza una entrega eficiente y confiable en todo momento.{" "}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "50%",
                    height: "100%",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        backgroundColor: "#FAFAFA",
                        marginLeft: "15px",
                        borderRadius: "24px 24px 0px 0px",
                        alignItems: "center",
                        gap: "30px",
                        padding: "15px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "column",
                            gap: "15px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{display: "flex", flexDirection: "column", width: "80%"}}
                        >
                            <Typography sx={{fontSize: "12px", color: "black"}}>
                                BIENVENIDO NUEVAMENTE
                            </Typography>
                            <Typography sx={{fontSize: "20px", color: "black"}}>
                                Ingresar a la Cuenta
                            </Typography>
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                width: "80%",
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                value={email}
                                onChange={handleEmailChange}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    },
                                }}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                error={errors.email}
                                helperText={
                                    errors.email ? "Por favor ingresar un email valido." : ""
                                }
                            />
                            <TextField
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    },
                                }}
                                type="password"
                                id="outlined-basic"
                                label="Contraseña"
                                variant="outlined"
                                error={errors.password}
                                helperText={
                                    errors.password
                                        ? "La contraseña debe contener un minimo de 8 caracteres."
                                        : ""
                                }
                            />
                        </Box>
                        <Box sx={{display: "flex", width: "80%"}}>
                            <Button
                                href="/reset"
                                variant="text"
                                sx={{textTransform: "none", marginLeft: "auto"}}
                            >
                                Olvido su contraseña?
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                width: "80%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                onClick={onLogin}
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
                                        color: "white",
                                    },
                                }}
                            >
                                Iniciar Sesion
                            </Button>
                            <ModalMessage
                                openPopup={openPopup}
                                handleClosePopup={handleClosePopup}
                                title={modalTitle}
                                description={modalDescription}
                            />
                            {openPopup && (
                                <Box
                                    sx={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        backdropFilter: "blur(5px)",
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                    <Divider
                        sx={{
                            display: "flex",
                            width: "80%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        orientation="horizontal"
                    >
                        <Typography sx={{color: "black"}}>Or</Typography>
                    </Divider>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "80%",
                            gap: "15px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
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
                                    color: "white",
                                },
                            }}
                            startIcon={googleIcon}
                            type="button"
                            onClick={() => onLoginWithGoogle()}
                        >
                            Ingresar Con Google
                        </Button>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Typography
                            sx={{
                                textTransform: "capitalize",
                                color: "black",
                                fontSize: "15px",
                            }}
                        >
                            Nuevo Usuario?
                        </Typography>
                        <Link href={"/signup"}>
                            <Typography
                                sx={{
                                    marginLeft: "auto",
                                    textTransform: "capitalize",
                                    color: "black",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    "&:hover": {textDecoration: "underline dotted"},
                                }}
                            >
                                REGISTRATE ACA
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
