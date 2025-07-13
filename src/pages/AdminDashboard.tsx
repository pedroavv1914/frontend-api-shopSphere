import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import PageTitle from '../components/PageTitle';
import { Product, Category } from '../types';

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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
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

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Product form state
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState<number>(0);
  
  // Category form state
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchCategories();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load categories');
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Product CRUD operations
  const handleOpenProductDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductName(product.name);
      setProductDescription(product.description);
      setProductPrice(product.price.toString());
      setProductImage(product.imageUrl || '');
      setProductCategory(product.categoryId);
    } else {
      setEditingProduct(null);
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage('');
      setProductCategory(categories.length > 0 ? categories[0].id : 0);
    }
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
  };

  const handleSaveProduct = async () => {
    try {
      setLoading(true);
      const productData = {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        imageUrl: productImage,
        categoryId: productCategory
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
        setSuccess('Product updated successfully');
      } else {
        await api.post('/products', productData);
        setSuccess('Product created successfully');
      }

      handleCloseProductDialog();
      fetchProducts();
      setLoading(false);
    } catch (err) {
      setError('Failed to save product');
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true);
        await api.delete(`/products/${id}`);
        setSuccess('Product deleted successfully');
        fetchProducts();
        setLoading(false);
      } catch (err) {
        setError('Failed to delete product');
        setLoading(false);
      }
    }
  };

  // Category CRUD operations
  const handleOpenCategoryDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName('');
    }
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  const handleSaveCategory = async () => {
    try {
      setLoading(true);
      const categoryData = {
        name: categoryName
      };

      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, categoryData);
        setSuccess('Category updated successfully');
      } else {
        await api.post('/categories', categoryData);
        setSuccess('Category created successfully');
      }

      handleCloseCategoryDialog();
      fetchCategories();
      setLoading(false);
    } catch (err) {
      setError('Failed to save category');
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all products in this category.')) {
      try {
        setLoading(true);
        await api.delete(`/categories/${id}`);
        setSuccess('Category deleted successfully');
        fetchCategories();
        fetchProducts(); // Refresh products as they might be affected
        setLoading(false);
      } catch (err) {
        setError('Failed to delete category');
        setLoading(false);
      }
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  if (!isAdmin) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Access Denied. You need administrator privileges to view this page.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <PageTitle title="Admin Dashboard" subtitle="Manage your store's products and categories" />
      
      <Box sx={{ py: 5, px: { xs: 2, md: 4 } }}>
        {(success || error) && (
          <Box sx={{ mb: 3 }}>
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        )}

        <Paper sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTabs-indicator': {
                backgroundColor: '#1B8A5A',
              },
              '& .Mui-selected': {
                color: '#1B8A5A !important',
              }
            }}
          >
            <Tab label="Products" />
            <Tab label="Categories" />
            <Tab label="Orders" />
          </Tabs>

          {/* Products Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => handleOpenProductDialog()}
                sx={{
                  backgroundColor: '#1B8A5A',
                  '&:hover': {
                    backgroundColor: '#006837',
                  }
                }}
              >
                Add Product
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>
                          {product.imageUrl ? (
                            <Box
                              component="img"
                              src={product.imageUrl}
                              alt={product.name}
                              sx={{ width: 50, height: 50, objectFit: 'cover' }}
                            />
                          ) : (
                            'No image'
                          )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          {categories.find(c => c.id === product.categoryId)?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenProductDialog(product)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteProduct(product.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {products.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Categories Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => handleOpenCategoryDialog()}
                sx={{
                  backgroundColor: '#1B8A5A',
                  '&:hover': {
                    backgroundColor: '#006837',
                  }
                }}
              >
                Add Category
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Products</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                          {products.filter(p => p.categoryId === category.id).length}
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenCategoryDialog(category)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteCategory(category.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {categories.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No categories found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Orders Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Management
            </Typography>
            <Typography>
              Order management functionality will be implemented in a future update.
            </Typography>
          </TabPanel>
        </Paper>
      </Box>

      {/* Product Dialog */}
      <Dialog open={openProductDialog} onClose={handleCloseProductDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Product Name"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                label="Price ($)"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
                sx={{ flex: 1 }}
              />
              <FormControl fullWidth sx={{ flex: 1 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={productCategory}
                  onChange={(e) => setProductCategory(Number(e.target.value))}
                  label="Category"
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="Image URL"
              fullWidth
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              helperText="Enter a URL for the product image"
            />
            {productImage && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Image Preview:</Typography>
                <Box
                  component="img"
                  src={productImage}
                  alt="Product preview"
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: 200,
                    objectFit: 'contain',
                    border: '1px solid #eee',
                    borderRadius: 1
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProductDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveProduct} 
            variant="contained"
            disabled={!productName || !productDescription || !productPrice || !productCategory}
            sx={{
              backgroundColor: '#1B8A5A',
              '&:hover': {
                backgroundColor: '#006837',
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Category Name"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategoryDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveCategory} 
            variant="contained"
            disabled={!categoryName}
            sx={{
              backgroundColor: '#1B8A5A',
              '&:hover': {
                backgroundColor: '#006837',
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
