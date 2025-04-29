//William Fugate
'use client';

import { Container, Typography, Box} from "@mui/material";
import { useState, useEffect } from "react";
import DriverCard from "./DriverCard";
import LoadingScreen from "./LoadingScreen";
import F1Header from "./F1Header";
import { Driver } from "../types/ergast";

export default function DriversClient() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRequestPending, setIsRequestPending] = useState(false);

  const fetchDrivers = async () => {
    //return early if a request is already in progress
    if (isRequestPending) return;
    
    const MIN_LOADING_TIME = 3000; //3 seconds minimum loading time
    const start = Date.now();
    
    try {
      setIsRequestPending(true);
      //fetch driver data from api route
      const response = await fetch('/api/drivers', {
        cache: 'no-store'
      });

      if (!response.ok) { //ensure response is ok
        throw new Error(`Error: ${response.status}`)
      };

      const data = await response.json();
      setDrivers(data); //set driver data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsRequestPending(false);
      
      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;
      
      if (remaining > 0) { //ensure minimum loading time has passed
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    //small timeout to prevent double fetching (rate limiting issue)
    const timeoutId = setTimeout(() => {
      fetchDrivers();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) { //show loading screen if currently loading
    return <LoadingScreen />;
  }

  if (error) { //show error message if there is an error
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <F1Header title='F1 Drivers' />
        <Typography variant='h4' sx={{
          color: '#e10600',
          textAlign: 'center',
          mt: 4
        }}>
          {error}
        </Typography>
        <Typography variant='body1' sx={{
          textAlign: 'center',
          mt: 2
        }}>
          Rate limit may have been reached. Please try again in a few minutes.
        </Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      <F1Header title='F1 Drivers' /> {/* header for the drivers page */}
      
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