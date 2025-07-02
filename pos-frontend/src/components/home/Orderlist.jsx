import React from 'react';
import { FaCheck } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

const Orderlist = () => {
  return (
    <div className="flex items-center gap-5 mb-3 p-4">
      <button className='bg-[#6a6a6a] p-3 text-xl font-bold text-[#f5f5f5] rounded-lg'>AM</button>
      <div className='flex items-center justify-between w-[100%]'>
        <div className='flex flex-col items-star gap-1.5'>
            <h1 className=' text-[#f5f5f5] text-lg font-medium'>Pabasara</h1>
            <p className=' text-[#f5f5f5] text-sm'>10 Items</p>
        </div>
        <div>
            <h1 className='text-[#f5f5f5] font-medium'>Table No: 2</h1>
        </div>
        <div className='flex flex-col items-star gap-2'>
            <p className=' text-green-600 px-4'><FaCheck className='inline mr-2' />Ready</p>
            <p className='text-[#f5f5f5] text-sm'><FaRegCircle className='inline mr-2 text-green-600' />Ready to serve</p>
        </div>
      </div>
    </div>  
  )
}

export default Orderlist