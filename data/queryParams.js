import React from 'react'

export const queryParams = [
  {
    name: 'Ignorar',
    value: 'ignoreOperators',
    type: 'array',
    description: 'Ignorar operadores.',
    example: 'text,image,rectangle',
  },
  {
    name: 'Renombrar',
    value: 'remapOperatorsKeys',
    type: 'array',
    description: 'Cambiar el nombre de los operadores. Así un operador Image se puede renombrar a Foto.',
    example: 'rectagle.check',
  },
  {
    name: 'Ignorar portadas',
    value: 'ignoreFrontPages',
    type: 'boolean',
    description: 'Ignorar las páginas que son en su totalidad imágenes.',
    example: 'true',
  },
]