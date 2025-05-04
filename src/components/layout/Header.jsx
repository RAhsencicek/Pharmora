import { useState, useEffect } from 'react';
import { AppBar, Box, Container, IconButton, Button, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionAppBar = motion(AppBar);
const MotionBox = motion(Box);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Ana Sayfa', path: '/' },
    { title: 'İlaçlar', path: '/products' },
    { title: 'Harita', path: '/map' },
    { title: 'Profil', path: '/profile' },
  ];

  return (
    <MotionAppBar
      position="fixed"
      sx={{
        background: isScrolled ? '#000000' : 'transparent',
        boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
          }}
        >
          {/* Logo */}
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="Pharmora Logo"
                sx={{
                  height: 40,
                  width: 'auto',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: { xs: 'none', md: 'block' },
                }}
              >
                PHARMORA
              </Typography>
            </Box>
          </RouterLink>

          {/* Navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
            }}
          >
            <AnimatePresence>
              {navItems.map((item) => (
                <MotionBox
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -2 }}
                >
                  <Button
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: '#fff',
                      px: 2,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: location.pathname === item.path ? '100%' : '0%',
                        height: '2px',
                        background: '#4CAF50',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item.title}
                  </Button>
                </MotionBox>
              ))}
            </AnimatePresence>

            {/* Auth Buttons */}
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  '&:hover': {
                    borderColor: '#4CAF50',
                    background: 'rgba(76, 175, 80, 0.1)',
                  },
                }}
              >
                Giriş Yap
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                sx={{
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #45a049 0%, #388e3c 100%)',
                  },
                }}
              >
                Kayıt Ol
              </Button>
            </Box>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{
              display: { xs: 'block', md: 'none' },
              color: '#fff',
            }}
            onClick={() => {/* TODO: Mobile menu */}}
          >
            <Box component="i" className="fas fa-bars" />
          </IconButton>
        </Box>
      </Container>
    </MotionAppBar>
  );
}
