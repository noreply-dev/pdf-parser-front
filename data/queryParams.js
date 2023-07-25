import React from 'react'

function IgnoreOperators(state, updateState) {
  return <input
    type='text'
    className='w-full h-fit rounded-md px-3 py-2 font-light text-sm bg-[#dddddd]
    outline-none border-none'
    placeholder='Comma separated values. No spaces.'
    value={state.ignoreOperators.value}
    onChange={e => {
      updateState(prev => ({
        ...prev,
        ignoreOperators: e.target.value
      }))
    }}
  />
}

export const queryParams = [
  {
    name: 'Ignore operators',
    value: 'ignoreOperators',
    type: 'array',
    description: 'Ignore operators on the pdf filtering process.',
    example: 'text,image,rectangle',
    component: IgnoreOperators
  },
  {
    name: 'Remap operators keys',
    value: 'remapOperatorsKeys',
    type: 'array',
    description: 'Remap operators types names on the fly while filtering.',
    example: 'rectagle.check',
    component: IgnoreOperators
  },
  {
    name: 'Ignore front pages',
    value: 'ignoreFrontPages',
    type: 'boolean',
    description: 'Ignore cover pages.',
    example: 'true',
    component: IgnoreOperators
  }
]