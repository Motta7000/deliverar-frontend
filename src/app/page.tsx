import { Box, Typography } from '@mui/material'
import Login from "@/app/login/page";

export default function Home() {
  return (
    <Box sx={{display: "flex", width:"100%", height: "100vh", backgroundColor:"yellow"}}>
      <Box sx={{display: "flex", width:"50%", height: "100vh", backgroundColor:"red", alignItems:"center", justifyContent:"flex-end"}}>
        <Box sx={{display:"flex", flexDirection:"column", width:"50%", height:"150px", backgroundColor:"green",  marginRight: "15px"}}>
          <Typography>Entregas Premium, Autonomas y Confiables</Typography>
          <Typography>Ofrecemos un servicio de entregas de máxima calidad con un toque de innovación y seguridad. Nuestra flota de vehículos autónomos garantiza una entrega eficiente y confiable en todo momento. </Typography>
        </Box>
      </Box>
      <Box sx={{display: "flex", width:"50%", height: "100vh", backgroundColor:"blue", alignItems:"flex-end", justifyContent:"flex-start"}}>
        <Box sx={{display:"flex", flexDirection:"column", width:"50%", height:"80%", backgroundColor:"green",  marginLeft: "15px"}}>
            <Login/>
        </Box>
      </Box>
    </Box>
  )
}
