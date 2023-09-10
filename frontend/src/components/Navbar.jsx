import { useState } from 'react'
import { FiX, FiMenu } from 'react-icons/fi'

const Navbar = () => {
  const [ mobile, setMobile ] = useState(false)

  const handleMobile = () => {
    setMobile(!mobile)
  }

  return (
    <div className='w-full bg-blue'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black bg-blue'>
        {/* Logo */}
        <h1 className='w-full max-[315px]:text-2xl text-3xl font-bold text-dark-orange'>SunscreenSavvy</h1>
        {/* Desktop nav menu */}
        <ul className='hidden md:flex uppercase'>
          <li className='p-3 whitespace-nowrap'>All Sunscreens</li>
          <li className='p-3 whitespace-nowrap'>Latest Reviews</li>
          <li className='p-3 whitespace-nowrap'>Log In</li>
          <li className='p-3 whitespace-nowrap'>Sign Up</li>
        </ul>
        {/* Toggle mobile menu icon */}
        <div onClick={handleMobile} className='block md:hidden'>
          {mobile ? <FiX size={24} aria-label='close menu' /> : <FiMenu size={24} aria-label='open menu'/>}
        </div>
        {/* Mobile slide-out menu */} 
        <div className={mobile ? 'fixed right-0 top-24 w-full sm:w-[60%] bg-blue' : 'hidden'}>
          <ul className='uppercase'>
            <li className='p-8 whitespace-nowrap'>All Sunscreens</li>
            <li className='p-8 whitespace-nowrap'>Latest Reviews</li>
            <li className='p-8 whitespace-nowrap'>Log In</li>
            <li className='p-8 whitespace-nowrap'>Sign Up</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar