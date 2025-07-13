// GridSystem.tsx
// Este arquivo fornece componentes Grid compatíveis com MUI v7
// Resolve os problemas de tipagem em todo o projeto

import React from 'react';
import { Grid } from '@mui/material';

// Interface estendida para incluir as propriedades de breakpoint do Grid
interface GridExtendedProps {
  children?: React.ReactNode;
  component?: React.ElementType;
  container?: boolean;
  item?: boolean;
  xs?: number | boolean | 'auto';
  sm?: number | boolean | 'auto';
  md?: number | boolean | 'auto';
  lg?: number | boolean | 'auto';
  xl?: number | boolean | 'auto';
  spacing?: number | string;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  alignContent?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'space-between' | 'space-around';
  sx?: any;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
  [key: string]: any; // Para outras props que possam ser passadas
}

// Grid Container com component="div" pré-definido
export const GridContainer: React.FC<GridExtendedProps> = ({ children, ...props }) => {
  return (
    <Grid component="div" container {...props}>
      {children}
    </Grid>
  );
};

// Grid Item com component="div" pré-definido
export const GridItem: React.FC<GridExtendedProps> = ({ children, ...props }) => {
  return (
    <Grid component="div" item {...props}>
      {children}
    </Grid>
  );
};

// Exporta o Grid como padrão para compatibilidade com código existente
export default Grid;
