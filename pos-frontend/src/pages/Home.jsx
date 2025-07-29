import React from 'react';
import Greatings from '../components/home/Greatings';
import Card1 from '../components/home/Card1';
import RecentOrder from '../components/home/RecentOrder';
import Populer from '../components/home/Populer';
import { MdAttachMoney } from "react-icons/md";
import { RiProgress1Line } from "react-icons/ri";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getOrders } from '../https';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
  // Fetch orders
  const { data: resData, error, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => await getOrders(),
    placeholderData: keepPreviousData
  });

  // Calculate total earnings and in progress count
  const { totalEarnings, inProgressCount } = React.useMemo(() => {
    if (!resData?.data?.data) return { totalEarnings: 0, inProgressCount: 0 };
    const orders = resData.data.data;
    const totalEarnings = orders.reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0);
    const inProgressCount = orders.filter(order => order.orderStatus?.toLowerCase() === 'in progress').length;
    return { totalEarnings, inProgressCount };
  }, [resData]);

  // Prepare data for In Progress Orders Over Time chart
  const inProgressByDate = React.useMemo(() => {
    if (!resData?.data?.data) return [];
    const orders = resData.data.data;
    const map = {};
    orders.forEach(order => {
      if (order.orderStatus?.toLowerCase() === 'in progress') {
        const date = order.createdAt ? order.createdAt.slice(0, 10) : "Unknown";
        map[date] = (map[date] || 0) + 1;
      }
    });
    return Object.entries(map)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [resData]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#6366f1] to-[#524fb0] flex gap-8 items-center justify-center px-4 py-8">
      {/* Left Card */}
      <div className="flex-[3] bg-[#f3f4f6] rounded-2xl shadow-[0_8px_32px_0_rgba(99,102,241,0.12)] border border-[#6366f1] p-10 space-y-8 transition-all duration-300 hover:shadow-[0_16px_48px_0_rgba(49,46,129,0.22)] ">
        <Greatings />
        <div className="flex items-start w-full gap-6 mt-8">
          <Card1
            title="Total Earnings"
            icon={<MdAttachMoney className='text-[#ffffff]' />}
            number={isLoading ? '...' : totalEarnings.toFixed(2)}
            footerNum={1.6}
          />
          {/* Custom In Progress Card with Chart */}
          <div className="flex-1 bg-gradient-to-br from-white via-[#e0e7ff] to-[#92a1dd] py-5 px-5 rounded-xl w-[50%] shadow-lg border border-[#c7d2fe] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
            <div className="flex items-center gap-10 mb-2">
              <span className="text-lg font-semibold text-[#025cca]">In Progress</span>
              <span className="bg-[#025cca] p-2 rounded-full">
                <RiProgress1Line className='text-white text-xl' />
              </span>
            </div>
            <div className="text-3xl font-bold text-[#020202] mb-2">
              {isLoading ? '...' : inProgressCount}
            </div>
            <div className="w-full h-14">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inProgressByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" hide />
                  <YAxis allowDecimals={false} hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#dc2626" dot={false} name="In Progress" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
          </div>
        </div>
        <RecentOrder />
      </div>

      {/* Right Card */}
      <div className="flex-[2] bg-[#e0e7ff] rounded-2xl shadow-[0_8px_32px_0_rgba(99,102,241,0.12)] border border-[#6366f1] p-10 transition-all duration-300 hover:shadow-[0_16px_48px_0_rgba(49,46,129,0.18)]">
        <Populer />
      </div>
    </section>
  )
}

export default Home