import { Link } from 'react-router-dom'
import savvyLogoBlack from '../assets/savvy-logo-black.png'

export default function Footer() {
  return (
    <div className='flex flex-col justify-center items-center w-full 
    mt-16 py-8 bg-lt-blue'>
      <Link to='/'>
        <img className='w-[130px]' src={savvyLogoBlack} alt='Savvy'/>
      </Link>
      <span className='uppercase mt-2 text-sm'>&#169; 2024 Shannon Lin</span>
    </div>
  )
}
