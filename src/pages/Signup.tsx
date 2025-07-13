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
    Facebook as FacebookIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from '../components/PageTitle';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    // Validações
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateName = () => {
        if (!name.trim()) {
            setNameError('Name is required');
            return false;
        } else if (name.trim().length < 3) {
            setNameError('Name must be at least 3 characters');
            return false;
        }
        setNameError('');
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required');
            return false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            return false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Reset error state
        setError('');
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            return;
        }
        
        setLoading(true);
        
        try {
            await register(name, email, password);
            setSuccess(true);
            // Redirect to login after successful registration
            setTimeout(() => {
                navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageTitle 
                title="Create Account" 
                subtitle="Join ShopSphere and start shopping today"
                breadcrumbs={[{ name: 'Sign Up' }]}
                sx={{
                    '& .MuiTypography-h4': {
                        color: '#1B8A5A',
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: 0,
                            width: '60px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #1B8A5A 0%, #FFFFFF 50%, #D32F2F 100%)',
                            borderRadius: '2px'
                        }
                    }
                }}
            />
            
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 5
                }}
            >
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 6, 
                        width: '100%', 
                        maxWidth: 550,
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            background: 'linear-gradient(90deg, #1B8A5A 0%, #FFFFFF 50%, #D32F2F 100%)'
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            background: 'linear-gradient(90deg, #D32F2F 0%, #FFFFFF 50%, #1B8A5A 100%)'
                        }
                    }}
                >
                    <Typography 
                        variant="h5" 
                        component="h1" 
                        align="center" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 'bold',
                            color: '#1B8A5A',
                            mb: 4
                        }}
                    >
                        Create Your Account
                    </Typography>
                    
                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ mb: 3, borderRadius: 2 }}
                        >
                            {error}
                        </Alert>
                    )}
                    
                    {success && (
                        <Alert 
                            severity="success" 
                            sx={{ mb: 3, borderRadius: 2 }}
                        >
                            Registration successful! Redirecting to login...
                        </Alert>
                    )}
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={validateName}
                            error={!!nameError}
                            helperText={nameError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: nameError ? '#D32F2F' : '#1B8A5A' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1B8A5A',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '16px 14px 16px 0',
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1B8A5A',
                                }
                            }}
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                            error={!!emailError}
                            helperText={emailError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: emailError ? '#D32F2F' : '#1B8A5A' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1B8A5A',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '16px 14px 16px 0',
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1B8A5A',
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword}
                            error={!!passwordError}
                            helperText={passwordError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: passwordError ? '#D32F2F' : '#1B8A5A' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1B8A5A',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '16px 14px 16px 0',
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1B8A5A',
                                }
                            }}
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={validateConfirmPassword}
                            error={!!confirmPasswordError}
                            helperText={confirmPasswordError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: confirmPasswordError ? '#D32F2F' : '#1B8A5A' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 4,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1B8A5A',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '16px 14px 16px 0',
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1B8A5A',
                                }
                            }}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 2,
                                mb: 4,
                                py: 1.8,
                                backgroundColor: '#1B8A5A',
                                borderRadius: 2,
                                fontSize: '1.1rem',
                                fontWeight: 'medium',
                                boxShadow: '0 4px 10px rgba(27, 138, 90, 0.2)',
                                '&:hover': {
                                    backgroundColor: '#006837',
                                    boxShadow: '0 6px 15px rgba(27, 138, 90, 0.3)',
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                        
                        <Divider sx={{ 
                            my: 3,
                            '&::before, &::after': {
                                borderColor: 'rgba(27, 138, 90, 0.2)',
                            }
                        }}>
                            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                                OR
                            </Typography>
                        </Divider>
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            <Box>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
                                    sx={{
                                        py: 1.5,
                                        borderColor: 'rgba(0, 0, 0, 0.12)',
                                        color: '#1E293B',
                                        borderRadius: 2,
                                        '&:hover': {
                                            borderColor: 'rgba(0, 0, 0, 0.24)',
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    Google
                                </Button>
                            </Box>
                            <Box>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<FacebookIcon sx={{ color: '#4267B2' }} />}
                                    sx={{
                                        py: 1.5,
                                        borderColor: 'rgba(0, 0, 0, 0.12)',
                                        color: '#1E293B',
                                        borderRadius: 2,
                                        '&:hover': {
                                            borderColor: 'rgba(0, 0, 0, 0.24)',
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    Facebook
                                </Button>
                            </Box>
                        </Box>
                        
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link 
                                    component={RouterLink} 
                                    to="/login"
                                    sx={{ 
                                        color: '#D32F2F',
                                        fontWeight: 'medium',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Sign In
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default Signup;