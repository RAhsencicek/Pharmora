import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Örnek ilaç kategorileri
const categories = [
  'Antibiyotik',
  'Ağrı Kesici',
  'Vitamin',
  'Antidepresan',
  'Tansiyon',
  'Diğer',
];

// Örnek ilaç verileri
const initialMedicines = [
  {
    id: 1,
    name: 'Augmentin',
    category: 'Antibiyotik',
    stock: 150,
    price: 120.50,
    expiryDate: '2025-12-31',
    barcode: '8699123456789',
  },
  {
    id: 2,
    name: 'Parol',
    category: 'Ağrı Kesici',
    stock: 200,
    price: 45.75,
    expiryDate: '2025-10-15',
    barcode: '8699987654321',
  },
];

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    expiryDate: '',
    barcode: '',
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenDialog = (medicine = null) => {
    if (medicine) {
      setSelectedMedicine(medicine);
      setFormData(medicine);
    } else {
      setSelectedMedicine(null);
      setFormData({
        name: '',
        category: '',
        stock: '',
        price: '',
        expiryDate: '',
        barcode: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMedicine(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedMedicine) {
      // Güncelleme işlemi
      setMedicines(prev =>
        prev.map(med =>
          med.id === selectedMedicine.id
            ? { ...formData, id: med.id }
            : med
        )
      );
    } else {
      // Yeni ilaç ekleme
      setMedicines(prev => [
        ...prev,
        {
          ...formData,
          id: Math.max(...prev.map(m => m.id)) + 1,
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setMedicines(prev => prev.filter(med => med.id !== id));
  };

  const isLowStock = (stock) => stock < 50;
  const isNearExpiry = (date) => {
    const expiryDate = new Date(date);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow;
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      
      <Sidebar
        open={mobileOpen}
        variant="permanent"
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            İlaç Yönetimi
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Yeni İlaç Ekle
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>İlaç Adı</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell align="right">Stok</TableCell>
                  <TableCell align="right">Fiyat</TableCell>
                  <TableCell>Son Kullanma</TableCell>
                  <TableCell>Barkod</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicines.map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>
                      <Chip label={medicine.category} size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        {medicine.stock}
                        {isLowStock(medicine.stock) && (
                          <WarningIcon color="warning" sx={{ fontSize: 20 }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right">₺{medicine.price}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {medicine.expiryDate}
                        {isNearExpiry(medicine.expiryDate) && (
                          <WarningIcon color="error" sx={{ fontSize: 20 }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{medicine.barcode}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(medicine)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(medicine.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedMedicine ? 'İlaç Düzenle' : 'Yeni İlaç Ekle'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="İlaç Adı"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Kategori"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Stok Miktarı"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Fiyat"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Son Kullanma Tarihi"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Barkod"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>İptal</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {selectedMedicine ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
