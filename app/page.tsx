'use client'
import React, { use, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AppContext } from '../context/Context'

export default function Home() {
  const { state, setState } = React.useContext(AppContext)
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target) return 
    let element = e.target as HTMLInputElement 
    if (!element?.files) return console.log('No files')
    let file = element?.files[0];

    setState({
      ...state, 
      file: file
    })

    router.push('/build')
  }
  
  return (
    <main className='h-screen w-screen flex flex-col justify-center items-center gap-6'>
      <h1 className='font-semibold text-black text-2xl'>
        Pdf parser 
        <span className='font-light px-3 py-1.5 text-sm bg-[#ececec] ml-2 rounded-md'>
          0.0.1
        </span>
      </h1>
      <button className='bg-gray-200 rounded-md px-4 py-2 border-solid border-[1px] border-gray-200
        hover:border-gray-500 transition-all ease-in-out '
        onClick={() => {if (ref.current) ref.current?.click()}}
      >Select file</button>
      <input 
        className='hidden'
        type='file' 
        ref={ref}
        onChange={handleUpload}
      />
    </main>
  )
}
