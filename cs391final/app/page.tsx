'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 4
        }}
      >
        <Typography variant="h2" component="h1" align="center">
          F1 Race Data
        </Typography>
        
        <Typography variant="body1" align="center">
          Explore data from the Open F1 API
        </Typography>
        
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => router.push('/drivers')}
          sx={{ 
            mt: 2, 
            bgcolor: '#e10600',
            '&:hover': {
              bgcolor: '#b30500',
            }
          }}
        >
          View F1 Drivers
        </Button>
      </Box>
    </Container>
  );
}