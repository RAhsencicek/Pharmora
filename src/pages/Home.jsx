import { Box, Container, Typography, Button, Grid, Chip, CircularProgress, Paper, InputBase, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import Hero from '../components/home/Hero';
import Statistics from '../components/home/Statistics';
import HowItWorks from '../components/home/HowItWorks';

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #2563EB 30%, #10B981 90%)',
  border: 0,
  borderRadius: '50px',
  boxShadow: '0 3px 5px 2px rgba(37, 99, 235, .3)',
  color: 'white',
  padding: '12px 30px',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 8px 2px rgba(37, 99, 235, .3)',
  }
});

const AnimatedCard = motion(Box);

// Örnek ilaç verileri
const items = [
  { id: 1, name: 'Parol', status: 'Mevcut' },
  { id: 2, name: 'Aspirin', status: 'Tükendi' },
  { id: 3, name: 'Nurofen', status: 'Mevcut' },
  { id: 4, name: 'Voltaren', status: 'Mevcut' },
];

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

      {/* İlaç Kartları */}
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
            İlaçlarımız
          </Typography>
          <ResponsiveGrid />
        </Container>
      </Box>
    </Box>
  );
}

// Örnek İlaç Kartı Komponenti
const MedicineCard = ({ medicine }) => {
  return (
    <AnimatedCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        },
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="600">
          {medicine.name}
        </Typography>
        <Chip 
          label={medicine.status} 
          color={medicine.status === 'Mevcut' ? 'success' : 'warning'}
        />
      </Box>
    </AnimatedCard>
  );
};

const ResponsiveGrid = () => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {items.map((item) => (
        <Grid item xs={4} sm={4} md={3} key={item.id}>
          <MedicineCard medicine={item} />
        </Grid>
      ))}
    </Grid>
  );
};

const LoadingState = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(8px)'
    }}
  >
    <CircularProgress 
      size={60}
      thickness={4}
      sx={{
        color: 'primary.main'
      }}
    />
  </Box>
);

const SearchBar = () => (
  <Paper
    component="form"
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: 600,
      p: '2px 4px',
      borderRadius: '100px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="İlaç ara..."
    />
    <IconButton type="submit">
      <SearchIcon />
    </IconButton>
  </Paper>
);
