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

  const renderFilterDrawer = () => (
    <Box
      sx={{ 
        width: 380, 
        p: 6,
        height: '100%',
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,249,244,1) 100%)',
        borderLeft: '1px solid rgba(27, 138, 90, 0.1)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
        overflowY: 'auto'
      }}
      role="presentation"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, ml: 1 }}>
        <Typography variant="h6" sx={{ 
          color: '#1B8A5A', 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            display: 'inline-block',
            width: 4,
            height: 20,
            backgroundColor: '#D32F2F',
            marginRight: 1.5,
            borderRadius: 1
          }
        }}>Filters</Typography>
        <IconButton 
          onClick={toggleDrawer(false)}
          sx={{ 
            color: '#D32F2F',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 4, mt: 1, borderColor: 'rgba(27, 138, 90, 0.1)' }} />
      
      <Typography variant="subtitle2" gutterBottom sx={{ 
        color: '#1E293B', 
        fontWeight: 'bold',
        mb: 3.5,
        ml: 1,
        fontSize: '1.15rem'
      }}>
        Categories
      </Typography>
      <FormControl fullWidth sx={{ mb: 6, mx: 1 }}>
        <InputLabel>Select Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Select Category"
          onChange={handleCategoryChange as any}
          sx={{
            borderRadius: 2,
            '.MuiOutlinedInput-input': {
              padding: '16px 14px',
              fontSize: '1.05rem'
            }
          }}
        >
          <MenuItem value="" sx={{ py: 1.5, fontSize: '1.05rem' }}>All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id} sx={{ py: 1.5, fontSize: '1.05rem' }}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="subtitle2" gutterBottom sx={{ 
        color: '#1E293B', 
        fontWeight: 'bold',
        mb: 3.5,
        ml: 1,
        fontSize: '1.15rem'
      }}>
        Price Range
      </Typography>
      <Box sx={{ px: 3, mx: 1, mb: 6 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
          sx={{
            color: '#1B8A5A',
            height: 8,
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 10px rgba(27, 138, 90, 0.16)'
              },
              '&.Mui-active': {
                boxShadow: '0 0 0 14px rgba(27, 138, 90, 0.16)'
              }
            },
            '& .MuiSlider-rail': {
              backgroundColor: 'rgba(211, 47, 47, 0.2)',
              height: 8
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>${priceRange[0]}</Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem' }}>${priceRange[1]}</Typography>
        </Box>
      </Box>
      
      <Typography variant="subtitle2" gutterBottom sx={{ 
        color: '#1E293B', 
        fontWeight: 'bold',
        mb: 3.5,
        ml: 1,
        fontSize: '1.15rem'
      }}>
        Sort By
      </Typography>
      <FormControl fullWidth sx={{ mb: 6, mx: 1 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={handleSortChange as any}
          sx={{
            borderRadius: 2,
            '.MuiOutlinedInput-input': {
              padding: '16px 14px',
              fontSize: '1.05rem'
            }
          }}
        >
          <MenuItem value="newest" sx={{ py: 1.5, fontSize: '1.05rem' }}>Newest</MenuItem>
          <MenuItem value="price-low" sx={{ py: 1.5, fontSize: '1.05rem' }}>Price: Low to High</MenuItem>
          <MenuItem value="price-high" sx={{ py: 1.5, fontSize: '1.05rem' }}>Price: High to Low</MenuItem>
          <MenuItem value="name-asc" sx={{ py: 1.5, fontSize: '1.05rem' }}>Name: A to Z</MenuItem>
          <MenuItem value="name-desc" sx={{ py: 1.5, fontSize: '1.05rem' }}>Name: Z to A</MenuItem>
        </Select>
      </FormControl>
      
      <Box sx={{ px: 1, mt: 2 }}>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleClearFilters}
          sx={{ 
            mt: 6,
            mb: 3,
            py: 2,
            borderColor: '#D32F2F',
            color: '#D32F2F',
            borderRadius: 2,
            fontSize: '1.05rem',
            fontWeight: 'medium',
            boxShadow: '0 2px 4px rgba(211, 47, 47, 0.1)',
            '&:hover': {
              borderColor: '#B71C1C',
              backgroundColor: 'rgba(211, 47, 47, 0.04)',
              boxShadow: '0 4px 8px rgba(211, 47, 47, 0.15)'
            }
          }}
      >
        Clear All Filters
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <PageTitle 
        title="Products" 
        subtitle="Browse our collection of high-quality products"
        breadcrumbs={[{ name: 'Products' }]}
        sx={{
          '& .MuiTypography-h4': {
            color: '#1B8A5A',
            fontWeight: 'bold',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 3,
              background: 'linear-gradient(90deg, #1B8A5A 0%, #FFFFFF 50%, #D32F2F 100%)',
              borderRadius: 2
            }
          },
          '& .MuiTypography-subtitle1': {
            color: '#1E293B',
            maxWidth: '700px',
            margin: '0 auto',
            mt: 3
          }
        }}
      />
      
      <GridContainer spacing={3}>
        {/* Filters for desktop */}
        {!isMobile && (
          <GridItem xs={12} md={3}>
            <Box sx={{ 
              p: 4, 
              border: '1px solid rgba(27, 138, 90, 0.2)', 
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
              mx: 1,
              mb: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                background: 'linear-gradient(90deg, #1B8A5A 0%, #FFFFFF 50%, #D32F2F 100%)'
              }
            }}>
              <Typography variant="h6" gutterBottom sx={{ 
                color: '#1B8A5A', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  display: 'inline-block',
                  width: 4,
                  height: 20,
                  backgroundColor: '#D32F2F',
                  marginRight: 1.5,
                  borderRadius: 1
                }
              }}>
                Filters
              </Typography>
              <Divider sx={{ mb: 4, mt: 1, borderColor: 'rgba(27, 138, 90, 0.1)' }} />
              
              <Typography variant="subtitle2" gutterBottom sx={{ 
                color: '#1E293B', 
                fontWeight: 'bold',
                mb: 1.5
              }}>
                Categories
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Select Category"
                  onChange={handleCategoryChange as any}
                  sx={{
                    borderRadius: 2,
                    '.MuiOutlinedInput-input': {
                      padding: '14px 14px',
                      fontSize: '1.05rem'
                    }
                  }}
                >
                  <MenuItem value="" sx={{ py: 1.5, fontSize: '1.05rem' }}>All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id} sx={{ py: 1.5, fontSize: '1.05rem' }}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" gutterBottom sx={{ 
                color: '#1E293B', 
                fontWeight: 'bold',
                mb: 2.5,
                ml: 1,
                fontSize: '1.15rem'
              }}>
                Price Range
              </Typography>
              <Box sx={{ px: 2, mx: 1, mb: 4 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  sx={{
                    color: '#1B8A5A',
                    height: 8,
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 10px rgba(27, 138, 90, 0.16)'
                      },
                      '&.Mui-active': {
                        boxShadow: '0 0 0 14px rgba(27, 138, 90, 0.16)'
                      }
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: 'rgba(211, 47, 47, 0.2)',
                      height: 8
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">${priceRange[0]}</Typography>
                  <Typography variant="body2">${priceRange[1]}</Typography>
                </Box>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom sx={{ 
                color: '#1E293B', 
                fontWeight: 'bold',
                mb: 1.5
              }}>
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
                sx={{
                  borderColor: '#D32F2F',
                  color: '#D32F2F',
                  '&:hover': {
                    borderColor: '#B71C1C',
                    backgroundColor: 'rgba(211, 47, 47, 0.04)'
                  }
                }}
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
            mb: 4,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0
          }}>
            <TextField
              placeholder="Search products..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  py: 1.2,
                  '&:hover fieldset': {
                    borderColor: 'rgba(27, 138, 90, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1B8A5A',
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '1.05rem'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#1B8A5A' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isMobile && (
                <Button
                  startIcon={<FilterListIcon />}
                  onClick={toggleDrawer(true)}
                  variant="outlined"
                  sx={{ 
                    display: { xs: 'flex', md: 'none' },
                    borderColor: '#1B8A5A',
                    color: '#1B8A5A',
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#006837',
                      backgroundColor: 'rgba(27, 138, 90, 0.04)'
                    }
                  }}
                >
                  Filters
                </Button>
              )}
              
              {!isMobile && (
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.05rem' }}>
                  {loading ? 'Loading...' : `${filteredProducts.length} products found`}
                </Typography>
              )}
            </Box>
          </Box>
          
          {/* Active filters */}
          {(searchTerm || selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 6 }}>
              <Typography variant="body1" sx={{ mr: 2, display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: '1.05rem' }}>
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
                  sx={{
                    backgroundColor: 'rgba(27, 138, 90, 0.1)',
                    borderRadius: '16px',
                    py: 0.5,
                    height: 'auto',
                    '& .MuiChip-label': {
                      color: '#1B8A5A',
                      px: 1.5,
                      py: 0.5,
                      fontWeight: 500
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#D32F2F',
                      marginRight: 0.5,
                      '&:hover': {
                        color: '#B71C1C'
                      }
                    }
                  }}
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
                  sx={{
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    borderRadius: '16px',
                    py: 0.5,
                    height: 'auto',
                    '& .MuiChip-label': {
                      color: '#D32F2F',
                      px: 1.5,
                      py: 0.5,
                      fontWeight: 500
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#D32F2F',
                      marginRight: 0.5,
                      '&:hover': {
                        color: '#B71C1C'
                      }
                    }
                  }}
                />
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Chip 
                  label={`Price: $${priceRange[0]} - $${priceRange[1]}`} 
                  onDelete={() => setPriceRange([0, 1000])} 
                  sx={{
                    backgroundColor: 'rgba(27, 138, 90, 0.1)',
                    borderRadius: '16px',
                    py: 0.5,
                    height: 'auto',
                    '& .MuiChip-label': {
                      color: '#1B8A5A',
                      px: 1.5,
                      py: 0.5,
                      fontWeight: 500
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#D32F2F',
                      marginRight: 0.5,
                      '&:hover': {
                        color: '#B71C1C'
                      }
                    }
                  }}
                />
              )}
            </Box>
          )}
          
          {/* Products grid */}
          {loading ? (
            <GridContainer spacing={4}>
              {[...Array(8)].map((_, index) => (
                <GridItem xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductCardSkeleton />
                </GridItem>
              ))}
            </GridContainer>
          ) : paginatedProducts.length > 0 ? (
            <>
              <GridContainer spacing={4}>
                {paginatedProducts.map((product) => (
                  <GridItem xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </GridItem>
                ))}
              </GridContainer>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 5 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    color="primary"
                    size={isMobile ? "medium" : "large"}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#1E293B',
                        margin: '0 6px',
                        minWidth: '48px',
                        height: '48px',
                        fontSize: '1.1rem',
                        '&.Mui-selected': {
                          backgroundColor: '#1B8A5A',
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#006837',
                          }
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(27, 138, 90, 0.1)',
                        }
                      }
                    }}
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
        {renderFilterDrawer()}
      </Drawer>
    </>
  );
};

export default Products;
