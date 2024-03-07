import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import SunscreenCard from '../components/SunscreenCard'

export default function IndexPage({ handleLogout }) {
  const [sunscreens, setSunscreens] = useState([])
  const user = useContext(UserContext)
  const host = 'http://localhost:2003'
  // let sunscreens = ''

  console.log(typeof handleLogout)

  // Get list of sunscreens from backend API 
  const getSunscreens = async () => {
    const res = await fetch(host + '/sunscreens')
    const data = await res.json()
    setSunscreens(data)
  }
  getSunscreens()
  console.log(sunscreens)

  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <Header handleLogout={handleLogout} textColor='white'/>
      <Hero />

      <div> 
        {user && <h2 className='text-center mt-16'>Welcome, {user}!</h2>}
      </div>

      <div className='max-w-[1240px] grid grid-flow-col gap-12 justify-center mx-auto my-20'>
        <div className='h-80 w-64 rounded-md bg-[url("src/assets/gradient1.png")] bg-cover bg-bottom 
        flex justify-center items-center shadow-lg'>
          <a href='/'><h2 className='text-center mx-8 uppercase'>Chemical Sunscreens</h2></a>
        </div>
        <div className='h-80 w-64 rounded-md bg-[url("src/assets/gradient2.png")] bg-cover  
        flex justify-center items-center shadow-lg'>
          <a href='/'><h2 className='text-center mx-8 uppercase'>Mineral Sunscreens</h2></a>
        </div>
        <div className='h-80 w-64 rounded-md bg-[url("src/assets/gradient2.png")] bg-cover bg-top
        flex justify-center items-center shadow-lg'>
          <a href='/'><h2 className='text-center mx-8 uppercase'>Budget Sunscreens</h2></a>
        </div>
      </div>

      <div className='max-w-[1240px] mx-auto'>
        <h2 className='mt-10 mb-8 text-left'>Featured Sunscreens</h2>
        
        {/* Pass in list of sunscreens to render SunscreenCard components */}
        <div className='max-w-[1240px] grid grid-cols-auto gap-6 mx-auto'>
          {sunscreens .slice(-4).map(sunscreen => (
            <SunscreenCard 
              key={sunscreen._id}
              sunscreen={sunscreen} 
            />
          ))}
        </div>

        <div className='max-w-[1240px] mt-8 mb-10 flex flex-row justify-center'>
          <Link to='/all-sunscreens'>          
            <button className='btn-primary no-underline'>View All</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
    </>
  )
}
