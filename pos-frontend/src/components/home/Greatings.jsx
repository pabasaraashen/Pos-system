import React, { useState, useEffect } from 'react';
import { BiDish } from "react-icons/bi";
import Modal from '../shared/Modal';
import { useActionData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomer } from '../../redux/customerSlice';

const Greatings = () => {
  const userData = useSelector((state) => state.user) || {}; // Assuming you have a user slice in Redux
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [name,setName] = useState();
  const [id,setID] = useState();
  const dispatch = useDispatch();

  const handleCreateOrder = () => {
    // send data to the store
    dispatch(setCustomer({name, id}));
    navigate("/menu");
  }

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
  };

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className='flex justify-between items-center px-8 mt-5'>
      <div>
        <h1 className='text-[#000000] text-2xl font-bold'>Good Morning, {userData.name || "Name"}</h1>
      </div>

      <div className="ml-[350px]">
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#f6b100] hover:bg-[#dee26c] text-black font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"
        >
          <BiDish size={24} />
          <span>Create Order</span>
        </button>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal} title='Create Order'>
            <label className='block text-white mb-2 text-sm font-medium'>Customer Name</label>
            <div className='flex items-center border-b border-[#333] p-3 px-4 bg-[#1f1f1f]'>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter Customer Name' id='' className='bg-transparent flex-1 text-white'/>
            </div>
            <br/>
            <label className='block text-white mb-2 text-sm font-medium'>Customer ID</label>
            <div className='flex items-center border-b border-[#333] p-3 px-4 bg-[#1f1f1f]'>
                <input value={id} onChange={(e) => setID(e.target.value)} type='text' placeholder='Enter Customer ID' id='' className='bg-transparent flex-1 text-white'/>
            </div>
            <button onClick={handleCreateOrder} className='w-full bg-[#f6b100] hover:bg-[#dee26c] text-black font-semibold  rounded-lg py-3 mt-4'>
                Create Order
            </button>
          </Modal>
        )}
      </div>

      <div>
        <h1 className="text-[#000000] text-3xl font-bold w-[130px]">{formatTime(dateTime)}</h1>
        <p className="text-[#252525] text-sm">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
}

export default Greatings;
