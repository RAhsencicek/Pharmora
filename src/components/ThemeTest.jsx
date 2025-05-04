import { Box, Typography, Button, Card, CardContent, Container, Grid } from '@mui/material';

export default function ThemeTest() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) => theme.palette.background.gradient,
        py: 4,
      }}
    >
      <Container>
        <Typography variant="h1" sx={{ mb: 4 }}>
          Tema Test
        </Typography>
        
        <Typography variant="h2" sx={{ mb: 3 }}>
          Renkler ve Efektler
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  '&::before': {
                    opacity: 1,
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: (theme) => theme.palette.custom.neonGreen.glow,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
              }}
            >
              <CardContent>
                <Typography variant="h4" color="primary" sx={{ position: 'relative', zIndex: 1 }}>
                  Neon Yeşil Efekt
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  '&::before': {
                    opacity: 1,
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: (theme) => theme.palette.custom.neonBlue.glow,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
              }}
            >
              <CardContent>
                <Typography variant="h4" color="secondary" sx={{ position: 'relative', zIndex: 1 }}>
                  Neon Mavi Efekt
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (theme) => theme.palette.background.gradientLight,
              }}
            >
              <CardContent>
                <Typography variant="h4">
                  Gradient Arka Plan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h2" sx={{ mb: 3 }}>
          Butonlar
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
          <Button variant="contained" color="primary">
            Primary Button
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Button
          </Button>
          <Button variant="outlined" color="primary">
            Outlined Button
          </Button>
        </Box>

        <Typography variant="h2" sx={{ mb: 3 }}>
          Tipografi
        </Typography>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h1" gutterBottom>Heading 1</Typography>
          <Typography variant="h2" gutterBottom>Heading 2</Typography>
          <Typography variant="h3" gutterBottom>Heading 3</Typography>
          <Typography variant="h4" gutterBottom>Heading 4</Typography>
          <Typography variant="h5" gutterBottom>Heading 5</Typography>
          <Typography variant="h6" gutterBottom>Heading 6</Typography>
          <Typography variant="body1" gutterBottom>
            Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="body2">
            Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
