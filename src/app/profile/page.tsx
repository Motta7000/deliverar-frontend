"use client"
import React, {useState, useEffect} from "react";
import {Avatar, Box, Button, TextField, Typography} from '@mui/material'
import VideoPlayer from "@/components/VideoPlayer";
import RobotTracker from "@/components/RobotTracker";
import {useSession} from "next-auth/react";

//Create an array with user data
const userData = {
    id: 1,
    name: "Leanne",
    lastname: "Graham",
    email: "example@gmail.com",
    password: "123456",
    photo: "/images/background-barrio.png",
    createdAt: "29 de Septiembre 2019"
}

export default function Orders() {
    const {data: session} = useSession();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const onChangeName = (event) => {
        setName(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            backgroundColor: "white",
        }}>
            <Box
                sx={{
                    display: "flex",
                    width: "20%",
                    flexDirection: "column",
                    overflow: "auto",
                    padding: "10px",
                    gap: "30px",
                    backgroundColor: "red"
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100vh",
                        alignItems: "center",
                        gap: "20px",
                        padding: "20px 0px"
                    }}>
                    <Box sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "20px"}}>{session?.user?.name}</Typography>
                    </Box>
                    <Avatar src={session?.user?.image} alt="user-avatar" sx={{width: "100px", height: "100px"}}/>
                    <Button sx={{
                        width: "60%",
                        height: "50px",
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
                    }}>Subir Imagen</Button>
                    <Typography>Afiliado desde: {userData.createdAt}</Typography>
                </Box>
            </Box>
            <Box sx={{display: "flex", width: "80%"}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "2px",
                        gap: "2px",
                        backgroundColor: "blue"
                    }}>
                    <Typography>Editar Perfil</Typography>
                    <Typography>Nombre y Apellido</Typography>
                    <TextField
                        label="Nombre y Apellido"
                        variant="outlined"
                        value={name}
                        onChange={onChangeName}
                    />
                    <Typography>Contraseña</Typography>
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                    />
                    <Button>Guardar Cambios</Button>
                    <Button>Eliminar Cuenta</Button>
                </Box>
            </Box>
        </Box>
    )
}