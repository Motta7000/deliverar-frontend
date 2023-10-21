"use client";
import React, { useState, useEffect } from "react";
import { Box, Icon, LinearProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

//Tablas
import PedidosDataTable from "../pedidos/data-table";
import { columns } from "../pedidos/columns";
import { pedidos } from "@/pedidos";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const items = [
  {
    key: "001",
    fecha: "10/12/2023",
    title: "Item 1",
    description: "Description 1",
    image: "/images/background-barrio.png",
  },
  {
    key: "002",
    fecha: "10/12/2023",
    title: "Item 2",
    description: "Description 2",
    image: "/images/background-barrio.png",
  },
  {
    key: "003",
    fecha: "10/12/2023",
    title: "Item 3",
    description: "Description 3",
    image: "/images/background-barrio.png",
  },
  {
    key: "004",
    fecha: "10/12/2023",
    title: "Item 4",
    description: "Description 4",
    image: "/images/background-barrio.png",
  },
  {
    key: "005",
    fecha: "10/12/2023",
    title: "Item 5",
    description: "Description 5",
    image: "/images/background-barrio.png",
  },
  {
    key: "006",
    fecha: "10/12/2023",
    title: "Item 6",
    description: "Description 6",
    image: "/images/background-barrio.png",
  },
  {
    key: "007",
    fecha: "10/12/2023",
    title: "Item 7",
    description: "Description 7",
    image: "/images/background-barrio.png",
  },
  {
    key: "008",
    fecha: "10/12/2023",
    title: "Item 8",
    description: "Description 8",
    image: "/images/background-barrio.png",
  },
  {
    key: "009",
    fecha: "10/12/2023",
    title: "Item 9",
    description: "Description 9",
    image: "/images/background-barrio.png",
  },
  {
    key: "010",
    fecha: "10/12/2023",
    title: "Item 10",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    key: "011",
    fecha: "10/12/2023",
    title: "Item 11",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    key: "012",
    fecha: "10/12/2023",
    title: "Item 12",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    key: "013",
    fecha: "10/12/2023",
    title: "Item 13",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    key: "014",
    fecha: "10/12/2023",
    title: "Item 14",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
];

export default function Orders() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "20%",
          flexDirection: "column",
          overflow: "auto",
          padding: "10px",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            backgroundColor: "black",
            borderRadius: "10px",
            padding: "15px 40px",
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "40px" }}>
            Pedidos Realizados
          </Typography>
          <Typography sx={{ color: "white", fontSize: "40px" }}>
            {pedidos.length}
          </Typography>
          <CheckCircleIcon fontSize="large" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            backgroundColor: "black",
            borderRadius: "10px",
            padding: "15px 40px",
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "40px" }}>
            Pedidos en camino
          </Typography>
          <Typography sx={{ color: "white", fontSize: "40px" }}>1</Typography>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "80%",
          alignItems: "center",
          overflow: "auto",
          marginTop: "0%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "15px",
            gap: "5px",
          }}
        >
          <div>
            <PedidosDataTable columns={columns} data={pedidos} />
          </div>
          {/* {items.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{display: "flex", width: "100%", borderRadius: "10px", backgroundColor: "red", alignItems: "center", justifyContent: "flex-start"}}>
                                <Typography> {item.fecha} </Typography>
                                <Typography sx={{color: "black", fontSize: "20px"}}> A definir los datos que se muestran de un pedido</Typography>
                                <Button > A </Button>


                            </Box>
                        )
                    })} */}
        </Box>
      </Box>
    </Box>
  );
}
