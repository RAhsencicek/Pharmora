import { Box } from '@mui/material';
import LinkedParticles from './LinkedParticles';

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: '#000',
        zIndex: 9999,
      }}
    >
      <LinkedParticles />
    </Box>
  );
}
