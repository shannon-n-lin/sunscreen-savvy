import { useState, useContext } from 'react'
import UserContext from '../UserContext'
import { FiX, FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logo from '../assets/savvy-logo.png'

export default function Header() {
  const [ mobile, setMobile ] = useState(false)
  const user = useContext(UserContext)

  const handleMobile = () => {
    setMobile(!mobile)
  }

  return (
    <div className='w-full z-10'>
      <div className='flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-black'>
        
        {/* Logo */}
        <Link to='/'>
          <img className='w-[150px] p-2' src={logo} alt='Savvy'/>
        </Link>

        {user && <span>Welcome {user}</span>}
        
        {/* Desktop nav menu */}
        <ul className='hidden md:flex items-center uppercase text-sm font-bold'>
          <li className='p-3 whitespace-nowrap'>All Sunscreens</li>
          <li className='p-3 whitespace-nowrap'>Latest Reviews</li>
          <li className='p-3 whitespace-nowrap'>
            <Link to='/login'><button className='btn-secondary'>Log In</button></Link>
          </li>
          <li className='p-3 whitespace-nowrap'>
            <Link to='/signup'><button className='btn-primary'>Sign Up</button></Link>
          </li>
        </ul>
        
        {/* Icon to open mobile menu */}
        <div onClick={handleMobile} className='block md:hidden'>
          <FiMenu size={24} alt='open menu'/>
        </div>
        
        {/* Mobile slide-out menu */}
        <div className={mobile ? 'fixed right-0 top-0 pt-10 pb-4 h-screen w-[50%] border-l border-l-lt-gray bg-off-white' : 'hidden'}>
          
          {/* Icon to close mobile menu */}
          <div onClick={handleMobile} className='flex place-content-end mr-4 mb-4'>
            <FiX size={24} alt='close menu' />
          </div>
          
          <ul className='uppercase text-right'>
            <li onClick={handleMobile} className='pt-8 pr-4 whitespace-nowrap'>
              <Link to='/login'><button className='btn-secondary'>Log In</button></Link>
            </li>
            <li onClick={handleMobile} className='pt-6 pb-6 pr-4 whitespace-nowrap'>
              <Link to='/signup'><button className='btn-primary'>Sign Up</button></Link>
            </li>
            <li onClick={handleMobile} className='p-4 whitespace-nowrap'>All Sunscreens</li>
            <li onClick={handleMobile} className='p-4 whitespace-nowrap'>Latest Reviews</li>
          </ul>
          
        </div>
      </div>
    </div>
  )
}
