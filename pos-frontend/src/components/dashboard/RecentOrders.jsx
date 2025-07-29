import React from "react";
import { GrUpdate } from "react-icons/gr";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrders, updateOrderStatus } from '../../https';

const RecentOrders = () => {
  const queryClient = useQueryClient();

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({orderId, orderStatus}) => updateOrderStatus(orderId, orderStatus),
    onSuccess: (data) => {
      enqueueSnackbar("Order status updated successfully!", { variant: 'success' });
      queryClient.invalidateQueries(['orders']);
    },
    onError: (error) => {
      enqueueSnackbar("Failed to update order status!", { variant: 'error' });
      console.error('Error updating order status:', error);
    }
  });

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

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;
    const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;

    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()} ${formattedHour}:${formattedMinute} ${ampm}`;
  };

  // Get recent orders (latest 10)
  const getRecentOrders = () => {
    if (!resData?.data?.data) return [];
    
    return resData.data.data
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a._id);
        const dateB = new Date(b.createdAt || b._id);
        return dateB - dateA; // Descending order (latest first)
      })
      .slice(0, 10); // Get only the 10 most recent orders
  };

  const recentOrders = getRecentOrders();

  const handleStatusChange = (orderId, orderStatus) => {
    orderStatusUpdateMutation.mutate({
      orderId,
      orderStatus
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-blue-500';
      case 'ready':
        return 'text-green-500';
      case 'in progress':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto overflow-y-scroll h-[700px] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  Loading orders...
                </td>
              </tr>
            ) : recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const totalItems = order.items ? order.items.reduce((sum, item) => sum + item.count, 0) : 0;
                const orderId = order._id?.slice(-6).toUpperCase() || 'N/A';
                
                return (
                  <tr
                    key={order._id}
                    className="border-b border-gray-600 hover:bg-[#333]"
                  >
                    <td className="p-4">#{orderId}</td>
                    <td className="p-4">{order.customerDetails?.Name || 'Unknown Customer'}</td>
                    <td className="p-4">
                      <select
                        className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${getStatusColor(order.orderStatus)} ${orderStatusUpdateMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        value={order.orderStatus || 'In Progress'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={orderStatusUpdateMutation.isPending}
                      >
                        <option className="text-yellow-500" value="In Progress">
                          In Progress
                        </option>
                        <option className="text-green-500" value="Ready">
                          Ready
                        </option>
                        <option className="text-blue-500" value="Completed">
                          Completed
                        </option>
                      </select>
                    </td>
                    <td className="p-4">{formatDateTime(order.createdAt || new Date())}</td>
                    <td className="p-4">{totalItems} Items</td>
                    <td className="p-4">Rs.{order.bills?.totalWithTax?.toFixed(2) || '0.00'}</td>
                    <td className="p-4 text-center">
                      <button 
                        className="text-blue-400 hover:text-blue-500 transition"
                        onClick={() => console.log('Update order:', order._id)}
                      >
                        <GrUpdate size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;