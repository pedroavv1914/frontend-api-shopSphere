import React from 'react';
import { Box, BoxProps } from '@mui/material';

// Componente wrapper para o Box que substitui o Grid obsoleto
export const GridContainer: React.FC<BoxProps> = (props) => {
  // Remover propriedades obsoletas do Grid
  const { container, item, xs, sm, md, lg, xl, spacing, ...boxProps } = props as any;
  
  return (
    <Box 
      component="div" 
      display="flex" 
      flexWrap="wrap"
      gap={spacing}
      {...boxProps} 
    />
  );
};

export const GridItem: React.FC<BoxProps> = (props) => {
  // Remover propriedades obsoletas do Grid
  const { container, item, xs, sm, md, lg, xl, ...boxProps } = props as any;
  
  return <Box component="div" {...boxProps} />;
};
