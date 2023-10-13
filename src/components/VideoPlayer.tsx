import React from 'react';
import Paper from '@mui/material/Paper';

export default function VideoPlayer(videoUrl: string, title: string) {
    return (
        <Paper sx={{
            display: 'flex',
            overflow: 'auto',
        }}>
            <iframe
                title={title}
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
                style={{
                    width: "100%",
                    height: "95vh"
                }}
            ></iframe>
        </Paper>
    );
};