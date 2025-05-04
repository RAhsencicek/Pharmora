import { Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {children}
    </Box>
  );
}
