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
          boxShadow: '0 15px 50px rgba(0,0,0,0.2)',
          border: '3px solid #1B8A5A',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #1B8A5A 0%, #FFFFFF 50%, #D32F2F 100%)',
            zIndex: 2
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #D32F2F 0%, #FFFFFF 50%, #1B8A5A 100%)',
            zIndex: 2
          }
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
            backgroundColor: 'rgba(0,0,0,.4)',
            backgroundImage: 'linear-gradient(135deg, rgba(27, 138, 90, 0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(211, 47, 47, 0.8) 100%)',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)',
            }
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
          <Box sx={{ 
            mb: 4, 
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              left: -30,
              width: 60,
              height: 60,
              borderTop: '3px solid #1B8A5A',
              borderLeft: '3px solid #1B8A5A',
              opacity: 0.7
            }
          }}>
            <Typography 
              component="h1" 
              variant="h2" 
              color="inherit" 
              gutterBottom 
              sx={{ 
                fontWeight: 900, 
                textShadow: '0 2px 10px rgba(0,0,0,0.3)', 
                mb: 1,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(90deg, #FFFFFF 0%, #E0F2EA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px'
              }}
            >
              Welcome to <Box component="span" sx={{ color: '#1B8A5A', WebkitTextFillColor: '#1B8A5A' }}>Shop</Box><Box component="span" sx={{ color: '#D32F2F', WebkitTextFillColor: '#D32F2F' }}>Sphere</Box>
            </Typography>
          </Box>
          
          <Typography 
            variant="h5" 
            color="inherit" 
            paragraph 
            sx={{ 
              fontSize: '1.35rem', 
              lineHeight: 1.6, 
              mb: 4, 
              textShadow: '0 1px 3px rgba(0,0,0,0.2)', 
              maxWidth: '90%',
              position: 'relative',
              pl: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 12,
                bottom: 12,
                width: 4,
                backgroundColor: '#1B8A5A',
                borderRadius: 2
              }
            }}
          >
            Discover a world of quality products at affordable prices.
            Your one-stop destination for all your shopping needs.
          </Typography>
          
          <Box sx={{ mt: 6, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large" 
              component={RouterLink} 
              to="/products"
              sx={{ 
                py: 1.8,
                px: 5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#1B8A5A',
                boxShadow: '0 4px 14px rgba(27, 138, 90, 0.4)',
                borderRadius: '30px',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
                  clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)',
                },
                '&:hover': {
                  backgroundColor: '#006837',
                  boxShadow: '0 6px 20px rgba(27, 138, 90, 0.6)',
                  transform: 'translateY(-3px)'
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
                backgroundColor: 'rgba(211, 47, 47, 0.15)',
                color: 'white',
                borderColor: '#D32F2F',
                py: 1.8,
                px: 5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '30px',
                borderWidth: '2px',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
                  clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(211, 47, 47, 0.25)',
                  borderColor: '#FF6659',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
        
        {/* Decorative elements */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 30, 
          right: 30,
          width: { xs: 100, md: 150 },
          height: { xs: 100, md: 150 },
          borderRadius: '50%',
          border: '2px dashed rgba(255,255,255,0.3)',
          display: { xs: 'none', md: 'block' }
        }} />
        
        <Box sx={{ 
          position: 'absolute', 
          top: 40, 
          right: 100,
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: 'rgba(27, 138, 90, 0.2)',
          display: { xs: 'none', md: 'block' }
        }} />
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: 100, 
          left: 60,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: 'rgba(211, 47, 47, 0.2)',
          display: { xs: 'none', md: 'block' }
        }} />
      </Paper>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: '#FFFFFF', mb: 8, position: 'relative' }}>
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
                  backgroundColor: '#1B8A5A',
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
                      backgroundColor: index % 2 === 0 ? '#1B8A5A' : '#D32F2F',
                      color: 'white',
                      borderRadius: '50%',
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: index % 2 === 0 
                        ? '0 8px 16px rgba(27, 138, 90, 0.25)' 
                        : '0 8px 16px rgba(211, 47, 47, 0.25)'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    mt: 1,
                    color: index % 2 === 0 ? '#1B8A5A' : '#D32F2F'
                  }}>
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
      <Box sx={{ mb: 6, position: 'relative' }}>
        <Box 
          sx={{ 
            position: 'absolute', 
            left: 0, 
            top: '50%', 
            width: '100%', 
            height: '1px', 
            backgroundColor: 'rgba(0,0,0,0.05)', 
            zIndex: 0,
            display: { xs: 'none', md: 'block' }
          }}
        />
        <Box sx={{ 
          textAlign: 'center', 
          mb: 5, 
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            zIndex: 0
          }
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              display: 'inline-block', 
              backgroundColor: '#FFFFFF', 
              px: 4, 
              position: 'relative', 
              zIndex: 1,
              color: '#1B8A5A',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                backgroundColor: '#D32F2F',
                borderRadius: '2px'
              }
            }}
          >
            Featured Products
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}>
          Check out our most popular items
        </Typography>
        
        {loading ? (
          <Box sx={{ px: { xs: 3, sm: 4, md: 6 }, py: 2 }}>
            <GridContainer spacing={6}>
              {[...Array(4)].map((_, index) => (
                <GridItem xs={12} sm={6} md={3} key={index} sx={{ p: 2.5, mb: 2 }}>
                  <ProductCardSkeleton />
                </GridItem>
              ))}
            </GridContainer>
          </Box>
        ) : featuredProducts.length > 0 ? (
          <Box sx={{ px: { xs: 3, sm: 4, md: 6 }, py: 2 }}>
            <GridContainer spacing={6}>
              {featuredProducts.map((product) => (
                <GridItem xs={12} sm={6} md={4} key={product.id} sx={{ p: 2.5, mb: 2 }}>
                  <ProductCard product={product} />
                </GridItem>
              ))}
            </GridContainer>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No products available at the moment.
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/products"
            sx={{
              backgroundColor: '#1B8A5A',
              color: '#FFFFFF',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(27, 138, 90, 0.3)',
              '&:hover': {
                backgroundColor: '#006837',
                boxShadow: '0 6px 16px rgba(27, 138, 90, 0.4)'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                border: '2px solid #D32F2F',
                borderRadius: 'inherit',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover::after': {
                opacity: 0.5
              }
            }}
          >
            View All Products
          </Button>
        </Box>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 6, mt: 10, position: 'relative' }}>
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(27, 138, 90, 0.03)',
            zIndex: -1,
            py: 8
          }}
        />
        <Box sx={{ 
          textAlign: 'center', 
          mb: 5, 
          pt: 5,
          position: 'relative'
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#D32F2F',
              position: 'relative',
              display: 'inline-block',
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: -20,
                width: '15px',
                height: '3px',
                backgroundColor: '#1B8A5A',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                right: -20,
                width: '15px',
                height: '3px',
                backgroundColor: '#1B8A5A',
              }
            }}
          >
            Shop by Category
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 5 }}>
          Browse our wide range of product categories
        </Typography>
        
        {loading ? (
          <LoadingSpinner message="Loading categories..." />
        ) : categories.length > 0 ? (
          <GridContainer spacing={3}>
            {categories.map((category, index) => (
              <GridItem xs={12} sm={6} md={4} key={category.id}>
                <Card 
                  component={RouterLink} 
                  to={`/products?category=${category.id}`}
                  sx={{ 
                    height: 200, 
                    display: 'flex', 
                    position: 'relative',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    border: '2px solid #FFFFFF',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                      border: '2px solid',
                      borderColor: index % 2 === 0 ? '#1B8A5A' : '#D32F2F'
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
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: index % 2 === 0 
                          ? 'linear-gradient(to bottom, rgba(27, 138, 90, 0.2) 0%, rgba(27, 138, 90, 0.8) 100%)'
                          : 'linear-gradient(to bottom, rgba(211, 47, 47, 0.2) 0%, rgba(211, 47, 47, 0.8) 100%)',
                      }
                    }}
                  >
                    <CardContent>
                      <Typography 
                        variant="h5" 
                        component="div" 
                        sx={{ 
                          color: 'white', 
                          fontWeight: 'bold',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '40px',
                            height: '3px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '2px'
                          }
                        }}
                      >
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
      <Paper 
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 4, md: 6 }, 
          backgroundColor: '#FFFFFF', 
          color: '#1E293B', 
          borderRadius: 3, 
          mb: 6,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(27, 138, 90, 0.2)',
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
        {/* Decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(27, 138, 90, 0.05)',
          zIndex: 0
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          backgroundColor: 'rgba(211, 47, 47, 0.05)',
          zIndex: 0
        }} />
        
        <GridContainer spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          <GridItem xs={12} md={7}>
            <Box sx={{ position: 'relative', pl: { xs: 0, md: 2 } }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#1B8A5A',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 2
                }}
              >
                Subscribe to Our Newsletter
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.1rem',
                  color: '#1E293B',
                  mb: 3,
                  maxWidth: '90%',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    width: 60,
                    height: 3,
                    backgroundColor: '#D32F2F',
                    borderRadius: 2
                  }
                }}
              >
                Stay updated with our latest products, promotions, and exclusive offers.
                Join our mailing list today!
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mt: 4,
                flexWrap: 'wrap'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: '#1B8A5A'
                }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(27, 138, 90, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mr: 1
                    }}
                  >✓</Box>
                  <Typography variant="body2">Weekly Updates</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: '#1B8A5A'
                }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(27, 138, 90, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mr: 1
                    }}
                  >✓</Box>
                  <Typography variant="body2">Exclusive Offers</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: '#1B8A5A'
                }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(27, 138, 90, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mr: 1
                    }}
                  >✓</Box>
                  <Typography variant="body2">No Spam</Typography>
                </Box>
              </Box>
            </Box>
          </GridItem>
          
          <GridItem xs={12} md={5}>
            <Box 
              component="form" 
              noValidate 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: '#FFFFFF',
                p: 3,
                borderRadius: 2,
                boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 'bold',
                  color: '#D32F2F'
                }}
              >
                Join our community today
              </Typography>
              
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  padding: '16px 20px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  marginBottom: '16px',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1B8A5A',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1.8,
                  px: 3,
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(27, 138, 90, 0.3)',
                  '&:hover': {
                    backgroundColor: '#006837',
                    boxShadow: '0 6px 16px rgba(27, 138, 90, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Subscribe Now
              </Button>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 2, 
                  textAlign: 'center',
                  color: 'text.secondary',
                  fontSize: '0.75rem'
                }}
              >
                By subscribing, you agree to our Privacy Policy and Terms of Service
              </Typography>
            </Box>
          </GridItem>
        </GridContainer>
      </Paper>
    </>
  );
};

export default Home;
