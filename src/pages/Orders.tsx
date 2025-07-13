import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from '../components/PageTitle';
import api from '../services/api';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  userId: number | string; // Permitindo tanto number quanto string para compatibilidade
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // This would be a real API call in a production app
        // const response = await api.get('/orders');
        // setOrders(response.data);
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setOrders([
            {
              id: 'ORD-12345',
              userId: user?.id || '',
              status: 'delivered',
              totalAmount: 129.99,
              items: [
                {
                  id: 'ITEM-1',
                  productId: 'PROD-1',
                  productName: 'Wireless Headphones',
                  productImage: 'https://via.placeholder.com/150',
                  quantity: 1,
                  price: 79.99
                },
                {
                  id: 'ITEM-2',
                  productId: 'PROD-2',
                  productName: 'Phone Case',
                  productImage: 'https://via.placeholder.com/150',
                  quantity: 1,
                  price: 19.99
                }
              ],
              shippingAddress: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345',
                country: 'USA'
              },
              paymentMethod: 'Credit Card',
              createdAt: '2023-01-15T12:00:00Z',
              updatedAt: '2023-01-18T15:30:00Z'
            },
            {
              id: 'ORD-67890',
              userId: user?.id || '',
              status: 'processing',
              totalAmount: 249.99,
              items: [
                {
                  id: 'ITEM-3',
                  productId: 'PROD-3',
                  productName: 'Smart Watch',
                  productImage: 'https://via.placeholder.com/150',
                  quantity: 1,
                  price: 249.99
                }
              ],
              shippingAddress: {
                street: '456 Oak Ave',
                city: 'Somewhere',
                state: 'NY',
                zipCode: '67890',
                country: 'USA'
              },
              paymentMethod: 'PayPal',
              createdAt: '2023-02-20T10:15:00Z',
              updatedAt: '2023-02-20T10:15:00Z'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'pending':
        return <ScheduleIcon sx={{ color: '#F59E0B' }} />;
      case 'processing':
      case 'paid':
        return <ShoppingBagIcon sx={{ color: '#3B82F6' }} />;
      case 'shipped':
        return <LocalShippingIcon sx={{ color: '#1B8A5A' }} />;
      case 'delivered':
        return <CheckCircleIcon sx={{ color: '#1B8A5A' }} />;
      case 'cancelled':
      case 'canceled':
        return <ScheduleIcon sx={{ color: '#EF4444' }} />;
      default:
        return <ScheduleIcon />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#F59E0B';
      case 'processing':
      case 'paid':
        return '#3B82F6';
      case 'shipped':
        return '#1B8A5A';
      case 'delivered':
        return '#1B8A5A';
      case 'cancelled':
      case 'canceled':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <PageTitle 
        title="My Orders" 
        subtitle="Track and manage your purchases"
        breadcrumbs={[{ name: 'Orders' }]}
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#1B8A5A' }} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : orders.length === 0 ? (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 6, 
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
            <ShoppingBagIcon sx={{ fontSize: 60, color: '#64748B', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              No Orders Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You haven't placed any orders yet. Start shopping to see your orders here.
            </Typography>
            <Button 
              variant="contained" 
              href="/products"
              sx={{
                backgroundColor: '#1B8A5A',
                '&:hover': {
                  backgroundColor: '#006837',
                }
              }}
            >
              Browse Products
            </Button>
          </Paper>
        ) : (
          <Box>
            {orders.map((order) => (
              <Accordion 
                key={order.id} 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderLeft: '4px solid',
                    borderColor: getStatusColor(order.status)
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', gap: 2, alignItems: { sm: 'center' } }}>
                    <Box sx={{ width: { xs: '100%', sm: '33.33%' } }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Order #{order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(order.createdAt)}
                      </Typography>
                    </Box>
                    <Box sx={{ width: { xs: '50%', sm: '33.33%' } }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        ${order.totalAmount.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ width: { xs: '50%', sm: '33.33%' } }}>
                      <Chip
                        icon={getStatusIcon(order.status)}
                        label={order.status.toLowerCase().charAt(0).toUpperCase() + order.status.toLowerCase().slice(1)}
                        sx={{
                          backgroundColor: `${getStatusColor(order.status)}20`,
                          color: getStatusColor(order.status),
                          fontWeight: 'bold',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Order Items
                  </Typography>
                  
                  {order.items.map((item) => (
                    <Paper 
                      key={item.id} 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderRadius: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: { xs: '16.67%', sm: '8.33%' } }}>
                          <Box 
                            component="img" 
                            src={item.productImage} 
                            alt={item.productName}
                            sx={{ 
                              width: '100%', 
                              borderRadius: 1,
                              border: '1px solid rgba(0,0,0,0.08)'
                            }}
                          />
                        </Box>
                        <Box sx={{ width: { xs: '58.33%', sm: '75%' } }}>
                          <Typography variant="subtitle1">
                            {item.productName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                        </Box>
                        <Box sx={{ width: { xs: '25%', sm: '16.67%' }, textAlign: 'right' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Shipping Address
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="body1">
                          {order.shippingAddress.street}
                        </Typography>
                        <Typography variant="body1">
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </Typography>
                        <Typography variant="body1">
                          {order.shippingAddress.country}
                        </Typography>
                      </Paper>
                    </Box>
                    
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Payment Information
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="body1">
                          <strong>Method:</strong> {order.paymentMethod}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                  
                  {order.status === 'delivered' && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="outlined" 
                        sx={{
                          borderColor: '#1B8A5A',
                          color: '#1B8A5A',
                          '&:hover': {
                            borderColor: '#006837',
                            backgroundColor: 'rgba(27, 138, 90, 0.08)'
                          }
                        }}
                      >
                        Leave a Review
                      </Button>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Orders;
