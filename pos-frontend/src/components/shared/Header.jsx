import React from 'react';
import { FaSearch, FaUserCircle, FaBell, FaHome } from 'react-icons/fa';
import { IoLogOut, IoReorderFourSharp } from "react-icons/io5";
import { MdDashboard, MdTableBar } from 'react-icons/md';
import { CiCircleMore } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom'; 
import logo from "../../assets/images/logo.jpg";
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../https';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';

const Header = () => {
  const userData = useSelector((state) => state.user) || {}; // Assuming you have a user slice in Redux
  const dispatch = useDispatch();
  
  const logoutMutation = useMutation({
  mutationFn: () => logout(),
  onSuccess: (data) => {
    console.log(data);
    dispatch(clearUser());
    navigate("/auth");
  },
  onError: (error) => {
    // If 401, treat as logged out
    if (error?.response?.status === 401) {
      dispatch(clearUser());
      navigate("/auth");
    } else {
      console.error(error);
    }
  }
})

  const handleLogout = () => {
    logoutMutation.mutate();
  }

  const navigate = useNavigate();
  const location = useLocation(); 
  const currentPath = location.pathname;

  const isActive = (path) =>
    currentPath === path ? "bg-[#4e4d4d]" : "hover:bg-[#4e4d4d]";

  return (
    <header className="flex items-center justify-between px-6 py-5 bg-white gap-4 flex-wrap  shadow-[0_4px_16px_0_rgba(99,102,241,0.10)] transition-colors duration-300 hover:bg-[#e0e7ff]">
      
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-fit">
        <img src={logo} className="h-8 w-8" alt="res logo" />
        <h1 className="text-2xl font-extralight text-[#000000] whitespace-nowrap drop-shadow-md">
          Sri Lankan Cuisine
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-14 min-w-fit">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-2 text-[#000000] px-4 py-2 rounded-[20px] text-md bg-[#e0e7ff] hover:bg-[#6366f1] hover:text-white transition-all duration-200 ${isActive("/")}`}> 
          <FaHome size={14} />
          Home
        </button>
        <button
          onClick={() => navigate("/orders")}
          className={`flex items-center gap-2 text-[#000000] px-4 py-2 rounded-[20px] text-md bg-[#e0e7ff] hover:bg-[#6366f1] hover:text-white transition-all duration-200 ${isActive("/orders")}`}> 
          <IoReorderFourSharp size={14} />
          Orders
        </button>
        <button
          onClick={() => navigate("/tables")}
          className={`flex items-center gap-2 text-[#000000] px-4 py-2 rounded-[20px] text-md bg-[#e0e7ff] hover:bg-[#6366f1] hover:text-white transition-all duration-200 ${isActive("/tables")}`}> 
          <MdTableBar size={14} />
          Tables
        </button>
        <button
          className="flex items-center gap-2 text-[#000000] bg-[#e0e7ff] hover:bg-[#6366f1] hover:text-white px-4 py-2 rounded-[20px] text-md transition-all duration-200">
          <CiCircleMore size={14} />
          More
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-white border border-[#e0e7ff] rounded-[20px] px-4 py-2 w-[300px] shadow-sm focus-within:border-[#2563eb]">
        <FaSearch className="text-[#6366f1]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-[#1e293b] w-full placeholder-[#64748b] focus:ring-2 focus:ring-[#2563eb] rounded-md px-2"
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 min-w-fit">
        {userData.role === "admin" && (
          <div onClick={() => navigate("/dashboard")} className="bg-[#e0e7ff] rounded-[15px] p-2 cursor-pointer">
          <MdDashboard className="text-[#000000] text-xl" />
        </div>
        )}
        <div className="bg-[#e0e7ff] rounded-[15px] p-2 cursor-pointer">
          <FaBell className="text-[#000000] text-xl" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-[#000000] text-3xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-sm text-[#000000]">{userData.name || "Name"}</h1>
            <p className="text-xs text-[#515151]">{userData.role || "Role"}</p>
          </div>
          <IoLogOut onClick={handleLogout} className="text-[#000000] ml-2" size={40} />
        </div>
      </div>
    </header>
  );
};

export default Header;
