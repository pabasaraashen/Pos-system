import React from 'react';
import { FaSearch } from "react-icons/fa";
import Orderlist from "./Orderlist";

const RecentOrder = () => {
  return (
    <div className='px-8 mt-6'>
         <div className='bg-[#000000] w-full h-[450px] rounded-lg p-4'>
           <div className="flex justify-between items-center text-[#f5f5f5] p-4">
               <h1 className="text-lg font-semibold">Recent Orders</h1>
               <a href="#" className="text-[#025cca] text-sm font-semibold">View all</a>
           </div>

            {/*search bar*/}
            <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[20px] px-6 py-4 mx-6">
             <FaSearch className="text-[#f5f5f5]" />
                 <input
                 type="text"
                 placeholder="Search recent orders"
                 className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
                 />
            </div>

            {/*order lists*/}
            <div className='mt-4 px-6 overflow-y-scroll h-[300px]'>
            <Orderlist/>
            <Orderlist/>
            <Orderlist/>
            <Orderlist/>
            <Orderlist/>
            <Orderlist/>
            </div>
        </div>
    </div>
  )
}

export default RecentOrder