import React from 'react'

const Card1 = ({title, icon, number, footerNum}) => {
  return (
    <div className='bg-[#000000] py-5 px-5 rounded-lg w-[50%]'>
        <div className='flex items-start justify-between'>
           <h1 className='text-[#e6dfdf] text-lg font-bold'>{title}</h1>
           <button className={`${title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-[#f6b100]"} p-3 rounded-lg text-[#f5f5f5] text-2xl`}>{icon}</button>
        </div>
        <div>
           <h1 className='text-[#f5f5f5] text-4xl font-bold mt-5'>{
              title === "Total Earnings" ? `₹${number}` : number}</h1>
            <h1 className='text-[#f5f5f5] text-lg mt-2'><span className='text-[#02ca3a]'>{footerNum}%</span> than yesterday</h1>  
        </div>
    </div>
  )
}

export default Card1