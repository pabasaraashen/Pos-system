import React from 'react'
import Bottomnavbar from '../components/Bottomnavbar'

const Home = () => {
  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
       {/*left*/}
       <div className='flex-[3] bg-amber-300'></div>
       {/*right*/}
       <div className='flex-[2] bg-blue-400'></div>
       <Bottomnavbar/>
    </section>
  )
}

export default Home