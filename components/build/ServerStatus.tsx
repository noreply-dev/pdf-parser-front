'use client'

export function ServerStatus () {
  let status = 'running'

  const serverStatus = fetch('http://cristian.protofy.xyz' as string)
    .then(res => res.json())
    .catch(err => {console.log(err); return null}) 

  if (!serverStatus) status = 'down'

  return (  
    <div className="w-full h-fit mb-7">
      <div className='flex flex-row justify-start items-center gap-2 mb-4'>
        <p className='text-lg font-light'>Server</p>
        <div className={`h-3 w-3 rounded-full ml-1
        ${status === 'running' ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <p className="text-sm text-[#B8B8B8] font-light">{status}</p>
      </div>
      <div className="flex flex-row justify-start items-start bg-[#ececec] rounded-md px-4 py-2">
        <p className='font-light text-base whitespace-nowrap'>https://cristian.protofy.xyz</p>
      </div>
    </div>
  )
}