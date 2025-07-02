import React from 'react';
import { MostPopuler } from '../../constants/index.js';

const Populer = () => {
  return (
    <div className='mt-6  pr-10'>
        <div className='bg-[#000000] w-full rounded-lg'>
           <div className="flex justify-between items-center text-[#f5f5f5] p-4">
               <h1 className="text-lg font-semibold">Most Popular</h1>
               <a href="#" className="text-[#025cca] text-sm font-semibold">View all</a>
           </div> 
           <div className="h-[680px] overflow-y-scroll">
            {
                MostPopuler.map((dish) => {
          return (
            <div key={dish.id} className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6 mb-2">
                <img src={dish.image} alt={dish.name} className="w-[50px] h-[50px] rounded-lg "/>
                <div>
                    <h1 className='text-[#f5f5f5] font-semibold'>{dish.name}</h1>
                    <p className='text-[#f5f5f5] text-sm font-semibold mt-1'><span className='text-[#929292]'>orders: </span>{dish.numberOfOrders}</p>
                    </div>
                    </div>
          )
                })
            }
           </div>  
        </div>
    </div>
  )
}

export default Populer