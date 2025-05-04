import { ResponsivePie } from '@nivo/pie';
import { Box, Paper, Typography } from '@mui/material';

const data = [
  {
    id: "Antibiyotikler",
    label: "Antibiyotikler",
    value: 35,
    color: "hsl(145, 70%, 50%)"
  },
  {
    id: "Ağrı Kesiciler",
    label: "Ağrı Kesiciler",
    value: 25,
    color: "hsl(211, 70%, 50%)"
  },
  {
    id: "Vitaminler",
    label: "Vitaminler",
    value: 20,
    color: "hsl(42, 70%, 50%)"
  },
  {
    id: "Diğer",
    label: "Diğer",
    value: 20,
    color: "hsl(300, 70%, 50%)"
  }
];

export default function StockChart() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: 400,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Stok Dağılımı
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#888"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]]
          }}
          theme={{
            legends: {
              text: {
                fill: '#888'
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
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#888',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#fff'
                  }
                }
              ]
            }
          ]}
        />
      </Box>
    </Paper>
  );
}
