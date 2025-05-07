import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Report as ReportIcon,
  LocalPharmacy as MedicineIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

// API isteği için baseURL
const API_BASE_URL = 'https://phamorabackend-production.up.railway.app/api/fda';

// Yan etki sonucu formatlaması
const formatOutcome = (outcome) => {
  switch(outcome) {
    case "1": return "Ölüm";
    case "2": return "Hayatı Tehdit Eden";
    case "3": return "Hastaneye Yatış";
    case "4": return "Engel";
    case "5": return "Doğumsal Anomali";
    case "6": return "Diğer Ciddi";
    default: return "Bilinmeyen";
  }
};

// Ciddiyet formatlaması
const formatSeriousness = (seriousness) => {
  switch(seriousness) {
    case "1": return "Ciddi";
    case "2": return "Orta";
    case "3": return "Hafif";
    default: return "Bilinmeyen";
  }
};

// Tarih formatlaması
const formatDate = (dateString) => {
  if (!dateString) return "Bilinmeyen";
  
  try {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${day}/${month}/${year}`;
  } catch (e) {
    return dateString;
  }
};

export default function DrugDatabasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [drugDetails, setDrugDetails] = useState(null);
  const [adverseEvents, setAdverseEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [recalls, setRecalls] = useState([]);
  const [isLoadingRecalls, setIsLoadingRecalls] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  
  // Redux store'dan auth token'ı al
  const { token } = useSelector((state) => state.auth);
  
  // API istekleri için kullanılacak headers
  const getAuthHeaders = () => {
    return token ? { 
      Authorization: `Bearer ${token}` 
    } : {};
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Lütfen bir ilaç adı girin');
      return;
    }

    setError('');
    setIsSearching(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/drugs`, {
        params: { q: searchQuery.trim(), limit: 10 },
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        setSearchResults(response.data.drugs || []);
        setTotalResults(response.data.total || 0);
      } else {
        setError(response.data.message || 'Arama sırasında bir hata oluştu');
        setSearchResults([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError('API isteği sırasında bir hata oluştu: ' + (err.response?.data?.message || err.message));
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setTotalResults(0);
    setError('');
  };

  const handleViewDetails = async (drug) => {
    setSelectedDrug(drug);
    setCurrentTab(0);
    setOpenDetailDialog(true);
    setIsLoadingDetails(true);
    setDrugDetails(null);
    setAdverseEvents([]);
    setRecalls([]);

    try {
      const response = await axios.get(`${API_BASE_URL}/drugs/${drug.id}`, {
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        setDrugDetails(response.data.drug);
      } else {
        setError('İlaç detayları alınamadı: ' + (response.data.message || 'Bilinmeyen hata'));
      }
    } catch (err) {
      setError('İlaç detayları alınırken hata oluştu: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCloseDetails = () => {
    setOpenDetailDialog(false);
    setTimeout(() => {
      setSelectedDrug(null);
      setDrugDetails(null);
      setAdverseEvents([]);
      setRecalls([]);
      setCurrentTab(0);
    }, 300);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    
    // Yan etkiler sekmesine geçildiğinde ve daha önce yüklenmemişse verileri getir
    if (newValue === 1 && adverseEvents.length === 0 && selectedDrug) {
      loadAdverseEvents();
    }
    
    // Geri çağırma bildirimleri sekmesine geçildiğinde ve daha önce yüklenmemişse verileri getir
    if (newValue === 2 && recalls.length === 0 && selectedDrug) {
      loadDrugRecalls();
    }
  };

  const loadAdverseEvents = async () => {
    if (!selectedDrug) return;
    
    setIsLoadingEvents(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/adverse-events`, {
        params: { drug: selectedDrug.genericName, limit: 10 },
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        setAdverseEvents(response.data.events || []);
      } else {
        setError('Yan etki raporları alınamadı: ' + (response.data.message || 'Bilinmeyen hata'));
      }
    } catch (err) {
      setError('Yan etki raporları alınırken hata oluştu: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const loadDrugRecalls = async () => {
    if (!selectedDrug) return;
    
    setIsLoadingRecalls(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/drug-recalls`, {
        params: { drug: selectedDrug.genericName, limit: 10 },
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        setRecalls(response.data.recalls || []);
      } else {
        setError('Geri çağırma bildirimleri alınamadı: ' + (response.data.message || 'Bilinmeyen hata'));
      }
    } catch (err) {
      setError('Geri çağırma bildirimleri alınırken hata oluştu: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoadingRecalls(false);
    }
  };

  // İlaç detayları içeriği
  const renderDrugDetailsContent = () => {
    if (isLoadingDetails) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!drugDetails) {
      return (
        <Alert severity="info">İlaç detayları yüklenirken bir hata oluştu.</Alert>
      );
    }

    return (
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Genel Bilgiler
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2">Marka Adı</Typography>
              <Typography variant="body1" gutterBottom>{drugDetails.brandName}</Typography>
              
              <Typography variant="subtitle2">Jenerik Adı</Typography>
              <Typography variant="body1" gutterBottom>{drugDetails.genericName}</Typography>
              
              <Typography variant="subtitle2">Üretici</Typography>
              <Typography variant="body1" gutterBottom>{drugDetails.manufacturerName}</Typography>
              
              <Typography variant="subtitle2">Aktif Bileşenler</Typography>
              <Typography variant="body1" gutterBottom>
                {drugDetails.activeIngredients?.join(', ') || 'Belirtilmemiş'}
              </Typography>
              
              <Typography variant="subtitle2">Form</Typography>
              <Typography variant="body1" gutterBottom>{drugDetails.dosageForm}</Typography>
              
              <Typography variant="subtitle2">Kullanım Şekli</Typography>
              <Typography variant="body1" gutterBottom>{drugDetails.route}</Typography>
              
              <Typography variant="subtitle2">Açıklama</Typography>
              <Typography variant="body1">{drugDetails.description}</Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Tıbbi Bilgiler
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2">Endikasyonlar</Typography>
              <List dense sx={{ mb: 2 }}>
                {drugDetails.indications?.map((indication, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={indication} />
                  </ListItem>
                )) || <ListItem><ListItemText primary="Belirtilmemiş" /></ListItem>}
              </List>
              
              <Typography variant="subtitle2">Uyarılar</Typography>
              <List dense sx={{ mb: 2 }}>
                {drugDetails.warnings?.map((warning, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={warning} />
                  </ListItem>
                )) || <ListItem><ListItemText primary="Belirtilmemiş" /></ListItem>}
              </List>
              
              <Typography variant="subtitle2">Kontrendikasyonlar</Typography>
              <List dense sx={{ mb: 2 }}>
                {drugDetails.contraindications?.map((contraindication, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={contraindication} />
                  </ListItem>
                )) || <ListItem><ListItemText primary="Belirtilmemiş" /></ListItem>}
              </List>
              
              <Typography variant="subtitle2">İlaç Etkileşimleri</Typography>
              <List dense>
                {drugDetails.drugInteractions?.map((interaction, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={interaction} />
                  </ListItem>
                )) || <ListItem><ListItemText primary="Belirtilmemiş" /></ListItem>}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Dozaj ve Kullanım
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                {drugDetails.dosageAdministration?.map((dosage, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={dosage} />
                  </ListItem>
                )) || <ListItem><ListItemText primary="Belirtilmemiş" /></ListItem>}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Yan etkiler içeriği
  const renderAdverseEventsContent = () => {
    if (isLoadingEvents) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (adverseEvents.length === 0) {
      return (
        <Alert severity="info">Bu ilaç için yan etki raporu bulunmamaktadır.</Alert>
      );
    }

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rapor ID</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Ciddiyet</TableCell>
              <TableCell>Hasta</TableCell>
              <TableCell>Reaksiyon</TableCell>
              <TableCell>Sonuç</TableCell>
              <TableCell>Endikasyon</TableCell>
              <TableCell>Dozaj</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adverseEvents.map((event) => (
              <TableRow key={event.reportId}>
                <TableCell>{event.reportId}</TableCell>
                <TableCell>{formatDate(event.receiveDate)}</TableCell>
                <TableCell>
                  <Chip 
                    size="small" 
                    color={event.seriousness === "1" ? "error" : event.seriousness === "2" ? "warning" : "success"}
                    label={formatSeriousness(event.seriousness)} 
                  />
                </TableCell>
                <TableCell>{`${event.patientAge} yaş, ${event.patientSex === "M" ? "Erkek" : "Kadın"}`}</TableCell>
                <TableCell>
                  {event.reactions?.map((reaction, index) => (
                    <div key={index}>{reaction.reactionName}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {event.reactions?.map((reaction, index) => (
                    <div key={index}>{formatOutcome(reaction.outcome)}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {event.drugs?.map((drug, index) => (
                    <div key={index}>{drug.indication}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {event.drugs?.map((drug, index) => (
                    <div key={index}>{drug.dosage}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Geri çağırma bildirimleri içeriği
  const renderRecallsContent = () => {
    if (isLoadingRecalls) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (recalls.length === 0) {
      return (
        <Alert severity="info">Bu ilaç için geri çağırma bildirimi bulunmamaktadır.</Alert>
      );
    }

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Geri Çağırma ID</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Ürün</TableCell>
              <TableCell>Neden</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Sınıflandırma</TableCell>
              <TableCell>Şirket</TableCell>
              <TableCell>Dağıtım Bölgesi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recalls.map((recall) => (
              <TableRow key={recall.recallId}>
                <TableCell>{recall.recallId}</TableCell>
                <TableCell>{formatDate(recall.recallInitiationDate)}</TableCell>
                <TableCell>{recall.product}</TableCell>
                <TableCell>{recall.reason}</TableCell>
                <TableCell>
                  <Chip 
                    size="small" 
                    color={recall.status === "Ongoing" ? "error" : "success"}
                    label={recall.status} 
                  />
                </TableCell>
                <TableCell>{recall.classification}</TableCell>
                <TableCell>{recall.company}</TableCell>
                <TableCell>{recall.distributionPattern}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          İlaç Veritabanı
        </Typography>
        <Typography variant="body1" color="text.secondary">
          OpenFDA API ile ilaçlar hakkında bilgi arayın ve detaylı bilgilere erişin.
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="İlaç adı girin (örn: aspirin)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={isSearching}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            sx={{ minWidth: 100 }}
          >
            {isSearching ? <CircularProgress size={24} /> : "Ara"}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isSearching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : searchResults.length > 0 ? (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            "{searchQuery}" için {totalResults} sonuç bulundu
          </Typography>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Marka Adı</TableCell>
                  <TableCell>Jenerik Adı</TableCell>
                  <TableCell>Üretici</TableCell>
                  <TableCell>Form</TableCell>
                  <TableCell>Kullanım Şekli</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((drug) => (
                  <TableRow key={drug.id}>
                    <TableCell>{drug.brandName}</TableCell>
                    <TableCell>{drug.genericName}</TableCell>
                    <TableCell>{drug.manufacturerName}</TableCell>
                    <TableCell>{drug.dosageForm}</TableCell>
                    <TableCell>{drug.route}</TableCell>
                    <TableCell align="right">
                      <Button
                        startIcon={<InfoIcon />}
                        onClick={() => handleViewDetails(drug)}
                        size="small"
                      >
                        Detaylar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : searchQuery && !isSearching ? (
        <Alert severity="info">Arama kriterlerinize uygun sonuç bulunamadı.</Alert>
      ) : null}

      {/* İlaç Detay Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetails}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedDrug?.brandName || 'İlaç Detayları'}
          <Typography variant="subtitle2" color="text.secondary">
            {selectedDrug?.genericName}
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab 
              icon={<MedicineIcon />} 
              label="İlaç Bilgileri" 
              iconPosition="start"
            />
            <Tab 
              icon={<WarningIcon />} 
              label="Yan Etki Raporları" 
              iconPosition="start"
            />
            <Tab 
              icon={<ReportIcon />} 
              label="Geri Çağırma Bildirimleri" 
              iconPosition="start"
            />
          </Tabs>

          {currentTab === 0 && renderDrugDetailsContent()}
          {currentTab === 1 && renderAdverseEventsContent()}
          {currentTab === 2 && renderRecallsContent()}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDetails}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
} 