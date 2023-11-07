"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import RobotTracker from "@/components/RobotTracker";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
import videojs from 'video.js';

const AWS = require('aws-sdk');
//const fs = require('fs');
import credentials from '../../../credentials.json'

console.log("****CREDENTIALS*******")
console.log(credentials)
//const credentials = JSON.parse(fs.readFileSync('credentials.json'))
// Set your AWS credentials and region
AWS.config.update({ region: credentials.region, accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey });
console.log("****AWS*******")
console.log(AWS)
// Create a Kinesis Video Streams client
const kinesisvideo = new AWS.KinesisVideo();
console.log("************* KINESIS VIDEO **********")
console.log(kinesisvideo)
var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia({ region: credentials.region, accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey });

// Specify the stream name
const streamName = credentials.streamName;
var videoIframeUrl: string | undefined;
// Get a stream endpoint
/*
export async function fetchStream() {

    kinesisvideo.getDataEndpoint({ StreamName: streamName, APIName: 'GET_HLS_STREAMING_SESSION_URL' }, (err, response) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Data endpoint: ' + response.DataEndpoint);
            kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);
            console.log("******* kinesisVideoArchivedContent.endpoint")
            console.log(kinesisVideoArchivedContent.endpoint);
            kinesisVideoArchivedContent.getHLSStreamingSessionURL({ StreamName: streamName }, function (err, response) {
                if (err) { return console.error(err); }
                console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);
                videoIframeUrl = response.HLSStreamingSessionURL;

                // The VideoJS setup code now goes here
                var playerElement = document.getElementById('videojss');
                playerElement.style.display = 'block';

                var player = videojs('videojss');
                console.log('Created VideoJS Player');
                console.log(response.HLSStreamingSessionURL)
                player.src({
                    src: response.HLSStreamingSessionURL,
                    type: 'application/x-mpegURL'
                });
                console.log('Set player source');

                player.play();
                console.log('Starting playback');
            });
        }
    });

}
*/
/*
async function createItems() {

    const items = [
        {
            title: "Item 1",
            description: "Description 1",
            image: "/images/background-barrio.png",
            videoUrl: videoIframeUrl,
        },
        {
            title: "Item 2",
            description: "Description 2",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/DRNXWMcgVbs",
        },
        {
            title: "Item 3",
            description: "Description 3",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
        {
            title: "Item 4",
            description: "Description 4",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
        {
            title: "Item 5",
            description: "Description 5",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
        {
            title: "Item 6",
            description: "Description 6",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
        {
            title: "Item 7",
            description: "Description 7",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
        {
            title: "Item 8",
            description: "Description 8",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
        {
            title: "Item 9",
            description: "Description 9",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
        {
            title: "Item 10",
            description: "Description 10",
            image: "/images/background-barrio.png",
            videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
        },
    ];
}
createItems()
*/


export default function Dashboard() {
    const { data: session } = useSession()
    const [selectedRobot, setSelectedRobot] = useState<number>(0);
    const [items, setItems] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const onSelect = (index: number) => {
        setSelectedRobot(index);
        console.log("Selected robot", index);
    };
    useEffect(() => {
        getData();

        // Your Video.js initialization code goes here


    }, []);
    const getData = () => {

        kinesisvideo.getDataEndpoint({ StreamName: streamName, APIName: 'GET_HLS_STREAMING_SESSION_URL' }, (err, response) => {
            if (err) {
                console.error('Error:', err);
                setItems([
                    {
                        title: "Item 1",
                        description: "Description 1",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/DRNXWMcgVbs",
                        id: 'real-time'
                    },
                    {
                        title: "Item 2",
                        description: "Description 2",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/DRNXWMcgVbs",
                    },
                    {
                        title: "Item 3",
                        description: "Description 3",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                    {
                        title: "Item 4",
                        description: "Description 4",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                    {
                        title: "Item 5",
                        description: "Description 5",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                    {
                        title: "Item 6",
                        description: "Description 6",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                    {
                        title: "Item 7",
                        description: "Description 7",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                    {
                        title: "Item 8",
                        description: "Description 8",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                    {
                        title: "Item 9",
                        description: "Description 9",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                    {
                        title: "Item 10",
                        description: "Description 10",
                        image: "/images/background-barrio.png",
                        videoUrl: "https://www.youtube.com/embed/_140vNR-qMw",
                    },
                ])
            } else {
                console.log('Data endpoint: ' + response.DataEndpoint);
                kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);
                console.log("******* kinesisVideoArchivedContent.endpoint")
                console.log(kinesisVideoArchivedContent.endpoint);
                kinesisVideoArchivedContent.getHLSStreamingSessionURL({ StreamName: streamName }, function (err, response) {
                    if (err) { return console.error(err); }
                    console.log("************RESPONSE***")
                    console.log(response)
                    console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);
                    videoIframeUrl = response.HLSStreamingSessionURL;

                    // The VideoJS setup code now goes here
                    //  var playerElement = document.getElementById('real-time');
                    //  playerElement.style.display = 'block';

                    //var player = videojs('videojss');
                    console.log('Created VideoJS Player');
                    console.log(response.HLSStreamingSessionURL)
                    /* player.src({
                         src: response.HLSStreamingSessionURL,
                         type: 'application/x-mpegURL'
                     });
                     */ // image: "/images/background-barrio.png",
                    setItems([
                        {
                            title: "Item 1",
                            description: "Description 1",
                            image: "/images/background-barrio.png",
                            videoUrl: videoIframeUrl,
                            id: 'real-time'
                        },
                        {
                            title: "Item 2",
                            description: "Description 2",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 3",
                            description: "Description 3",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 4",
                            description: "Description 4",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 5",
                            description: "Description 5",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 6",
                            description: "Description 6",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 7",
                            description: "Description 7",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 8",
                            description: "Description 8",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 9",
                            description: "Description 9",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                        {
                            title: "Item 10",
                            description: "Description 10",
                            image: "/images/background-barrio.png",
                            videoUrl: "",
                        },
                    ])
                    try {
                        setLoading(false);
                        var player = videojs('real-time');
                        console.log("*********PLAYER**********")
                        console.log(player)
                        player.play()

                    }
                    catch (e) {
                        console.log(e)
                    }

                });

            }
        });

    }

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
                    width: "20%",
                    flexDirection: "column",
                    overflow: "auto",
                    padding: "10px",
                    gap: "10px",
                    zIndex:1
                }}
            >
                {items != null && items.map((item, index) => {
                    console.log(items)
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
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mt: "5px",
                                }}
                            >
                                <Typography sx={{ color: "white" }}>{item.title}</Typography>
                                <Typography sx={{ color: "white" }}>
                                    {item.description}
                                </Typography>
                            </Box>

                        </Box>
                    );

                })}
            </Box>
            {items != null &&
                <Box
                    sx={{
                        display: "flex",
                        width: "80%",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            padding: "2px",
                            gap: "2px",
                            height: "100%",
                        }}
                    >
                        <Paper
                            sx={{
                                display: "flex",
                                overflow: "auto",
                                height: "100%",
                                width: "100%"
                            }}
                        >
                            <div style={{ overflow: "hidden",display:"flex"}}>

                                <video
                                    id={items[selectedRobot].id}
                                    muted="muted"
                                    controls
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <source src={items[selectedRobot].videoUrl} type="application/x-mpegURL"></source>
                                </video>
                            </div>

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
                            <Typography sx={{ color: "black", whiteSpace: "nowrap" }}>
                                Robot Tracker
                            </Typography>
                            <RobotTracker />
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    );
}
