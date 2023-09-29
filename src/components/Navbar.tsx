"use client"
import NextLink from 'next/link';
import {AppBar, Toolbar, Typography, Link, Box, Button, Avatar} from '@mui/material';
import {signOut, useSession} from "next-auth/react";

export const Navbar = () => {
    const {data: session} = useSession();

    return (
        <AppBar elevation={0}>
            <Toolbar>
                <Link display={'flex'} alignItems={'center'} href='/'>
                    <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                </Link>
                {session?.user ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                marginLeft: "auto"
                            }}>
                            <p>{session?.user?.name}</p>
                            <Avatar src={session?.user?.image} alt="user-avatar"/>
                            <Button
                                sx={{
                                    textTransform: "capitalize",
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "grey",
                                        color: "white"
                                    }
                                }}
                                onClick={async () => {
                                    await signOut({
                                        callbackUrl: "/"
                                    })
                                }}
                                type="button">Cerrar Sesion</Button>
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
