import React from 'react';
import { FaSearch } from "react-icons/fa";
import Orderlist from "./Orderlist";

const RecentOrder = () => {
  return (
    <div className="px-8 mt-6">
      <div className="bg-gradient-to-br from-white via-[#e0e7ff] to-[#c7d2fe] w-full h-[450px] rounded-2xl p-4 shadow-lg border border-[#c7d2fe] transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center text-[#025cca] p-4">
          <h1 className="text-lg font-bold">Recent Orders</h1>
          <a href="#" className="text-[#025cca] text-sm font-semibold hover:underline">View all</a>
        </div>

        {/*search bar*/}
        <div className="flex items-center gap-4 bg-white border border-[#e0e7ff] rounded-[20px] px-6 py-4 mx-6 shadow-sm focus-within:border-[#22d3ee]">
          <FaSearch className="text-[#6366f1]" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-transparent outline-none text-[#1e293b] w-full placeholder-[#64748b] focus:ring-2 focus:ring-[#22d3ee] rounded-md px-2"
          />
        </div>

        {/*order lists*/}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px]">
          <Orderlist />
          <Orderlist />
          <Orderlist />
          <Orderlist />
          <Orderlist />
          <Orderlist />
        </div>
      </div>
    </div>
  )
}

export default RecentOrder