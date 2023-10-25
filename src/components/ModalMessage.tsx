// Export ModalMessage Component

import {Box, IconButton, Typography, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export const ModalMessage = ({openPopup, handleClosePopup, title, description}) => {

    return (
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
                    <CloseIcon/>
                </IconButton>
                <Typography
                    id="popup-title"
                    variant="h6"
                    component="div"
                    sx={{color: "black", marginBottom: "10px"}}
                >
                    {title}
                </Typography>
                <Typography id="popup-description" sx={{color: "black"}}>
                    {description}
                </Typography>
            </Box>
        </Modal>
    )
}