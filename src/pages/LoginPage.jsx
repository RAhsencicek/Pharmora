import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Divider,
  Tab,
  Tabs,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { loginUser, registerUser, clearError } from '../store/slices/authSlice';

// TabPanel component for tab-based interface
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login form state
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  
  // Register form state
  const [registerFormData, setRegisterFormData] = useState({
    pharmacistId: '',
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    location: {
      type: 'Point',
      coordinates: [29.0283, 41.0082] // Default coordinates for Istanbul
    }
  });
  
  // Form validation state
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    dispatch(clearError());
  };

  // Handle login form change
  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
    
    // Clear field error when typing
    if (loginErrors[e.target.name]) {
      setLoginErrors({
        ...loginErrors,
        [e.target.name]: ''
      });
    }
  };

  // Handle register form change
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
    
    // Clear field error when typing
    if (registerErrors[name]) {
      setRegisterErrors({
        ...registerErrors,
        [name]: ''
      });
    }
  };

  // Validate login form
  const validateLoginForm = () => {
    const errors = {};
    
    if (!loginFormData.email) {
      errors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      errors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!loginFormData.password) {
      errors.password = 'Şifre gereklidir';
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate register form
  const validateRegisterForm = () => {
    const errors = {};
    
    if (!registerFormData.pharmacistId) {
      errors.pharmacistId = 'Eczacı kimlik numarası gereklidir';
    } else if (registerFormData.pharmacistId.length !== 11) {
      errors.pharmacistId = 'Eczacı kimlik numarası 11 karakter olmalıdır';
    }
    
    if (!registerFormData.name) {
      errors.name = 'Ad gereklidir';
    }
    
    if (!registerFormData.surname) {
      errors.surname = 'Soyad gereklidir';
    }
    
    if (!registerFormData.email) {
      errors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
      errors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    if (!registerFormData.phone) {
      errors.phone = 'Telefon numarası gereklidir';
    }
    
    if (!registerFormData.password) {
      errors.password = 'Şifre gereklidir';
    } else if (registerFormData.password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    if (registerFormData.password !== registerFormData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
    }
    
    if (!registerFormData.address) {
      errors.address = 'Adres gereklidir';
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      dispatch(loginUser(loginFormData));
    }
  };

  // Handle register submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    if (validateRegisterForm()) {
      // Oluşturduğumuz formData'dan confirmPassword'ü çıkaralım çünkü API'de yok
      const { confirmPassword, ...registrationData } = registerFormData;
      dispatch(registerUser(registrationData));
    }
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
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            width: '100%',
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
              margin: '0 auto 1rem',
              filter: 'brightness(0) invert(1)',
            }}
          />
          
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth" 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTab-root': { color: 'text.secondary' },
              '& .Mui-selected': { color: 'primary.main' },
            }}
          >
            <Tab label="Giriş Yap" />
            <Tab label="Kayıt Ol" />
          </Tabs>
          
          {/* Login Panel */}
          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
                name="email"
                label="E-posta"
              variant="outlined"
                type="email"
                value={loginFormData.email}
                onChange={handleLoginChange}
                error={!!loginErrors.email}
                helperText={loginErrors.email}
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
                  '& .MuiFormHelperText-root': {
                    color: 'error.main'
                  }
              }}
            />

            <TextField
              fullWidth
              name="password"
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
                value={loginFormData.password}
                onChange={handleLoginChange}
                error={!!loginErrors.password}
                helperText={loginErrors.password}
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
                  '& .MuiFormHelperText-root': {
                    color: 'error.main'
                  }
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
                disabled={loading}
              sx={{
                bgcolor: '#4CAF50',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#45a049',
                },
              }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
              </Button>
            </form>
          </TabPanel>
          
          {/* Register Panel */}
          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleRegisterSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="pharmacistId"
                    label="Eczacı Kimlik No"
                    variant="outlined"
                    value={registerFormData.pharmacistId}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.pharmacistId}
                    helperText={registerErrors.pharmacistId}
                    sx={{
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Telefon"
                    variant="outlined"
                    value={registerFormData.phone}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.phone}
                    helperText={registerErrors.phone}
                    sx={{
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Ad"
                    variant="outlined"
                    value={registerFormData.name}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.name}
                    helperText={registerErrors.name}
                    sx={{
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="surname"
                    label="Soyad"
                    variant="outlined"
                    value={registerFormData.surname}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.surname}
                    helperText={registerErrors.surname}
                    sx={{
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="E-posta"
                    type="email"
                    variant="outlined"
                    value={registerFormData.email}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.email}
                    helperText={registerErrors.email}
                    sx={{
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="address"
                    label="Adres"
                    variant="outlined"
                    multiline
                    rows={2}
                    value={registerFormData.address}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.address}
                    helperText={registerErrors.address}
                    sx={{
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Şifre"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={registerFormData.password}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.password}
                    helperText={registerErrors.password}
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Şifre Tekrar"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={registerFormData.confirmPassword}
                    onChange={handleRegisterChange}
                    error={!!registerErrors.confirmPassword}
                    helperText={registerErrors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
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
                      '& .MuiFormHelperText-root': {
                        color: 'error.main'
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  py: 1.5,
                  mt: 3,
                  '&:hover': {
                    bgcolor: '#45a049',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Kayıt Ol'}
            </Button>
          </form>
          </TabPanel>
        </Paper>
      </motion.div>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => dispatch(clearError())}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => dispatch(clearError())}
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
