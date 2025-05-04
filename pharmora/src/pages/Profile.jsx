import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    pharmacyName: user?.pharmacyName || '',
    pharmacyAddress: user?.pharmacyAddress || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API çağrısı burada yapılacak
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Profil güncellenemedi');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Örnek veriler
  const transactions = [
    {
      id: 1,
      type: 'Satış',
      medicine: 'Aspirin',
      date: '2025-05-01',
      amount: 150,
      status: 'Tamamlandı',
    },
    {
      id: 2,
      type: 'Alış',
      medicine: 'Parol',
      date: '2025-04-28',
      amount: 200,
      status: 'Tamamlandı',
    },
  ];

  const listings = [
    {
      id: 1,
      name: 'Augmentin',
      price: 180,
      expiryDate: '2025-12-31',
      status: 'Aktif',
    },
    {
      id: 2,
      name: 'Voltaren',
      price: 120,
      expiryDate: '2025-10-15',
      status: 'Satıldı',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Sol Kolon - Profil Özeti */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              {user?.name?.[0]}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.name} {user?.surname}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Eczacı ID: {user?.pharmacistId}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {user?.pharmacyName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.pharmacyAddress}
            </Typography>
          </Paper>
        </Grid>

        {/* Sağ Kolon - Sekmeler */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Profil Bilgileri" />
              <Tab label="İşlemlerim" />
              <Tab label="İlanlarım" />
            </Tabs>

            {/* Profil Bilgileri */}
            <TabPanel value={tabValue} index={0}>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ad"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Soyad"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="E-posta"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Telefon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Eczane Adı"
                      name="pharmacyName"
                      value={formData.pharmacyName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Eczane Adresi"
                      name="pharmacyAddress"
                      multiline
                      rows={3}
                      value={formData.pharmacyAddress}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? 'Güncelleniyor...' : 'Güncelle'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* İşlemler */}
            <TabPanel value={tabValue} index={1}>
              <List>
                {transactions.map((transaction) => (
                  <Box key={transaction.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {transaction.medicine}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {transaction.date}
                            </Typography>
                            <Typography variant="body2">
                              {transaction.amount} TL
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={transaction.type}
                        color={transaction.type === 'Satış' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </TabPanel>

            {/* İlanlar */}
            <TabPanel value={tabValue} index={2}>
              <List>
                {listings.map((listing) => (
                  <Box key={listing.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {listing.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              Son Kullanma: {listing.expiryDate}
                            </Typography>
                            <Typography variant="body2">
                              {listing.price} TL
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={listing.status}
                        color={listing.status === 'Aktif' ? 'success' : 'default'}
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
