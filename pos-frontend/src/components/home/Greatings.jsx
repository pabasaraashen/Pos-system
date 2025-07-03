import React, { useState, useEffect } from 'react';
import { BiDish } from "react-icons/bi";

const Greatings = () => {
    const[dateTime, setDateTime] = useState(new Date())

    useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
  };

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  return (
    <div className='flex justify-between items-center px-8 mt-5'>
        <div>
            <h1 className='text-[#000000] text-2xl font-bold'>Good Morning, Pabasara</h1>
        </div>
        <div className="ml-[350px]">
  <button className="flex items-center gap-2 bg-[#f6b100] hover:bg-[#dee26c] text-black font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300">
    <BiDish size={24} />
    <span>Create Order</span>
  </button>
</div>
        <div>
            <h1 className="text-[#000000] text-3xl font-bold w-[130px]">{formatTime(dateTime)}</h1>
            <p className="text-[#252525] text-sm">{formatDate(dateTime)}</p>
        </div>
    </div>
  )
}

export default Greatings