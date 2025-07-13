import React from 'react';
import { Grid, GridProps } from '@mui/material';

// Componente wrapper para o Grid que resolve os problemas de tipagem do MUI v7
export const GridContainer: React.FC<GridProps> = (props) => {
  return <Grid container component="div" {...props} />;
};

export const GridItem: React.FC<GridProps> = (props) => {
  return <Grid item component="div" {...props} />;
};
