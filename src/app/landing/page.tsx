import {Box, Container, Typography} from '@mui/material'

export default function LandingPage() {
    return (
        <Box sx={{
            height: '100%',
            backgroundImage: `url("/images/background-barrio.png")`,
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
        }}>
            <Container sx={{width: "60%"}}>
                <Box sx={{
                    backdropFilter: "blur(10px)",
                    textAlign: 'center',
                    padding: "24px",
                    borderRadius: "10px",
                    border: "1px solid grey"
                }}>
                    <Typography variant="h4" gutterBottom>
                        Entregas Premium, Autonomas y Confiables
                    </Typography>
                    <Typography variant="subtitle1">
                        Ofrecemos un servicio de entregas de máxima calidad con un toque de innovación y seguridad.
                    </Typography>
                    <Typography variant="subtitle1">Nuestra flota de vehículos autónomos garantiza una entrega eficiente
                        y confiable en todo momento.</Typography>
                </Box>
            </Container>
        </Box>
    )
}