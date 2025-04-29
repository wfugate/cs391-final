//William Fugate + Kelvin Fang + Ethan Key
'use client';

import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant= "h1" gutterBottom>
                    F1 Data
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom> {/* h2 component for better SEO */}
                    Explore Formula 1 data
                </Typography>

                {/* buttons */}
                <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/drivers')}
                        sx={{
                            padding: 1,
                            fontSize: '1.2rem',
                            bgcolor: '#e10600',
                            '&:hover': {
                                bgcolor: '#b30500',
                            }
                        }}
                    >
                        F1 Drivers
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/results')}
                        sx={{
                            padding: 1,
                            fontSize: '1.2rem',
                            bgcolor: '#e10600',
                            '&:hover': {
                                bgcolor: '#b30500',
                            }
                        }}
                    >
                        Race Results
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/standings')}
                        sx={{
                            padding: 1,
                            fontSize: '1.2rem',
                            bgcolor: '#e10600',
                            '&:hover': {
                                bgcolor: '#b30500',
                            }
                        }}
                    >
                        Current Standings
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
//William Fugate + Kelvin Fang + Ethan Key