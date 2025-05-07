import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Tab,
  Tabs,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  LocalPharmacy,
  People,
  Timeline,
} from '@mui/icons-material';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import Layout from '../components/Layout';

// Örnek veriler
const salesData = [
  { id: "Günlük Satış", data: Array.from({ length: 7 }, (_, i) => ({ x: `Gün ${i + 1}`, y: Math.floor(Math.random() * 5000) + 2000 })) },
  { id: "Haftalık Ortalama", data: Array.from({ length: 7 }, () => ({ x: "Gün", y: 3500 })) },
];

const stockDistribution = [
  { id: "Antibiyotik", value: 25, color: "hsl(45, 70%, 50%)" },
  { id: "Ağrı Kesici", value: 20, color: "hsl(96, 70%, 50%)" },
  { id: "Vitamin", value: 15, color: "hsl(148, 70%, 50%)" },
  { id: "Tansiyon", value: 12, color: "hsl(200, 70%, 50%)" },
  { id: "Diğer", value: 28, color: "hsl(270, 70%, 50%)" },
];

const patientStats = [
  { month: "Ocak", "Yeni Hasta": 65, "Tekrar Eden": 45 },
  { month: "Şubat", "Yeni Hasta": 55, "Tekrar Eden": 50 },
  { month: "Mart", "Yeni Hasta": 70, "Tekrar Eden": 55 },
  { month: "Nisan", "Yeni Hasta": 85, "Tekrar Eden": 60 },
  { month: "Mayıs", "Yeni Hasta": 75, "Tekrar Eden": 65 },
];

const topSellingMeds = [
  { name: "Augmentin 1000mg", sales: 245, revenue: 12250 },
  { name: "Parol 500mg", sales: 320, revenue: 9600 },
  { name: "Cipro 500mg", sales: 180, revenue: 7200 },
  { name: "Voltaren 75mg", sales: 210, revenue: 6300 },
  { name: "B12 Vitamini", sales: 150, revenue: 4500 },
];

export default function ReportsPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const SalesChart = () => (
    <Box sx={{ height: 400 }}>
      <ResponsiveLine
        data={salesData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: v => `₺${v}`,
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
          }
        ]}
        theme={{
          axis: { ticks: { text: { fill: theme.palette.text.primary } } },
          grid: { line: { stroke: theme.palette.divider } },
          legends: { text: { fill: theme.palette.text.primary } },
        }}
      />
    </Box>
  );

  const StockChart = () => (
    <Box sx={{ height: 400 }}>
      <ResponsivePie
        data={stockDistribution}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.text.primary}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        theme={{
          legends: { text: { fill: theme.palette.text.primary } },
        }}
      />
    </Box>
  );

  const PatientChart = () => (
    <Box sx={{ height: 400 }}>
      <ResponsiveBar
        data={patientStats}
        keys={['Yeni Hasta', 'Tekrar Eden']}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
          }
        ]}
        theme={{
          axis: { ticks: { text: { fill: theme.palette.text.primary } } },
          grid: { line: { stroke: theme.palette.divider } },
          legends: { text: { fill: theme.palette.text.primary } },
        }}
      />
    </Box>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Satış Grafiği</Typography>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel>Zaman Aralığı</InputLabel>
                    <Select value={timeRange} onChange={handleTimeRangeChange} label="Zaman Aralığı">
                      <MenuItem value="week">Haftalık</MenuItem>
                      <MenuItem value="month">Aylık</MenuItem>
                      <MenuItem value="year">Yıllık</MenuItem>
                    </Select>
                  </FormControl>
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
                  <SalesChart />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>En Çok Satan İlaçlar</Typography>
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>İlaç Adı</TableCell>
                        <TableCell align="right">Satış Adedi</TableCell>
                        <TableCell align="right">Gelir</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topSellingMeds.map((med) => (
                        <TableRow key={med.name}>
                          <TableCell>{med.name}</TableCell>
                          <TableCell align="right">{med.sales}</TableCell>
                          <TableCell align="right">₺{med.revenue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Stok Dağılımı</Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <StockChart />
              </Paper>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Hasta İstatistikleri</Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <PatientChart />
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Raporlar ve Analizler
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Eczanenizin performans ve stok analizlerini buradan inceleyebilirsiniz.
        </Typography>
      </Box>

      <Paper 
        elevation={0}
        sx={{ 
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Satış Analizi" icon={<TrendingUp />} iconPosition="start" />
          <Tab label="Stok Dağılımı" icon={<LocalPharmacy />} iconPosition="start" />
          <Tab label="Hasta İstatistikleri" icon={<People />} iconPosition="start" />
          <Tab label="Trend Analizi" icon={<Timeline />} iconPosition="start" />
        </Tabs>
      </Paper>

      {renderTabContent()}
    </Layout>
  );
}
