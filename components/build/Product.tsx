'use client'

function ArrayToString(array: Array<any>): string {
  array.forEach(item => {
    if (item instanceof Object) return ArrayToString(item)
  }) 
  return array.join(',')
}

function renderChild(keys: Array<string>, data: any, count: number): any{
  return keys.map((key, index) => {
    // Product title
    if (key === 'name') return <h3 className="text-base font-medium" key={index}>{data[key]}</h3>
    
    // Render arrays
    if (data[key] instanceof Array) return <div>
      <p className={`${'px-'+(count*2)} text-base font-light`}>{key}: {ArrayToString(data[key])}</p> 
    </div>
    
    // Rended objects
    if (data[key] instanceof Object) return renderChild(Object.keys(data[key]), data[key], count++)

    return <div key={key}>
      <p className={`text-sm font-light text-[#898989] 
        ${'px-'+(count*2)}`}
      >{key}: {data[key]}</p> 
    </div>
  })
}

export function Product({page, index}: {page: any, index: number}) {
  let pageN = index+1
  console.log(page)
  return <div className="flex flex-col w-full h-fit gap-3">
    {
      page.map((product: any, index: number) => {
        return <div className="bg-[#ececec] px-5 py-4 rounded-md" key={index}>
          {renderChild(Object.keys(product), product, 1)}
        </div>
      })
    } 
  </div>
}