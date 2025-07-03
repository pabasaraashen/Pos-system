import React, { useState } from 'react';
import Bottomnavbar from '../components/Bottomnavbar';
import Ordercard from '../components/shared/orders/Ordercard';
import BackButton from '../components/shared/BackButton';

const Orders = () => {

    const [status, setStatus] = useState("all");
  return (
    <section className='bg-[#1a1a1a] h-[calc(100vh-5rem)] overflow-hidden'>
        <div className='flex items-center justify-between px-8 py-4'>
            <div className='flex items-center gap-4'>
            <BackButton/>
            <h1 className='text-[#f5f5f5] text-2xl font-bold '>Orders</h1>
            </div>
            <div className="flex items-center justify-around gap-4">
          <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
            All
          </button>
          <button onClick={() => setStatus("progress")} className={`text-[#ababab] text-lg ${status === "progress" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
            In Progress
          </button>
          <button onClick={() => setStatus("ready")} className={`text-[#ababab] text-lg ${status === "ready" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
            Ready
          </button>
          <button onClick={() => setStatus("completed")} className={`text-[#ababab] text-lg ${status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
            Completed
          </button>
        </div>
        </div>

        <div className=' flex flex-wrap gap-10 px-16 py-4 overflow-y-auto h-[700px]'>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
             <Ordercard/>
        </div>
       
        <Bottomnavbar/>
    </section>
  )
}

export default Orders