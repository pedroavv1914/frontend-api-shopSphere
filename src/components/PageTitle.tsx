import React from 'react';
import { Box, Typography, Breadcrumbs, Link, Divider, SxProps, Theme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  sx?: SxProps<Theme>;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, breadcrumbs, sx }) => {
  return (
    <Box sx={{ mb: 4, ...(sx || {}) }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link 
            component={RouterLink} 
            to="/" 
            color="inherit"
            underline="hover"
          >
            Home
          </Link>
          
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return isLast ? (
              <Typography color="text.primary" key={breadcrumb.name}>
                {breadcrumb.name}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={breadcrumb.href || '#'}
                color="inherit"
                underline="hover"
                key={breadcrumb.name}
              >
                {breadcrumb.name}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
      
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          color: '#006837',
          display: 'inline-block',
          backgroundColor: '#FFFFFF',
          px: 4,
          py: 1.5,
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {title}
      </Typography>
      
      {subtitle && (
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {subtitle}
        </Typography>
      )}
      
      <Divider sx={{ mt: 2, mb: 4 }} />
    </Box>
  );
};

export default PageTitle;
