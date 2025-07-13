import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from '../components/PageTitle';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Validate passwords if trying to change password
    if (newPassword) {
      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }
      
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }
      
      if (!currentPassword) {
        setError('Current password is required to change password');
        return;
      }
    }
    
    setLoading(true);
    
    try {
      if (updateProfile) {
        await updateProfile(name, email, currentPassword || undefined, newPassword || undefined);
        setSuccess('Profile updated successfully');
      } else {
        throw new Error('Update profile function not available');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <PageTitle 
        title="My Profile" 
        subtitle="Manage your account information"
        breadcrumbs={[{ name: 'Profile' }]}
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
      
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                textAlign: 'center',
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
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: 'auto',
                  mb: 2,
                  bgcolor: '#1B8A5A',
                  fontSize: '3rem'
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {user?.name}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {user?.email}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary">
                Member since: {new Date().toLocaleDateString()}
              </Typography>
            </Paper>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
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
                }
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Edit Profile
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleUpdateProfile}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1B8A5A',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1B8A5A',
                        }
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1B8A5A',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1B8A5A',
                        }
                      }}
                    />
                  </Box>
                </Box>
                
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Change Password
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1B8A5A',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1B8A5A',
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#1B8A5A',
                            }
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1B8A5A',
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#1B8A5A',
                            }
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#1B8A5A',
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      px: 4,
                      backgroundColor: '#1B8A5A',
                      '&:hover': {
                        backgroundColor: '#006837',
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
