import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pharmacistId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pharmacistId === '1234' && formData.password === '1234') {
      navigate('/dashboard');
    } else {
      setError('Eczacı ID veya şifre hatalı!');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        backgroundImage: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box
            component="img"
            src="/pharmora-logo.png"
            alt="Pharmora Logo"
            sx={{
              width: 120,
              height: 'auto',
              display: 'block',
              margin: '0 auto 2rem',
              filter: 'brightness(0) invert(1)',
            }}
          />
          
          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom
            sx={{ color: 'common.white', mb: 3 }}
          >
            Eczacı Girişi
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="pharmacistId"
              label="Eczacı ID"
              variant="outlined"
              value={formData.pharmacistId}
              onChange={handleChange}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiInputBase-input': {
                  color: 'common.white',
                },
              }}
            />

            <TextField
              fullWidth
              name="password"
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiInputBase-input': {
                  color: 'common.white',
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#4CAF50',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#45a049',
                },
              }}
            >
              Giriş Yap
            </Button>
          </form>
        </Paper>
      </motion.div>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setError('')}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
