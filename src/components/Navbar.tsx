"use client"
import React from "react";
import {AppBar, Toolbar, Typography, Link, Box, Button, Avatar, Divider, IconButton} from '@mui/material';
import {signOut, useSession} from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout';

export const Navbar = () => {
    const {data: session} = useSession();

    return (
        <AppBar position="static" elevation={0} >
            <Toolbar
            sx={{
                zIndex:1
            }}
            >
                {session?.user ? (
                    <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                ) : (
                    <Link display={'flex'} alignItems={'center'} href='/'>
                        <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                    </Link>
                )}
                {session?.user ? (
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
                                    <p>{session?.user?.name}</p>
                                    <Avatar src={session?.user?.image} alt="user-avatar"/>
                                </Box></Button>
                            <IconButton onClick={async () => {
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
