"use client"
import NextLink from 'next/link';
import {AppBar, Toolbar, Typography, Link, Box, Button, Avatar} from '@mui/material';
import {signOut, useSession} from "next-auth/react";

export const Navbar = () => {
    const {data: session} = useSession();

    return (
        <AppBar elevation={0}>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display={'flex'} alignItems={'center'}>
                        <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                    </Link>
                </NextLink>
                {session?.user ? (
                        <Box
                            sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginLeft: "auto"}}>
                            <p>{session?.user?.name}</p>
                            <Avatar src={session?.user?.image} alt=""/>
                            <Button
                                sx={{textTransform: "capitalize", backgroundColor: "grey", "&:hover": {backgroundColor: "red"}}}
                                onClick={async () => {
                                    await signOut({
                                        callbackUrl: "/"
                                    })
                                }}
                                type="button">Logout</Button>
                        </Box>
                    ) :
                    (
                        <>
                            <Box
                                sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginLeft: "auto"}}>
                                <NextLink href='/login'>
                                    <Link>
                                        <Typography variant='h6' color={'white'}> Login </Typography>
                                    </Link>
                                </NextLink>
                            </Box>
                            <Box padding={2}/>
                            <Box>
                                <NextLink href='/signup'>
                                    <Link>
                                        <Typography variant='h6' color={'white'}> Register </Typography>
                                    </Link>
                                </NextLink>
                            </Box>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    )
}
