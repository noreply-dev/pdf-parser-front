import React from 'react'
import useSWRMutation from 'swr/mutation'

export function RequestBuilder({file} : {file: File}) {
  async function POST(url: string) {
    const formData = new FormData()
    formData.append('filePdf', file)

    return fetch(url, {
      method: 'POST', 
      body: formData
    }).then(res => res.json()) 
  }

  const {trigger} = useSWRMutation(process.env.NEXT_PUBLIC_API+'/update', POST)

  return (
    <div className='flex flex-col '>
      <div>

      </div>
      <button
        onClick={async () => {
          const response = await trigger()
        }}
      >hola</button>
    </div>
  )
}