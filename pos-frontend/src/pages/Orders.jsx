import React, { useState } from 'react';
import Ordercard from '../components/shared/orders/Ordercard';
import BackButton from '../components/shared/BackButton';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getOrders } from '../https';
import { enqueueSnackbar } from 'notistack';

const Orders = () => {
    const [status, setStatus] = useState("all");

    const { data: resData, error, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
          return await getOrders();
        },
        placeholderData: keepPreviousData
    });

    if (error) {
        enqueueSnackbar("Something went wrong!", {variant: "error"});
    }

    // Filter and sort orders based on selected status
    const getFilteredOrders = () => {
        if (!resData?.data?.data) return [];
        
        let filteredOrders;
        
        if (status === "all") {
            filteredOrders = resData.data.data;
        } else {
            filteredOrders = resData.data.data.filter(order => {
                const orderStatus = order.orderStatus?.toLowerCase();
                switch (status) {
                    case "progress":
                        return orderStatus === "in progress";
                    case "ready":
                        return orderStatus === "ready";
                    case "completed":
                        return orderStatus === "completed";
                    default:
                        return true;
                }
            });
        }
        
        // Sort orders by creation date (latest first)
        return filteredOrders.sort((a, b) => {
            const dateA = new Date(a.createdAt || a._id);
            const dateB = new Date(b.createdAt || b._id);
            return dateB - dateA; 
        });
    };

    const filteredOrders = getFilteredOrders();

    return (
        <section className='in-h-screen bg-[#e0e7ff] shadow-2xl] h-[calc(100vh-5rem)] overflow-hidden'>
            <div className='flex items-center justify-between px-8 py-4'>
                <div className='flex items-center gap-4'>
                    <BackButton/>
                    <h1 className='text-[#181a94] text-3xl font-bold'>Orders</h1>
                </div>
                <div className="flex items-center justify-around gap-4">
                    <button 
                        onClick={() => setStatus("all")} 
                        className={`text-[#181a94] text-lg ${status === "all" ? "bg-[#181a94] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#959595]`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setStatus("progress")} 
                        className={`text-[#181a94] text-lg ${status === "progress" ? "bg-[#181a94] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#959595]`}
                    >
                        In Progress
                    </button>
                    <button 
                        onClick={() => setStatus("ready")} 
                        className={`text-[#181a94] text-lg ${status === "ready" ? "bg-[#181a94] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#959595]`}
                    >
                        Ready
                    </button>
                    <button 
                        onClick={() => setStatus("completed")} 
                        className={`text-[#181a94] text-lg ${status === "completed" ? "bg-[#181a94] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#959595]`}
                    >
                        Completed
                    </button>
                </div>
            </div>

            <div className='flex flex-wrap gap-10 px-16 py-4 h-[calc(100vh-12rem)] overflow-y-scroll scrollbar-hide pt-4' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {isLoading ? (
                    <div className="col-span-3 text-black flex justify-center items-center w-full">
                        <p>Loading orders...</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <Ordercard key={order._id} order={order} />
                    ))
                ) : (
                    <div className="col-span-3 text-black flex justify-center items-center w-full">
                        <p>No orders available for "{status === "all" ? "all statuses" : status}"</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Orders;