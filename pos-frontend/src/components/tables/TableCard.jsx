import React from 'react'

const TableCard = ({key, name, status, initials}) => {
  return (
    <div key={key} className='w-[300px] bg-[#525252] hover:bg-[#5e5e5e] rounded-lg mb-4 p-4 cursor-pointer'>
       <div className='flex items-center justify-between px-1'>
        <h1 className='text-white text-xl'>{name}</h1>
        <p className={`${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-white"} px-2 py-1 rounded-lg`}>
          {status}
        </p>
       </div> 
       <div className='flex justify-center mt-4 mb-4'>
       <h1 className='text-white bg-purple-800 p-5 rounded-2xl'>{initials}</h1>
       </div>
    </div>
  )
}

export default TableCard