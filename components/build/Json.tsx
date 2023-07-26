'use client'

import Image from "next/image"

import { AppContext } from "@/context/Context"
import { useContext } from "react"
import { Product } from "./Product"

import filter from '@/public/filter.svg'

export function Json() {
  const { state } = useContext(AppContext)

  const getProductsCount = () => {
    let count = 0
    state.json?.data?.forEach((page: any) => {
      count += page.length
    })
    return count
  }

  return <div className="flex flex-col justify-start items-start w-full h-full
    px-10 pt-10">
    <h2 className="text-xl pt-16 font-medium">{state.file?.name}</h2>
    <div className='flex flex-row w-full h-fit mt-2.5 mb-4 gap-3.5'>
      <input className="w-full h-fit px-4 py-2 bg-[#ececec] rounded-md
        font-light text-base placeholder:text-[#898989] outline outline-2 outline-transparent
        focus:outline-[#0056ff] outline-offset-4 transition-all ease-in-out duration-12" 
        placeholder="search product"/>
      <button className="grid place-items-center bg-[#ececec] rounded-md px-3 py-1.5 
        outline outline-2 outline-transparent focus:outline-[#0056ff] outline-offset-4 
        transition-all ease-in-out duration-12">
        <Image src={filter} width={20} height={20} alt="Filter search icon"/>
      </button>
      <button 
        className="w-fit h-fit px-5 py-2 bg-[#0056ff] text-white rounded-md 
        outline outline-2 outline-transparent focus:outline-[#0056ff] outline-offset-4 
        transition-all ease-in-out duration-12"
      >search</button>
    </div>
    <div className="w-full h-fit flex flex-row justify-between items-baseline 
      shadow-bottom-offset z-20">
      <h2 className="text-xl pt-3 font-medium">Productos</h2>
      <p className="text-base font-light text-[#898989]">{getProductsCount() || '0'} productos</p>
    </div>
    <div className="flex flex-col w-full h-full overflow-y-scroll pt-8 pb-8 z-10 gap-3">
      {
        state.json?.data?.map((page: any, index: number) => {
           return <Product page={page} index={index} key={index}/>
        })
      }
    </div>
  </div>
}