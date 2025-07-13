import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  InputAdornment,
  Pagination,
  Chip,
  Slider,
  Drawer,
  Button,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { GridContainer, GridItem } from '../components/GridSystem';
import { 
  Search as SearchIcon, 
  FilterList as FilterListIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { Product, Category } from '../types';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import PageTitle from '../components/PageTitle';
import LoadingSpinner from '../components/LoadingSpinner';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>(() => {
    const categoryParam = searchParams.get('category');
    return categoryParam ? parseInt(categoryParam) : '';
  });
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<Category[]>('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // In a real app, we would use query parameters for filtering
        // For now, we'll fetch all products and filter on the client side
        const response = await api.get<Product[]>('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting
  const filteredProducts = products
    .filter(product => {
      // Apply search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply category filter
      if (selectedCategory && product.categoryId !== selectedCategory) {
        return false;
      }
      
      // Apply price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
        default:
          // Assuming newer products have higher IDs
          return b.id - a.id;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on search
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (event.target.value) {
      newParams.set('search', event.target.value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number | '';
    setSelectedCategory(value);
    setPage(1); // Reset to first page on category change
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value !== '') {
      newParams.set('category', value.toString());
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setPage(1); // Reset to first page on price change
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setPage(1);
    setSearchParams({});
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const filterDrawer = (
    <Box
      sx={{ width: 280, p: 3 }}
      role="presentation"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="subtitle2" gutterBottom>
        Categories
      </Typography>
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Select Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Select Category"
          onChange={handleCategoryChange as any}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="subtitle2" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 1, mb: 3 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>
      
      <Typography variant="subtitle2" gutterBottom>
        Sort By
      </Typography>
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={handleSortChange as any}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="price-low">Price: Low to High</MenuItem>
          <MenuItem value="price-high">Price: High to Low</MenuItem>
          <MenuItem value="name-asc">Name: A to Z</MenuItem>
          <MenuItem value="name-desc">Name: Z to A</MenuItem>
        </Select>
      </FormControl>
      
      <Button 
        variant="outlined" 
        fullWidth 
        onClick={handleClearFilters}
        sx={{ mt: 2 }}
      >
        Clear All Filters
      </Button>
    </Box>
  );

  return (
    <>
      <PageTitle 
        title="Products" 
        subtitle="Browse our collection of high-quality products"
        breadcrumbs={[{ name: 'Products' }]}
      />
      
      <GridContainer spacing={3}>
        {/* Filters for desktop */}
        {!isMobile && (
          <GridItem xs={12} md={3}>
            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Categories
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Select Category"
                  onChange={handleCategoryChange as any}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" gutterBottom>
                Price Range
              </Typography>
              <Box sx={{ px: 1, mb: 3 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">${priceRange[0]}</Typography>
                  <Typography variant="body2">${priceRange[1]}</Typography>
                </Box>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Sort By
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange as any}
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="name-asc">Name: A to Z</MenuItem>
                  <MenuItem value="name-desc">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
              
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>
            </Box>
          </GridItem>
        )}
        
        {/* Products grid */}
        <GridItem xs={12} md={!isMobile ? 9 : 12}>
          {/* Search and filter bar */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0
          }}>
            <TextField
              placeholder="Search products..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: isMobile ? '100%' : 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isMobile && (
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={toggleDrawer(true)}
                  fullWidth
                >
                  Filters
                </Button>
              )}
              
              {!isMobile && (
                <Typography variant="body2" color="text.secondary">
                  {filteredProducts.length} products found
                </Typography>
              )}
            </Box>
          </Box>
          
          {/* Active filters */}
          {(searchTerm || selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Typography variant="body2" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                Active Filters:
              </Typography>
              
              {searchTerm && (
                <Chip 
                  label={`Search: ${searchTerm}`} 
                  onDelete={() => {
                    setSearchTerm('');
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }} 
                  size="small" 
                />
              )}
              
              {selectedCategory && (
                <Chip 
                  label={`Category: ${categories.find(c => c.id === selectedCategory)?.name || 'Unknown'}`} 
                  onDelete={() => {
                    setSelectedCategory('');
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('category');
                    setSearchParams(newParams);
                  }} 
                  size="small" 
                />
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Chip 
                  label={`Price: $${priceRange[0]} - $${priceRange[1]}`} 
                  onDelete={() => setPriceRange([0, 1000])} 
                  size="small" 
                />
              )}
            </Box>
          )}
          
          {/* Products grid */}
          {loading ? (
            <GridContainer spacing={3}>
              {[...Array(8)].map((_, index) => (
                <GridItem xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductCardSkeleton />
                </GridItem>
              ))}
            </GridContainer>
          ) : paginatedProducts.length > 0 ? (
            <>
              <GridContainer spacing={3}>
                {paginatedProducts.map((product) => (
                  <GridItem xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </GridItem>
                ))}
              </GridContainer>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                  />
                </Box>
              )}
            </>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              No products found matching your criteria.
            </Typography>
          )}
        </GridItem>
      </GridContainer>
      
      {/* Mobile filter drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {filterDrawer}
      </Drawer>
    </>
  );
};

export default Products;
