import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import savvyLogoWhite from '../assets/savvy-logo-white.svg'
import { FiX, FiMenu } from 'react-icons/fi'

export default function Header({ handleLogout }) {
  const [ mobile, setMobile ] = useState(false)
  const user = useContext(UserContext)
  
  const handleMobile = () => {
    setMobile(!mobile)
  }

  return (
    <div className='w-full z-10'>
      <div className='flex justify-between items-center h-20 max-w-[1240px] mx-auto text-black'>
        
        {/* Logo */}
        <Link to='/'>
          <img className='w-[160px]' src={savvyLogoWhite} alt='Savvy'/>
        </Link>
                
        {/* Desktop nav menu */}
        <ul className='hidden md:flex items-center uppercase text-sm font-bold'>
          {/* <li className='p-3 whitespace-nowrap'>All Sunscreens</li>
          <li className='p-3 whitespace-nowrap'>Latest Reviews</li> */}
          {!user && <li className='pl-3 whitespace-nowrap'>
            <Link to='/login'><button className='btn-secondary'>Log In</button></Link>
          </li>}
          {!user && <li className='pl-3 whitespace-nowrap'>
            <Link to='/signup'><button className='btn-primary'>Sign Up</button></Link>
          </li>}
          {user && <li onClick={handleLogout} className='p-3 whitespace-nowrap'>
            <button className='btn-secondary'>Log Out</button>
          </li>}
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
            {!user && <li className='pt-8 pr-4 whitespace-nowrap'>
              <Link to='/login'><button onClick={handleMobile} className='btn-secondary'>Log In</button></Link>
            </li>}
            {!user && <li className='pt-6 pb-6 pr-4 whitespace-nowrap'>
              <Link to='/signup'><button onClick={handleMobile} className='btn-primary'>Sign Up</button></Link>
            </li>}
            {user && <li onClick={handleMobile} className='pt-6 pb-6 pr-4 whitespace-nowrap'>
              <button onClick={handleLogout} className='btn-secondary'>Log Out</button>
              {<Navigate to='/' />}
            </li>}
            
            <li onClick={handleMobile} className='p-4 whitespace-nowrap'>All Sunscreens</li>
            <li onClick={handleMobile} className='p-4 whitespace-nowrap'>Latest Reviews</li>
          </ul>
          
        </div>
      </div>
    </div>
  )
}
