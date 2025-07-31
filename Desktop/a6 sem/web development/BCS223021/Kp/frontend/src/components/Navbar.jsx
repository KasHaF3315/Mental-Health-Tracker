import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navLinks = [
    { path: '/features', label: 'Features' },
    { path: '/adventure', label: 'Adventure' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          flexGrow: 1, 
          textDecoration: 'none', 
          color: 'inherit' 
        }}>
          QuestMate
        </Typography>

        {!isMobile && (
          <>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                color="inherit"
                component={RouterLink}
                to={link.path}
                sx={{
                  mx: 1,
                  color: location.pathname === link.path ? 'secondary.main' : 'inherit'
                }}
              >
                {link.label}
              </Button>
            ))}
          </>
        )}

        <IconButton color="inherit" onClick={toggleDarkMode}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 