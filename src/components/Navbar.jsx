import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  ExitToApp,
  Settings,
  Person,
} from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';

// Navbar yüksekliğini dışa aktarıyoruz, böylece diğer bileşenler kullanabilir
export const NAVBAR_HEIGHT = 64;

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  // Kullanıcı adının baş harfini alma fonksiyonu
  const getInitial = () => {
    if (!user || !user.name) return '?';
    return user.name.charAt(0).toUpperCase();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    // İleride profil sayfasına yönlendirme eklenecek
    // navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
    // İleride ayarlar sayfasına yönlendirme eklenecek
    // navigate('/settings');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        height: NAVBAR_HEIGHT,
      }}
    >
      <Toolbar sx={{ height: '100%' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          component="img"
          src="/pharmora-logo.png"
          alt="Pharmora Logo"
          sx={{
            height: 40,
            mr: 2,
            filter: 'brightness(0) invert(1)',
          }}
        />

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Pharmora Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Bildirimler">
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
          </Tooltip>

          <Tooltip title={user?.name ? `${user.name} ${user.surname || ''}` : 'Profil'}>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                }}
              >
                {getInitial()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 180,
              backgroundColor: 'background.paper',
              borderRadius: 1,
              boxShadow: 4,
              '& .MuiMenuItem-root': {
                py: 1,
              }
            }
          }}
        >
          <MenuItem onClick={handleProfile}>
            <Person sx={{ mr: 1 }} /> Profil
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <Settings sx={{ mr: 1 }} /> Ayarlar
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToApp sx={{ mr: 1 }} /> Çıkış Yap
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
