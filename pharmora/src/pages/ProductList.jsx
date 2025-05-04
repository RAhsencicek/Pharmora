import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Pagination,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  updateFilters,
  updatePagination,
} from '../store/slices/productSlice';

const categories = [
  { value: '', label: 'Tüm Kategoriler' },
  { value: 'antibiyotik', label: 'Antibiyotik' },
  { value: 'agriKesici', label: 'Ağrı Kesici' },
  { value: 'vitamin', label: 'Vitamin' },
];

const sortOptions = [
  { value: 'date-desc', label: 'En Yeni' },
  { value: 'date-asc', label: 'En Eski' },
  { value: 'price-desc', label: 'Fiyat (Azalan)' },
  { value: 'price-asc', label: 'Fiyat (Artan)' },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error, filters, pagination } = useSelector(
    (state) => state.products
  );
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.page]);

  const fetchProducts = async () => {
    dispatch(fetchProductsStart());
    try {
      // API çağrısı burada yapılacak
      const response = await fetch('/api/products?' + new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        category: filters.category,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }));

      if (!response.ok) {
        throw new Error('Ürünler yüklenemedi');
      }

      const data = await response.json();
      dispatch(fetchProductsSuccess(data));
    } catch (err) {
      dispatch(fetchProductsFailure(err.message));
    }
  };

  const handleFilterChange = (e) => {
    dispatch(updateFilters({ [e.target.name]: e.target.value }));
  };

  const handlePageChange = (event, value) => {
    dispatch(updatePagination({ page: value }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Filtreler */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="search"
              label="İlaç Ara"
              value={filters.search}
              onChange={handleFilterChange}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              name="category"
              label="Kategori"
              value={filters.category}
              onChange={handleFilterChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              name="sortBy"
              label="Sıralama"
              value={filters.sortBy + '-' + filters.sortOrder}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                dispatch(updateFilters({ sortBy, sortOrder }));
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <IconButton
                color={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              >
                <GridIcon />
              </IconButton>
              <IconButton
                color={viewMode === 'list' ? 'primary' : 'default'}
                onClick={() => setViewMode('list')}
              >
                <ListIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Hata mesajı */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Ürün listesi */}
      <Grid container spacing={3}>
        {loading ? (
          <Typography>Yükleniyor...</Typography>
        ) : products.length === 0 ? (
          <Typography>Ürün bulunamadı</Typography>
        ) : (
          products.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={viewMode === 'grid' ? 6 : 12}
              md={viewMode === 'grid' ? 4 : 12}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: viewMode === 'grid' ? 'column' : 'row',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: viewMode === 'grid' ? '100%' : 200,
                    height: viewMode === 'grid' ? 200 : '100%',
                  }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {product.price} TL
                  </Typography>
                  <Button variant="contained" color="primary">
                    İncele
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Sayfalama */}
      {pagination.total > pagination.limit && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
