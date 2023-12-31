'use client'

import { SearchContext } from "@/context/SearchContext"
import { useContext } from "react"

const productsRenderers = {
  'array': ArrayRenderer,
  'object': ObjectRenderer,
  'string': StringRenderer
}

function findDeepestLevel(object: Object): number {
  let deepestLevel = 0

  Object.keys(object).forEach(key => {
    if (object[key as keyof typeof object] instanceof Object) {
      const level = findDeepestLevel(object[key as keyof typeof object])
      if (level > deepestLevel) deepestLevel = level
    }
  })

  return deepestLevel + 1
}

// Object renderer the most complex renderer
function ObjectRenderer(object: Object, level: number): any{
  const indenting = level * 15
  const keys = Object.keys(object)
  if (keys.length === 0) return null

  // each key is a property of the object
  return keys.map((key, index)=> {
    const depthLevel = findDeepestLevel(object[key as keyof typeof object])  

    if (Array.isArray(object[key as keyof typeof object])) {
      const array = Object.values(object[key as keyof typeof object])

      return <div key={index} style={{ marginLeft: indenting+'px'}}
        className={`flex ${depthLevel < 2? 'flex-row items-center justify-start' 
        : 'flex-col items-start justify-start'} h-fit w-full px-5`}>
        <div className="flex flex-row justify-start items-center">
          {level === 1 && <div className="h-1 w-1 bg-black rounded-sm mr-2"></div>}
          <p className="text-base text-black font-light">{key}:</p>
        </div>
        {ArrayRenderer(array, level)}
      </div>
    }

    if (object[key as keyof typeof object] instanceof Object) {
      const obj = object[key as keyof typeof object] as Object

      // conditionally render a column or a row
      return <div className={`flex ${depthLevel > 1? 'flex-row items-center justify-start' 
        : 'flex-col items-start justify-start'} h-fit w-full px-5`}
        key={JSON.stringify(obj[key as keyof typeof obj])}
        >
        <div className="flex flex-row h-fit w-fit items-center justify-start">
        <div className="h-1 w-1 bg-black rounded-sm mr-2"></div>
        <p className="text-base text-black font-light">{key}:</p>
        </div>
        {ObjectRenderer(obj, level++)}
      </div>
    }

    const string = object[key as keyof typeof object] as any

    // conditionally render a column or a row
    return <div className={`flex ${depthLevel < 2? 'flex-row items-center justify-start' 
      : 'flex-col items-start justify-start'} h-fit w-full px-5`}
      key={JSON.stringify(object[key as keyof typeof object])}
    >
        <p className="text-base text-black font-light">{key}:</p>
        {StringRenderer(string, level++)}
    </div>
  })
}

// Array is based on other renderers and its depth
function ArrayRenderer(array: Array<any>, level: number): any{
  const depthLevel = findDeepestLevel(array)

  if (depthLevel > 1) {
    return ObjectRenderer(Object.assign({}, array), level++)
  }

  return StringRenderer(array.join(', '), level)
}

// The smallest renderable unit
function StringRenderer(string: string, level: number): any {
  const indenting = level * 2

  return <p className={`text-base ${string ? 'text-[#0056ff]' : 'text-[#898989]'} font-light 
    ${indenting ? 'px-2' : ''}`}
  >{string || 'undefined'}</p>
}

// Main function rendering object properties
function renderProduct(keys: Array<string>, data: any, level: number): any{
  // Ignore the name property
  data.name ? keys.splice(keys.indexOf('name'), 1) : null

  return keys.map((key, index) => {
    let renderType = 'string'
    if (data[key] instanceof Object)  renderType = 'object'
    if (Array.isArray(data[key])) renderType = 'array'

    const depthLevel = findDeepestLevel(data[key])

    // conditionally render a column or a row
    return <div className={`flex ${renderType === 'string' || depthLevel < 2? 'flex-row items-center justify-start' 
        : 'flex-col items-start justify-start'} h-fit w-full px-5`}
        key={JSON.stringify(data[key])}
      >
      <div className="flex flex-row h-fit w-fit items-center justify-start">
        <div className="h-1.5 w-1.5 bg-black rounded-sm mr-2"></div>
        <p className="text-base text-black font-light">{key}:</p>
      </div>
      {productsRenderers[renderType as keyof typeof productsRenderers](data[key], level)}
    </div>
  })
}

export function Product({page, index}: {page: any, index: number}) {
  
  const {search} = useContext(SearchContext)
  let pageN = index+1

  return <div className="flex flex-col w-full h-fit gap-3">
    {
      page
      .filter((product: any) => {
        if (search === '') return true
        if (!product?.name) return false
        return product.name.toLowerCase().includes(search.toLowerCase())
      })
      .map((product: any, index: number) => {
        const productKeys = Object.keys(product)
        const indentingLevel = 1

        return <div className="flex flex-col bg-[#ececec] px-5 py-4 rounded-md" key={index}>
          {product?.name && <h3 className="text-base font-medium mb-2">{product.name}</h3>}
          {renderProduct(productKeys, product, indentingLevel)}
        </div>
      })
    } 
  </div>
}