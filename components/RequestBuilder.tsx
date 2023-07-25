'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import {queryParams} from '../data/queryParams'

import info from '../public/info.svg'
import Image from 'next/image'

export function RequestBuilder({file, setJson} : {file: File, setJson: Function}) {
  const router = useRouter()
  const [selected, setSelected] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)

  async function POST(url: string) {
    const formData = new FormData()
    formData.append('filePdf', file)

    return fetch(url, {
      method: 'POST', 
      body: formData
    }).then(res => res.json()) 
  }

  const {trigger} = useSWRMutation(process.env.NEXT_PUBLIC_API+'/upload', POST)

  return (
    <div className='flex flex-col justify-start items-end w-full h-fit'>
      <div className='flex flex-col items-start justify-start 
        w-full h-fit px-6 py-5 bg-[#ececec] rounded-xl mb-5'
      >
        <div className='flex flex-row items-center justify-start gap-3 mb-4'>
          <p className='text-xl'>Query params</p>
          <Image src={info} alt='arrow-down' width={15} height={15}/>
        </div> 
        <div className='flex flex-col items-start justify-start
         w-full h-fit max-h-56 overflow-scroll'
        >
          {
            queryParams.map((param, index)=> {
              return <div key={param.name} className='flex flex-col h-fit w-full'
                onClick={() => setSelected(prev => {
                  if (prev === index) {
                    return -1
                  }

                  return index
                })}
              >
                <div className='flex flew-row gap-3 h-fit w-full items-baseline
                justify-start px-4 py-2 rounded-md cursor-pointer hover:bg-[#dddddd]'>
                  <p>{param.name}</p>
                  <p className='grid place-items-center px-3 py-1 bg-blue-500 
                  text-white font-light rounded-md'
                  >{param.type}</p>
                </div>
                {
                  selected === index && <div className='flex flex-col justify-start items-start
                    mb-4 mt-2 px-4'
                    onClick={e => e.stopPropagation()}>
                    <p className='text-sm text-gray-500 font-light mb-2'>{param.description}</p>
                    {/* {param.component(queryParamsState, setQueryParamsState)}  */}
                  </div>
                }
              </div>
            })
          }
        </div>
      </div> 
      <button
        className='px-4 py-2 bg-blue-500 text-white font-light rounded-md'
        onClick={async () => {
          setLoading(true)
          const response = await trigger()
          setJson(response) 
        }}
      >{
        loading 
          ? <div role="status">
              <svg aria-hidden="true" className="w-[23px] h-[23px] text-blue-500 animate-spin dark:text-blue-500 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          : 'Parse'
      }</button>
    </div>
  )
}