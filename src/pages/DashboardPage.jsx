import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LocalPharmacy,
  People,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const stats = [
  {
    title: 'Toplam İlaç',
    value: '2,345',
    icon: <LocalPharmacy sx={{ fontSize: 40 }} />,
    color: '#4CAF50',
  },
  {
    title: 'Aktif Hasta',
    value: '1,234',
    icon: <People sx={{ fontSize: 40 }} />,
    color: '#2196F3',
  },
  {
    title: 'Günlük Reçete',
    value: '156',
    icon: <Assignment sx={{ fontSize: 40 }} />,
    color: '#FF9800',
  },
  {
    title: 'Aylık Satış',
    value: '₺45,678',
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    color: '#E91E63',
  },
];

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      
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
          width: { sm: `calc(100% - ${240}px)` },
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Hoş Geldiniz, Eczacı
        </Typography>

        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" color="textSecondary">
                      {stat.title}
                    </Typography>
                    <Box sx={{ color: stat.color }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography variant="h4">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                height: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Son Aktiviteler
              </Typography>
              {/* Buraya grafik veya tablo eklenebilir */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                height: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Stok Durumu
              </Typography>
              {/* Buraya stok bilgileri eklenebilir */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
