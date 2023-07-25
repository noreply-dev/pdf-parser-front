'use client'

import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { AppContext } from '@/context/Context'
import { ServerStatus } from './ServerStatus'
import { QueryParams } from './QueryParams'


export function RequestBuilder() {
  const { state, setState } = React.useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(false)

  async function POST(url: string) {
    const formData = new FormData()
    formData.append('filePdf', state.file)

    return fetch(url, {
      method: 'POST', 
      body: formData
    }).then(res => res.json()) 
  }

  const {trigger} = useSWRMutation(process.env.NEXT_PUBLIC_API+'/upload', POST)

  return (
    <div className='flex flex-col justify-start items-start min-w-[350px] w-[38%] h-full
      p-10 font-semibold text-2xl'>
      <h1 className='mb-6'>Request builder</h1>
      <ServerStatus/>
      <h2 className='font-medium text-xl'>Query params</h2>
      <QueryParams/>
      <button className='text-base font-medium text-white bg-[#0056ff] w-full h-fit
        px-4 py-2 rounded-md'>
        Parse {state.file.name}
      </button>
    </div>
  )
}