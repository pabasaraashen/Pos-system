import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className='bg-blue-200 border border-[#181a94] p-3 text-xl font-bold rounded-lg'>
        <IoMdArrowBack />
    </button>
  )
}

export default BackButton