// Kelvin Fang


'use client';


import { Box, Typography, LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";


// Define the props for the LoadingScreen component
interface LoadingScreenProps {
    // whether to display the progress bar
    showProgress?: boolean;
    // whether the screen should auto-hide after data loads
    onDataLoaded?: boolean;
}


// Main functional component
export default function LoadingScreen({ showProgress = true, onDataLoaded = true }: LoadingScreenProps) {


    // Ref to control and interact with the video element
    const videoRef = useRef<HTMLVideoElement>(null);


    // Local state to track whether the loading screen is shown
    const [showLoading, setShowLoading] = useState(true);


    // Local state to store loading progress (0–100)
    const [progress, setProgress] = useState(0);


    // Local state to track if the video has finished playing
    const [videoEnded, setVideoEnded] = useState(false);


    // Handle what happens when the video ends
    useEffect(() => {
        if (videoEnded) {
            if (onDataLoaded) {
                setShowLoading(false);
            }
        }
    }, [videoEnded, onDataLoaded]);


    // Set up video playback and progress tracking
    useEffect(() => {
        let progressInterval: NodeJS.Timeout;


        const setupVideo = () => {
            if (videoRef.current) {
                // Mark video as ended when playback completes
                videoRef.current.onended = () => {
                    setVideoEnded(true);
                };


                // Attempt to autoplay the video
                try {
                    videoRef.current.play();
                } catch (e) {
                    console.log("Autoplay prevented:", e);
                }
            }


            // If progress bar should be shown, start updating it regularly
            if (showProgress) {
                const updateInterval = 50;


                progressInterval = setInterval(() => {
                    if (videoRef.current) {
                        const currentTime = videoRef.current.currentTime;
                        const duration = videoRef.current.duration || 3.3;
                        const percentage = (currentTime / duration) * 100;
                        setProgress(Math.min(percentage, 100));
                    }
                }, updateInterval);
            }
        };


        // Kick off the video and progress logic
        setupVideo();


        // Cleanup on component unmount
        return () => {
            clearInterval(progressInterval);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, [showProgress]);


    // If loading is done, render nothing
    if (!showLoading) {
        return null;
    }


    // Render the loading screen
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#121212',
                zIndex: 9999,
                gap: 3
            }}
        >
            {/* Animated loading video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'contain',
                    maxWidth: '90%'
                }}
            >
                <source src="/f1-formule1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>


            {/* Loading text message */}
            <Typography
                variant="h4"
                component="div"
                sx={{
                    fontWeight: 700,
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                Loading Race Data...
            </Typography>


            {/* Optional progress bar display */}
            {showProgress && (
                <Box
                    sx={{
                        width: '80%',
                        maxWidth: '400px',
                        mt: 2
                    }}
                >
                    {/* Progress bar */}
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#e10600',
                                borderRadius: 4
                            }
                        }}
                    />


                    {/* Percentage label below progress bar */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            mt: 1
                        }}
                    >
                        {Math.round(progress)}%
                    </Typography>
                </Box>
            )}
        </Box>
    );
}


// Kelvin Fang

