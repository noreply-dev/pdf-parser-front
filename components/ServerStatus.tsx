'use client'

export function ServerStatus () {
  let status = 'online'

  const serverStatus = fetch('http://bo-cristian.protofy.xyz:8080/status' as string)
    .then(res => res.json())
    .catch(err => {console.log(err); return null}) 

  if (!serverStatus) status = 'down'

  return (  
    <div className="px-6 py-5 bg-[#ececec] rounded-xl">
      <div className='flex flex-row justify-start items-center gap-2 mb-4'>
        <p className='text-xl'>Server</p>
        <div className={`h-3 w-3 rounded-full ml-1
        ${status === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <p className="text-[#B8B8B8] font-light">{status}</p>
      </div>
      <div className="flex flex-row justify-start items-start bg-[#DDDDDD] rounded-md px-4 py-2">
        <p className='font-thin text-base'>http://bo-cristian.protofy.xyz:8080/status</p>
      </div>
    </div>
  )
}