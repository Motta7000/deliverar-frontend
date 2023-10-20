import React, {useState, ChangeEvent} from 'react';
import {Box, Typography} from "@mui/material";

const FileUpload = ({onSelectFile}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedFile(file)
            onSelectFile(file);
        }
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <Typography sx={{color: "black"}}>Subir PDF para verificar identidad.</Typography>
            <input
                accept=".pdf"
                type="file" onChange={handleFileChange}/>
            {selectedFile && (
                <Box sx={{display: "flex", gap: "5px", alignItems: "flex-start", flexDirection: "column"}}>
                    <Typography sx={{color: "black"}}>
                        Archivo seleccionado:</Typography>
                    <Typography sx={{
                        color: "black",
                        border: "1px solid black",
                        borderRadius: "10px",
                        padding: "3px"
                    }}>{selectedFile.name}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default FileUpload;
