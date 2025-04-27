//william fugate
'use client';

import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    F1 Race Data
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Explore data from the Open F1 API
                </Typography>

                <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/drivers')}
                        sx={{
                            bgcolor: '#e10600',
                            '&:hover': {
                                bgcolor: '#b30500',
                            }
                        }}
                    >
                        View F1 Drivers
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => router.push('/telemetry')}
                        sx={{
                            color: '#e10600',
                            borderColor: '#e10600',
                            '&:hover': {
                                borderColor: '#b30500',
                            }
                        }}
                    >
                        View Live Telemetry
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
//william fugate