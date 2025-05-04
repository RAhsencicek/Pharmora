import { Grid, Paper, Typography, Box } from '@mui/material';
import { LocalPharmacy, SwapHoriz, Group, Verified } from '@mui/icons-material';

const stats = [
  {
    value: '1000+',
    label: 'Kayıtlı Eczane',
    icon: LocalPharmacy,
    color: '#1976d2',
  },
  {
    value: '5000+',
    label: 'Başarılı Değişim',
    icon: SwapHoriz,
    color: '#9c27b0',
  },
  {
    value: '3000+',
    label: 'Aktif Kullanıcı',
    icon: Group,
    color: '#2e7d32',
  },
  {
    value: '99%',
    label: 'Memnuniyet Oranı',
    icon: Verified,
    color: '#ed6c02',
  },
];

export default function Statistics() {
  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: stat.color,
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  background: `${stat.color}15`,
                }}
              >
                <Icon
                  sx={{
                    fontSize: 32,
                    color: stat.color,
                  }}
                />
              </Box>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: `linear-gradient(45deg, ${stat.color}, ${stat.color}cc)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                align="center"
                sx={{ fontWeight: 500 }}
              >
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
