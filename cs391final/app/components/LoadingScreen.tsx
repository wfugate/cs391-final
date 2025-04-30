//Kelvin Fang
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
    // Ref to control and interact with the audio element // <-- New comment: Reference to the audio player
    const audioRef = useRef<HTMLAudioElement>(null);

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
             // Ensure audio stops if it hasn't already when hiding // <-- New comment: Ensure audio stops when component hides
            audioRef.current?.pause();
        }
    }, [videoEnded, onDataLoaded]);

    // Set up video playback and progress tracking
    useEffect(() => {
        let progressInterval: NodeJS.Timeout;

        const setupMedia = () => { // Renamed from setupVideo to reflect audio inclusion
            const videoElement = videoRef.current;
            const audioElement = audioRef.current; // <-- New comment: Get reference to audio DOM element

            if (videoElement && audioElement) { // <-- New comment: Check if both media refs are available
                // Mark video as ended when playback completes
                videoElement.onended = () => {
                    setVideoEnded(true);
                    audioElement.pause(); // <-- New comment: Pause audio when video naturally ends
                };

                // Attempt to autoplay the video and audio
                try {
                    // Play video (muted)
                    videoElement.play().catch(e => console.log("Video autoplay prevented:", e));
                     // Play audio // <-- New comment: Play the background audio track
                    audioElement.play().catch(e => console.log("Audio autoplay prevented:", e));
                } catch (e) {
                    console.log("Media autoplay prevented:", e);
                }
            }

            // If progress bar should be shown, start updating it regularly
            if (showProgress && videoElement) {
                const updateInterval = 50; // ms

                progressInterval = setInterval(() => {
                     if (videoElement) { // Check ref inside interval
                        const currentTime = videoElement.currentTime;
                        // Use actual duration if available, fallback otherwise to prevent NaN
                        const duration = videoElement.duration && isFinite(videoElement.duration) ? videoElement.duration : 3.3;
                        const percentage = (currentTime / duration) * 100;
                        setProgress(Math.min(percentage, 100));
                    } else {
                        clearInterval(progressInterval); // Clear if element disappears
                    }
                }, updateInterval);
            }
        };

        // Kick off the media and progress logic slightly delayed
        const timerId = setTimeout(setupMedia, 0);

        // Cleanup on component unmount
        return () => {
             clearTimeout(timerId); // Clear pending setup call
            clearInterval(progressInterval); // Stop progress updates
            if (videoRef.current) {
                videoRef.current.pause(); // Pause video
                videoRef.current.onended = null; // Remove event listener
            }
             if (audioRef.current) { // <-- New comment: Check audio ref before pausing
                audioRef.current.pause(); // <-- New comment: Pause audio on component unmount/cleanup
            }
        };
    }, [showProgress]); // Effect dependencies

    // If loading is done, render nothing
    if (!showLoading) {
        return null;
    }

    // Render the loading screen
    return (
        <Box
            sx={{
                position: 'fixed', // Cover the whole screen
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex', // Use flexbox for centering
                flexDirection: 'column', // Stack items vertically
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                backgroundColor: '#121212', // Dark background
                zIndex: 9999, // Ensure it's on top of other content
                gap: 3 // Space between video, text, and progress bar
            }}
        >
            {/* Animated loading video */}
            <video
                ref={videoRef}
                // autoPlay // Handled by useEffect for better control
                muted // Keep video muted, essential for reliable autoplay in most browsers
                playsInline // Necessary for inline playback on iOS
                preload="auto" // Hint browser to start loading video data
                style={{
                    width: '90%', // Responsive width
                    height: 'auto', // Maintain aspect ratio
                    maxHeight: '70%', // Limit height to leave space
                    objectFit: 'contain', // Ensure entire video is visible without cropping
                    maxWidth: '90%' // Consistent maximum width
                }}
            >
                <source src="/f1-formule1.mp4" type="video/mp4" />
                Your browser does not support the video tag. {/* Fallback text */}
            </video>

            {/* Add the audio element for background music */} {/* <-- New comment */}
            <audio ref={audioRef} preload="auto" loop> {/* `loop` makes the audio repeat */}
                <source src="/song.mp3" type="audio/mpeg" /> {/* Path relative to public folder */}
                Your browser does not support the audio element. {/* Fallback text */}
            </audio>

            {/* Loading text message */}
            <Typography
                variant="h4" // Large text size
                component="div" // Render as a div
                sx={{
                    fontWeight: 700, // Bold font weight
                    color: 'white', // Text color
                    textAlign: 'center' // Center alignment
                }}
            >
                Loading Race Data...
            </Typography>

            {/* Optional progress bar display */}
            {showProgress && (
                <Box
                    sx={{
                        width: '80%', // Width of the progress bar container
                        maxWidth: '400px', // Maximum width
                        mt: 2 // Margin top for spacing
                    }}
                >
                    {/* Progress bar */}
                    <LinearProgress
                        variant="determinate" // Shows actual progress based on value
                        value={progress} // Bind value to the calculated progress state
                        sx={{
                            height: 8, // Thickness of the progress bar
                            borderRadius: 4, // Rounded corners for the bar itself
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Background track color
                            '& .MuiLinearProgress-bar': { // Style the moving part of the bar
                                backgroundColor: '#e10600', // F1 red color
                                borderRadius: 4 // Rounded corners for the progress indicator
                            }
                        }}
                    />

                    {/* Percentage label below progress bar */}
                    <Typography
                        variant="body2" // Smaller text size
                        sx={{
                            color: 'white', // Text color
                            textAlign: 'center', // Center alignment
                            mt: 1 // Margin top for spacing from the bar
                        }}
                    >
                        {Math.round(progress)}% {/* Display the progress percentage */}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

// Kelvin Fang