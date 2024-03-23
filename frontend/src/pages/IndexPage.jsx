import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import Hero from '../components/Hero'
import SunscreenCard from '../components/SunscreenCard'

export default function IndexPage() {
  const [sunscreens, setSunscreens] = useState([])
  const user = useContext(UserContext)

  // Get list of sunscreens from backend API 
  const getSunscreens = async () => {
    const res = await fetch(`${import.meta.env.VITE_HOST}/sunscreens`)
    const data = await res.json()
    setSunscreens(data)
  }

  useEffect(() => {
    getSunscreens()
  }, [])

  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <Hero />

      <div> 
        {user && <h2 className='text-center mt-16'>Welcome, {user}!</h2>}
      </div>

      <div className='max-w-[90%] grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center mx-auto mt-14 mb-8'>
        <div className='h-28 lg:w-72 rounded-md bg-gradient-to-l to-[#e9ba58] from-med-blue bg-cover bg-bottom 
        flex justify-center items-center shadow-lg'>
          <Link to='/chemical-sunscreens'>
            <h2 className='text-center mx-8 uppercase sm:text-xl md:text-2xl'>
              Chemical Sunscreens
            </h2>
          </Link>
        </div>
        <div className='h-28 lg:w-72 rounded-md bg-gradient-to-tr to-[#e9ba58] from-med-blue bg-cover  
        flex justify-center items-center shadow-lg'>
          <Link to='/mineral-sunscreens'>
            <h2 className='text-center mx-8 uppercase sm:text-xl md:text-2xl'>
              Mineral Sunscreens
            </h2>
          </Link>        
        </div>
        <div className='h-28 lg:w-72 rounded-md bg-[url("src/assets/gradient2.png")] bg-cover bg-top
        flex justify-center items-center shadow-lg'>
          <Link to='/budget-sunscreens'>
            <h2 className='text-center mx-8 uppercase sm:text-xl md:text-2xl'>
              Budget Sunscreens
            </h2>
          </Link>        
        </div>
      </div>

      <div className='max-w-[90%] mx-auto'>
        <h2 className='mt-10 mb-8 text-left'>Featured</h2>
        
        {/* Pass in list of sunscreens to render SunscreenCard components */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto'>
          {sunscreens .slice(-4).map(sunscreen => (
            <SunscreenCard 
              key={sunscreen._id}
              sunscreen={sunscreen} 
            />
          ))}
        </div>

        <div className='mt-8 mb-10 flex flex-row justify-center'>
          <Link to='/all-sunscreens'>          
            <button className='btn-primary no-underline'>View All</button>
          </Link>
        </div>
      </div>

    </div>
    </>
  )
}
