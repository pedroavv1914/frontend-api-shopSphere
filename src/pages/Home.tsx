import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { GridContainer, GridItem } from '../components/GridSystem';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingBag, LocalShipping, Security, Support } from '@mui/icons-material';
import api from '../services/api';
import { Product, Category } from '../types';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Get all products and take the first 8 as featured
      const productsResponse = await api.get<Product[]>('/products');
      setFeaturedProducts(productsResponse.data.slice(0, 8));
      
      // Get all categories
      const categoriesResponse = await api.get<Category[]>('/categories');
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const features = useMemo(() => [
    {
      icon: <ShoppingBag fontSize="large" />,
      title: 'Quality Products',
      description: 'Curated selection of high-quality items'
    },
    {
      icon: <LocalShipping fontSize="large" />,
      title: 'Fast Shipping',
      description: 'Quick delivery to your doorstep'
    },
    {
      icon: <Security fontSize="large" />,
      title: 'Secure Payments',
      description: 'Safe and encrypted transactions'
    },
    {
      icon: <Support fontSize="large" />,
      title: '24/7 Support',
      description: 'Customer service always available'
    }
  ], []);

  return (
    <>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 8,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}
      >
        {/* Increase the priority of the hero background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            p: { xs: 4, md: 8 },
            pr: { md: 0 },
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: { xs: '100%', md: '60%' },
          }}
        >
          <Typography component="h1" variant="h2" color="inherit" gutterBottom sx={{ fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.3)', mb: 3 }}>
            Welcome to ShopSphere
          </Typography>
          <Typography variant="h5" color="inherit" paragraph sx={{ fontSize: '1.35rem', lineHeight: 1.6, mb: 4, textShadow: '0 1px 3px rgba(0,0,0,0.2)', maxWidth: '90%' }}>
            Discover a world of quality products at affordable prices.
            Your one-stop destination for all your shopping needs.
          </Typography>
          <Box sx={{ mt: 6 }}>
            <Button 
              variant="contained" 
              size="large" 
              component={RouterLink} 
              to="/products"
              sx={{ 
                mr: 3, 
                mb: { xs: 2, sm: 0 },
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Shop Now
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={RouterLink} 
              to="/about"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                borderColor: 'white',
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  borderColor: 'white',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: 'background.default', mb: 8, position: 'relative' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                position: 'relative',
                display: 'inline-block',
                mb: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'primary.main',
                  bottom: '-12px',
                  left: 'calc(50% - 40px)',
                  borderRadius: '2px'
                }
              }}
            >
              Why Choose Us
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '700px', 
                mx: 'auto',
                mb: 2,
                fontWeight: 'normal',
                lineHeight: 1.6
              }}
            >
              We're committed to providing the best shopping experience with premium quality products
            </Typography>
          </Box>
          
          <GridContainer spacing={6}>
            {features.map((feature, index) => (
              <GridItem xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                      borderColor: 'transparent'
                    }
                  }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      backgroundColor: 'primary.light',
                      color: 'white',
                      borderRadius: '50%',
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      width: 80,
                      height: 80,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </GridItem>
            ))}
          </GridContainer>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Featured Products
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Check out our most popular items
        </Typography>
        
        {loading ? (
          <GridContainer spacing={3}>
            {[...Array(4)].map((_, index) => (
              <GridItem xs={12} sm={6} md={3} key={index}>
                <ProductCardSkeleton />
              </GridItem>
            ))}
          </GridContainer>
        ) : featuredProducts.length > 0 ? (
          <GridContainer spacing={3}>
            {featuredProducts.map((product) => (
              <GridItem xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </GridItem>
            ))}
          </GridContainer>
        ) : (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No products available at the moment.
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/products"
          >
            View All Products
          </Button>
        </Box>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Shop by Category
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Browse our wide range of product categories
        </Typography>
        
        {loading ? (
          <LoadingSpinner message="Loading categories..." />
        ) : categories.length > 0 ? (
          <GridContainer spacing={3}>
            {categories.map((category) => (
              <GridItem xs={12} sm={6} md={4} key={category.id}>
                <Card 
                  component={RouterLink} 
                  to={`/products?category=${category.id}`}
                  sx={{ 
                    height: 200, 
                    display: 'flex', 
                    position: 'relative',
                    textDecoration: 'none',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`https://source.unsplash.com/random/300x200?${category.name}`}
                    alt={category.name}
                    sx={{ position: 'absolute', width: '100%', height: '100%' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                      backgroundColor: 'rgba(0,0,0,.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {category.name}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </GridItem>
            ))}
          </GridContainer>
        ) : (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No categories available at the moment.
          </Typography>
        )}
      </Box>

      {/* Newsletter Section */}
      <Paper sx={{ p: { xs: 3, md: 6 }, backgroundColor: '#1a237e', color: 'white', borderRadius: 2, mb: 6 }}>
        <GridContainer spacing={3} alignItems="center">
          <GridItem xs={12} md={8}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body1" paragraph>
              Stay updated with our latest products, promotions, and exclusive offers.
              Join our mailing list today!
            </Typography>
          </GridItem>
          <GridItem xs={12} md={4}>
            <Box component="form" noValidate sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  padding: '12px 15px',
                  border: 'none',
                  flex: 1,
                  marginRight: isMobile ? 0 : '-1px',
                  marginBottom: isMobile ? '10px' : 0,
                  borderRadius: isMobile ? '4px' : '4px 0 0 4px'
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: isMobile ? '4px' : '0 4px 4px 0',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1.5,
                  px: 3
                }}
              >
                Subscribe
              </Button>
            </Box>
          </GridItem>
        </GridContainer>
      </Paper>
    </>
  );
};

export default Home;
