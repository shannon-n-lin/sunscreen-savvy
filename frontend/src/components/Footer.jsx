import { Link } from 'react-router-dom'
import savvyLogoBlack from '../assets/savvy-logo-black.png'

export default function Footer() {
  return (
    <div className='flex flex-col justify-center items-center h-8 w-full 
    mt-16 py-14 bg-lt-blue'>
      <Link to='/'>
        <img className='w-[140px]' src={savvyLogoBlack} alt='Savvy'/>
      </Link>
    </div>
  )
}
