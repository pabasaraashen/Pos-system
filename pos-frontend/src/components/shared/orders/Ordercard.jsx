import React from 'react';
import { FaCheck, FaClock, FaCheckCircle } from "react-icons/fa";

const Ordercard = ({ order }) => {
  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;
    const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;

    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()} ${formattedHour}:${formattedMinute} ${ampm}`;
  };

  // Get status color and icon
  const getStatusDisplay = (status) => {
    switch (status.toLowerCase()) {
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
          text: status
        };
    }
  };

  // Calculate total items
  const totalItems = order.items ? order.items.reduce((sum, item) => sum + item.count, 0) : 0;

  // Get customer initials for the button
  const getInitials = (name) => {
    if (!name) return 'NA';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const statusDisplay = getStatusDisplay(order.orderStatus);

  return (
    <div className="w-[550px] max-h-[200px] bg-[#b4bcd3] rounded-lg mb-4 p-4 shadow-lg border border-[#c7d2fe] transition-all duration-100 hover:scale-[1.03] hover:shadow-2xl">
      <div className="flex items-center gap-4">
        <button className='bg-[#ddad00e6] p-3 text-xl font-bold text-[#f5f5f5] rounded-lg'>
          {getInitials(order.customerDetails?.Name)}
        </button>
        <div className='flex items-center justify-between w-[100%]'>
          <div className='flex flex-col items-start gap-1.5'>
            <h1 className='text-black text-lg font-medium'>
              {order.customerDetails?.Name || 'Unknown Customer'}
            </h1>
            <p className='text-[#424242] text-sm'>
              {order.customerDetails?.ID || 'N/A'} / Dine in
            </p>
          </div>

          <div className='flex flex-col items-start'>
            <p className={statusDisplay.color}>
              {statusDisplay.icon}{statusDisplay.text}
            </p>
          </div>
        </div>
      </div>

      {/* Order details */}
      <div className='flex text-black justify-between items-center mt-4'>
        <p>{formatDateTime(order.createdAt || new Date())}</p>
        <p>{totalItems} Items</p>
      </div>

      <hr className='w-full mt-4 text-[#2d2d2d]' />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-black text-lg font-semibold">Total</h1>
        <p className="text-black text-lg font-semibold">
          Rs.{order.bills?.totalWithTax?.toFixed(2) || '0.00'}
        </p>
      </div>
    </div>
  );
};

export default Ordercard;