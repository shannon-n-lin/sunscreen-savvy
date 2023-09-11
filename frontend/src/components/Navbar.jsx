import { useState } from 'react'
import { FiX, FiMenu } from 'react-icons/fi'
import Button from './Button'

const Navbar = () => {
  const [ mobile, setMobile ] = useState(false)

  const handleMobile = () => {
    setMobile(!mobile)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-black'>
        {/* Logo */}
        <span className='w-full max-[315px]:text-xl text-[28px] lg:text-3xl font-bold italic'>SunscreenSavvy</span>
        {/* Desktop nav menu */}
        <ul className='hidden md:flex items-center uppercase text-sm font-bold'>
          <li className='p-3 whitespace-nowrap'>All Sunscreens</li>
          <li className='p-3 whitespace-nowrap'>Latest Reviews</li>
          <li className='p-3 whitespace-nowrap'><Button text='Log In' color='lt-blue' hover='med-blue' /></li>
          <li className='p-3 whitespace-nowrap'><Button text='Sign Up' color='lt-orange' hover='dark-orange' /></li>
        </ul>
        {/* Toggle mobile menu icon */}
        <div onClick={handleMobile} className='block md:hidden'>
          {mobile ? <FiX size={24} aria-label='close menu' /> : <FiMenu size={24} aria-label='open menu'/>}
        </div>
        {/* Mobile slide-out menu */} 
        <div className={mobile ? 'fixed right-0 top-20 pb-4 w-full min-[400px]:w-[60%] bg-off-white' : 'hidden'}>
          <ul className='uppercase text-right'>
            <li className='p-8 whitespace-nowrap'>All Sunscreens</li>
            <li className='p-8 whitespace-nowrap'>Latest Reviews</li>
            <li className='p-8 whitespace-nowrap'><Button text='Log In' color='blue' hover=''/></li>
            <li className='p-8 whitespace-nowrap'>Sign Up</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar