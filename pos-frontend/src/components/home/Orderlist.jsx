import React from 'react';
import { FaCheck } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

const Orderlist = () => {
  return (
    <div className="flex items-center gap-5 mb-3 p-4 bg-white rounded-xl shadow border border-[#e0e7ff] hover:shadow-lg transition-all duration-300">
      <button className="bg-gradient-to-r from-[#6366f1] to-[#22d3ee] p-3 text-xl font-bold text-white rounded-lg shadow-md hover:scale-110 transition-all duration-300">AM</button>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1.5">
          <h1 className="text-[#1e293b] text-lg font-bold">Pabasara</h1>
          <p className="text-[#64748b] text-sm">10 Items</p>
        </div>
        <div>
          <h1 className="text-[#6366f1] font-bold">Table No: 2</h1>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-[#10b981] px-4 font-bold"><FaCheck className="inline mr-2" />Ready</p>
          <p className="text-[#22d3ee] text-sm"><FaRegCircle className="inline mr-2 text-[#10b981]" />Ready to serve</p>
        </div>
      </div>
    </div>
  )
}

export default Orderlist