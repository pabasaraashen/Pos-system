import React, { useState } from 'react';
import { MdDashboard, MdShoppingCart, MdPayment } from 'react-icons/md';
import Metrics from '../components/dashboard/Metrics';
import RecentOrders from '../components/dashboard/RecentOrders';

const sidebarItems = [
  { label: "Overview", icon: <MdDashboard />, key: "Metrics" },
  { label: "Orders", icon: <MdShoppingCart />, key: "Orders" },
  { label: "Payment", icon: <MdPayment />, key: "Payment" },
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("Metrics");

    return (
        <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)] flex'>
            {/* Sidebar */}
            <div className='w-64 bg-[#262626] border-r border-gray-700'>
                <div className='p-6'>
                    <h2 className='text-white text-xl font-semibold mb-6'>Dashboard</h2>
                    <nav className='space-y-2'>
                        {sidebarItems.map((item) => (
                            <button
                                key={item.key}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                    activeTab === item.key 
                                        ? 'bg-gray-700 text-white' 
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                                onClick={() => setActiveTab(item.key)}
                            >
                                <span className='text-lg'>{item.icon}</span>
                                <span className='font-medium'>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='flex-1 overflow-hidden'>
                <div className='h-full overflow-y-auto'>
                    {activeTab === "Metrics" && <Metrics />}
                    {activeTab === "Orders" && <RecentOrders />}
                    {activeTab === "Payment" && (
                        <div className='container mx-auto py-8 px-6 md:px-4'>
                            <div className='text-center text-white'>
                                <h2 className='text-2xl font-semibold mb-4'>Payment</h2>
                                <p className='text-gray-400 text-center'>Loading....</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard