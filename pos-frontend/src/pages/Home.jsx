import React from 'react';
import Bottomnavbar from '../components/Bottomnavbar';
import Greatings from '../components/home/Greatings';
import Card1 from '../components/home/Card1';
import RecentOrder from '../components/home/RecentOrder';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

const Home = () => {
  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-1'>
       {/*left*/}
       <div className='flex-[3] bg-[#ffffff]'>
        <Greatings/>
        <div className='flex items-center w-full gap-3 px-8 mt-8'>
            <Card1 title="Total Earnings" icon={<BsCashCoin/>} number={512} footerNum={1.6}/>
            <Card1 title="In Progress" icon={<GrInProgress />} number={16} footerNum={1.6} />
        </div>
        <RecentOrder/>
       </div>

       {/*right*/}
       <div className='flex-[2] bg-[#aeaeae]'></div>
       <Bottomnavbar/>
    </section>
  )
}

export default Home