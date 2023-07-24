'use client'
import React, {FormEvent, useState} from 'react'
import { ServerStatus } from './ServerStatus'
import { RequestBuilder } from './RequestBuilder'

export function FileUpload() {
  const [file, setFile] = useState<File>()

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target) return 
    let element = e.target as HTMLInputElement 
    let file = element?.files[0];

    setFile(file)
  }
  
  return (
    <div>
      {
        file 
          ? (
            <div className='flex flex-col items-center justify-center'>
              <h1 className='font-semibold text-2xl mb-3'
              >Parse request builder</h1>
              <p className='font-thin text-[#898989] mb-6'>{file.name}</p>
              <ServerStatus/>
              <RequestBuilder file={file}/>
            </div>
          )
          : (
            <button className='bg-gray-200 rounded-md px-4 py-2 border-solid border-[1px] border-gray-200
            hover:border-gray-500 transition-all ease-in-out '
              onClick={() => document.getElementById('input')?.click()}
            >Select file</button>
          )
      }
      <input 
        className='hidden'
        type='file' 
        id='input'
        onChange={handleUpload}/>

    </div>
  )
}
