import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider, 
  Link, 
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Google as GoogleIcon, 
  Facebook as FacebookIcon 
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from '../components/PageTitle';

interface LocationState {
  from?: string;
  message?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from || '/';
  const message = state?.message || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate(from);
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <PageTitle 
        title="Login" 
        breadcrumbs={[{ name: 'Login' }]}
      />
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 450,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to continue to ShopSphere
          </Typography>
          
          {message && (
            <Alert severity="info" sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ py: 1 }}
            >
              Continue with Google
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ py: 1 }}
            >
              Continue with Facebook
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
