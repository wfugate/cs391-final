
'use client';

import { Card, CardContent, Typography, Box } from "@mui/material";
import { ErgastResult } from "../types/ergast";

interface RaceResultCardProps {
    result: ErgastResult;
}

export default function RaceResultCard({ result }: RaceResultCardProps) {
    const getStatusColor = () => {
        if (result.status === 'Finished') return '#4CAF50';
        if (result.status.startsWith('+')) return '#FFC107';
        return '#F44336';
    };

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {result.position}
                    </Typography>
                    <Typography variant="body2" sx={{ color: getStatusColor() }}>
                        {result.status}
                    </Typography>
                </Box>

                <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
                    {result.Driver.givenName} {result.Driver.familyName}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    #{result.Driver.permanentNumber} | {result.Constructor.name}
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                    mt: 2
                }}>
                    <StatBox
                        title="POINTS"
                        value={result.points}
                        unit="pts"
                        color="#FFD700"
                    />
                    <StatBox
                        title="TIME"
                        value={result.Time?.time || 'N/A'}
                        unit=""
                        color="#4CAF50"
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

interface StatBoxProps {
    title: string;
    value: string;
    unit: string;
    color?: string;
}

function StatBox({ title, value, unit, color }: StatBoxProps) {
    return (
        <Box sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center'
        }}>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, color }}>
                {value}
            </Typography>
            {unit && (
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {unit}
                </Typography>
            )}
        </Box>
    );
}