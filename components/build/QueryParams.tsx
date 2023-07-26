'use client'

import { AppContext } from '@/context/Context'
import {queryParams} from '../../data/queryParams'
import { useContext, useEffect, useState } from 'react'

export function QueryParams() {
  const { state, setState } = useContext(AppContext)

  useEffect(() => {
    console.log('state', state)
  }, [state])

  const [inputsState, setInputsState] = useState<any>({
    'ignoreOperators': '', 
    'remapOperatorsKeys': '', 
    'ignoreFrontPages': null,
  })

  return (
    <div className='w-full h-fit max-h-[80%] pt-5 overflow-y-scroll 
      overflow-x-hidden'>
      {
        queryParams.map((param, i) => {
          return <div key={param.name} className='flex flex-col justify-start items-start'>
            <div className='flex flex-row justify-start items-center w-full h-fit rounded-md bg-[#ececec]
              mb-2 px-3 py-2 gap-2 border-solid border-[1px] focus-within:border-black transition-all
              ease-in-out border-[#dddddd]'>
              <p className='text-base font-light whitespace-nowrap 
                text-[#898989]'
              >{param.name}</p>
              <div className='h-[25px] w-[3px] bg-[#b8b8b8]'></div>
              <input className='w-full text-base font-light text-black bg-transparent outline-none' 
                placeholder={param.example}
                value={inputsState[param.name]}
                onChange={(e) => {
                  setInputsState({
                    ...inputsState, 
                    [param.value]: e.target.value
                  })

                  setState({
                    ...state,
                    query: {
                      ...state.query,
                      [param.value]: e.target.value
                    }
                  })
                }}
                type="text" />
            </div>
            <p className='font-light text-sm text-black mb-6 px-3'>{param.description} Ejemplo: {param.example}</p>
          </div>
        })
      }
    </div>
  )
}