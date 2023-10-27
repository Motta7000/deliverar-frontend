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
import {ModalMessage} from "@/components/ModalMessage";

export default function Profile() {
    const {user, updateUser} = useContext(AppContext);
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [createdOn, setCreatedOn] = useState<string>("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [errors, setErrors] = useState({
        password: false,
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalDescription, setModalDescription] = useState<string>("");

    useEffect(() => {
        const formattedDate = formatDate(user?.user?.createdOn);
        setName(user?.user?.name)
        setEmail(user?.user?.email)
        setImage(user?.user?.profilePicture)
        setCreatedOn(formattedDate)
    }, [user]);

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

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
    };
    const onChangePassword = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPassword(event.target.value);
    };

    const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            //const imageUrl = URL.createObjectURL(files[0]);
            setImage(event.target.files[0]);
        }
    }

    /*const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);

            // Get file name and type
            const fileName = file.name;
            const fileType = file.type;

            // Create the desired string
            const profilePictureString = `profilePicture=@${fileName};type=${fileType}`;

            // Set the image and the formatted string
            setImage(profilePictureString);
            //setProfilePictureString(profilePictureString);
        }
    };*/

    const handleConfirmDelete = async () => {
        const res = await DeleteUser(email, user?.token);
        if (res.status === 200) {
            await signOut({
                callbackUrl: "/",
            });
            localStorage.clear()
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        }
        handleCloseDeleteModal();
    };

    const onDeleteAccount = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    /*const onSaveChanges = async () => {
        if (image !== user?.user?.profilePicture) {
            const image2 = await ChangeProfileImage(email, user?.token, image);
            console.log("res", image2)
        }
        let newErrors = {
            password: !validatePassword(password),
        };
        console.log("newErrors", newErrors)
        if (newErrors.password || name !== user?.user?.name) {
            return setErrors(newErrors);
        }
        if (name !== user?.user?.name || password !== user?.user?.password) {
            updateUser({...user, user: {...user?.user, name: name, password: password}});
            const res = await UpdateUser({
                email: email,
                name: name,
                password: password,
            }, user?.token)
            if (res.status === 200) {
                setModalTitle("Guardaron con extio!");
                setModalDescription("Los cambios fueron guardados con exito.");
                setOpenPopup(true);
            } else {
                setModalTitle("Ocurrio un error.");
                setModalDescription("Por favor, intente nuevamente. Si el problema persiste, comuníquese con nuestro equipo de soporte.");
                setOpenPopup(true);
            }
            console.log("res", res)
        }
    };*/

    /*const onSaveChanges = async () => {
        let newErrors = {password: ""}
        if (password !== "") {
            newErrors = {
                password: !validatePassword(password)
            };
        }

        if (image !== user?.user?.profilePicture) {
            const image2 = await ChangeProfileImage(email, user?.token, image);
            if (image2.status === 200) {
                updateUser({...user, user: {...user?.user, profilePicture: image}});
            }
            console.log("res de imagen", image2);
        }

        console.log("newErrors", newErrors);

        if (newErrors.password || name !== user?.user?.name ||
            (password !== "" && password !== user?.user?.password)) {
            return setErrors(newErrors);
        }

        let shouldUpdate = false;

        /!*if (
            name !== user?.user?.name ||
            (password !== "" && password !== user?.user?.password)
        ) {
            shouldUpdate = true;
        }*!/
        console.log(name)
        console.log(user?.user?.name)/!*
        if (shouldUpdate) {*!/
        console.log(user.user.name)
        console.log(name)
        const res = await UpdateUser(
            {
                email: email,
                name: name,
                password: password,
            },
            user?.token
        );

        if (res.status === 200) {
            updateUser({
                ...user,
                user: {...user?.user, name: name, password: password},
            });
            setModalTitle("Guardaron con éxito!");
            setModalDescription("Los cambios fueron guardados con éxito.");
            setOpenPopup(true);
        } else {
            setModalTitle("Ocurrió un error.");
            setModalDescription(
                "Por favor, inténtelo nuevamente. Si el problema persiste, comuníquese con nuestro equipo de soporte."
            );
            setOpenPopup(true);
        }

        console.log("res de todo", res);

    };*/

    const onSaveChanges = async () => {
        let newErrors = {password: ""};

        // Check if password is not empty and validate it
        if (password !== "") {
            newErrors = {
                password: !validatePassword(password),
            };
        }

        // Check if the image is different from the current profile picture
        if (image !== user?.user?.profilePicture) {
            const imageResponse = await ChangeProfileImage(email, user?.token, image);

            // Update the profile picture if the upload is successful
            if (imageResponse.status === 200) {
                updateUser({...user, user: {...user?.user, profilePicture: image}});
            }

            console.log("Image upload response", imageResponse);
        }

        console.log("New errors", newErrors);

        // Check if there are errors or if the name, password, or email has changed
        if (
            newErrors.password
        ) {
            return setErrors(newErrors);
        }

        // Check if the name or password has changed
        if (name !== user?.user?.name || password !== "") {
            const updateResponse = await UpdateUser(
                {
                    email: email,
                    name: name,
                    password: password,
                },
                user?.token
            );

            // Update the user data if the update is successful
            if (updateResponse.status === 200) {
                updateUser({
                    ...user,
                    user: {...user?.user, name: name, password: password},
                });

                setModalTitle("Guardaron con éxito!");
                setModalDescription("Los cambios fueron guardados con éxito.");
                setOpenPopup(true);
                setErrors(false)
            } else {
                setModalTitle("Ocurrió un error.");
                setModalDescription(
                    "Por favor, inténtelo nuevamente. Si el problema persiste, comuníquese con nuestro equipo de soporte."
                );
                setOpenPopup(true);
                setErrors(false)
            }

            console.log("Update response", updateResponse);
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
                    backgroundColor: "#4681f4",
                    borderRadius: "10px"
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
                            <Button
                                component="span"
                                sx={{
                                    border: "black 2px solid",
                                    marginTop: "auto",
                                    textTransform: "capitalize",
                                    color: "white",
                                    backgroundColor: "black",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    "&:hover": {
                                        backgroundColor: "black",
                                        color: "white",
                                        border: "none",
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
                        PaperProps={{
                            style: {
                                borderRadius: "10px",
                            },
                        }}
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Typography
                                id="popup-title"
                                variant="h5"
                                sx={{color: "black"}}
                            >
                                {'< '}Confirmar eliminación{' />'}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Typography id="popup-description" varaint="h5" sx={{color: "black"}}>
                                    ¿Está seguro de que desea eliminar su cuenta?
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleCloseDeleteModal}
                                sx={{
                                    color: "white",
                                    backgroundColor: "#4681f4",
                                    textTransform: "capitalize",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "#5783db",
                                        border: "1px solid white",
                                    }
                                }}>
                                Cancelar
                            </Button>
                            <Button onClick={handleConfirmDelete} sx={{
                                color: "white",
                                backgroundColor: "#4681f4",
                                textTransform: "capitalize",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "#5783db",
                                    border: "1px solid white",
                                }
                            }}>
                                Confirmar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
            <Box
                sx={{display: "flex", width: "80%", border: "1px solid #4681f4", padding: "20px", borderRadius: "10px"}}>
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
                            gap: "30px",
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
                                error={errors.password}
                                helperText={
                                    errors.password
                                        ? "La contraseña debe contener un minimo de 8 caracteres, una mayuscula y un caracter especial."
                                        : ""
                                }
                            />
                        </Box>
                        <Box>
                            <Button
                                onClick={onSaveChanges}
                                sx={{
                                    border: "black 2px solid",
                                    marginTop: "auto",
                                    textTransform: "capitalize",
                                    color: "white",
                                    backgroundColor: "black",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    "&:hover": {
                                        backgroundColor: "black",
                                        color: "white",
                                        border: "none",
                                    },
                                }}
                            >
                                Guardar Cambios
                            </Button>
                            <ModalMessage openPopup={openPopup}
                                          handleClosePopup={handleClosePopup}
                                          title={modalTitle}
                                          description={modalDescription}/>
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
                </Box>
            </Box>
        </Box>
    );
}
