import NextLink from 'next/link';

import {AppBar, Toolbar, Typography, Link, Box, Button} from '@mui/material';

export const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display={'flex'} alignItems={'center'}>
                        <Typography variant='h6' color={'white'}> DeliverAr </Typography>
                    </Link>
                </NextLink>

                <Box flex={1}/>

                <Box>
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


            </Toolbar>
        </AppBar>
    )
}
