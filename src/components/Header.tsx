import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Menu, 
  MenuItem, 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  AccountCircle, 
  Menu as MenuIcon,
  Home,
  Category,
  Dashboard,
  ExitToApp,
  Login
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, To } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <Category />, path: '/products' },
  ];

  const authMenuItems = isAuthenticated
    ? [
        { text: 'My Orders', icon: <ShoppingCartIcon />, path: '/orders' },
        ...(isAdmin ? [{ text: 'Dashboard', icon: <Dashboard />, path: '/admin' }] : []),
        { text: 'Logout', icon: <ExitToApp />, onClick: handleLogout }
      ]
    : [
        { text: 'Login', icon: <Login />, path: '/login' }
      ];

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.path} sx={{ cursor: 'pointer' }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {authMenuItems.map((item) => {
          if (item.path) {
            return (
              <ListItem 
                key={item.text} 
                component={RouterLink}
                to={item.path}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          } else {
            return (
              <ListItem 
                key={item.text} 
                component="div"
                onClick={item.onClick}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          }
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'background.paper', 
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ py: 1.5, px: { xs: 2, md: 4 } }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h5" 
            component={RouterLink} 
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'primary.main',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            🛍️ ShopSphere
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {menuItems.map((item) => (
                <Button 
                  key={item.text}
                  color="inherit" 
                  component={RouterLink} 
                  to={item.path}
                  sx={{ 
                    mx: 1.5, 
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      color: 'primary.main'
                    },
                    py: 1,
                    px: 2,
                    borderRadius: 2
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton 
              color="inherit" 
              component={RouterLink} 
              to="/cart"
              aria-label="cart"
              sx={{ 
                ml: 1, 
                backgroundColor: 'rgba(0,0,0,0.04)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.08)'
                },
                width: 42,
                height: 42
              }}
            >
              <Badge 
                badgeContent={totalItems} 
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontWeight: 'bold',
                    minWidth: '18px',
                    height: '18px'
                  }
                }}
              >
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </IconButton>

            {!isMobile && isAuthenticated ? (
              <>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/orders'); }}>
                    My Orders
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem onClick={() => { handleMenuClose(); navigate('/admin'); }}>
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : !isMobile && (
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </>
  );
};

export default Header;
