import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingScreen from './components/loading/LoadingScreen';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MedicinesPage from './pages/MedicinesPage';
import ReportsPage from './pages/ReportsPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Korumalı route bileşeni
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  // Authentication kontrolü yapılırken loading ekranı göster
  if (loading) {
    return <LoadingScreen />;
  }
  
  // Authenticated değilse login sayfasına yönlendir
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Başlangıç yükleme animasyonu
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="/medicines" element={
            <PrivateRoute>
              <MedicinesPage />
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          } />
          <Route path="/prescriptions" element={
            <PrivateRoute>
              <PrescriptionsPage />
            </PrivateRoute>
          } />
          
          {/* Redirect to login page by default */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
