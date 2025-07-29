import React from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getOrders } from "../../https";
import { enqueueSnackbar } from 'notistack';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
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
        activeOrders: 0,
        readyOrders: 0
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

    // Ready orders = orders with "ready" status
    const readyOrders = orders.filter(order =>
      order.orderStatus?.toLowerCase() === 'ready'
    ).length;

    return {
      revenue,
      totalCustomers,
      activeOrders,
      readyOrders
    };
  };

  const metrics = calculateMetrics();

  // Dynamic metrics data based on real order data
  const dynamicMetricsData = [
    {
      title: "Revenue",
      value: `Rs.${metrics.revenue.toFixed(2)}`,
      isIncrease: true,
      color: "#4f46e5"
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers.toString(),
      isIncrease: true,
      color: "#059669"
    },
    {
      title: "Active Orders",
      value: metrics.activeOrders.toString(),
      isIncrease: true,
      color: "#dc2626"
    },
    {
      title: "Ready Orders",
      value: metrics.readyOrders.toString(),
      isIncrease: true,
      color: "#f59e42"
    },
    {
      title: "Completed Orders",
      value: (metrics.totalCustomers - metrics.activeOrders - metrics.readyOrders).toString(),
      isIncrease: true,
      color: "#7c3aed"
    }
  ];

  // Pie chart data for Active, Ready, and Completed Orders
  const pieData = [
    { name: "Active Orders", value: metrics.activeOrders },
    { name: "Ready Orders", value: metrics.readyOrders },
    { name: "Completed Orders", value: metrics.totalCustomers - metrics.activeOrders - metrics.readyOrders }
  ];
  const pieColors = ["#dc2626", "#f59e42", "#7c3aed"];

  // Revenue by date for line chart
  const revenueByDate = React.useMemo(() => {
    if (!resData?.data?.data) return [];
    const orders = resData.data.data;
    const map = {};
    orders.forEach(order => {
      // Use order.createdAt or similar date field
      const date = order.createdAt ? order.createdAt.slice(0, 10) : "Unknown";
      map[date] = (map[date] || 0) + (order.bills?.totalWithTax || 0);
    });
    // Convert to array and sort by date
    return Object.entries(map)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [resData]);

  return (
    <div className='container mx-auto py-2 px-6 md:px-4'>
      <div className='flex justify-between text-center'>
        <div>
          <h2 className='font-semibold text-black text-2xl mt-8'>Overall Performance</h2>
        </div>
        
      </div>

      {isLoading ? (
        <div className="mt-6 text-center text-white">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-5 gap-4">
            {dynamicMetricsData.map((metric, index) => {
              return (
                <div
                  key={index}
                  className="shadow-sm rounded-lg p-4"
                  style={{ backgroundColor: metric.color }}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-xs text-[#ffffff]">
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
                    </div>
                  </div>
                  <p className="mt-1 font-semibold text-2xl text-[#f5f5f5]">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div>
          <h2 className='font-semibold text-black text-2xl mt-10'>Performance Chart</h2>
        </div>
          
          {/* Charts Section: Pie and Revenue Line Chart Side by Side */}
          <div className="mt-10 flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Order Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Revenue Line Chart */}
            <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Revenue</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#4f46e5" name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </>
      )}
    </div>
  )
}
export default Metrics;