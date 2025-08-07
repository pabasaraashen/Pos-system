import React from 'react'

const Card1 = ({title, icon, number, footerNum}) => {
  return (
    <div className="bg-gradient-to-br from-white via-[#e0e7ff] to-[#c7d2fe] py-5 px-5 rounded-xl w-[50%] shadow-lg border border-[#c7d2fe] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <div className="flex items-start justify-between">
        <h1 className="text-[#025cca] text-lg font-bold">{title}</h1>
        <button className={`p-3 rounded-lg text-2xl ${title === 'In Progress' ? ' text-white' : ' text-black'} shadow-md transition-all duration-300 hover:scale-110`}></button>
      </div>
      <div>
        <h1 className="text-[#1e293b] text-4xl font-bold mt-5">{
          title === "Total Earnings" ? `Rs.${number}` : number}</h1>
        <h1 className="text-[#64748b] text-lg mt-2"><span className="text-[#00a11b] font-bold">{footerNum}%up</span> last month </h1>
      </div>
    </div>
  )
}

export default Card1