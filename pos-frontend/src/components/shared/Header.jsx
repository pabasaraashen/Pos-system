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
        <h1 className="text-lg font-semibold text-[#f5f5f5]">restaurent</h1>
     </div>

     {/*search bar*/}
     <div className="flex items-center gap-4 bg-[#1a1a1a] rounded-[20px] px-5 py-2 w-[500px]">
        <input
         type="text"
         placeholder="Search"
         className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
        />
     </div>
    </header>
  )
}

export default Header