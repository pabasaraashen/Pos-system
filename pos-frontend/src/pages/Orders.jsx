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
            return dateB - dateA; // Descending order (latest first)
        });
    };

    const filteredOrders = getFilteredOrders();

    return (
        <section className='bg-[#1a1a1a] h-[calc(100vh-5rem)] overflow-hidden'>
            <div className='flex items-center justify-between px-8 py-4'>
                <div className='flex items-center gap-4'>
                    <BackButton/>
                    <h1 className='text-[#f5f5f5] text-2xl font-bold'>Orders</h1>
                </div>
                <div className="flex items-center justify-around gap-4">
                    <button 
                        onClick={() => setStatus("all")} 
                        className={`text-[#ababab] text-lg ${status === "all" ? "bg-[#383838] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#383838]`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setStatus("progress")} 
                        className={`text-[#ababab] text-lg ${status === "progress" ? "bg-[#383838] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#383838]`}
                    >
                        In Progress
                    </button>
                    <button 
                        onClick={() => setStatus("ready")} 
                        className={`text-[#ababab] text-lg ${status === "ready" ? "bg-[#383838] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#383838]`}
                    >
                        Ready
                    </button>
                    <button 
                        onClick={() => setStatus("completed")} 
                        className={`text-[#ababab] text-lg ${status === "completed" ? "bg-[#383838] text-white" : ""} rounded-lg px-5 py-2 font-semibold transition-colors hover:bg-[#383838]`}
                    >
                        Completed
                    </button>
                </div>
            </div>

            <div className='flex flex-wrap gap-10 px-16 py-4 overflow-y-auto h-[calc(100vh-12rem)]'>
                {isLoading ? (
                    <div className="col-span-3 text-gray-500 flex justify-center items-center w-full">
                        <p>Loading orders...</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <Ordercard key={order._id} order={order} />
                    ))
                ) : (
                    <div className="col-span-3 text-gray-500 flex justify-center items-center w-full">
                        <p>No orders available for "{status === "all" ? "all statuses" : status}"</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Orders;