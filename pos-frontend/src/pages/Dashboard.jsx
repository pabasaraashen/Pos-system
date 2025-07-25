import React, { useState } from 'react';
import {  MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from '../components/dashboard/Metrics';
import RecentOrders from '../components/dashboard/RecentOrders';

const buttons = [
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payment"];

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState("Metrics");

  return (
    <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)]'>
        <div className='container mx-auto flex items-center justify-between py-14 px-6 md:px-4'>
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

            <div className='flex items-center gap-3'>
              {
                tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`text-white py-3 px-8 rounded-lg font-semibold text-md flex items-center gap-2 ${activeTab === tab ? 'bg-gray-700' : 'bg-black hover:bg-gray-700'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))
              }
            </div>
        </div>
        {activeTab === "Metrics" && <Metrics />}
        {activeTab === "Orders" && <RecentOrders />}
    </div>
  )
}

export default Dashboard