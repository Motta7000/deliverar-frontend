"use client";
import React, { useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

//Create an array with user data
const userData = {
  id: 1,
  name: "Leanne",
  lastname: "Graham",
  email: "example@gmail.com",
  password: "123456",
  photo: "/images/background-barrio.png",
  createdAt: "29 de Septiembre 2019",
};

export default function Orders() {
  const { data: session } = useSession();
  const [name, setName] = useState<string | undefined>(
    session?.user?.name ? session?.user?.name : ""
  );
  const [password, setPassword] = useState<string | undefined>(
    session?.user?.password ? session?.user?.password : ""
  );
  const [email, setEmail] = useState<string | undefined>(
    session?.user?.email ? session?.user?.email : ""
  );
  const onChangeName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };
  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };
  const onChangEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "10px",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "20%",
          flexDirection: "column",
          overflow: "auto",
          padding: "10px",
          gap: "30px",
          backgroundColor: "grey",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            alignItems: "center",
            gap: "20px",
            padding: "20px 0px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: "20px", color: "black" }}>
              {session?.user?.name}
            </Typography>
          </Box>
          <Avatar
            src={session?.user?.image}
            alt="user-avatar"
            sx={{ width: "100px", height: "100px" }}
          />
          <Button
            sx={{
              width: "60%",
              height: "50px",
              textTransform: "capitalize",
              color: "white",
              backgroundColor: "black",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "grey",
                color: "white",
              },
            }}
          >
            Subir Imagen
          </Button>
          <Typography sx={{ color: "black" }}>
            Usuario creado: {userData.createdAt}
          </Typography>
          <Button
            sx={{
              border: "red 2px solid",
              marginTop: "auto",
              width: "60%",
              height: "50px",
              textTransform: "capitalize",
              color: "white",
              backgroundColor: "black",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
                border: "none",
              },
            }}
          >
            Eliminar Cuenta
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", width: "80%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "2px",
            padding: "10px 0px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: "30px", color: "black" }}>
              Editar Perfil
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px",
              height: "100vh",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography sx={{ fontSize: "20px", color: "black" }}>
                Nombre y Apellido
              </Typography>
              <TextField
                label="Nombre y Apellido"
                variant="outlined"
                value={name}
                onChange={(event) => onChangeName(event)}
                sx={{ width: "30%" }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography sx={{ fontSize: "20px", color: "black" }}>
                Email
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => onChangEmail(event)}
                sx={{ width: "30%" }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography sx={{ fontSize: "20px", color: "black" }}>
                Contraseña
              </Typography>
              <TextField
                type="password"
                label="Contraseña"
                variant="outlined"
                value={password}
                onChange={(event) => onChangePassword(event)}
                sx={{ width: "30%" }}
              />
            </Box>
            <Button
              sx={{
                marginTop: "20px",
                width: "150px",
                height: "50px",
                textTransform: "capitalize",
                color: "white",
                backgroundColor: "black",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "grey",
                  color: "white",
                },
              }}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
