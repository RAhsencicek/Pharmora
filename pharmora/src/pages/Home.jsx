import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Statistics from '../components/home/Statistics';
import HowItWorks from '../components/home/HowItWorks';

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(45deg, #e3f2fd 30%, #e8f5e9 90%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 120%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)',
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                className="gradient-text"
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Eczacılar İçin İlaç Değişim Platformu
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ 
                  mb: 4,
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                Pharmora ile ilaç değişimlerinizi güvenli ve hızlı bir şekilde
                gerçekleştirin. Son kullanma tarihi yaklaşan ilaçlarınızı
                değerlendirin, ihtiyacınız olan ilaçları bulun.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  Hemen Başla
                </Button>
                <Button
                  component={RouterLink}
                  to="/products"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  İlaçları Gör
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Hero />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            sx={{
              mb: { xs: 4, md: 6 },
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Rakamlarla Pharmora
          </Typography>
          <Statistics />
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 10 }, 
          bgcolor: 'background.paper',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)',
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            sx={{
              mb: { xs: 4, md: 6 },
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            Nasıl Çalışır?
          </Typography>
          <HowItWorks />
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
          color: 'common.white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
            Hemen Aramıza Katılın
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Türkiye'nin en büyük eczacı ağına katılın ve ilaç değişimlerinizi
            güvenle gerçekleştirin.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                bgcolor: 'common.white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'common.white',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Ücretsiz Üye Ol
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
