import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Rating, 
  Tabs, 
  Tab, 
  Divider, 
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Snackbar,
  Alert,
  Skeleton
} from '@mui/material';
import { GridContainer, GridItem } from '../components/GridSystem';

// Alias para compatibilidade com código existente
const Link = MuiLink;
import { 
  AddShoppingCart, 
  Favorite, 
  FavoriteBorder,
  Share,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import api from '../services/api';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get<Product>(`/products/${id}`);
        setProduct(response.data);
        
        // Fetch related products (same category)
        const relatedResponse = await api.get<Product[]>('/products');
        const related = relatedResponse.data
          .filter(p => p.categoryId === response.data.categoryId && p.id !== response.data.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addToCart(product, quantity);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <GridContainer spacing={4}>
          <GridItem xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
          </GridItem>
          <GridItem xs={12} md={6}>
            <Skeleton variant="text" height={40} width="80%" />
            <Skeleton variant="text" height={24} width="40%" sx={{ mt: 1 }} />
            <Skeleton variant="text" height={24} width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" height={24} width="30%" sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
            <Box sx={{ display: 'flex', mt: 3, gap: 2 }}>
              <Skeleton variant="rectangular" width={100} height={50} />
              <Skeleton variant="rectangular" width={150} height={50} />
            </Box>
          </GridItem>
        </GridContainer>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Product not found
        </Typography>
        <Button component={RouterLink} to="/products" variant="contained" sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link component={RouterLink} to="/" color="inherit" underline="hover">
          Home
        </Link>
        <Link component={RouterLink} to="/products" color="inherit" underline="hover">
          Products
        </Link>
        <Link 
          component={RouterLink} 
          to={`/products?category=${product.categoryId}`} 
          color="inherit"
          underline="hover"
        >
          {product.category?.name || 'Category'}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <GridContainer spacing={4}>
        {/* Product Image */}
        <GridItem xs={12} md={6}>
          <Paper 
            elevation={2}
            sx={{ 
              height: 400, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image+Available'} 
              alt={product.name}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain' 
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
              onClick={toggleFavorite}
            >
              {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Paper>
        </GridItem>

        {/* Product Details */}
        <GridItem xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={4.5} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              (24 reviews)
            </Typography>
          </Box>
          
          <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Category:
            </Typography>
            <Chip 
              label={product.category?.name || 'Uncategorized'} 
              component={RouterLink}
              to={`/products?category=${product.categoryId}`}
              clickable
              size="small"
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }}
              size="small"
              sx={{ width: 100, mr: 2 }}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              sx={{ flex: 1 }}
            >
              Add to Cart
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={favorite ? <Favorite color="error" /> : <FavoriteBorder />}
              onClick={toggleFavorite}
            >
              {favorite ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Share />}
            >
              Share
            </Button>
          </Box>
        </GridItem>
      </GridContainer>

      {/* Product Tabs */}
      <Box sx={{ mt: 6 }}>
        <Paper elevation={1}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="product tabs"
            variant="fullWidth"
          >
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Reviews (24)" />
          </Tabs>
          
          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1">
              {product.description}
            </Typography>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Typography variant="body1">
              Product specifications would be displayed here. This information is not available in the current API.
            </Typography>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Typography variant="body1">
              Customer reviews would be displayed here. This information is not available in the current API.
            </Typography>
          </TabPanel>
        </Paper>
      </Box>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <GridContainer spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <GridItem xs={12} sm={6} md={3} key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </GridItem>
            ))}
          </GridContainer>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;
