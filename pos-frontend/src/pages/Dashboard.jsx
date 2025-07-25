import React from 'react'
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const Dashboard = () => {
  return (
    <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)]'>
        <div className='container mx-autoflex items-center justify-between py-14 px-6 md:px-4'>
            <div className='flex items-center gap-3'>
                {
                    buttons.map(({ label, icon, action }) => {
                       return(
                         <button className='bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-lg font-semibold text-md flex items-center gap-2'>
                            {icon}
                            {label}
                        </button>
                       )

                    })

                }
            </div>

        </div>
        
    </div>
  )
}

export default Dashboard