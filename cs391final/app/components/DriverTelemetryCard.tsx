
'use client';

import { Card, CardContent, Typography, Box, CardMedia, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Driver } from "../types";

interface CarData {
    rpm?: number;
    drs?: number;
    speed?: number;
    throttle?: number;
    date?: string;
}

interface DriverTelemetryCardProps {
    driver: Driver;
    sessionKey: number;
}

export default function DriverTelemetryCard({ driver, sessionKey }: DriverTelemetryCardProps) {
    const [carData, setCarData] = useState<CarData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.openf1.org/v1/car_data?driver_number=${driver.driver_number}&session_key=${sessionKey}`
                );

                if (!response.ok) {
                    throw new Error(`Error fetching car data: ${response.status}`);
                }

                const data = await response.json();
                if (data.length > 0) {
                    setCarData(data[data.length - 1]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, [driver.driver_number, sessionKey]);

    const getDRSStatus = () => {
        if (carData?.drs === undefined) return 'N/A';
        return carData.drs > 0 ? 'ACTIVE' : 'INACTIVE';
    };

    const getDRSColor = () => {
        if (carData?.drs === undefined) return 'text.secondary';
        return carData.drs > 0 ? 'success.main' : 'error.main';
    };

    if (loading) {
        return (
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Card>
        );
    }

    if (error) {
        return (
            <Card sx={{ height: '100%', p: 2 }}>
                <Typography color="error">{error}</Typography>
            </Card>
        );
    }

    return (
        <Card sx={{
            height: '100%',
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {driver.headshot_url && (
                        <CardMedia
                            component="img"
                            image={driver.headshot_url}
                            alt={driver.full_name}
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                border: '2px solid white',
                                marginRight: 2
                            }}
                        />
                    )}
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {driver.name_acronym}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            #{driver.driver_number} | {driver.team_name}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                    mt: 2
                }}>
                    {/* RPM */}
                    <StatBox
                        title="ENGINE RPM"
                        value={carData?.rpm ? Math.round(carData.rpm).toLocaleString() : '--'}
                        unit="RPM"
                        color="#FF5722"
                    />

                    {/* Speed */}
                    <StatBox
                        title="SPEED"
                        value={carData?.speed ? Math.round(carData.speed).toString() : '--'}
                        unit="KM/H"
                        color="#4CAF50"
                    />

                    {/* Throttle */}
                    <StatBox
                        title="THROTTLE"
                        value={carData?.throttle ? Math.round(carData.throttle).toString() : '--'}
                        unit="%"
                        color="#2196F3"
                    />

                    {/* DRS */}
                    <Box sx={{
                        gridColumn: '1 / -1',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        padding: '12px',
                        textAlign: 'center'
                    }}>
                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
                            DRS STATUS
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: getDRSColor()
                            }}
                        >
                            {getDRSStatus()}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

function StatBox({ title, value, unit, color }: { title: string; value: string; unit: string; color?: string }) {
    return (
        <Box sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center'
        }}>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
                {title}
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    color: color || 'primary.main'
                }}
            >
                {value}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {unit}
            </Typography>
        </Box>
    );
}