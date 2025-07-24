import React from 'react';
import Greatings from '../components/home/Greatings';
import Card1 from '../components/home/Card1';
import RecentOrder from '../components/home/RecentOrder';
import Populer from '../components/home/Populer';
import { MdAttachMoney } from "react-icons/md";
import { RiProgress1Line } from "react-icons/ri";

const Home = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#6366f1] to-[#524fb0] flex gap-8 items-center justify-center px-4 py-8">
      {/* Left Card */}
      <div className="flex-[3] bg-[#f3f4f6] rounded-2xl shadow-[0_8px_32px_0_rgba(99,102,241,0.12)] border border-[#6366f1] p-10 space-y-8 transition-all duration-300 hover:shadow-[0_16px_48px_0_rgba(49,46,129,0.22)] ">
        <Greatings />
        <div className="flex items-center w-full gap-6 mt-8">
          <Card1 title="Total Earnings" icon={<MdAttachMoney className='text-[#ffffff]' />} number={512} footerNum={1.6} />
          <Card1 title="In Progress" icon={<RiProgress1Line className='text-[#ffffff]' />} number={16} footerNum={1.6} />
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