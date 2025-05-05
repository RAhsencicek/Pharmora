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
  Autocomplete,
  Chip,
  Stack,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  LocalPharmacy as PharmacyIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Örnek veriler
const samplePatients = [
  { id: 1, name: 'Ahmet Yılmaz', tc: '12345678901', phone: '5551234567' },
  { id: 2, name: 'Ayşe Demir', tc: '23456789012', phone: '5552345678' },
  { id: 3, name: 'Mehmet Kaya', tc: '34567890123', phone: '5553456789' },
];

const sampleMedicines = [
  { id: 1, name: 'Augmentin 1000mg', price: 120.50, stock: 150 },
  { id: 2, name: 'Parol 500mg', price: 45.75, stock: 200 },
  { id: 3, name: 'Cipro 500mg', price: 85.90, stock: 75 },
];

const prescriptionStatus = {
  PENDING: 'Bekliyor',
  PREPARING: 'Hazırlanıyor',
  READY: 'Hazır',
  DELIVERED: 'Teslim Edildi',
};

const initialPrescriptions = [
  {
    id: 'RX-2025-001',
    patientName: 'Ahmet Yılmaz',
    doctorName: 'Dr. Mehmet Öz',
    date: '2025-05-04',
    medicines: [
      { name: 'Augmentin 1000mg', quantity: 1, price: 120.50 },
      { name: 'Parol 500mg', quantity: 2, price: 45.75 },
    ],
    status: 'DELIVERED',
    totalPrice: 212,
  },
  {
    id: 'RX-2025-002',
    patientName: 'Ayşe Demir',
    doctorName: 'Dr. Ali Veli',
    date: '2025-05-04',
    medicines: [
      { name: 'Cipro 500mg', quantity: 1, price: 85.90 },
    ],
    status: 'PENDING',
    totalPrice: 85.90,
  },
];

const steps = ['Hasta Bilgileri', 'İlaç Seçimi', 'Onay'];

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setActiveStep(0);
    setSelectedPatient(null);
    setSelectedMedicines([]);
    setDoctorName('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
  };

  const handleAddMedicine = (medicine) => {
    if (!selectedMedicines.find(m => m.name === medicine.name)) {
      setSelectedMedicines([...selectedMedicines, { ...medicine, quantity: 1 }]);
    }
  };

  const handleRemoveMedicine = (medicineName) => {
    setSelectedMedicines(selectedMedicines.filter(m => m.name !== medicineName));
  };

  const handleQuantityChange = (medicineName, quantity) => {
    setSelectedMedicines(selectedMedicines.map(medicine => 
      medicine.name === medicineName 
        ? { ...medicine, quantity: parseInt(quantity) || 0 }
        : medicine
    ));
  };

  const calculateTotal = () => {
    return selectedMedicines.reduce((total, medicine) => 
      total + (medicine.price * medicine.quantity), 0
    );
  };

  const handleSubmit = () => {
    const newPrescription = {
      id: `RX-2025-${String(prescriptions.length + 1).padStart(3, '0')}`,
      patientName: selectedPatient.name,
      doctorName,
      date: new Date().toISOString().split('T')[0],
      medicines: selectedMedicines,
      status: 'PENDING',
      totalPrice: calculateTotal(),
    };
    setPrescriptions([...prescriptions, newPrescription]);
    handleCloseDialog();
  };

  const handleStatusChange = (prescriptionId, newStatus) => {
    setPrescriptions(prescriptions.map(prescription =>
      prescription.id === prescriptionId
        ? { ...prescription, status: newStatus }
        : prescription
    ));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Autocomplete
              options={samplePatients}
              getOptionLabel={(option) => option.name}
              value={selectedPatient}
              onChange={(event, newValue) => setSelectedPatient(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Hasta Seçin" fullWidth />
              )}
            />
            <TextField
              fullWidth
              label="Doktor Adı"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Autocomplete
              options={sampleMedicines}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => newValue && handleAddMedicine(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="İlaç Ekle" fullWidth />
              )}
            />
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>İlaç</TableCell>
                    <TableCell align="right">Miktar</TableCell>
                    <TableCell align="right">Fiyat</TableCell>
                    <TableCell align="right">Toplam</TableCell>
                    <TableCell align="right">İşlem</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedMedicines.map((medicine) => (
                    <TableRow key={medicine.name}>
                      <TableCell>{medicine.name}</TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={medicine.quantity}
                          onChange={(e) => handleQuantityChange(medicine.name, e.target.value)}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell align="right">₺{medicine.price}</TableCell>
                      <TableCell align="right">₺{medicine.price * medicine.quantity}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveMedicine(medicine.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="subtitle1" fontWeight="bold">
                        Toplam
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1" fontWeight="bold">
                        ₺{calculateTotal()}
                      </Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Hasta Bilgileri
                </Typography>
                <Typography variant="body1">
                  {selectedPatient?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  TC: {selectedPatient?.tc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tel: {selectedPatient?.phone}
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Doktor
                </Typography>
                <Typography variant="body1">{doctorName}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  İlaçlar
                </Typography>
                {selectedMedicines.map((medicine) => (
                  <Typography key={medicine.name} variant="body2">
                    • {medicine.name} x {medicine.quantity}
                  </Typography>
                ))}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Toplam: ₺{calculateTotal()}
                </Typography>
              </Paper>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircleIcon color="success" />;
      case 'PENDING':
        return <WarningIcon color="warning" />;
      default:
        return null;
    }
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
            Reçete Yönetimi
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Yeni Reçete
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
                  <TableCell>Reçete No</TableCell>
                  <TableCell>Hasta</TableCell>
                  <TableCell>Doktor</TableCell>
                  <TableCell>Tarih</TableCell>
                  <TableCell align="right">Tutar</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>{prescription.id}</TableCell>
                    <TableCell>{prescription.patientName}</TableCell>
                    <TableCell>{prescription.doctorName}</TableCell>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell align="right">₺{prescription.totalPrice}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getStatusIcon(prescription.status)}
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={prescription.status}
                            onChange={(e) => handleStatusChange(prescription.id, e.target.value)}
                          >
                            {Object.entries(prescriptionStatus).map(([key, value]) => (
                              <MenuItem key={key} value={key}>{value}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
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
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Yeni Reçete Oluştur
          </DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {getStepContent(activeStep)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>İptal</Button>
            {activeStep > 0 && (
              <Button onClick={handleBack}>
                Geri
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!selectedPatient || selectedMedicines.length === 0 || !doctorName}
              >
                Oluştur
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && (!selectedPatient || !doctorName)) ||
                  (activeStep === 1 && selectedMedicines.length === 0)
                }
              >
                İleri
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
