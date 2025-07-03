import React from 'react'
import { FaHome } from 'react-icons/fa';
import { IoReorderFourSharp } from "react-icons/io5";
import { MdTableBar} from 'react-icons/md';
import { CiCircleMore} from 'react-icons/ci';
import { BiDish } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const Bottomnavbar = () => {

    const navigate = useNavigate();
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around'>
        <button onClick={() => navigate("/")} className='flex items-center justify-center text-[#e6dfdf] bg-[#4e4d4d] w-[200px] rounded-[20px]'><FaHome className='inline mr-4' size={15}/>Home</button>
        <button onClick={() => navigate("/orders")}className='flex items-center justify-center text-[#e6dfdf]  w-[200px] rounded-[20px]'><IoReorderFourSharp className='inline mr-4' size={15}/>Orders</button>
        <button onClick={() => navigate("/tables")}className='flex items-center justify-center text-[#e6dfdf]  w-[200px] rounded-[20px]'><MdTableBar className='inline mr-4' size={15}/>Tables</button>
        <button className='flex items-center justify-center text-[#e6dfdf]  w-[200px] rounded-[20px]'><CiCircleMore className='inline mr-4' size={15}/>More</button>

        <button className='absolute items-center bg-[#000000] text-[#e6dfdf] rounded-full p-3'><BiDish size={30}/></button>
    </div>
  )
}

export default Bottomnavbar