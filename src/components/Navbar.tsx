"use client"
import React, {useEffect, useContext} from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Link,
    Box,
    Button,
    Avatar,
    Divider,
    IconButton,
} from '@mui/material';
import {signOut} from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';
import {AppContext} from "@/context/AppContext";

export const Navbar = () => {
    const {user, addUser, updateUser} = useContext(AppContext);

    console.log("user", user)

    // Chequea la data del usuario hasta que la obtiene y no busca mas.
    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;

        const checkLocalStorage = () => {
            const storedUserData = localStorage.getItem("user");
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                addUser(parsedUserData);
                clearInterval(intervalId);
            }
        };
        checkLocalStorage();
        intervalId = setInterval(checkLocalStorage, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                {user?.user ? (
                    <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                ) : (
                    <Button variant="text"
                            sx={{
                                color: "white",
                                backgroundColor: "#4681f4",
                                textTransform: "capitalize",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#5783db",
                                    border: "1px solid white",
                                }
                            }}
                            href="/">
                        <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                    </Button>
                )}
                {user?.user ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "stretch",
                                gap: "10px",
                                marginLeft: "auto"
                            }}>
                            <Button href="/dashboard" variant='h6' sx={{
                                color: "white",
                                backgroundColor: "#4681f4",
                                textTransform: "capitalize",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#5783db",
                                    border: "1px solid white",
                                }
                            }}>
                                Dashboard
                            </Button>
                            <Divider orientation="vertical" flexItem/>
                            <Button href="/orders" variant='h6' sx={{
                                color: "white",
                                backgroundColor: "#4681f4",
                                textTransform: "capitalize",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#5783db",
                                    border: "1px solid white",
                                }
                            }}>
                                Mis Pedidos
                            </Button>
                            <Divider orientation="vertical" flexItem/>
                            <Button variant='h6'
                                    sx={{
                                        color: "white",
                                        backgroundColor: "#4681f4",
                                        textTransform: "capitalize",
                                        borderRadius: "10px",
                                        "&:hover": {
                                            backgroundColor: "#5783db",
                                            border: "1px solid white",
                                        }
                                    }}
                                    href="/profile">
                                <Box sx={{display: "flex", gap: "10px", justifyContent: "center", alignItems: "center"}}>
                                    <p>{user?.user?.name.length > 20 ? user?.user?.name.slice(0, 10) + '...' : user?.user?.name}</p>
                                    <Avatar
                                        src={user?.user?.image ? user?.user?.image : user?.user?.profilePicture}
                                        alt="user-avatar"/>
                                </Box>
                            </Button>
                            <IconButton
                                sx={{
                                    color: "white",
                                    textTransform: "capitalize",
                                    borderRadius: "10px",
                                }}
                                onClick={async () => {
                                    localStorage.clear()
                                    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                                    updateUser(null);
                                    await signOut({
                                        callbackUrl: "/"
                                    })
                                }}>
                                <LogoutIcon/>
                            </IconButton>
                        </Box>
                    ) :
                    (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginLeft: "auto"
                                }}>
                                <Button variant="text"
                                        sx={{
                                            color: "white",
                                            backgroundColor: "#4681f4",
                                            textTransform: "capitalize",
                                            borderRadius: "10px",
                                            "&:hover": {
                                                backgroundColor: "#5783db",
                                                border: "1px solid white",
                                            }
                                        }}
                                        href="/login">
                                    <Typography variant='h6' color={'white'}>Iniciar Sesion</Typography>
                                </Button>
                            </Box>
                            <Box padding={2}/>
                            <Box>
                                <Button variant="text"
                                        sx={{
                                            color: "white",
                                            backgroundColor: "#4681f4",
                                            textTransform: "capitalize",
                                            borderRadius: "10px",
                                            "&:hover": {
                                                backgroundColor: "#5783db",
                                                border: "1px solid white",
                                            }
                                        }}
                                        href="/signup">
                                    <Typography variant='h6' color={'white'}>Registrarse</Typography>
                                </Button>
                            </Box>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    )
}
