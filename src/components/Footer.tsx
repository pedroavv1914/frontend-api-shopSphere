import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { GridContainer, GridItem } from './GridSystem';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        color: '#1E293B',
        py: 8,
        mt: 'auto',
        borderTop: '3px solid',
        borderColor: '#1B8A5A',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(to right, #1B8A5A 33%, #FFFFFF 33%, #FFFFFF 66%, #D32F2F 66%)',
          display: { xs: 'none', md: 'block' }
        }
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <GridContainer spacing={4}>
          <GridItem xs={12} sm={4}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ color: '#1B8A5A', mr: 1 }}>🛍️</Box>
              <Box component="span" sx={{ color: '#1B8A5A' }}>Shop</Box>
              <Box component="span" sx={{ color: '#D32F2F' }}>Sphere</Box>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 3, color: 'text.secondary', maxWidth: '90%' }}>
              Your one-stop destination for quality products at affordable prices.
              Discover a world of shopping possibilities with ShopSphere.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <IconButton 
                aria-label="Facebook"
                sx={{ 
                  backgroundColor: 'rgba(27, 138, 90, 0.08)', 
                  color: '#1B8A5A',
                  '&:hover': { 
                    backgroundColor: 'rgba(27, 138, 90, 0.15)',
                    color: '#006837'
                  } 
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton 
                aria-label="Twitter"
                sx={{ 
                  backgroundColor: 'rgba(27, 138, 90, 0.08)', 
                  color: '#1B8A5A',
                  '&:hover': { 
                    backgroundColor: 'rgba(27, 138, 90, 0.15)',
                    color: '#006837'
                  } 
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton 
                aria-label="Instagram"
                sx={{ 
                  backgroundColor: 'rgba(211, 47, 47, 0.08)', 
                  color: '#D32F2F',
                  '&:hover': { 
                    backgroundColor: 'rgba(211, 47, 47, 0.15)',
                    color: '#9A0007'
                  } 
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton 
                aria-label="LinkedIn"
                sx={{ 
                  backgroundColor: 'rgba(211, 47, 47, 0.08)', 
                  color: '#D32F2F',
                  '&:hover': { 
                    backgroundColor: 'rgba(211, 47, 47, 0.15)',
                    color: '#9A0007'
                  } 
                }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
            </Box>
          </GridItem>
          
          <GridItem xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link 
                component={RouterLink} 
                to="/" 
                color="text.secondary" 
                sx={{ 
                  display: 'block', 
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                  fontWeight: 500
                }}
              >
                Home
              </Link>
              <Link 
                component={RouterLink} 
                to="/products" 
                color="text.secondary" 
                sx={{ 
                  display: 'block', 
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                  fontWeight: 500
                }}
              >
                Products
              </Link>
              <Link 
                component={RouterLink} 
                to="/cart" 
                color="text.secondary" 
                sx={{ 
                  display: 'block', 
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                  fontWeight: 500
                }}
              >
                Cart
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                color="text.secondary" 
                sx={{ 
                  display: 'block', 
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                  fontWeight: 500
                }}
              >
                About Us
              </Link>
              <Link 
                component={RouterLink} 
                to="/contact" 
                color="text.secondary" 
                sx={{ 
                  display: 'block', 
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                  fontWeight: 500
                }}
              >
                Contact
              </Link>
            </Box>
          </GridItem>
          
          <GridItem xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
              123 Shopping Avenue
              <br />
              Retail District, RS 12345
              <br />
              Brazil
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              Email: <Link href="mailto:info@shopsphere.com" color="primary" sx={{ textDecoration: 'none', fontWeight: 500 }}>info@shopsphere.com</Link>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
              Phone: <Box component="span" sx={{ fontWeight: 500 }}>+55 (123) 456-7890</Box>
            </Typography>
          </GridItem>
        </GridContainer>
        
        <Box mt={8} pt={3} sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
            {'© '}
            {new Date().getFullYear()}
            {' ShopSphere. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
