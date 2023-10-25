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
    Typography,
} from "@mui/material";
import {signOut,} from "next-auth/react";
import {ChangeProfileImage, DeleteUser, UpdateUser} from "@/app/services/userDataService";
import {AppContext} from "@/context/AppContext";

export default function Profile() {
    const {user, updateUser} = useContext(AppContext);
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [createdOn, setCreatedOn] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        const formattedDate = formatDate(user?.user?.createdOn);
        setName(user?.user?.name)
        setEmail(user?.user?.email)
        setImage(user?.user?.profilePicture)
        setCreatedOn(formattedDate)
    }, [user]);

    function formatDate(inputDate: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        if (!inputDate) return
        const date = new Date(inputDate);
        const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

        const [day, month, year] = formattedDate.split(' ');

        const monthsInSpanish = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];

        return `${day} de ${year}`;
    }

    console.log("image", image)

    const onChangeName = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setName(event.target.value);
        updateUser({...user, user: {...user?.user, name: event.target.value}});
    };
    const onChangePassword = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPassword(event.target.value);
    };

    const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const imageUrl = URL.createObjectURL(files[0]);
            setImage(imageUrl);
            updateUser({...user, user: {...user?.user, profilePicture: imageUrl}});
        }
    };

    const handleConfirmDelete = async () => {
        const res = await DeleteUser(email, user?.token);
        if (res.status === 200) {
            await signOut({
                callbackUrl: "/",
            });
        }
        handleCloseDeleteModal();
    };

    const onDeleteAccount = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const onSaveChanges = async () => {
        // Check if the image has changed
        if (image !== user?.user?.profilePicture) {
            const image2 = await ChangeProfileImage(email, user?.token, image);
            console.log("res", image2)
        }

        if (name !== user?.user?.name || password !== user?.user?.password) {
            const res = await UpdateUser({
                email: email,
                name: name,
                password: password,
            }, user?.token)
            console.log("res", res)
        }
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
                    <Box sx={{display: "flex"}}>
                        <Typography sx={{fontSize: "20px", color: "black"}}>
                            {name}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <Avatar alt="Avatar" src={image} sx={{width: 200, height: 200}}/>
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="avatar-upload-input"
                            type="file"
                            onChange={onChangeImage}
                        />
                        <label htmlFor="avatar-upload-input">
                            <Button component="span" sx={{
                                textTransform: "capitalize",
                                color: "white",
                                backgroundColor: "black",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontSize: "16px",
                                "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                },
                            }}>
                                Subir Imagen
                            </Button>
                        </label>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{color: "black"}}>Usuario creado:</Typography>
                        <Typography sx={{color: "black"}}>{createdOn}</Typography>
                    </Box>
                    <Button
                        onClick={onDeleteAccount}
                        sx={{
                            border: "red 2px solid",
                            marginTop: "auto",
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
                        <DialogTitle id="alert-dialog-title">
                            Confirmar eliminación
                        </DialogTitle>
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
                                value={email}
                                variant="outlined"
                                sx={{width: "30%"}}
                                disabled
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
                        <Box>
                            <Button
                                onClick={onSaveChanges}
                                sx={{
                                    marginTop: "20px",
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
        </Box>
    );
}
