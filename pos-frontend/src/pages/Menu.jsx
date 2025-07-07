import React from 'react';
import BackButton from '../components/shared/BackButton';
import MenuContainer from '../components/menu/MenuContainer';
import { RiDashboard2Fill } from 'react-icons/ri';
import { FaNotesMedical } from 'react-icons/fa';

const Menu = () => {
  return (
    <section className='bg-[#1a1a1a] h-[calc(100.8vh-5rem)] overflow-hidden flex gap-4'>
       {/*left*/}
       <div className='flex-[5] bg-[#474747]'>
          <div className='flex items-center justify-between px-8 py-4'>
            <div className='flex items-center gap-4'>
            <BackButton/>
            <h1 className='text-[#f5f5f5] text-2xl font-bold '>Menu</h1>
            </div>
            <div className="flex items-center justify-around gap-4">
          <div className="flex items-center gap-2 cursor-pointer">      
             <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5]">Customer Name</h1>
                <p className="text-xs text-[#7c7777]">Admin</p>
             </div>
          </div>
        </div>
        </div>

        <MenuContainer/>
       </div>

       {/*right*/}
       <div className='flex-[2.5] bg-[#1a1a1a] mt-4 mr-3 h-[780px] rounded-lg pt-2 '>
         {/*customer info*/}
         <div className='flex items-center justify-between px-4 py-3'>
            <div className='flex flex-col items-start'>
                <h1 className='text-md text-[#f5f5f5] font-semibold'>Customer Name</h1>
                <p className='text-xs text-[#ababab] font-medium mt-1'>#101/Dine in</p>
                <p className='text-xs text-[#ababab] font-medium mt-2'>January 19, 2025 05:34 PM</p>
            </div>
            <button className='bg-[#26106e] p-3 text-xl font-bold rounded-lg'>CN</button>
         </div>
         <hr className='border-[#2a2a2a] border-t-2'/>
         {/*cart items*/}
         <div className='px-4 py-2'>
            <h1 className='text-lg text-[#e4e4e4] font-semibold'>Order Details</h1>
            <div className='mt-4 overflow-y-scroll scroll-hide h-[380px]'>
              <div className='bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2'>
                <div className='flex items-center justify-between'>
                <h1 className='text-[#ababab] font-semibold text-md'>
                    Chicken Tikka
                </h1>
                <p className='text-[#ababab] font-semibold'>x2</p>
                </div>
                <div className='flex items-center justify-between mt-3'>
                  <div className='flex items-center gpa-3'>
                    <RiDashboard2Fill className='text-[#ababab] cursor-pointer size={20}'/>
                    <FaNotesMedical className='text-[#ababab] cursor-pointer size={20}'/>
                  </div>  
                </div>
              </div>
            </div>
         </div>
         {/*bills*/} 
        
       </div>

      {/**/}
    </section>
  )
}

export default Menu