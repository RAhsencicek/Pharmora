import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WarningAmber as WarningIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

// Örnek veri
const initialMedicines = [
  { id: 1, name: 'Augmentin 1000mg', category: 'Antibiyotik', stock: 5, price: 120.50, supplier: 'Abdi İbrahim', expiryDate: '2026-05-15', status: 'low' },
  { id: 2, name: 'Parol 500mg', category: 'Ağrı Kesici', stock: 120, price: 45.75, supplier: 'Eczacıbaşı', expiryDate: '2025-11-10', status: 'ok' },
  { id: 3, name: 'Cipro 500mg', category: 'Antibiyotik', stock: 15, price: 85.90, supplier: 'Bayer', expiryDate: '2025-08-22', status: 'medium' },
  { id: 4, name: 'Voltaren 75mg', category: 'Ağrı Kesici', stock: 85, price: 65.25, supplier: 'Novartis', expiryDate: '2026-03-30', status: 'ok' },
  { id: 5, name: 'Xanax 1mg', category: 'Psikiyatri', stock: 50, price: 110.60, supplier: 'Pfizer', expiryDate: '2024-12-15', status: 'ok' },
  { id: 6, name: 'B12 Vitamini', category: 'Vitamin', stock: 65, price: 35.80, supplier: 'Solgar', expiryDate: '2026-01-25', status: 'ok' },
  { id: 7, name: 'Euthyrox 50mcg', category: 'Endokrin', stock: 8, price: 42.90, supplier: 'Merck', expiryDate: '2025-06-18', status: 'low' },
];

const categories = ['Antibiyotik', 'Ağrı Kesici', 'Vitamin', 'Psikiyatri', 'Endokrin', 'Kardiyoloji', 'Diğer'];
const suppliers = ['Abdi İbrahim', 'Eczacıbaşı', 'Bayer', 'Novartis', 'Pfizer', 'Solgar', 'Merck'];

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [filteredMedicines, setFilteredMedicines] = useState(initialMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    stock: 0,
    price: 0,
    supplier: '',
    expiryDate: '',
  });

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    if (value === '') {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter(
        medicine => 
          medicine.name.toLowerCase().includes(value) ||
          medicine.category.toLowerCase().includes(value) ||
          medicine.supplier.toLowerCase().includes(value)
      );
      setFilteredMedicines(filtered);
    }
  };

  const handleOpenDialog = (medicine = null) => {
    if (medicine) {
      setSelectedMedicine(medicine);
      setNewMedicine(medicine);
    } else {
      setSelectedMedicine(null);
      setNewMedicine({
        name: '',
        category: '',
        stock: 0,
        price: 0,
        supplier: '',
        expiryDate: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Stok durumu belirle
    const status = newMedicine.stock <= 10 ? 'low' : newMedicine.stock <= 30 ? 'medium' : 'ok';
    
    if (selectedMedicine) {
      // Düzenleme
      const updatedMedicines = medicines.map(medicine =>
        medicine.id === selectedMedicine.id
          ? { ...newMedicine, status }
          : medicine
      );
      setMedicines(updatedMedicines);
      setFilteredMedicines(updatedMedicines);
    } else {
      // Yeni ekleme
      const newId = Math.max(...medicines.map(m => m.id)) + 1;
      const medicineWithId = { ...newMedicine, id: newId, status };
      
      const updatedMedicines = [...medicines, medicineWithId];
      setMedicines(updatedMedicines);
      setFilteredMedicines(updatedMedicines);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    const updatedMedicines = medicines.filter(medicine => medicine.id !== id);
    setMedicines(updatedMedicines);
    setFilteredMedicines(updatedMedicines);
  };

  const getStatusChip = (status) => {
    let color = 'success';
    let label = 'Yeterli Stok';
    
    if (status === 'low') {
      color = 'error';
      label = 'Kritik Seviye';
    } else if (status === 'medium') {
      color = 'warning';
      label = 'Azalıyor';
    }
    
    return (
      <Chip 
        size="small" 
        color={color} 
        label={label}
        icon={status === 'low' ? <WarningIcon /> : undefined}
      />
    );
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          İlaç Yönetimi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Eczanenizin ilaç envanterini buradan yönetebilirsiniz.
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          placeholder="İlaç ara..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '100%', maxWidth: '500px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Yeni İlaç
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>İlaç Adı</TableCell>
                <TableCell>Kategori</TableCell>
                <TableCell align="right">Stok</TableCell>
                <TableCell align="right">Fiyat</TableCell>
                <TableCell>Tedarikçi</TableCell>
                <TableCell>Son Kullanma</TableCell>
                <TableCell>Durum</TableCell>
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMedicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell component="th" scope="row">
                    {medicine.name}
                  </TableCell>
                  <TableCell>{medicine.category}</TableCell>
                  <TableCell align="right">{medicine.stock}</TableCell>
                  <TableCell align="right">₺{medicine.price.toFixed(2)}</TableCell>
                  <TableCell>{medicine.supplier}</TableCell>
                  <TableCell>{new Date(medicine.expiryDate).toLocaleDateString('tr-TR')}</TableCell>
                  <TableCell>{getStatusChip(medicine.status)}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(medicine)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(medicine.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedMedicine ? 'İlaç Düzenle' : 'Yeni İlaç Ekle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="İlaç Adı"
                name="name"
                value={newMedicine.name}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select
                  name="category"
                  value={newMedicine.category}
                  onChange={handleFormChange}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tedarikçi</InputLabel>
                <Select
                  name="supplier"
                  value={newMedicine.supplier}
                  onChange={handleFormChange}
                  label="Tedarikçi"
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      {supplier}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stok Miktarı"
                name="stock"
                type="number"
                value={newMedicine.stock}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fiyat (₺)"
                name="price"
                type="number"
                value={newMedicine.price}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Son Kullanma Tarihi"
                name="expiryDate"
                type="date"
                value={newMedicine.expiryDate}
                onChange={handleFormChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={!newMedicine.name || !newMedicine.category}
          >
            {selectedMedicine ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
