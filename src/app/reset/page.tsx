"use client";
import React, {useState} from "react";
import {Box, Typography, TextField, Button, IconButton} from "@mui/material";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {ResetPassword} from "@/app/services/userDataService";
import {Modal} from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";

export default function Reset() {
    const router = useRouter();
    const {data: session} = useSession();

    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [openPopup, setOpenPopup] = useState(false);

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(emailRegex.test(email));
        return emailRegex.test(email);
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
        router.push("/");
    };


    const onReset = async () => {
        if (isValidEmail(email)) {
            setError(false);
            const res = await ResetPassword(email);
            console.log("res", res)
            if (res.status === 200) {
                setOpenPopup(true);
            }
        } else {
            setError(true);
        }
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
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                        height: "40%",
                        backgroundColor: "#FAFAFA",
                        marginLeft: "15px",
                        borderRadius: "24px 24px",
                        alignItems: "center",
                        justifyContent: "center",
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
                                ESPERAMOS VERLO PRONTO
                            </Typography>
                            <Typography sx={{fontSize: "20px", color: "black"}}>
                                Recuperar contraseña
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
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    },
                                }}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                error={error}
                                helperText={
                                    error ? "Formato de email invalido : ejemplo@email.com" : ""
                                }
                            />
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
                                        color: "white",
                                    },
                                }}
                            >
                                Continuar
                            </Button>
                            <Modal
                                open={openPopup}
                                onClose={handleClosePopup}
                                aria-labelledby="popup-title"
                                aria-describedby="popup-description"
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "50%",
                                        bgcolor: "white",
                                        borderRadius: "10px",
                                        border: "1px solid #000",
                                        minHeight: "200px",
                                        p: 2,
                                    }}
                                >
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={handleClosePopup}
                                        sx={{
                                            position: "absolute",
                                            top: "8px",
                                            right: "15px",
                                            color: "black",
                                        }}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                    <Typography
                                        id="popup-title"
                                        variant="h6"
                                        component="div"
                                        sx={{color: "black", marginBottom: "10px"}}
                                    >
                                        Ya casi estas nuevamente con nosotros!
                                    </Typography>
                                    <Typography id="popup-description" sx={{color: "black"}}>
                                        Para seguir disfrutando de nuestros servicios te hemos enviado un email para
                                        poder obtener tu nueva contraseña.
                                    </Typography>
                                </Box>
                            </Modal>
                            {/* Backdrop filter when modal is open */}
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
                </Box>
            </Box>
        </Box>
    );
}
