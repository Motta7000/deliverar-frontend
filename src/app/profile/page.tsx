"use client";
import React, {useContext, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {signOut, useSession} from "next-auth/react";
import {styled} from "@mui/system";
import {DeleteUser, UpdateUser} from "@/app/services/userDataService";
import MyContext from "@/app/contexts/MyContext";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Profile() {
    const [user, setUser] = useContext(MyContext);
    const {data: session} = useSession();
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    console.log("session", session);
    console.log("user", user);

    useEffect(() => {
        setName(session?.user?.name);
        setPassword("");
        setEmail(session?.user?.email);
        setImage(session?.user?.image);
        setCreatedAt(session?.user?.createdAt);
    }, [session]);

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

    const onChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleConfirmDelete = async () => {
        // Handle account deletion logic here
        const res = await DeleteUser(email, session?.user?.token);
        if (res.status === 200) {
            await signOut({
                callbackUrl: "/"
            })
        }
        handleCloseDeleteModal(); // Close the modal after deletion
    };

    const onDeleteAccount = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };


    const onSaveChanges = async () => {
        const res = await UpdateUser({
            "email": email,
            "name": name,
            "password": password,
            "profilePicture": "image"
        })
        /*if (res) {
            const {data: user} = res;
            if (user) {
                // Setear el nuevo usuario en el contexto
            }
        }*/
    }

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
                    <Box sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "20px", color: "black"}}>
                            {name}
                        </Typography>
                    </Box>
                    <Avatar
                        src={image}
                        alt="user-avatar"
                        sx={{width: "100px", height: "100px"}}
                    />
                    <input accept="image/*" type="file" onChange={onChangeImage}/>
                    {/*<Button
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
                        <VisuallyHiddenInput type="file" onChange={onChangeImage} accept="image/*"/>
                    </Button>*/}
                    <Box
                        sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <Typography sx={{color: "black"}}>
                            Usuario creado:
                        </Typography>
                        <Typography sx={{color: "black"}}>
                            {createdAt}
                        </Typography>
                    </Box>
                    <Button
                        onClick={onDeleteAccount}
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
                    {/* Delete Account Confirmation Modal */}
                    <Dialog
                        open={openDeleteModal}
                        onClose={handleCloseDeleteModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                ¿Está seguro de que desea eliminar su cuenta?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteModal} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                                Confirmar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
            <Box sx={{display: "flex", width: "80%"}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "2px",
                        padding: "10px 0px",
                    }}
                >
                    <Box sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "30px", color: "black"}}>
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
                        <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                            <Typography sx={{fontSize: "20px", color: "black"}}>
                                Nombre y Apellido
                            </Typography>
                            <TextField
                                label="Nombre y Apellido"
                                variant="outlined"
                                value={name}
                                onChange={(event) => onChangeName(event)}
                                sx={{width: "30%"}}
                            />
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                            <Typography sx={{fontSize: "20px", color: "black"}}>
                                Email
                            </Typography>
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(event) => onChangEmail(event)}
                                sx={{width: "30%"}}
                            />
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                            <Typography sx={{fontSize: "20px", color: "black"}}>
                                Contraseña
                            </Typography>
                            <TextField
                                type="password"
                                label="Contraseña"
                                variant="outlined"
                                value={password}
                                onChange={(event) => onChangePassword(event)}
                                sx={{width: "30%"}}
                            />
                        </Box>
                        <Button
                            onClick={onSaveChanges}
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
