import React, { useState, useCallback, memo } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton,
  Box,
  Rating,
  Chip,
  Snackbar,
  Alert,
  Skeleton
} from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { addToCart } = useCart();
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product, 1);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  // Default image if product doesn't have one
  const imageUrl = product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image+Available';

  return (
    <>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
            <LazyLoadImage
              alt={product.name}
              height={200}
              src={imageUrl}
              width="100%"
              effect="blur"
              style={{ objectFit: 'cover' }}
              placeholder={<Skeleton variant="rectangular" width="100%" height={200} />}
            />
          </Box>
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
          <Chip
            label={`$${product.price.toFixed(2)}`}
            color="primary"
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              fontWeight: 'bold',
            }}
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to={`/products/${product.id}`}
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              '&:hover': {
                color: 'primary.main',
              },
              display: 'block',
              mb: 1,
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating || 0})
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.category?.name || 'Uncategorized'}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 2,
              height: '40px'
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
            disabled={loading}
            size="small"
          >
            Add to Cart
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            component={RouterLink} 
            to={`/products/${product.id}`}
          >
            Details
          </Button>
        </CardActions>
      </Card>
      
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
});

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" height={32} width="80%" />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="60%" />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Skeleton variant="text" width={120} height={24} />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Skeleton variant="rectangular" width={90} height={36} />
        <Skeleton variant="rectangular" width={110} height={36} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
