import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  LocalPharmacy,
  People,
  Assignment,
  Timeline,
  Settings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'İlaçlar', icon: <LocalPharmacy />, path: '/medicines' },
  { text: 'Hastalar', icon: <People />, path: '/patients' },
  { text: 'Reçeteler', icon: <Assignment />, path: '/prescriptions' },
  { text: 'Raporlar', icon: <Timeline />, path: '/reports' },
  { text: 'Ayarlar', icon: <Settings />, path: '/settings' },
];

export default function Sidebar({ open, variant = 'permanent' }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant={variant}
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  borderRight: '3px solid',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.primary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
