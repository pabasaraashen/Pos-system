import React from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getOrders } from "../../https";
import { enqueueSnackbar } from 'notistack';
import { itemsData } from "../../constants";

const Metrics = () => {
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

  // Calculate metrics from order data
  const calculateMetrics = () => {
    if (!resData?.data?.data) {
      return {
        revenue: 0,
        totalCustomers: 0,
        activeOrders: 0
      };
    }

    const orders = resData.data.data;
    
    // Calculate total revenue
    const revenue = orders.reduce((total, order) => {
      return total + (order.bills?.totalWithTax || 0);
    }, 0);

    // Total customers = total number of orders
    const totalCustomers = orders.length;

    // Active orders = orders with "in progress" status
    const activeOrders = orders.filter(order => 
      order.orderStatus?.toLowerCase() === 'in progress'
    ).length;

    return {
      revenue,
      totalCustomers,
      activeOrders
    };
  };

  const metrics = calculateMetrics();

  // Dynamic metrics data based on real order data
  const dynamicMetricsData = [
    {
      title: "Revenue",
      value: `Rs.${metrics.revenue.toFixed(2)}`,
      percentage: "12%",
      isIncrease: true,
      color: "#4f46e5"
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers.toString(),
      percentage: "8%",
      isIncrease: true,
      color: "#059669"
    },
    {
      title: "Active Orders",
      value: metrics.activeOrders.toString(),
      percentage: "5%",
      isIncrease: true,
      color: "#dc2626"
    },
    {
      title: "Completed Orders",
      value: (metrics.totalCustomers - metrics.activeOrders).toString(),
      percentage: "15%",
      isIncrease: true,
      color: "#7c3aed"
    }
  ];

  return (
    <div className='container mx-auto py-2 px-6 md:px-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-semibold text-white text-xl'>Overall Performance</h2>
          <p className='text-gray-400 text-sm'>Metrics for the current month</p>
        </div>
        <button className='flex items-center gap-2 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg'>
          <span className='font-semibold'>Last 1 Month</span>
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isLoading ? (
        <div className="mt-6 text-center text-white">
          <p>Loading metrics...</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-4">
          {dynamicMetricsData.map((metric, index) => {
            return (
              <div
                key={index}
                className="shadow-sm rounded-lg p-4"
                style={{ backgroundColor: metric.color }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs text-[#f5f5f5]">
                    {metric.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      style={{ color: metric.isIncrease ? "#f5f5f5" : "red" }}
                    >
                      <path
                        d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                    <p
                      className="font-medium text-xs"
                      style={{ color: metric.isIncrease ? "#f5f5f5" : "red" }}
                    >
                      {metric.percentage}
                    </p>
                  </div>
                </div>
                <p className="mt-1 font-semibold text-2xl text-[#f5f5f5]">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className='flex flex-col justify-between mt-12'>
        <div>
          <h2 className='font-semibold text-white text-xl'>Item Details</h2>
          <p className='text-gray-400 text-sm'>Metrics for the current month</p>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-4">
          {itemsData.map((item, index) => {
            return (
              <div key={index} className="shadow-sm rounded-lg p-4" style={{ backgroundColor: item.color }}>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs text-[#f5f5f5]">{item.title}</p>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" fill="none">
                      <path d="M5 15l7-7 7 7" />
                    </svg>
                    <p className="font-medium text-xs text-[#f5f5f5]">{item.percentage}</p>
                  </div>
                </div>
                <p className="mt-1 font-semibold text-2xl text-[#f5f5f5]">{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Metrics