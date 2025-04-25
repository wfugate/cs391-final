'use client';

import { Card, CardContent, Typography, Box, CardMedia } from "@mui/material";
import { Driver } from "../types";

interface DriverCardProps {
  driver: Driver;
}

export default function DriverCard({ driver }: DriverCardProps) {
  
  const textColor = '#ffffff';
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: `#${driver.team_colour}`,
        color: textColor,
        position: 'relative',
        boxShadow: 4,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, pb: 2 }}>
        {driver.headshot_url && (
          <CardMedia
            component="img"
            image={driver.headshot_url}
            alt={driver.full_name}
            sx={{ 
              width: 180, 
              height: 180, 
              borderRadius: '50%',
              border: '3px solid white',
              backgroundColor: 'white',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        backgroundColor: 'rgba(0,0,0,0.7)', 
        color: 'white',
      }}>
        <Typography gutterBottom variant="h5" component="div" align="center" sx={{ fontWeight: 700 }}>
          {driver.full_name}
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: 2,
          mt: 2
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '8px'
          }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              NUMBER
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {driver.driver_number}
            </Typography>
          </Box>
          
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '8px'
          }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              ACRONYM
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {driver.name_acronym}
            </Typography>
          </Box>
        </Box>
        
        {/* Team name display */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          mt: 2,
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '8px'
        }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            TEAM
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {driver.team_name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}