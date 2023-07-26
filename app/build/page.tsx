'use client'

import { Json } from "@/components/build/Json"
import { RequestBuilder } from "@/components/build/RequestBuilder"
import { AppContext } from "@/context/Context"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

export default function Build() {
  const { state } = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
   if (!state?.file || !state.file?.name) router.back()
  }, [router, state])

  return <div className="flex flex-row justify-start items-center h-screen w-screen">
    <RequestBuilder />
    <div className="h-[70%] w-[1px] bg-black"/>
    <Json/>
  </div>
}