
'use client';

import { Container, Typography, Box, Button } from "@mui/material";
import { Driver } from "../types";
import DriverTelemetryCard from "./DriverTelemetryCard";
import { useRouter } from "next/navigation";

interface TelemetryClientProps {
    drivers: Driver[];
    sessionKey?: number;
}

export default function TelemetryClient({ drivers, sessionKey = 9159 }: TelemetryClientProps) {
    const router = useRouter();

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h2" component="h1" sx={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 700 }}>
                    Driver Telemetry
                </Typography>
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
                    View Driver Profiles
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
                {drivers.map((driver) => (
                    <DriverTelemetryCard
                        key={driver.driver_number}
                        driver={driver}
                        sessionKey={sessionKey}
                    />
                ))}
            </Box>
        </Container>
    );
}