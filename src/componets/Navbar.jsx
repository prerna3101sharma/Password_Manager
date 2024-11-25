/* eslint-disable no-unused-vars */
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 w-full'>
        <div className="mycontainer flex justify-between items-center h-14">
        <div className='logo font-bold text-2xl'>
           <span className='text-purple-800'>&lt;</span>
            Password Manager
            <span className='text-purple-800'>&gt;</span>
        </div>
        <div>
            <button className=' text-white bg-purple-800 outline ring-white ring-1 my-5 rounded-full flex justify-between items-center'>
            <img className="invert py-1 px-0 w-12 font-bold" src="icons/GitHub.svg" alt="GitHub LOGO" />
            <span className="px-2 font-bold">GitHub</span>
            </button>
        </div>
        </div>
    </nav>
  )
}

export default Navbar