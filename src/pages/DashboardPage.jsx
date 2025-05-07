import { Box, Typography, Grid, Paper, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from '../components/Layout';
import {
  TrendingUp as TrendingUpIcon,
  LocalPharmacy as MedicineIcon,
  People as PatientsIcon,
  Assignment as PrescriptionsIcon,
} from '@mui/icons-material';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

// Örnek veri
const statsCards = [
  { title: 'Günlük Satış', value: '₺4,250', icon: <TrendingUpIcon color="primary" fontSize="large" />, increase: '+15%' },
  { title: 'Toplam İlaç', value: '1,250', icon: <MedicineIcon color="primary" fontSize="large" />, increase: '+3%' },
  { title: 'Toplam Hasta', value: '350', icon: <PatientsIcon color="primary" fontSize="large" />, increase: '+12%' },
  { title: 'Bekleyen Reçeteler', value: '24', icon: <PrescriptionsIcon color="primary" fontSize="large" />, increase: '-8%' },
];

const recentActivities = [
  { id: 1, action: 'Yeni reçete eklendi', time: '10 dakika önce', user: 'Merve H.' },
  { id: 2, action: 'Stok güncellendi: Parol 500mg', time: '45 dakika önce', user: 'Selin K.' },
  { id: 3, action: 'Yeni hasta kaydı: Ahmet Yılmaz', time: '1 saat önce', user: 'Merve H.' },
  { id: 4, action: 'Reçete teslim edildi #RX-2023-245', time: '3 saat önce', user: 'Kerem A.' },
];

// Son reçeteler verisi
const recentPrescriptions = [
  { id: '1234', patient: 'Ahmet Yılmaz', medicine: 'Augmentin 1000mg', date: '04.05.2025' },
  { id: '1235', patient: 'Ayşe Demir', medicine: 'Parol 500mg', date: '04.05.2025' },
  { id: '1236', patient: 'Mehmet Kaya', medicine: 'Cipro 500mg', date: '04.05.2025' },
  { id: '1237', patient: 'Fatma Şahin', medicine: 'Voltaren 75mg', date: '04.05.2025' },
];

// Aktivite grafiği verisi
const activityChartData = [
  {
    id: "Günlük Satış (₺)",
    color: "hsl(211, 70%, 50%)",
    data: [
      { x: "Pzt", y: 4500, tooltip: "4.500 ₺" },
      { x: "Sal", y: 3850, tooltip: "3.850 ₺" },
      { x: "Çar", y: 5100, tooltip: "5.100 ₺" },
      { x: "Per", y: 4200, tooltip: "4.200 ₺" },
      { x: "Cum", y: 4800, tooltip: "4.800 ₺" },
      { x: "Cmt", y: 3500, tooltip: "3.500 ₺" },
      { x: "Paz", y: 3000, tooltip: "3.000 ₺" },
    ],
  },
];

// Reçete sayıları (ayrı grafik verisi olarak)
const prescriptionData = [
  {
    id: "Reçete Sayısı",
    color: "hsl(32, 70%, 50%)",
    data: [
      { x: "Pzt", y: 45, tooltip: "45 reçete" },
      { x: "Sal", y: 38, tooltip: "38 reçete" },
      { x: "Çar", y: 52, tooltip: "52 reçete" },
      { x: "Per", y: 42, tooltip: "42 reçete" },
      { x: "Cum", y: 48, tooltip: "48 reçete" },
      { x: "Cmt", y: 35, tooltip: "35 reçete" },
      { x: "Paz", y: 30, tooltip: "30 reçete" },
    ],
  }
];

// Stok dağılımı verileri
const stockChartData = [
  {
    id: "Antibiyotikler",
    label: "Antibiyotikler",
    value: 32,
    color: "hsl(194, 70%, 50%)"
  },
  {
    id: "Ağrı Kesiciler",
    label: "Ağrı Kesiciler",
    value: 27,
    color: "hsl(162, 70%, 50%)"
  },
  {
    id: "Vitaminler",
    label: "Vitaminler",
    value: 18,
    color: "hsl(43, 70%, 50%)"
  },
  {
    id: "Tansiyon İlaçları",
    label: "Tansiyon İlaçları",
    value: 13,
    color: "hsl(338, 70%, 50%)"
  },
  {
    id: "Diğer",
    label: "Diğer",
    value: 10,
    color: "hsl(269, 70%, 50%)"
  }
];

export default function DashboardPage() {
  const theme = useTheme();

  // Aktivite grafiği bileşeni
  const ActivityChart = () => (
    <Box sx={{ height: 250 }}>
      <ResponsiveLine
        data={activityChartData}
        margin={{ top: 30, right: 140, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        yFormat={value => 
          `₺${(value/1000).toFixed(1)}k`
        }
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Haftanın Günleri',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Satış (₺)',
          legendOffset: -50,
          legendPosition: 'middle',
          format: v => `${v/1000}k ₺`
        }}
        enableGridX={false}
        enableGridY={true}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.15}
        enableSlices="x"
        crosshairType="cross"
        useMesh={true}
        gridYValues={5}
        crosshairBorderColor={theme.palette.primary.main}
        crosshairOpacity={0.8}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.8,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        theme={{
          tooltip: {
            container: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '12px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              padding: '8px 12px',
            }
          },
          crosshair: {
            line: {
              stroke: theme.palette.primary.main,
              strokeWidth: 1.5,
              strokeOpacity: 0.8,
              strokeDasharray: '6 6'
            }
          },
          axis: {
            legend: {
              text: {
                fill: theme.palette.text.primary,
                fontSize: 12,
                fontWeight: 500
              }
            },
            ticks: {
              text: {
                fill: theme.palette.text.secondary,
                fontSize: 11
              },
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1
              }
            }
          },
          grid: {
            line: {
              stroke: theme.palette.divider,
              strokeWidth: 1,
              strokeDasharray: '4 4'
            }
          },
          legends: {
            text: {
              fill: theme.palette.text.secondary,
              fontSize: 11
            }
          }
        }}
        motionConfig="gentle"
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: theme.palette.background.paper,
                padding: '8px 12px',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                {slice.points[0].data.xFormatted}
              </div>
              {slice.points.map(point => (
                <div
                  key={point.id}
                  style={{
                    padding: '3px 0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: point.serieColor,
                      borderRadius: '50%',
                      marginRight: 8,
                    }}
                  />
                  <div style={{ marginRight: 6 }}>
                    {point.serieId}:
                  </div>
                  <div style={{ fontWeight: 'bold' }}>
                    {point.data.tooltip || `${(point.data.y/1000).toFixed(1)}k ₺`}
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      />
    </Box>
  );

  // Reçete grafiği bileşeni
  const PrescriptionChart = () => (
    <Box sx={{ height: 250 }}>
      <ResponsiveLine
        data={prescriptionData}
        margin={{ top: 30, right: 140, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        yFormat={value => `${value} adet`}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Haftanın Günleri',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Reçete Sayısı',
          legendOffset: -50,
          legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={true}
        colors={["#ff7c43"]}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.15}
        enableSlices="x"
        crosshairType="cross"
        useMesh={true}
        gridYValues={5}
        crosshairBorderColor={theme.palette.primary.main}
        crosshairOpacity={0.8}
        theme={{
          tooltip: {
            container: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '12px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              padding: '8px 12px',
            }
          },
          crosshair: {
            line: {
              stroke: theme.palette.primary.main,
              strokeWidth: 1.5,
              strokeOpacity: 0.8,
              strokeDasharray: '6 6'
            }
          },
          axis: {
            legend: {
              text: {
                fill: theme.palette.text.primary,
                fontSize: 12,
                fontWeight: 500
              }
            },
            ticks: {
              text: {
                fill: theme.palette.text.secondary,
                fontSize: 11
              },
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1
              }
            }
          },
          grid: {
            line: {
              stroke: theme.palette.divider,
              strokeWidth: 1,
              strokeDasharray: '4 4'
            }
          }
        }}
        motionConfig="gentle"
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: theme.palette.background.paper,
                padding: '8px 12px',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                {slice.points[0].data.xFormatted}
              </div>
              {slice.points.map(point => (
                <div
                  key={point.id}
                  style={{
                    padding: '3px 0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: point.serieColor,
                      borderRadius: '50%',
                      marginRight: 8,
                    }}
                  />
                  <div style={{ marginRight: 6 }}>
                    {point.serieId}:
                  </div>
                  <div style={{ fontWeight: 'bold' }}>
                    {point.data.tooltip || `${point.data.yFormatted} adet`}
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      />
    </Box>
  );

  // Stok dağılımı grafiği bileşeni
  const StockChart = () => (
    <Box sx={{ height: 300 }}>
      <ResponsivePie
        data={stockChartData}
        margin={{ top: 30, right: 40, bottom: 80, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        enableArcLabels={true}
        enableArcLinkLabels={true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.text.primary}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLinkLabelsDiagonalLength={18}
        arcLinkLabelsStraightLength={24}
        arcLabelsRadiusOffset={0.45}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="white"
        colors={{ scheme: 'paired' }}
        theme={{
          tooltip: {
            container: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '12px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              padding: '8px 12px',
            }
          },
          labels: {
            text: {
              fontSize: 13,
              fontWeight: 600,
              fill: 'white',
            }
          },
          legends: {
            text: {
              fill: theme.palette.text.secondary,
              fontSize: 11
            }
          }
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: theme.palette.text.secondary,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.text.primary
                }
              }
            ]
          }
        ]}
        arcLabel={d => `${d.value}%`}
        motionConfig="gentle"
        tooltip={({ datum }) => (
          <div
            style={{
              background: theme.palette.background.paper,
              padding: '8px 12px',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: datum.color,
                  borderRadius: '50%',
                  marginRight: 8,
                }}
              />
              <div style={{ fontWeight: 'bold', marginRight: 6 }}>
                {datum.label}:
              </div>
              <div>
                {datum.value}% ({Math.round(datum.value * 12)} ürün)
              </div>
            </div>
          </div>
        )}
      />
    </Box>
  );

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hoş geldiniz! Eczanenizin genel durumuna dair özet bilgiler burada görüntüleniyor.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography color="text.secondary" variant="subtitle2">
                  {card.title}
                </Typography>
                {card.icon}
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {card.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: card.increase.startsWith('+') ? 'success.main' : 'error.main',
                }}
              >
                {card.increase} bu hafta
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '380px',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Haftalık Satış Grafiği
            </Typography>
            <ActivityChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '380px',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Haftalık Reçete Sayıları
            </Typography>
            <PrescriptionChart />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Stok Dağılımı
            </Typography>
            <StockChart />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Son Aktiviteler
            </Typography>
            <Box sx={{ mt: 2 }}>
              {recentActivities.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-of-type': { borderBottom: 'none' },
                  }}
                >
                  <Typography variant="body2" component="div">
                    {activity.action}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                    <Typography variant="caption" color="primary">
                      {activity.user}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Stok Durumu
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Augmentin 1000mg</Typography>
                <Typography variant="body2" color={theme.palette.error.main}>
                  Kritik seviye (5 kutu)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Parol 500mg</Typography>
                <Typography variant="body2" color={theme.palette.success.main}>
                  Yeterli stok (120 kutu)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Cipro 500mg</Typography>
                <Typography variant="body2" color={theme.palette.warning.main}>
                  Az stok (15 kutu)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Voltaren 75mg</Typography>
                <Typography variant="body2" color={theme.palette.success.main}>
                  Yeterli stok (85 kutu)
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Son Reçeteler
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reçete No</TableCell>
                    <TableCell>Hasta</TableCell>
                    <TableCell>İlaç</TableCell>
                    <TableCell>Tarih</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPrescriptions.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.patient}</TableCell>
                      <TableCell>{row.medicine}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
