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
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
          borderRadius: 2,
          overflow: 'hidden'
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
            p: { xs: 3, md: 6 },
            pr: { md: 0 },
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography component="h1" variant="h3" color="inherit" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to ShopSphere
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Discover a world of quality products at affordable prices.
            Your one-stop destination for all your shopping needs.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              size="large" 
              component={RouterLink} 
              to="/products"
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              Shop Now
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={RouterLink} 
              to="/about"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'white',
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Features Section */}
      <Box sx={{ py: 6, backgroundColor: '#f5f5f5', borderRadius: 2, mb: 6 }}>
        <Container>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Why Choose Us
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            We're committed to providing the best shopping experience
          </Typography>
          
          <GridContainer spacing={4}>
            {features.map((feature, index) => (
              <GridItem xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
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
