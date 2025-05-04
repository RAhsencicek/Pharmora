import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './components/loading/LoadingScreen';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
