//William Fugate
'use client';

import { Card, CardContent, Typography, Box, CardMedia } from "@mui/material";
import { Driver } from "../types/ergast";

interface DriverCardProps {
  driver: Driver;
}

//function to map country codes from OpenF1 API to names
const countryCodeToName: Record<string, string> = {
  "GBR": "British",
  "NED": "Dutch",
  "MON": "Monegasque",
  "ESP": "Spanish",
  "GER": "German",
  "FRA": "French",
  "AUS": "Australian",
  "MEX": "Mexican",
  "FIN": "Finnish",
  "CAN": "Canadian",
  "ITA": "Italian",
  "CHN": "Chinese",
  "JPN": "Japanese",
  "THA": "Thai",
  "DNK": "Danish",
  "USA": "American",
  "BRA": "Brazilian",    
  "NZL": "New Zealander", 
  "ALG": "Algerian",
};

export default function DriverCard({ driver }: DriverCardProps) {
  
  //get the nationality from the country code
  const nationality = countryCodeToName[driver.country_code] || driver.country_code;
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: `#${driver.team_colour}`,
        color: '#ffffff',
        boxShadow: 5,
        '&:hover': {
          transform: 'translateY(-8px)', //raise card when hovered
          boxShadow: 8,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', //transition between raised and unraised card
        },
      }}
    >
      {/* image display */}
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
            }}
          />
        )}
      </Box>
      {/* driver information */}
      <CardContent sx={{ 
        flexGrow: 1, 
        backgroundColor: 'rgba(0,0,0,0.7)',  //darkened background for card content
        color: 'white',
      }}>
        {/* driver name display */}
        <Typography gutterBottom variant="h5" align="center" sx={{ fontWeight: 700 }}>
          {driver.full_name}
        </Typography>
        

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: 2,
          mt: 2
        }}>

          {/* driver number display */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)', //lighten backgrounds of info
            borderRadius: '8px',
            padding: 1,
          }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              NUMBER
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {driver.driver_number}
            </Typography>
          </Box>

          {/* driver acronym display */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)', //lighten backgrounds of info
            borderRadius: '8px',
            padding: 1,
          }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              ACRONYM
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {driver.name_acronym}
            </Typography>
          </Box>
        </Box>
        
        {/* team name display */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          mt: 2,
          backgroundColor: 'rgba(255,255,255,0.1)', //lighten backgrounds of info
          borderRadius: '8px',
          padding: 1,
        }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            TEAM
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {driver.team_name}
          </Typography>
        </Box>
        
        {/* nationality display */}
        {nationality? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          mt: 2,
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: 1,
        }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            NATIONALITY
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {nationality}
          </Typography>
        </Box> ) : null}
      </CardContent>
    </Card>
  );
}
//William Fugate