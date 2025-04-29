//William Fugate
'use client';

import { Container, Typography, Box} from "@mui/material";
import { useState, useEffect } from "react";
import DriverCard from "./DriverCard";
import LoadingScreen from "./LoadingScreen";
import DriversHeader from "./DriversHeader";
import { Driver } from "../types/ergast";

export default function DriversClient() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDrivers = async () => { //fetch drivers function to use api/drivers
    const MIN_LOADING_TIME = 3000; // 3 seconds minimum loading time
    const start = Date.now();
    
    try {
      //fetch driver data from api route
      const response = await fetch('/api/drivers');

      if (!response.ok) { //ensure response is ok
        throw new Error(`Error: ${response.status}`)
      };

      const data = await response.json();
      setDrivers(data); //set driver data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      
      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;
      
      if (remaining > 0) { //ensure minimum loading time has passed
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => { //useEffect to fetch drivers on mount
    fetchDrivers();
  }, []);

  if (loading) { //show loading screen if currently loading
    return <LoadingScreen />;
  }

  if (error) { //show error message if there is an error
    return (
      <Typography sx={
        {
          color: 'red',
          backgroundColor: 'red',
        }
      }>ERROR!</Typography>
    );
  }
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <DriversHeader /> {/* header for the drivers page */}
      
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
        {drivers.map((driver) => ( //map through drivers to display them in a grid
          <Box key={driver.driver_number}>
            <DriverCard driver={driver} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
//William Fugate