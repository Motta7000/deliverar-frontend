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
    const {user, addUser} = useContext(AppContext);

    console.log("user", user)

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
                    <Link display={'flex'} alignItems={'center'} href='/'>
                        <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                    </Link>
                )}
                {user?.user ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                marginLeft: "auto"
                            }}>
                            <Button href="/dashboard" variant="text" sx={{
                                color: "black",
                                backgroundColor: "white",
                                textTransform: "capitalize",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "black",
                                    color: "white"
                                }
                            }}>
                                Dashboard
                            </Button>
                            <Divider orientation="vertical" flexItem/>
                            <Button href="/orders" variant="text" sx={{
                                color: "black",
                                backgroundColor: "white",
                                textTransform: "capitalize",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "black",
                                    color: "white"
                                }
                            }}>
                                Mis Pedidos
                            </Button>
                            <Divider orientation="vertical" flexItem/>
                            <Button
                                sx={{
                                    textTransform: "capitalize",
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "white",
                                        color: "black"
                                    }
                                }}
                                href="/profile"
                                type="button">
                                <Box sx={{display: "flex", gap: "10px", justifyContent: "center", alignItems: "center"}}>
                                    <p>{user?.user?.name.length > 20 ? user?.user?.name.slice(0, 10) + '...' : user?.user?.name}</p>
                                    <Avatar
                                        src={user?.user?.image ? user?.user?.image : user?.user?.profilePicture}
                                        alt="user-avatar"/>
                                </Box></Button>
                            <IconButton onClick={async () => {
                                localStorage.clear()
                                document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
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
                                <Link href='/login'>
                                    <Typography variant='h6' color={'white'}>Iniciar Sesion</Typography>
                                </Link>
                            </Box>
                            <Box padding={2}/>
                            <Box>
                                <Link href='/signup'>
                                    <Typography variant='h6' color={'white'}>Registrarse</Typography>
                                </Link>
                            </Box>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    )
}
