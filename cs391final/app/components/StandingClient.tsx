// Ethan Key
// component to display standings of current f1 season

'use client';

import { Container, Typography, Box, Button, Stack, Card, CardContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

//types for api data
type DriverStanding = {
    position: string;
    points: string;
    wins: string;
    Driver: {
        givenName: string;
        familyName: string;
    };
    Constructors: { name: string }[];
};

type ConstructorStanding = {
    position: string;
    points: string;
    wins: string;
    Constructor: {
        name: string;
        nationality: string;
    };
};

export default function StandingsClient() {
    const router = useRouter();
    const [driverStandings, setDriverStandings] = useState<DriverStanding[]>([]);
    const [constructorStandings, setConstructorStandings] = useState<ConstructorStanding[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<'drivers' | 'constructors'>('drivers');

    //api call
    const fetchDriverStandings = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/driver');
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            const standingsList = data.MRData.StandingsTable.StandingsLists[0];
            setDriverStandings(standingsList.DriverStandings || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    //api call
    const fetchConstructorStandings = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/constructor');
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            const standingsList = data.MRData.StandingsTable.StandingsLists[0];
            setConstructorStandings(standingsList.ConstructorStandings || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    //useEffect hook to load driver standings each time the page is loaded 
    useEffect(() => {
        const MIN_LOADING_TIME = 3300;
        setLoading(true);
    
        const load = async () => {
            const delayPromise = new Promise((res) => setTimeout(res, MIN_LOADING_TIME));
    
            try {
                const response = await fetch('/api/driver');
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                const standingsList = data.MRData.StandingsTable.StandingsLists[0];
                setDriverStandings(standingsList.DriverStandings || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
    
            await delayPromise;
            setLoading(false); // only ends after both data + delay
        };
    
        load();
    }, []);

    //toggle logic to set view
    const handleToggleView = async (newView: 'drivers' | 'constructors') => {
        if (newView === view) return;
        setView(newView);
        if (newView === 'drivers') {
            fetchDriverStandings();
        } else {
            fetchConstructorStandings();
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    //error handling
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
                             
                            bgcolor: '#e10600', '&:hover': { bgcolor: '#b30500' } }}
                    >
                        Return Home
                    </Button>
                </Box>
            </Container>
        );
    }

    //page layout
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h2" component="h1" sx={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 700 }}>
                    {view === 'drivers' ? 'Current Season Driver Standings' : 'Current Season Constructor Standings'}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => router.push('/')}
                    sx={{ 
                        padding: 1,
            fontSize: '1.2rem',
            bgcolor: '#e10600', '&:hover': { bgcolor: '#b30500' } }}
                >
                    Return Home
                </Button>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                <Button
                    variant={view === 'drivers' ? 'contained' : 'outlined'}
                    onClick={() => handleToggleView('drivers')}
                    sx={{
                        bgcolor: view === 'drivers' ? '#e10600' : undefined,
                        color: view === 'drivers' ? '#fff' : '#e10600',
                        borderColor: '#e10600',
                        '&:hover': { bgcolor: '#b30500', borderColor: '#b30500' },
                    }}
                >
                    Driver Standings
                </Button>
                <Button
                    variant={view === 'constructors' ? 'contained' : 'outlined'}
                    onClick={() => handleToggleView('constructors')}
                    sx={{
                        bgcolor: view === 'constructors' ? '#e10600' : undefined,
                        color: view === 'constructors' ? '#fff' : '#e10600',
                        borderColor: '#e10600',
                        '&:hover': { bgcolor: '#b30500', borderColor: '#b30500' },
                    }}
                >
                    Constructor Standings
                </Button>
            </Stack>

            
            <Box sx={{  // grid for standings data
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)'
                },
                gap: 3
            }}>
                {view === 'drivers' ? ( //conditional statement depending on currently selected standings type
                    driverStandings.map((standing) => (
                        <Card key={standing.position} sx={{
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            }
                        }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {standing.position}. {standing.Driver.givenName} {standing.Driver.familyName}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, opacity: 0.85 }}>
                                    Points: <strong>{standing.points}</strong>
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    Wins: <strong>{standing.wins}</strong>
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    Team: <strong>{standing.Constructors[0]?.name}</strong>
                                </Typography>
                            </CardContent>
                        </Card>
                        
                    ))
                ) : (
                    constructorStandings.map((standing) => (
                        <Card key={standing.position} sx={{
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            }
                        }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {standing.position}. {standing.Constructor.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, opacity: 0.85 }}>
                                    Points: <strong>{standing.points}</strong>
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    Wins: <strong>{standing.wins}</strong>
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                                    Nationality: <strong>{standing.Constructor.nationality}</strong>
                                </Typography>
                            </CardContent>
                        </Card>
                        
                    ))
                )}
            </Box>
        </Container>
    );
}
