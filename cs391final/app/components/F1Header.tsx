//William Fugate
import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}
export default function F1Header({ title }: HeaderProps) {
    const router = useRouter();
    return(
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}> 
        <Typography variant="h1">
          {title}
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push('/')}
          sx={{
            padding: 1,
            fontSize: '1.2rem',
            bgcolor: '#e10600',
            '&:hover': {
              bgcolor: '#b30500',
            }
          }}
        >
          Return Home
        </Button>
      </Box>
    );
}
//William Fugate