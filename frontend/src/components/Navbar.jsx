import { useState } from 'react'
import { FiX, FiMenu } from 'react-icons/fi'

const Navbar = () => {
  const [ mobile, setMobile ] = useState(false)

  const handleMobile = () => {
    setMobile(!mobile)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-black'>
        {/* Logo */}
        <img className='w-[150px] p-2' src='/src/assets/savvy-logo.png'/>
        {/* Desktop nav menu */}
        <ul className='hidden md:flex items-center uppercase text-sm font-bold'>
          <li className='p-3 whitespace-nowrap'>All Sunscreens</li>
          <li className='p-3 whitespace-nowrap'>Latest Reviews</li>
          <li className='p-3 whitespace-nowrap'>
            <button className='bg-lt-blue hover:bg-off-white border border-[#797a7a] mx-auto py-2 px-4 rounded uppercase font-bold'>Log In</button>
          </li>
          <li className='p-3 whitespace-nowrap'>
            <button className='bg-lt-orange hover:bg-yellow border border-[#797a7a] mx-auto py-2 px-4 rounded uppercase font-bold'>Sign Up</button>
          </li>
        </ul>
        {/* Open mobile menu icon */}
        <div onClick={handleMobile} className='block md:hidden'>
          <FiMenu size={24} aria-label='open menu'/>
        </div>
        {/* Mobile slide-out menu */} 
        <div className={mobile ? 'fixed right-0 top-0 pt-10 pb-4 h-screen w-[50%] bg-off-white' : 'hidden'}>
          {/* Close mobile menu icon */}
          <div onClick={handleMobile} className='flex place-content-end mr-4 mb-4'>
            <FiX size={24} aria-label='close menu' />
          </div>
          <ul className='uppercase text-right'>
            {/* Log in button */}
            <li className='pt-8 pr-4 whitespace-nowrap'>
              <button className='bg-lt-blue hover:bg-med-blue border border-[#797a7a] mx-auto py-2 px-4 rounded uppercase font-bold'>Log In</button>
            </li>
            {/* Sign up button */}
            <li className='pt-6 pb-6 pr-4 whitespace-nowrap'>
              <button className='bg-lt-orange hover:bg-yellow border border-[#797a7a] mx-auto py-2 px-4 rounded uppercase font-bold'>Sign Up</button>
            </li>
            {/* Menu links */}
            <li className='p-4 whitespace-nowrap'>All Sunscreens</li>
            <li className='p-4 whitespace-nowrap'>Latest Reviews</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar