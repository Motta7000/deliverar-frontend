import {Box, Container, Grid, Typography, hexToRgb} from '@mui/material'

export default function LandingPage() {
    return (
        <>
            <Box
                sx={{backdropFilter: "blur(10px)", border: "1px solid grey"}}
                position={'absolute'}
                width={'70%'}
                height={'80%'}
                top={'15%'}
                bottom={0}
                left={'20%'}
                padding={10}
                zIndex={2}
            >
                <Typography
                    position={'relative'}
                    variant='h2'
                    color={'white'}
                >
                    Entregas Premium, Autonomas y Confiables
                </Typography>

                <Box
                    height={50}
                />
                <Typography
                    variant='h5'
                    color={'white'}
                >
                    Ofrecemos un servicio de entregas de máxima calidad con un toque de innovación y seguridad.
                </Typography>

                <Box
                    height={10}
                />

                <Typography
                    variant='h5'
                    color={'white'}
                >
                    Nuestra flota de vehículos autónomos garantiza una entrega eficiente y confiable en todo momento.
                </Typography>
            </Box>
            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    width: "100%",
                    height: "100vh",
                    backgroundImage: `url("/images/background-barrio.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat'
                }}
            />
        </>
    )
}


{/* <Box sx={{display: "flex", width:"100%", height: "100vh", backgroundColor:"yellow"}}>
<Box sx={{display: "flex", width:"50%", height: "100vh", backgroundColor:"red", alignItems:"center", justifyContent:"flex-end"}}>
  <Box sx={{display:"flex", flexDirection:"column", width:"50%", height:"150px", backgroundColor:"green",  marginRight: "15px"}}>
    <Typography>Entregas Premium, Autonomas y Confiables</Typography>
    <Typography>Ofrecemos un servicio de entregas de máxima calidad con un toque de innovación y seguridad. Nuestra flota de vehículos autónomos garantiza una entrega eficiente y confiable en todo momento. </Typography>
  </Box>
</Box>

<Box sx={{display: "flex", width:"50%", height: "100vh", backgroundColor:"blue", alignItems:"flex-end", justifyContent:"flex-start"}}>
  <Box sx={{display:"flex", flexDirection:"column", width:"50%", height:"80%", backgroundColor:"green",  marginLeft: "15px"}}>
    <Typography>Entregas Premium, Autonomas y Confiables</Typography>
    <Typography>Ofrecemos un servicio de entregas de máxima calidad con un toque de innovación y seguridad. Nuestra flota de vehículos autónomos garantiza una entrega eficiente y confiable en todo momento. </Typography>
  </Box>
</Box>
</Box> */
}