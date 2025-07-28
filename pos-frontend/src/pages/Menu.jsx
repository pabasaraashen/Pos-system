import React, { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import BackButton from '../components/shared/BackButton';
import MenuContainer from '../components/menu/MenuContainer';
import { MdDelete } from "react-icons/md";
import { FaNotesMedical } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/cartSlice'; // Remove clearCart from this import
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrder } from '../https/index';

const Menu = () => {
  const { enqueueSnackbar } = useSnackbar();
  const customerData = useSelector(state => state.customer);
  const cartData = useSelector((state) => state.cart);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    if(scrollRef.current){
        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth"
        })
    }
  })

  const handleRemove = (itemID) => {
    dispatch(removeItem(itemID));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;
    const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;

    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()} ${formattedHour}:${formattedMinute} ${ampm}`;
  };

  const totalItems = cartData.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartData.reduce((sum, item) => sum + item.count * item.price, 0);
  const tax = totalPrice * 0.0525;
  const finalPrice = totalPrice + tax;

  const orderData = {
    customerDetails: {
      Name: customerData.customerName,
      ID: customerData.customerID,
    },
    orderStatus: "In Progress",
    bills: {
      total: totalPrice,
      tax: tax,
      totalWithTax: finalPrice,
    },
    items: cartData,
  };
      
  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const {data} = resData.data;
      console.log(data);

      enqueueSnackbar('Order placed successfully!', { variant: 'success' });
      
      // Invalidate and refetch orders query to show the new order immediately
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Optional: You can manually clear cart items one by one if needed
      // cartData.forEach(item => dispatch(removeItem(item.id)));
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Failed to place order. Please try again.', { variant: 'error' });
    }
  });

  const handlePlaceOrder = () => {
    if (cartData.length === 0) {
      enqueueSnackbar('Cart is empty. Please add items before placing order.', { variant: 'warning' });
      return;
    }
    orderMutation.mutate(orderData);
  };

  return (
    <section className='bg-[#1a1a1a] h-[calc(100.8vh-5rem)] overflow-hidden flex gap-4'>
      {/* left */}
      <div className='flex-[5] bg-[#474747]'>
        <div className='flex items-center justify-between px-8 py-4'>
          <div className='flex items-center gap-4'>
            <BackButton />
            <h1 className='text-[#f5f5f5] text-2xl font-bold'>Menu</h1>
          </div>
          <div className="flex items-center justify-around gap-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex flex-col items-start">
                <h1 className="text-lg font-semibold text-[#f5f5f5]">{customerData.customerName  || "Customer Name"}</h1>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>

      {/* right */}
      <div className='flex-[2.5] bg-[#1a1a1a] mt-4 mr-3 h-[780px] rounded-lg pt-2'>
        {/* customer info */}
        <div className='flex items-center justify-between px-4 py-3'>
          <div className='flex flex-col items-start'>
            <h1 className='text-lg text-[#f5f5f5] font-semibold'>{customerData.customerName || "Customer Name" }</h1>
            <p className='text-sm text-[#ababab] font-medium mt-2'>
              {formatDateTime(currentDateTime)}
            </p>
          </div>
          <h1 className='text-md text-[#f5f5f5] font-semibold mt-1'>Order ID: {customerData.customerID || "N/A"}</h1>
        </div>
        <hr className='border-[#2a2a2a] border-t-2' />

        {/* cart items */}
        <div className='px-4 py-2'>
          <h1 className='text-lg text-[#e4e4e4] font-semibold'>Order Details</h1>
          <div className='mt-4 overflow-y-scroll scroll-hide h-[380px]' ref={scrollRef}>
            {cartData.length === 0 ? (
              <p className='text-white flex justify-center items-center h-[380px]'>Cart is empty.</p>
            ) : cartData.map((Item) => (
              <div key={Item.id} className='bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-[#ababab] font-semibold text-md'>{Item.name}</h1>
                  <p className='text-[#ababab] font-semibold'>x{Item.count}</p>
                </div>
                <div className='flex items-center justify-between mt-3'>
                  <div className='flex items-center gap-3'>
                    <MdDelete
                      onClick={() => handleRemove(Item.id)}
                      className='text-[#ababab] cursor-pointer'
                      size={20}
                    />
                  
                  </div>
                  <p className='text-[#f5f5f5] text-md font-bold'>Rs.{(Item.price * Item.count).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bill summary */}
        <div className='flex items-center justify-between px-5 mt-2'>
          <p className='text-base text-[#ababab] mt-2'>Item({totalItems})</p>
          <h1 className='text-[#f5f5f5] text-md font-bold'>Rs.{totalPrice.toFixed(2)}</h1>
        </div>
        <div className='flex items-center justify-between px-5 mt-2'>
          <p className='text-base text-[#ababab] mt-2'>Tax(5.25%)</p>
          <h1 className='text-[#f5f5f5] text-md font-bold'>Rs.{tax.toFixed(2)}</h1>
        </div>
        <br/>

        <hr className='border-[#2a2a2a] border-t-2' />
        
        <div className='flex items-center justify-between px-5 mt-2'>
          <p className='text-base text-[#ababab] mt-2'>Total</p>
          <h1 className='text-[#f5f5f5] text-md font-bold'>Rs.{finalPrice.toFixed(2)}</h1>
        </div>

        {/* payment method */}
        <div className='flex items-center px-5 mt-4'>
          <select
            className='bg-[#1f1f1f] text-[#ababab] font-semibold px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition'
            defaultValue="cash"
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </div>

        {/* action buttons */}
        <div className='flex items-center gap-3 px-5 mt-4'>
          <button className='px-4 py-3 w-full rounded-lg bg-[#0f42ba] text-[#f5f5f5] font-semibold'>Receipt</button>
          <button
            className='px-4 py-3 w-full rounded-lg bg-[#c6b112] text-[#f5f5f5] font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handlePlaceOrder}
            disabled={orderMutation.isPending}
          >
            {orderMutation.isPending ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;