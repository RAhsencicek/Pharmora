import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              PHARMORA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Eczacılar için güvenli ve hızlı ilaç değişim platformu
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Hızlı Bağlantılar
            </Typography>
            <Box>
              <Link
                component={RouterLink}
                to="/products"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                İlaçlar
              </Link>
              <Link
                component={RouterLink}
                to="/map"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                Harita
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                color="text.secondary"
                display="block"
              >
                Kayıt Ol
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              İletişim
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@pharmora.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tel: +90 (212) 123 45 67
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, borderTop: 1, borderColor: 'divider', pt: 3 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {new Date().getFullYear()} Pharmora. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
