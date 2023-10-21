"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Icon,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";
import FileUpload from "@/components/FileUpload";

export default function Signup() {
  const router = useRouter();
  const { data: session } = useSession();

  const [userType, setUserType] = useState<string>("client");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Object>({
    name: false,
    email: false,
    password: false,
    userType: false,
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const googleIcon = (
    <Icon
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <img
        alt="edit"
        src="/images/google-icon.svg"
        style={{ width: "100%", height: "100%" }}
      />
    </Icon>
  );
  const facebookIcon = (
    <Icon
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <img
        alt="edit"
        src="/images/facebook-icon.svg"
        style={{ width: "100%", height: "100%" }}
      />
    </Icon>
  );

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleNameChange = (e: { target: { value: any } }) => {
    const newName = e.target.value;
    setName(newName);
    setErrors({ ...errors, email: !newName });
  };

  const handleEmailChange = (e: { target: { value: any } }) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors({ ...errors, email: !newEmail });
  };

  const handlePasswordChange = (e: { target: { value: any } }) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors({ ...errors, password: !newPassword });
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    router.push("/login");
  };

  const onCreate = () => {
    if (userType === "provider" && !selectedFile)
      return setErrors({
        ...errors,
        userType: true,
      });
    if (
      !name ||
      !email ||
      !password ||
      password.length < 7 ||
      !isValidEmail(email)
    ) {
      setErrors({
        ...errors,
        name: !name,
        email: !email,
        password: !password,
      });
      setOpenPopup(false);
    } else {
      setErrors({
        name: false,
        email: false,
        password: false,
        userType: false,
      });
      setOpenPopup(true);
    }
  };

  const onLoginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleSelectChange = (event) => {
    setUserType(event.target.value);
  };

  const onSelectFile = (file: React.SetStateAction<File | null>) => {
    setSelectedFile(file);
    console.log("file", file);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundImage: `url("/images/background-barrio.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "50%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            padding: "10px",
            marginRight: "15px",
            gap: "20px",
            backdropFilter: "blur(10px)",
            border: "1px solid grey",
          }}
        >
          <Typography sx={{ fontSize: "40px" }}>
            Entregas Premium, Autonomas y Confiables
          </Typography>
          <Typography>
            Ofrecemos un servicio de entregas de máxima calidad con un toque de
            innovación y seguridad. Nuestra flota de vehículos autónomos
            garantiza una entrega eficiente y confiable en todo momento.{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          height: "95%",
          alignSelf: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "100%",
            backgroundColor: "#FAFAFA",
            marginLeft: "15px",
            borderRadius: "24px 24px 0px 0px",
            alignItems: "center",
            gap: "30px",
            overflow: "auto",
            padding: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "80%" }}
            >
              <Typography sx={{ fontSize: "12px", color: "black" }}>
                BIENVENIDO NUEVAMENTE
              </Typography>
              <Typography sx={{ fontSize: "20px", color: "black" }}>
                Crear Cuenta
              </Typography>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "80%",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={name}
                onChange={handleNameChange}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                error={errors.name}
                helperText={errors.name ? "Por favor ingresar un nombre." : ""}
              />
              <TextField
                value={email}
                onChange={handleEmailChange}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                error={errors.password}
                helperText={
                  errors.password ? "Por favor ingresar un email." : ""
                }
              />
              <TextField
                type="password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                error={errors.password}
                helperText={
                  errors.password
                    ? "La contraseña debe contener un minimo de 8 caracteres"
                    : ""
                }
              />
              <Select
                value={userType}
                onChange={handleSelectChange}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderRadius: "10px",
                  },
                }}
              >
                <MenuItem value="client">Cliente</MenuItem>
                <MenuItem value="provider">Proveedor</MenuItem>
              </Select>
              {userType === "provider" && (
                <FileUpload onSelectFile={onSelectFile} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => onCreate()}
                variant="contained"
                sx={{
                  width: "100%",
                  height: "60px",
                  textTransform: "capitalize",
                  color: "white",
                  backgroundColor: "black",
                  cursor: "pointer",
                  fontSize: "16px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "white",
                  },
                }}
              >
                Registrarse
              </Button>

              {/* Popup component */}
              <Modal
                open={openPopup}
                onClose={handleClosePopup}
                aria-labelledby="popup-title"
                aria-describedby="popup-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    bgcolor: "white",
                    borderRadius: "10px",
                    border: "1px solid #000",
                    minHeight: "200px",
                    p: 2,
                  }}
                >
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClosePopup}
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "15px",
                      color: "black",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    id="popup-title"
                    variant="h6"
                    component="div"
                    sx={{ color: "black", marginBottom: "10px" }}
                  >
                    Ya casi sos parte de nuestra comunidad!
                  </Typography>
                  <Typography id="popup-description" sx={{ color: "black" }}>
                    Para comenzar a disfrutar de nuestros servicios, te enviamos
                    un email de confirmacion para que puedas verificar tu
                    cuenta.
                  </Typography>
                </Box>
              </Modal>
              {/* Backdrop filter when modal is open */}
              {openPopup && (
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backdropFilter: "blur(5px)",
                  }}
                />
              )}
            </Box>
          </Box>
          <Divider
            sx={{
              display: "flex",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
            orientation="horizontal"
          >
            <Typography sx={{ color: "black" }}>Or</Typography>
          </Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                width: "100%",
                textTransform: "capitalize",
                color: "black",
                padding: "10px 20px",
                border: "0.5px solid #616161",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "grey",
                  color: "white",
                },
              }}
              startIcon={googleIcon}
              onClick={() => onLoginWithGoogle()}
            >
              Ingresar Con Google
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "black",
                fontSize: "15px",
              }}
            >
              Ya tenes cuenta?
            </Typography>
            <Link href={"/login"}>
              <Typography
                sx={{
                  marginLeft: "auto",
                  textTransform: "capitalize",
                  color: "black",
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": { textDecoration: "underline dotted" },
                }}
              >
                INICIA SESION
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
