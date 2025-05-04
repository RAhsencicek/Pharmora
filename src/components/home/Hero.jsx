import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#000',
        overflow: 'hidden',
        mt: '-64px', // Header yüksekliğini kompanse etmek için
      }}
    >
      {/* Video Arka Plan */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/assets/videos/medical-background.mp4" type="video/mp4" />
        </video>
      </Box>

      {/* İçerik */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: { xs: 2, md: 4 },
          mt: '64px', // Header yüksekliğini kompanse etmek için
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MotionTypography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              fontWeight: 700,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              mb: 3,
              background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Eczacılar İçin İlaç Değişim Platformu
          </MotionTypography>

          <MotionTypography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 5,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              px: { xs: 2, sm: 4 },
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Pharmora ile ilaç değişimlerinizi güvenli ve hızlı bir şekilde gerçekleştirin.
            Son kullanma tarihi yaklaşan ilaçlarınızı değerlendirin, ihtiyacınız olan ilaçları bulun.
          </MotionTypography>

          <MotionBox
            sx={{
              display: 'flex',
              gap: { xs: 2, sm: 3 },
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              px: { xs: 4, sm: 0 },
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MotionButton
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  background: 'linear-gradient(135deg, #45a049 0%, #388e3c 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hemen Başla
            </MotionButton>

            <MotionButton
              component={RouterLink}
              to="/products"
              variant="outlined"
              size="large"
              sx={{
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                borderRadius: '30px',
                borderWidth: '2px',
                borderColor: '#4CAF50',
                color: '#fff',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  borderWidth: '2px',
                  borderColor: '#45a049',
                  background: 'rgba(76, 175, 80, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              İlaçları Gör
            </MotionButton>
          </MotionBox>
        </MotionBox>
      </Container>

      {/* Scroll İndikatörü */}
      <MotionBox
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        onClick={() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Aşağı Kaydır
        </Typography>
        <Box
          component="i"
          className="fas fa-chevron-down"
          sx={{ fontSize: '1.5rem' }}
        />
      </MotionBox>
    </Box>
  );
}
