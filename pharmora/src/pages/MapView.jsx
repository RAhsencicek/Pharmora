import { useEffect } from 'react';
import { Box, Container, Paper, TextField, Slider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPharmaciesStart,
  fetchPharmaciesSuccess,
  fetchPharmaciesFailure,
  updateFilters,
} from '../store/slices/mapSlice';
import 'leaflet/dist/leaflet.css';

// Leaflet icon için gerekli düzeltme
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export default function MapView() {
  const dispatch = useDispatch();
  const { pharmacies, center, zoom, loading, error, filters } = useSelector(
    (state) => state.map
  );

  useEffect(() => {
    fetchPharmacies();
  }, [filters]);

  const fetchPharmacies = async () => {
    dispatch(fetchPharmaciesStart());
    try {
      // API çağrısı burada yapılacak
      const response = await fetch('/api/pharmacies?' + new URLSearchParams({
        radius: filters.radius,
        medicineType: filters.medicineType,
        availability: filters.availability,
      }));

      if (!response.ok) {
        throw new Error('Eczaneler yüklenemedi');
      }

      const data = await response.json();
      dispatch(fetchPharmaciesSuccess(data));
    } catch (err) {
      dispatch(fetchPharmaciesFailure(err.message));
    }
  };

  const handleFilterChange = (name) => (event) => {
    dispatch(updateFilters({ [name]: event.target.value }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Filtreler */}
        <Paper sx={{ p: 2, width: 300 }}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>İlaç Türü</InputLabel>
              <Select
                value={filters.medicineType}
                label="İlaç Türü"
                onChange={handleFilterChange('medicineType')}
              >
                <MenuItem value="">Tümü</MenuItem>
                <MenuItem value="antibiyotik">Antibiyotik</MenuItem>
                <MenuItem value="agriKesici">Ağrı Kesici</MenuItem>
                <MenuItem value="vitamin">Vitamin</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <InputLabel>Arama Yarıçapı (km)</InputLabel>
            <Slider
              value={filters.radius / 1000} // metre to km
              onChange={(e, value) =>
                dispatch(updateFilters({ radius: value * 1000 }))
              }
              min={1}
              max={50}
              valueLabelDisplay="auto"
            />
          </Box>
        </Paper>

        {/* Harita */}
        <Paper sx={{ flexGrow: 1, height: '70vh', overflow: 'hidden' }}>
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pharmacies.map((pharmacy) => (
              <Marker
                key={pharmacy.id}
                position={[pharmacy.lat, pharmacy.lng]}
              >
                <Popup>
                  <div>
                    <h3>{pharmacy.name}</h3>
                    <p>{pharmacy.address}</p>
                    <strong>Mevcut İlaçlar:</strong>
                    <ul>
                      {pharmacy.medicines.map((medicine) => (
                        <li key={medicine.id}>
                          {medicine.name} - {medicine.price} TL
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Paper>
      </Box>
    </Container>
  );
}
