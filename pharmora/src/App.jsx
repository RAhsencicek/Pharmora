import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import store from './store';
import theme from './theme';
import Layout from './components/layout/Layout';
import AppRoutes from './routes';
import LoadingScreen from './components/loading/LoadingScreen';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); // 10 saniye olarak değiştirildi
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            {loading ? (
              <LoadingScreen />
            ) : (
              <Layout>
                <AppRoutes />
              </Layout>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}
