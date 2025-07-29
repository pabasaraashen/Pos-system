import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Orderlist from "./Orderlist";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrders } from '../../https';

const RecentOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter orders based on search term and get recent orders (latest 10)
  const getFilteredOrders = () => {
    if (!resData?.data?.data) return [];
    
    let orders = resData.data.data;
    
    // Filter by search term if provided
    if (searchTerm) {
      orders = orders.filter(order => 
        order.customerDetails?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerDetails?.ID?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by creation date (latest first) and take only the first 10
    return orders
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a._id);
        const dateB = new Date(b.createdAt || b._id);
        return dateB - dateA; // Descending order (latest first)
      })
      .slice(0, 10); // Get only the 10 most recent orders
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="px-8 mt-6">
      <div className="bg-gradient-to-br from-white via-[#e0e7ff] to-[#c7d2fe] w-full h-[450px] rounded-2xl p-4 shadow-lg border border-[#c7d2fe] transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center text-[#025cca] p-4">
          <h1 className="text-lg font-bold">Recent Orders</h1>
          <a href="#" className="text-[#025cca] text-sm font-semibold hover:underline">View all</a>
        </div>

        {/*search bar*/}
        <div className="flex items-center gap-4 bg-white border border-[#e0e7ff] rounded-[20px] px-6 py-4 mx-6 shadow-sm focus-within:border-[#fafafa]">
          <FaSearch className="text-[#6366f1]" />
          <input
            type="text"
            placeholder="Search recent orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-[#1e293b] w-full placeholder-[#64748b] focus:ring-2 focus:ring-[#ffffff] rounded-md px-2"
          />
        </div>

        {/*order lists*/}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              return <Orderlist key={order._id} order={order} />;
            })
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">
                {searchTerm ? `No orders found for "${searchTerm}"` : "No orders available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecentOrder