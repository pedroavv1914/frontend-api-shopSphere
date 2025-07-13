// GridSystem.tsx
// Este arquivo fornece componentes Grid compatíveis com MUI v7
// Resolve os problemas de tipagem em todo o projeto

import React from 'react';
import { GridLegacy } from '@mui/material';

// Grid Container com component="div" pré-definido
export const GridContainer: React.FC<React.ComponentProps<typeof GridLegacy>> = (props) => {
  return <GridLegacy component="div" container {...props} />;
};

// Grid Item com component="div" pré-definido
export const GridItem: React.FC<React.ComponentProps<typeof GridLegacy>> = (props) => {
  return <GridLegacy component="div" item {...props} />;
};

// Exporta o GridLegacy como padrão para compatibilidade com código existente
export default GridLegacy;
