import React from 'react';
import { FaCheck } from "react-icons/fa";

const Ordercard = () => {
  return (
    <div className="w-[550px] bg-[#626262] rounded-lg mb-4 p-4">
      <div className="flex items-center gap-4">
        <button className='bg-[#ddad00e6] p-3 text-xl font-bold text-[#f5f5f5] rounded-lg'>AM</button>
        <div className='flex items-center justify-between w-[100%]'>
          <div className='flex flex-col items-start gap-1.5'>
            <h1 className='text-[#f5f5f5] text-lg font-medium'>Pabasara</h1>
            <p className='text-[#f5f5f5] text-sm'>101/ Dine in</p>
          </div>

          <div className='flex flex-col items-start'>
            <p className='text-green-600 '>
              <FaCheck className='inline mr-2' />Ready
            </p>
          </div>
        </div>
      </div>

      {/* Moved this section below the above flex container */}
      <div className='flex text-black justify-between items-center mt-4'>
        <p>January 18, 2025 08:32 PM</p>
        <p>8 Items</p>
      </div>

      <hr className='w-full mt-4 text-[#2d2d2d]' />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">Rs.500.00</p>
      </div>
    </div>
  );
};

export default Ordercard;
