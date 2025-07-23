import React from 'react';
import { FaSearch, FaUserCircle, FaBell, FaHome } from 'react-icons/fa';
import { IoLogOut, IoReorderFourSharp } from "react-icons/io5";
import { MdDashboard, MdTableBar } from 'react-icons/md';
import { CiCircleMore } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom'; // 🔥 Import useLocation
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
      console.error(error);
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate();
  }

  const navigate = useNavigate();
  const location = useLocation(); // 🔥 Use location hook
  const currentPath = location.pathname;

  const isActive = (path) =>
    currentPath === path ? "bg-[#4e4d4d]" : "hover:bg-[#4e4d4d]";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#1a1a1a] gap-4 flex-wrap">
      
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-fit">
        <img src={logo} className="h-8 w-8" alt="res logo" />
        <h1 className="text-lg font-extralight text-[#f5f5f5] whitespace-nowrap">
          Sri Lankan Cuisine
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-14 min-w-fit">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-2 text-[#e6dfdf] px-4 py-2 rounded-[20px] text-md ${isActive("/")}`}>
          <FaHome size={14} />
          Home
        </button>
        <button
          onClick={() => navigate("/orders")}
          className={`flex items-center gap-2 text-[#e6dfdf] px-4 py-2 rounded-[20px] text-md ${isActive("/orders")}`}>
          <IoReorderFourSharp size={14} />
          Orders
        </button>
        <button
          onClick={() => navigate("/tables")}
          className={`flex items-center gap-2 text-[#e6dfdf] px-4 py-2 rounded-[20px] text-md ${isActive("/tables")}`}>
          <MdTableBar size={14} />
          Tables
        </button>
        <button
          className="flex items-center gap-2 text-[#e6dfdf] hover:bg-[#4e4d4d] px-4 py-2 rounded-[20px] text-md">
          <CiCircleMore size={14} />
          More
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-[#1f1f1f] rounded-[20px] px-4 py-2 w-[300px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-[#f5f5f5] w-full"
        />
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 min-w-fit">
        {userData.role === "admin" && (
          <div onClick={() => navigate("/dashboard")} className="bg-[#1f1f1f] rounded-[15px] p-2 cursor-pointer">
          <MdDashboard className="text-[#f5f5f5] text-xl" />
        </div>
        )}
        <div className="bg-[#1f1f1f] rounded-[15px] p-2 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-xl" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-3xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-sm text-[#f5f5f5]">{userData.name || "Name"}</h1>
            <p className="text-xs text-[#7c7777]">{userData.role || "Role"}</p>
          </div>
          <IoLogOut  onClick={handleLogout} className="text-[#f5f5f5] ml-2" size={40} />
        </div>
      </div>
    </header>
  );
};

export default Header;
