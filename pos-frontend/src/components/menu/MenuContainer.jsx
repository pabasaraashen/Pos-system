import React, { useState } from 'react';
import { menus } from '../../constants';
import { GrRadialSelected } from 'react-icons/gr'; // Optional icon

const MenuContainer = () => {
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  const handleSelect = (id) => {
    setSelectedMenuId(id);
  };

  return (
    <>
      {/* Menu Grid */}
      <div className='grid grid-cols-2 gap-2 px-10 py-4 w-full'>
        {menus.map((menu) => {
          const isSelected = selectedMenuId === menu.id;
          return (
            <div
              key={menu.id}
              onClick={() => handleSelect(menu.id)}
              className={`flex flex-col items-center justify-between p-4 rounded-lg h-[100px] cursor-pointer transition duration-200 
                ${isSelected ? 'bg-[#1c034d]' : 'bg-[#4609cb]'}`}
            >
              <div className='flex items-center justify-between w-full'>
                <h1 className='text-white text-lg font-semibold'>
                  {menu.icon} {menu.name}
                </h1>
                {isSelected && <GrRadialSelected className='text-white' size={20} />}
              </div>
              <p className='text-[#fff085] text-sm font-semibold'>
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      {/* Special Offers Section */}
      <div className="mt-6 px-10">
        <h2 className="text-xl text-white font-bold mb-4">🎉 Special Offers</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#2e2e2e] p-4 rounded-lg shadow-md text-white">
            <h3 className="font-semibold text-lg mb-1">🔥 Combo Deal</h3>
            <p className="text-sm">Get a starter + main course + drink at 30% off!</p>
          </div>

          <div className="bg-[#2e2e2e] p-4 rounded-lg shadow-md text-white">
            <h3 className="font-semibold text-lg mb-1">🍹 Free Drink</h3>
            <p className="text-sm">Order 2 main courses and get a beverage free!</p>
          </div>
        </div>

        <div className="mt-6 px-10 flex justify-center">
          <div className="bg-[#ffd700] p-5 rounded-lg shadow-lg text-black w-full max-w-15px">
            <h2 className="text-xl font-bold mb-1">👨‍🍳 Chef's Recommendation</h2>
            <p className="text-sm font-medium">
             Don’t miss our signature Butter Chicken and Mango Lassi combo — a customer favorite!
           </p>
          </div>
       </div>
      </div>
    </>
  );
};

export default MenuContainer;
