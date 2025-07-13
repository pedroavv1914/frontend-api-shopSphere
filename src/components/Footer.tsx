import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { GridContainer, GridItem } from './GridSystem';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#1a237e',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <GridContainer spacing={4}>
          <GridItem xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              🛍️ ShopSphere
            </Typography>
            <Typography variant="body2">
              Your one-stop destination for quality products at affordable prices.
              Discover a world of shopping possibilities with ShopSphere.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </GridItem>
          
          <GridItem xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link component={RouterLink} to="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Home
              </Link>
              <Link component={RouterLink} to="/products" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Products
              </Link>
              <Link component={RouterLink} to="/cart" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Cart
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" sx={{ display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Contact
              </Link>
            </Box>
          </GridItem>
          
          <GridItem xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              123 Shopping Avenue
              <br />
              Retail District, RS 12345
              <br />
              Brazil
            </Typography>
            <Typography variant="body2">
              Email: <Link href="mailto:info@shopsphere.com" color="inherit">info@shopsphere.com</Link>
            </Typography>
            <Typography variant="body2">
              Phone: +55 (123) 456-7890
            </Typography>
          </GridItem>
        </GridContainer>
        
        <Box mt={5}>
          <Typography variant="body2" align="center">
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
