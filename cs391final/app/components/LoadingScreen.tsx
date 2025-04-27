//Kelvin Fang

'use client';

import { Box, Typography, LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
    showProgress?: boolean;
    onDataLoaded?: boolean;
}

export default function LoadingScreen({
                                          showProgress = true,
                                          onDataLoaded = true
                                      }: LoadingScreenProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showLoading, setShowLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [videoEnded, setVideoEnded] = useState(false);

    useEffect(() => {
        if (videoEnded) {

            if (onDataLoaded) {
                setShowLoading(false);
            }
        }
    }, [videoEnded, onDataLoaded]);

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;

        const setupVideo = () => {
            if (videoRef.current) {
                videoRef.current.onended = () => {
                    setVideoEnded(true);
                };

                try {
                    videoRef.current.play();
                } catch (e) {
                    console.log("Autoplay prevented:", e);
                }
            }

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

        setupVideo();

        return () => {
            clearInterval(progressInterval);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, [showProgress]);

    if (!showLoading) {
        return null;
    }

    return (
        <Box sx={{
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
        }}>
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                    width: '90%',
                    height: '90%',
                    objectFit: 'contain',
                    maxWidth: '800px'
                }}
            >
                <source src="/f1-formule1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

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

            {showProgress && (
                <Box sx={{
                    width: '80%',
                    maxWidth: '400px',
                    mt: 2
                }}>
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
//Kelvin Fang