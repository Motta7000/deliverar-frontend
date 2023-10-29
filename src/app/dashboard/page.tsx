"use client";
import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import RobotTracker from "@/components/RobotTracker";
import Paper from "@mui/material/Paper";
import {GetCookie} from "@/app/functions/getCookie";
import {useSession} from "next-auth/react";

const items = [
    {
        title: "ROBOT NRO 55",
        description: "Nro Pedido #4564",
        image: "/images/robot-view.png",
        puntoPartida: 'Local',
        destino: 'Lote 40',
        videoUrl: "https://www.youtube.com/embed/XMMNzhukSTE",
    },
    {
        title: "ROBOT NRO 55",
        description: "Nro Pedido #4564",
        image: "/images/robot-view.png",
        puntoPartida: 'Local',
        destino: 'Lote 43',
        videoUrl: "https://www.youtube.com/embed/uCNwRW3a8G4",
    },
    {
        title: "ROBOT NRO 55",
        description: "Nro Pedido #4564",
        image: "/images/robot-view.png",
        puntoPartida: 'Local',
        destino: 'Lote 32',
        videoUrl: "https://www.youtube.com/embed/XMMNzhukSTE",
    },
    {
        title: "ROBOT NRO 55",
        description: "Nro Pedido #4564",
        image: "/images/robot-view.png",
        puntoPartida: 'Local',
        destino: 'Lote 78',
        videoUrl: "https://www.youtube.com/embed/uCNwRW3a8G4",
    },
    {
        title: "ROBOT NRO 55",
        description: "Nro Pedido #4564",
        image: "/images/robot-view.png",
        puntoPartida: 'Local',
        destino: 'Lote 177',
        videoUrl: "https://www.youtube.com/embed/XMMNzhukSTE",
    },
    {
        title: "ROBOT NRO 55",
        description: "Nro Pedido #4564",
        image: "/images/robot-view.png",
        puntoPartida: 'Local',
        destino: 'Lote 34',
        videoUrl: "https://www.youtube.com/embed/uCNwRW3a8G4",
    },
    {
        title: "ROBOT NRO 55",
        description: "Nro Pedido #4564",
        image: "/images/robot-view.png",
        puntoPartida: 'Local',
        destino: 'Lote 40',
        videoUrl: "https://www.youtube.com/embed/XMMNzhukSTE",
    },
];

export default function Dashboard() {
    const [selectedRobot, setSelectedRobot] = useState<number>(0);
    const {data: session} = useSession()
    console.log("session", session)

    async function CheckCookie() {
        const userCookie = await GetCookie('user');
        const parsedValue = JSON.parse(userCookie?.value);
        return {
            code: parsedValue.code,
            token: parsedValue.token,
            user: parsedValue.user,
        };
    }

    const setCookieValue = async () => {
        const value = await CheckCookie();
        localStorage.setItem("user", JSON.stringify(value));
    };

    useEffect(() => {
        setCookieValue()
    }, []);

    const onSelect = (index: number) => {
        setSelectedRobot(index);
        console.log("Selected robot", index);
    };

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                backgroundColor: "white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "27%",
                    flexDirection: "column",
                    overflow: "auto",
                    padding: "15px",
                    gap: "15px",
                }}
            >
                {items.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "black",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "10px",
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: "grey",
                                    color: "white",
                                },
                            }}
                            onClick={() => onSelect(index)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    mt: "5px",
                                    margin: "12px",
                                }}
                            >
                                <Box paddingTop={2}/>
                                <Typography sx={{color: "white"}}>{item.title} - {item.description}</Typography>
                                <Box paddingTop={2}/>

                                <Box paddingTop={2}/>

                                <Typography sx={{color: "white"}}> Pto Partida: {item.puntoPartida}  </Typography>
                                <Box paddingTop={2}/>

                                <Typography sx={{color: "white"}}> Destino: {item.destino}  </Typography>

                            </Box>
                        </Box>
                    );
                })}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        padding: "15px",
                        gap: "2px",
                        height: "100%",
                    }}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            overflow: "auto",
                            height: "100%",
                        }}
                    >
                        <iframe
                            title={items[selectedRobot].title}
                            src={items[selectedRobot].videoUrl}
                            frameBorder="0"
                            allowFullScreen
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        ></iframe>
                    </Paper>
                    {/*<VideoPlayer videoUrl={items[selectedRobot].videoUrl} title={items[selectedRobot].title}/>*/}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "4vh",
                            gap: "5px",
                            margin: "5px",
                        }}
                    >
                        <Typography sx={{color: "black", whiteSpace: "nowrap"}}>
                            Robot Tracker
                        </Typography>
                        <RobotTracker/>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            padding: "10px",
                            gap: "5px",
                            backgroundColor: "white",
                        }}></Box>

                </Box>

            </Box>

        </Box>

    );
}