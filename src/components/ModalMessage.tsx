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
                    bgcolor: "white",
                    borderRadius: "10px",
                    border: "1px solid #000",
                    minHeight: "250px",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    alignItems: "center",
                    justifyContent: "center",
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
                <Box sx={{display: "flex", width: "100%"}}>
                    <Typography
                        id="popup-title"
                        variant="h4"
                        sx={{color: "black"}}
                    >
                        {'< '}{title}{' />'}
                    </Typography>
                </Box>
                <Box
                    sx={{display: "flex", width: "90%", backgroundColor: "#4681f4", borderRadius: "10px", padding: "10px"}}>
                    <Typography id="popup-description" varaint="h5" sx={{color: "black"}}>
                        {description}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    )
}