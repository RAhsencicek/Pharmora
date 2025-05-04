import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  HowToReg,
  Search,
  SwapHoriz,
  CheckCircle,
} from '@mui/icons-material';

const steps = [
  {
    icon: HowToReg,
    title: 'Üye Olun',
    description:
      'Eczacı kimliğinizle hızlıca üye olun ve platformumuza katılın.',
    color: '#1976d2',
  },
  {
    icon: Search,
    title: 'İlaç Arayın',
    description:
      'İhtiyacınız olan ilaçları arayın veya elinizdekileri listeleyin.',
    color: '#9c27b0',
  },
  {
    icon: SwapHoriz,
    title: 'Değişim Yapın',
    description:
      'Güvenli bir şekilde diğer eczacılarla ilaç değişimi gerçekleştirin.',
    color: '#2e7d32',
  },
  {
    icon: CheckCircle,
    title: 'Onaylayın',
    description:
      'Değişim tamamlandığında onaylayın ve puanlama yapın.',
    color: '#ed6c02',
  },
];

export default function HowItWorks() {
  return (
    <Grid container spacing={4}>
      {steps.map((step, index) => {
        const Icon = step.icon;
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
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  '& .step-number': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              <Box
                className="step-number"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                {index + 1}
              </Box>
              
              <Box
                sx={{
                  mt: 4,
                  mb: 2,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${step.color}15`,
                }}
              >
                <Icon
                  sx={{
                    fontSize: 40,
                    color: step.color,
                  }}
                />
              </Box>
              
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  textAlign: 'center',
                  color: step.color,
                }}
              >
                {step.title}
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
