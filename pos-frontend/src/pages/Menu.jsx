import React from 'react';
import BackButton from '../components/shared/BackButton';
import MenuContainer from '../components/menu/MenuContainer';

const Menu = () => {
  return (
    <section className='bg-[#1a1a1a] h-[calc(100.8vh-5rem)] overflow-hidden flex gap-4'>
       {/*left*/}
       <div className='flex-[5] bg-[#474747]'>
          <div className='flex items-center justify-between px-8 py-4'>
            <div className='flex items-center gap-4'>
            <BackButton/>
            <h1 className='text-[#f5f5f5] text-2xl font-bold '>Menu</h1>
            </div>
            <div className="flex items-center justify-around gap-4">
          <div className="flex items-center gap-2 cursor-pointer">      
             <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5]">Customer Name</h1>
                <p className="text-xs text-[#7c7777]">Admin</p>
             </div>
          </div>
        </div>
        </div>

        <MenuContainer/>
       </div>

       {/*right*/}
       <div className='flex-[3] bg-[#aeaeae]'> 
        
       </div>

      {/**/}
    </section>
  )
}

export default Menu