"use client"
import React, {useState} from "react";
import {Box, Typography} from '@mui/material'
import VideoPlayer from "@/components/VideoPlayer";
import RobotTracker from "@/components/RobotTracker";

const items = [
    {
        title: "Item 1",
        description: "Description 1",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 2",
        description: "Description 2",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 3",
        description: "Description 3",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 4",
        description: "Description 4",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 5",
        description: "Description 5",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 6",
        description: "Description 6",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 7",
        description: "Description 7",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 8",
        description: "Description 8",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 9",
        description: "Description 9",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    },
    {
        title: "Item 10",
        description: "Description 10",
        image: "/images/background-barrio.png",
        videoUrl: 'https://www.youtube.com/embed/_140vNR-qMw'
    }
]


export default function Dashboard() {
    const [selectedRobot, setSelectedRobot] = useState<number>(0)

    const onSelect = (index: number) => {
        setSelectedRobot(index)
        console.log("Selected robot", index)
    }

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            backgroundColor: "white",
        }}>
            <Box
                sx={{
                    display: "flex",
                    width: "20%",
                    flexDirection: "column",
                    overflow: "auto",
                    padding: "10px",
                    gap: "10px"
                }}>
                {items.map((item, index) => {
                    return (
                        <Box key={index}
                             sx={{
                                 display: "flex", flexDirection: "column", backgroundColor: "black", alignItems: "center", cursor: "pointer", padding: "10px", borderRadius: "10px", "&:hover": {
                                     backgroundColor: "grey",
                                     color: "white"
                                 }
                             }}
                             onClick={() => onSelect(index)}>
                            <img src={item.image} alt={item.title}
                                 style={{
                                     maxWidth: "100%", maxHeight: "100%", objectFit: "cover"
                                 }}/>
                            <Box
                                sx={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", mt: "5px"}}>
                                <Typography sx={{color: "white"}}>{item.title}</Typography>
                                <Typography sx={{color: "white"}}>{item.description}</Typography>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box sx={{display: "flex", width: "80%", alignItems: "center"}}>
                <Box sx={{display: "flex", flexDirection: "column", width: "100%", padding: "2px", gap: "2px"}}>
                    <VideoPlayer videoUrl={items[selectedRobot].videoUrl} title={items[selectedRobot].title}/>
                    <Box
                        sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "4vh", gap: "5px", margin: "5px"}}>
                        <Typography sx={{color: "black", whiteSpace: "nowrap"}}>Robot Tracker</Typography>
                        <RobotTracker/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}