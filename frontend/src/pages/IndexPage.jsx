import { useState, useEffect, useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Hero from '../components/Hero'
import Sunscreens from '../components/Sunscreens'

export default function IndexPage() {
  const [sunscreens, setSunscreens] = useState([])
  const user = useContext(UserContext)

  // Set list of sunscreens  
  useEffect(() => {
    const getSunscreens = async () => {
      const sunscreens = await fetchSunscreens()
      setSunscreens(sunscreens)
    }
    getSunscreens()
  }, []) 
  
  // Get list of sunscreens from backend API
  const fetchSunscreens = async () => {
    const res = await fetch('http://localhost:2003/sunscreens')
    const data = await res.json()
    return data
  }

  return (
    <>
      <Hero />
      <div>
        {/* Pass in list to Sunscreens component, which loads individual Sunscreen components */}
        <Sunscreens sunscreens={sunscreens} />
      </div>
    </>
  )
}
