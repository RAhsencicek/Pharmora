import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MedicineBottle from '../components/3d/MedicineBottle';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      // API çağrısı burada yapılacak
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Ürün yüklenemedi');
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Yükleniyor...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>Ürün bulunamadı</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Sol Kolon - 3D Model ve Resimler */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <MedicineBottle position={[0, 0, 0]} />
              <OrbitControls />
            </Canvas>
          </Paper>
        </Grid>

        {/* Sağ Kolon - Ürün Bilgileri */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label={product.category} color="primary" />
              <Chip
                label={`Son Kullanma: ${product.expiryDate}`}
                color="secondary"
              />
            </Stack>

            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              {product.price} TL
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Ürün Detayları */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Ürün Detayları
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Etken Madde
                  </Typography>
                  <Typography variant="body1">
                    {product.activeIngredient}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Stok Durumu
                  </Typography>
                  <Typography variant="body1">
                    {product.stockQuantity} Adet
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Üretici
                  </Typography>
                  <Typography variant="body1">{product.manufacturer}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Barkod
                  </Typography>
                  <Typography variant="body1">{product.barcode}</Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Eczane Bilgileri */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Eczane Bilgileri
              </Typography>
              <Typography variant="body1">{product.pharmacy.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.pharmacy.address}
              </Typography>
            </Box>

            {/* Aksiyon Butonları */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="primary"
              >
                Teklif Ver
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                color="primary"
              >
                İletişime Geç
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
