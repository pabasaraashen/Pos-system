import React from 'react';
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.jpg";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
     
     {/*logo*/}
     <div className="flex items-center gap-2">
        <img src={logo} className="h-8 w-8" alt="res logo" />
        <h1 className="text-lg font-extralight text-[#f5f5f5]">Sri Lankan Cuisine</h1>
     </div>

     {/*search bar*/}
     <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[20px] px-5 py-2 w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
         type="text"
         placeholder="Search"
         className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
        />
     </div>

     {/*login profile*/}
     <div className="flex items-center gap-4">
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
            <FaBell className="text-[#f5f5f5] text-2xl"/>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
            <FaUserCircle className="text-[#f5f5f5] text-4xl"/>
        <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5]">Pabasara</h1>
            <p className="text-xs text-[#7c7777]">Admin</p>
        </div>
        </div>
     </div>
    </header>
  )
}

export default Header