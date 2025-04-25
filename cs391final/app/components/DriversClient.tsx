'use client';

import { Container, Typography, Box } from "@mui/material";
import DriverCard from "../components/DriverCard";
import { Driver } from "../types";

interface DriversClientProps {
  drivers: Driver[];
}

export default function DriversClient({ drivers }: DriversClientProps) {
  console.log("Drivers data:", drivers);
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ mb: 4, fontFamily: '"Titillium Web", sans-serif', fontWeight: 700 }}>
        F1 Drivers
      </Typography>
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
          <Box key={driver.driver_number}>
            <DriverCard driver={driver} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}