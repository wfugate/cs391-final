//start code William Fugate  
'use client';

import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 

const theme = createTheme({ //general styles for button and typography standardization
  typography: {
    fontFamily: '"Titillium Web", Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    }
  },
});

export default function F1ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider> {/* styling helpers */}
      <ThemeProvider theme={theme}> {/* styling helpers */}
        <CssBaseline /> {/* styling helpers */}
        
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
//end code William Fugate 