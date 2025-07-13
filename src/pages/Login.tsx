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
        sx={{
          mb: 6,
          '& .MuiTypography-h4': {
            color: '#1B8A5A',
            fontWeight: 'bold',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 3,
              background: 'linear-gradient(90deg, #1B8A5A 0%, #FFFFFF 50%, #D32F2F 100%)',
              borderRadius: 2
            }
          }
        }}
      />
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 6,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '10%',
            width: '80%',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(27,138,90,0) 0%, rgba(27,138,90,0.2) 50%, rgba(27,138,90,0) 100%)'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '10%',
            width: '80%',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(211,47,47,0) 0%, rgba(211,47,47,0.2) 50%, rgba(211,47,47,0) 100%)'
          }
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            pt: 4,
            width: '100%',
            maxWidth: 480,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(27, 138, 90, 0.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, #1B8A5A 0%, #FFFFFF 50%, #D32F2F 100%)'
            }
          }}
        >
          <Typography 
            variant="h5" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              color: '#1B8A5A', 
              fontWeight: 'bold',
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              width: '100%',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: '#D32F2F',
                borderRadius: 2
              }
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              mb: 4, 
              color: '#1E293B',
              fontWeight: 500
            }}
          >
            Sign in to continue to <span style={{ color: '#1B8A5A', fontWeight: 'bold' }}>Shop</span><span style={{ color: '#D32F2F', fontWeight: 'bold' }}>Sphere</span>
          </Typography>
          
          {message && (
            <Alert 
              severity="info" 
              sx={{ 
                mb: 4, 
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#1B8A5A'
                }
              }}
            >
              {message}
            </Alert>
          )}
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 4, 
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#D32F2F'
                }
              }}
            >
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
              sx={{
                mb: 3,
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': {
                    borderColor: 'rgba(27, 138, 90, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1B8A5A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1B8A5A',
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                }
              }}
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': {
                    borderColor: 'rgba(27, 138, 90, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1B8A5A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1B8A5A',
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ 
                        color: '#1B8A5A',
                        '&:hover': {
                          backgroundColor: 'rgba(27, 138, 90, 0.08)'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ textAlign: 'right', mt: 4, mb: 2 }}>
              <Link 
                component={RouterLink} 
                to="/forgot-password" 
                variant="body2"
                sx={{ 
                  color: '#D32F2F',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 4, 
                mb: 3, 
                py: 1.8,
                backgroundColor: '#1B8A5A',
                color: '#FFFFFF',
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(27, 138, 90, 0.3)',
                '&:hover': {
                  backgroundColor: '#006837',
                  boxShadow: '0 6px 16px rgba(27, 138, 90, 0.4)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Sign In'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 3, mb: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/Signup"
                  sx={{ 
                    color: '#1B8A5A',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 4 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#1E293B',
                px: 2,
                fontWeight: 500
              }}
            >
              OR
            </Typography>
          </Divider>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon sx={{ color: '#D32F2F' }} />}
              sx={{ 
                py: 1.5,
                borderColor: 'rgba(0,0,0,0.12)',
                color: '#1E293B',
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#D32F2F',
                  backgroundColor: 'rgba(211, 47, 47, 0.04)'
                }
              }}
            >
              Continue with Google
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon sx={{ color: '#1B8A5A' }} />}
              sx={{ 
                py: 1.5,
                borderColor: 'rgba(0,0,0,0.12)',
                color: '#1E293B',
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#1B8A5A',
                  backgroundColor: 'rgba(27, 138, 90, 0.04)'
                }
              }}
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
