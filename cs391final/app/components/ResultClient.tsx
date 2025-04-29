//Kelvin Fang
'use client';

import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RaceResultCard from "./RaceResultCard";
import { Race } from "../types/ergast";
import LoadingScreen from "./LoadingScreen";

export default function ResultsClient() {
    const router = useRouter();
    const [race, setRace] = useState<Race | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            const MIN_LOADING_TIME = 3000;
            const start = Date.now();

            try {
                const response = await fetch('/api/results');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                if (data.MRData?.RaceTable?.Races?.length > 0) {
                    setRace(data.MRData.RaceTable.Races[0]);
                } else {
                    throw new Error('No race data found');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                const elapsed = Date.now() - start;
                const remaining = MIN_LOADING_TIME - elapsed;
                if (remaining > 0) {
                    setTimeout(() => setLoading(false), remaining);
                } else {
                    setLoading(false);
                }
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography color="error" align="center" sx={{ mt: 4 }}>
                    {error}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/')}
                        sx={{
                            bgcolor: '#e10600',
                            '&:hover': {
                                bgcolor: '#b30500',
                            }
                        }}
                    >
                        Return Home
                    </Button>
                </Box>
            </Container>
        );
    }

    if (!race) {
        return null;
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h2" component="h1" sx={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 700 }}>
                    {race.raceName} Results
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => router.push('/')}
                    sx={{
                        bgcolor: '#e10600',
                        '&:hover': {
                            bgcolor: '#b30500',
                        }
                    }}
                >
                    Return Home
                </Button>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)'
                },
                gap: 3
            }}>
                {race.Results.map((result) => (
                    <RaceResultCard key={result.position} result={result} />
                ))}
            </Box>
        </Container>
    );
}
//Kelvin Fang
