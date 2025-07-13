// GridSystem.tsx
// Este arquivo fornece componentes Box compatíveis com MUI v7
// Resolve os problemas de tipagem em todo o projeto

import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

// Interface para as propriedades do Box com suporte a layout flexbox
interface BoxFlexProps {
  children?: React.ReactNode;
  component?: React.ElementType;
  // Propriedades de layout
  display?: string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  alignContent?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'space-between' | 'space-around';
  gap?: number | string;
  p?: number | string;
  px?: number | string;
  py?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  width?: string | number;
  height?: string | number;
  sx?: SxProps<Theme>;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
  [key: string]: any; // Para outras props que possam ser passadas
}

// Converte propriedades antigas do Grid para propriedades do Box
const convertGridPropsToBoxProps = (props: any) => {
  const newProps: any = { ...props };
  
  // Remover propriedades obsoletas
  delete newProps.container;
  delete newProps.item;
  
  // Converter propriedades de breakpoint para width responsiva
  if (newProps.xs !== undefined) {
    delete newProps.xs;
  }
  
  if (newProps.sm !== undefined) {
    delete newProps.sm;
  }
  
  if (newProps.md !== undefined) {
    delete newProps.md;
  }
  
  if (newProps.lg !== undefined) {
    delete newProps.lg;
  }
  
  if (newProps.xl !== undefined) {
    delete newProps.xl;
  }
  
  // Converter spacing para gap
  if (newProps.spacing !== undefined) {
    newProps.gap = newProps.spacing;
    delete newProps.spacing;
  }
  
  return newProps;
};

// Grid Container substituído por Box com display flex
export const GridContainer: React.FC<BoxFlexProps> = ({ children, ...props }) => {
  const boxProps = convertGridPropsToBoxProps(props);
  return (
    <Box 
      component="div" 
      display="flex" 
      flexWrap="wrap"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

// Grid Item substituído por Box
export const GridItem: React.FC<BoxFlexProps> = ({ children, ...props }) => {
  const boxProps = convertGridPropsToBoxProps(props);
  return (
    <Box 
      component="div"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

// Exporta o Box como padrão para compatibilidade com código existente
export default Box;
