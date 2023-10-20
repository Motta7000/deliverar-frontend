"use client";
import React, { useState, useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const items = [
  {
    title: "Item 1",
    description: "Description 1",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 2",
    description: "Description 2",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 3",
    description: "Description 3",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 4",
    description: "Description 4",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 5",
    description: "Description 5",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 6",
    description: "Description 6",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 7",
    description: "Description 7",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 8",
    description: "Description 8",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 9",
    description: "Description 9",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 10",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 10",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 10",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 10",
    description: "Description 10",
    image: "/images/background-barrio.png",
  },
  {
    title: "Item 10",
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
        height: "100%",
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
          <Typography sx={{ color: "white", fontSize: "40px" }}>50</Typography>
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
          <Typography sx={{ color: "white", fontSize: "40px" }}>50</Typography>
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
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "10px",
            gap: "5px",
            height: "100%",
          }}
        >
          {items.map((item, index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "black", fontSize: "50px" }}>
                  A definir los datos que se muestran de un pedido
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
