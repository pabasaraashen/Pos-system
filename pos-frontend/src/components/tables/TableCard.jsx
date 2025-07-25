import React from 'react'
import { useNavigate } from 'react-router-dom'

const TableCard = ({ key, name, status: initialStatus, initials }) => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(initialStatus);

  const handleClick = () => {
    if (status === "Booked") return;
    navigate('/menu');
  };


  const handleStatusToggle = (e) => {
    e.stopPropagation();
    if (status === "Available") {
      setStatus("Booked");
      navigate('/menu');
    } else {
      setStatus("Available");
    }
  };

  return (
    <div
      onClick={handleClick}
      key={key}
      className="w-[300px] min-h-[180px] bg-[#b1b1b1] hover:bg-[#5e5e5e] rounded-lg mx-2 my-3 p-4 cursor-pointer flex flex-col justify-between"
    >
      <div className="flex items-center justify-between px-1">
        <p
          className={`${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-white"} px-2 py-1 rounded-lg`}
        >
          {status}
        </p>
        {status === "Available" ? (
          <button
            onClick={handleStatusToggle}
            className="ml-2 px-3 py-1 bg-[#2563eb] text-white rounded-lg hover:bg-[#1e40af] transition"
          >
            Book
          </button>
        ) : (
          <button
            onClick={handleStatusToggle}
            className="ml-2 px-3 py-1 bg-[#f59e42] text-white rounded-lg hover:bg-[#b45309] transition"
          >
            Set Available
          </button>
        )}
      </div>
      <div className="flex justify-center mt-4 mb-4 flex-1 items-center">
        <h1 className="text-black text-xl p-5 rounded-2xl">{name}</h1>
      </div>
    </div>
  );
}

export default TableCard