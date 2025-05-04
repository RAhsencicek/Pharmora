import { ResponsiveLine } from '@nivo/line';
import { Box, Paper, Typography } from '@mui/material';

const data = [
  {
    id: "reçeteler",
    color: "hsl(145, 70%, 50%)",
    data: [
      { x: "Pzt", y: 45 },
      { x: "Sal", y: 38 },
      { x: "Çar", y: 52 },
      { x: "Per", y: 42 },
      { x: "Cum", y: 48 },
      { x: "Cmt", y: 35 },
      { x: "Paz", y: 30 },
    ],
  },
  {
    id: "satışlar",
    color: "hsl(211, 70%, 50%)",
    data: [
      { x: "Pzt", y: 2800 },
      { x: "Sal", y: 2350 },
      { x: "Çar", y: 3100 },
      { x: "Per", y: 2900 },
      { x: "Cum", y: 3500 },
      { x: "Cmt", y: 2100 },
      { x: "Paz", y: 1800 },
    ],
  },
];

export default function ActivityChart() {
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
        Haftalık Aktivite
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
          }}
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
            axis: {
              ticks: {
                text: {
                  fill: '#888'
                }
              }
            },
            grid: {
              line: {
                stroke: '#444',
                strokeWidth: 1
              }
            },
            legends: {
              text: {
                fill: '#888'
              }
            }
          }}
        />
      </Box>
    </Paper>
  );
}
