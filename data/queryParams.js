import React from 'react'

export const queryParams = [
  {
    name: 'Ignore operators',
    value: 'ignoreOperators',
    type: 'array',
    description: 'Ignore operators on the filtering process once the pdf has been parsed.',
    example: 'text,image,rectangle',
  },
  {
    name: 'Remap operators keys',
    value: 'remapOperatorsKeys',
    type: 'array',
    description: 'Remap operators types names on the fly on the filtering process. In this way, the rectangle could be representend as a true element inside a table.',
    example: 'rectagle.check,image.fotito',
  },
  {
    name: 'Ignore front pages',
    value: 'ignoreFrontPages',
    type: 'boolean',
    description: 'Ignore the pages that has an image that covers all the page or almost all the page.',
    example: 'true',
  },
]