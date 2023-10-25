import React, {useState, ChangeEvent} from "react";
import {Box, Button, Typography} from "@mui/material";

const FileUpload = ({onSelectFile, fileError}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedFile(file);
            onSelectFile(file);
        }
    };
    
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <Typography sx={{color: "black"}}>
                Subir PDF para verificar identidad.
            </Typography>
            <label htmlFor="file-upload-input">
                <Button
                    component="span"
                    fullWidth
                    sx={{
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
                    Subir PDF
                </Button>
                <input
                    type="file"
                    id="file-upload-input"
                    style={{display: "none"}}
                    accept=".pdf"
                    onChange={handleFileChange}
                />
            </label>
            {selectedFile && (
                <Box
                    sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "flex-start",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={{color: "black"}}>Archivo seleccionado:</Typography>
                    <Typography
                        sx={{
                            color: "black",
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "3px",
                        }}
                    >
                        {selectedFile.name}
                    </Typography>
                </Box>
            )}
            {fileError && (
                <Typography sx={{color: "red"}}>
                    Por favor, selecciona un archivo.
                </Typography>
            )}
        </Box>
    );
};

export default FileUpload;
