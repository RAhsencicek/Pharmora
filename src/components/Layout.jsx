import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar, { NAVBAR_HEIGHT } from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default' 
      }}
    >
      <Navbar onMenuClick={handleDrawerToggle} />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          open={mobileOpen}
          variant={isMobile ? 'temporary' : 'permanent'}
          onClose={() => setMobileOpen(false)}
        />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { 
              xs: '100%', 
              sm: `calc(100vw - ${drawerWidth}px)` 
            },
            maxWidth: {
              xs: '100%',
              sm: `calc(100vw - ${drawerWidth}px)`
            },
            mt: `${NAVBAR_HEIGHT}px`,
            pt: 2,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
