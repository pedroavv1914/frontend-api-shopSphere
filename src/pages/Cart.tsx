import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  IconButton, 
  Divider, 
  TextField, 
  Card,
  CardMedia,
  CardContent,
  Alert,
  Snackbar
} from '@mui/material';
import { GridContainer, GridItem } from '../components/GridSystem';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import PageTitle from '../components/PageTitle';
import api from '../services/api';

const Cart: React.FC = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [processingOrder, setProcessingOrder] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      showSnackbar('Failed to update quantity', 'error');
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
      showSnackbar('Item removed from cart', 'success');
    } catch (error) {
      console.error('Error removing item:', error);
      showSnackbar('Failed to remove item', 'error');
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart', message: 'Please login to checkout' } });
      return;
    }

    try {
      setProcessingOrder(true);
      // Create order from cart
      const response = await api.post('/orders');
      
      // Redirect to payment page
      navigate(`/checkout/${response.data.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      showSnackbar('Failed to create order', 'error');
      setProcessingOrder(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }

  if (cartItems.length === 0) {
    return (
      <>
        <PageTitle 
          title="Your Cart" 
          breadcrumbs={[{ name: 'Cart' }]}
        />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 8
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/products"
            size="large"
          >
            Start Shopping
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <PageTitle 
        title="Your Cart" 
        subtitle={`${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
        breadcrumbs={[{ name: 'Cart' }]}
      />
      
      <GridContainer spacing={3}>
        {/* Cart Items */}
        <GridItem xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 0, overflow: 'hidden' }}>
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    {/* Product Image */}
                    <Card 
                      sx={{ 
                        width: 100, 
                        height: 100, 
                        mr: 2, 
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.product.imageUrl || 'https://via.placeholder.com/100?text=No+Image'}
                        alt={item.product.name}
                        sx={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%', 
                          objectFit: 'contain' 
                        }}
                      />
                    </Card>
                    
                    {/* Product Details */}
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        component={RouterLink} 
                        to={`/products/${item.product.id}`}
                        sx={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {item.product.category?.name || 'Uncategorized'}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mt: 1 }}>
                        ${item.product.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Quantity Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    
                    <TextField
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          handleQuantityChange(item.id, value);
                        }
                      }}
                      inputProps={{ 
                        min: 1, 
                        style: { textAlign: 'center' } 
                      }}
                      sx={{ width: 60, mx: 1 }}
                      size="small"
                    />
                    
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  {/* Item Total */}
                  <Box sx={{ width: 100, textAlign: 'right', mr: 2 }}>
                    <Typography variant="subtitle1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  
                  {/* Remove Button */}
                  <IconButton 
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                
                {index < cartItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Paper>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              component={RouterLink} 
              to="/products"
              startIcon={<ShoppingCartIcon />}
            >
              Continue Shopping
            </Button>
          </Box>
        </GridItem>
        
        {/* Order Summary */}
        <GridItem xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">Free</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Tax</Typography>
                <Typography variant="body1">${(totalPrice * 0.1).toFixed(2)}</Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${(totalPrice * 1.1).toFixed(2)}</Typography>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large"
              onClick={handleCheckout}
              disabled={processingOrder}
            >
              {processingOrder ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
            
            {!isAuthenticated && (
              <Alert severity="info" sx={{ mt: 2 }}>
                You'll need to login before checkout
              </Alert>
            )}
          </Paper>
        </GridItem>
      </GridContainer>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
