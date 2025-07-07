import React from 'react';
import { BsCartCheckFill } from "react-icons/bs";

const DishModal = ({ dish, isOpen, onClose, onCountChange }) => {
  if (!isOpen || !dish) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-black text-xl font-bold"
        >
          ✕
        </button>

      <div className="flex flex-col items-center">
       <h2 className="text-2xl font-bold mb-4">{dish.name}</h2>
       <p className="text-lg text-gray-700 mb-2">Price: Rs.{dish.price}</p>
      <div className="flex items-center gap-4 mt-4">
      <button
      onClick={() => onCountChange(-1)}
      className="bg-red-500 text-white px-3 py-1 rounded text-xl"
     >
      −
    </button>
    <span className="text-xl font-bold">{dish.count}</span>
    <button
      onClick={() => onCountChange(1)}
      className="bg-green-500 text-white px-3 py-1 rounded text-xl"
    >
      +
    </button>
    </div>
   </div>
    
   <div className="mt-6 flex justify-center">
  <button
    onClick={() => {
      console.log(`${dish.count} x ${dish.name} added`);
      onClose();
    }}
    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded flex items-center gap-2"
  >
    Add To Cart
    <BsCartCheckFill size={20} color="black"/>
  </button>
</div>



      </div>
    </div>
  );
};

export default DishModal;
