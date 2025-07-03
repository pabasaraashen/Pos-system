import React from 'react';
import Greatings from '../components/home/Greatings';
import Card1 from '../components/home/Card1';
import RecentOrder from '../components/home/RecentOrder';
import Populer from '../components/home/Populer';
import { MdAttachMoney } from "react-icons/md";
import { RiProgress1Line } from "react-icons/ri";

const Home = () => {
  return (
    <section className='bg-[#1a1a1a] h-[calc(102vh-5rem)] overflow-hidden flex gap-4'>
       {/*left*/}
       <div className='flex-[3] bg-[#a0a0a0] rounded-lg'>
        <Greatings/>
        <div className='flex items-center w-full gap-3 px-8 mt-8'>
            <Card1 title="Total Earnings" icon={<MdAttachMoney />} number={512} footerNum={1.6}/>
            <Card1 title="In Progress" icon={<RiProgress1Line />} number={16} footerNum={1.6} />
        </div>
        <RecentOrder/>
       </div>

       {/*right*/}
       <div className='flex-[2] bg-[#1a1a1a]'> 
        <Populer/>
       </div>
       
    </section>
  )
}

export default Home