import React, { useState }  from 'react';
import BackButton from '../components/shared/BackButton';
import TableCard from '../components/tables/TableCard';
import { tables } from '../constants';




const Tables = () => {

    const [status, setStatus] = useState("all");

  return (
    <section className="min-h-screen bg-[#e0e7ff]  h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-12 py-8">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#181a94] text-3xl font-bold tracking-wider drop-shadow-md">
            Tables
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStatus('all')}
            className={`text-lg font-semibold px-6 py-2 rounded-xl border border-[#6366f1] shadow-sm transition-all duration-200 ${status === 'all' ? 'bg-[#181a94] text-white scale-105' : 'bg-white text-[#2563eb] hover:bg-[#e0e7ff] hover:text-[#6366f1]'}`}
          >
            All
          </button>
          <button
            onClick={() => setStatus('booked')}
            className={`text-lg font-semibold px-6 py-2 rounded-xl border border-[#6366f1] shadow-sm transition-all duration-200 ${status === 'booked' ? 'bg-[#6366f1] text-white scale-105' : 'bg-white text-[#2563eb] hover:bg-[#e0e7ff] hover:text-[#6366f1]'}`}
          >
            Booked
          </button>
        </div>
      </div>
      <div className='flex flex-wrap gap-6 px-8 py-6 overflow-y-auto h-[700px] bg-white/60 rounded-2xl shadow-[0_8px_32px_0_rgba(99,102,241,0.10)] border border-[#e0e7ff] ml-24 mr-8'>
        {
          tables.map((table) => (
            <TableCard key={table.id} id={table.id} name={table.name} status={table.status} initials={table.initial} />
          ))
        }
      </div>
    </section>
  )
}

export default Tables