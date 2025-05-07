import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalPharmacy as MedicineIcon,
  People as PatientsIcon,
  Assignment as PrescriptionsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAVBAR_HEIGHT } from './Navbar';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'İlaç Yönetimi', icon: <MedicineIcon />, path: '/medicines' },
  { text: 'Hasta Yönetimi', icon: <PatientsIcon />, path: '/patients' },
  { text: 'Reçeteler', icon: <PrescriptionsIcon />, path: '/prescriptions' },
  { text: 'Raporlar', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings' },
];

const drawerWidth = 240;

export default function Sidebar({ open, variant, onClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const drawer = (
    <Box>
      <Box sx={{ height: NAVBAR_HEIGHT }} />
      <List sx={{ py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                py: 1.2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            pt: 0,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
