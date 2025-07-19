import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu, Home, Plus, LogIn, UserPlus, LogOut } from 'lucide-react';

const drawerWidth = 240;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = !!localStorage.getItem('access');
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getItemStyles = (path) => ({
    bgcolor: location.pathname === path ? '#0066ff' : 'transparent',
    color: location.pathname === path ? 'white' : 'inherit',
    borderRadius: 2,
    mx: 1,
    my: 0.5,
    '&:hover': {
      bgcolor: location.pathname === path ? '#0052cc' : '#d0e5ff',
    },
  });

  const getIconColor = (path) => ({
    color: location.pathname === path ? 'white' : 'inherit',
  });


  const drawer = (
    <Box onClick={isMobile ? handleDrawerToggle : undefined} sx={{ p: 1 }}>
      <Toolbar />
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          selected={location.pathname === '/'}
          sx={getItemStyles('/')}
        >
          <ListItemIcon sx={getIconColor('/')}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/add"
          selected={location.pathname === '/add'}
          sx={getItemStyles('/add')}
        >
          <ListItemIcon sx={getIconColor('/add')}>
            <Plus />
          </ListItemIcon>
          <ListItemText primary="Add Task" />
        </ListItem>

        {!isAuthenticated && (
          <>
            <ListItem
              button
              component={Link}
              to="/login"
              selected={location.pathname === '/login'}
              sx={getItemStyles('/login')}
            >
              <ListItemIcon sx={getIconColor('/login')}>
                <LogIn />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/register"
              selected={location.pathname === '/register'}
              sx={getItemStyles('/register')}
            >
              <ListItemIcon sx={getIconColor('/register')}>
                <UserPlus />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#0066ff',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              Task Manager
            </Typography>
          </Box>
          {isAuthenticated && (
            <IconButton color="inherit" onClick={logout}>
              <LogOut />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      {!isMobile ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#e8eaef',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#fafafa',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Navbar;
