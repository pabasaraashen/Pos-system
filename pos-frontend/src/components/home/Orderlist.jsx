import React from 'react';
import { FaCheck, FaClock, FaCheckCircle } from "react-icons/fa";

const Orderlist = ({ order }) => {
  // Get customer initials for the button
  const getInitials = (name) => {
    if (!name) return 'NA';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // Get status color and icon
  const getStatusDisplay = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return {
          color: 'text-yellow-600',
          icon: <FaClock className='inline mr-2' />,
          text: 'In Progress'
        };
      case 'ready':
        return {
          color: 'text-green-600',
          icon: <FaCheck className='inline mr-2' />,
          text: 'Ready'
        };
      case 'completed':
        return {
          color: 'text-blue-500',
          icon: <FaCheckCircle className='inline mr-2' />,
          text: 'Completed'
        };
      default:
        return {
          color: 'text-gray-500',
          icon: <FaClock className='inline mr-2' />,
          text: status || 'Unknown'
        };
    }
  };

  // Calculate total items
  const totalItems = order.items ? order.items.reduce((sum, item) => sum + item.count, 0) : 0;

  const statusDisplay = getStatusDisplay(order.orderStatus);

  return (
    <div className="flex items-center gap-5 mb-3 p-4 bg-white rounded-xl shadow border border-[#e0e7ff] hover:shadow-lg transition-all duration-300">
      <button className="bg-gradient-to-r bg-[#ddad00e6] p-3 text-xl font-bold text-white rounded-lg shadow-md hover:scale-110 transition-all duration-300">
        {getInitials(order.customerDetails?.Name)}
      </button>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1.5">
          <h1 className="text-[#1e293b] text-lg font-bold">
            {order.customerDetails?.Name || 'Unknown Customer'}
          </h1>
          <p className="text-[#64748b] text-sm">{totalItems} Items</p>
        </div>
        <div>
          <h1 className="text-[#5a5a5a] font-bold">
            ID:{order.customerDetails?.ID || 'N/A'}
          </h1>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className={`${statusDisplay.color} px-4 font-bold`}>
            {statusDisplay.icon}{statusDisplay.text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Orderlist