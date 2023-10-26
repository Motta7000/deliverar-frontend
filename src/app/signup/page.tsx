"use client";
import React, {useState} from "react";
import {
    Typography,
    Box,
    Icon,
    TextField,
    Button,
    MenuItem,
    Select,
} from "@mui/material";
import {signIn, useSession} from "next-auth/react";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import {useRouter} from "next/navigation";
import FileUpload from "@/components/FileUpload";
import {AddUser} from "@/app/services/userDataService";
import {ModalMessage} from "@/components/ModalMessage";

export default function Signup() {
    const router = useRouter();
    const {data: session} = useSession();

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
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalDescription, setModalDescription] = useState<string>("");
    const [fileError, setFileError] = useState<boolean>(false);


    const googleIcon = (
        <Icon
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img
                alt="edit"
                src="/images/google-icon.svg"
                style={{width: "100%", height: "100%"}}
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
    };

    const handleEmailChange = (e: { target: { value: any } }) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };

    const handlePasswordChange = (e: { target: { value: any } }) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        if (!modalTitle.toLowerCase().includes("error")) {
            router.push("/login");
        }
    };

    const validatePassword = (password: string) => {
        if (!password.trim()) {
            return false;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/;
        return !passwordRegex.test(password);
    };

    const onCreate = async () => {
        let newErrors = {
            name: !name,
            email: !isValidEmail(email),
            password: !validatePassword(password),
            userType: userType === "provider" && !selectedFile,
        };
        if (userType === "provider" && !selectedFile) {
            setFileError(true);
        }
        if (newErrors.name || newErrors.email || newErrors.password || newErrors.userType) {
            return setErrors(newErrors);
        }
        if (userType === "client") {
            const res = await AddUser({
                name: name,
                email: email,
                password: password,
                isProvider: false,
            });
            if (res.status === 200) {
                setModalTitle("Bienvenido a DeliverAr!");
                setModalDescription("Te Damos la Bienvenida a Nuestra Plataforma, Tu Cuenta ha Sido Creada con Éxito.");
                setOpenPopup(true)
            } else {
                setModalTitle("Ocurrio un error!");
                setModalDescription("Por favor verifica que el email sea valido e intenta nuevamente. Si el problema persiste, por favor contactanos.");
                setOpenPopup(true);
            }
        } else {
            const res = await AddUser({
                name: name,
                email: email,
                password: password,
                isProvider: true,
            });
            if (res.status === 200) {
                setModalTitle("Ya sos parte de nuestra comunidad!");
                setModalDescription("Tu cuenta fue creada satisfactoriamente!");
                setOpenPopup(true)
            } else {
                setModalTitle("Ocurrio un error!");
                setModalDescription("Por favor verifica que el email sea valido e intenta nuevamente. Si el problema persiste, por favor contactanos.");
                setOpenPopup(true);
            }
        }

    };

    const onLoginWithGoogle = async () => {
        await signIn("google", {callbackUrl: "/dashboard"});
    };

    const handleSelectChange = (event) => {
        setUserType(event.target.value);
    };

    const onSelectFile = (file: React.SetStateAction<File | null>) => {
        setSelectedFile(file);
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
                        minHeight: "300px",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                        gap: "20px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid grey",
                    }}
                >
                    <Typography sx={{fontSize: "40px", color: "white"}}>
                        Entregas Premium, Autonomas y Confiables
                    </Typography>
                    <Typography sx={{color: "white"}}>
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
                    height: "75%",
                    alignSelf: "flex-end",
                    alignItems: "center",
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
                            sx={{display: "flex", flexDirection: "column", width: "80%"}}
                        >
                            <Typography sx={{fontSize: "12px", color: "black"}}>
                                BIENVENIDO NUEVAMENTE
                            </Typography>
                            <Typography sx={{fontSize: "20px", color: "black"}}>
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
                                error={errors.email}
                                helperText={
                                    errors.email ? "Por favor ingresar un email valido." : ""
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
                                        ? "La contraseña debe contener un minimo de 8 caracteres, una mayuscula y un caracter especial."
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
                            {userType === "provider" && <FileUpload onSelectFile={onSelectFile} fileError={fileError}/>}
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
                            <ModalMessage
                                openPopup={openPopup}
                                handleClosePopup={handleClosePopup}
                                title={modalTitle}
                                description={modalDescription}
                            />
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
                        {userType !== "provider" && (
                            <Typography sx={{color: "black"}}>Or</Typography>
                        )}
                    </Divider>

                    {userType !== "provider" && (
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
                    )}
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
                                    "&:hover": {textDecoration: "underline dotted"},
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
