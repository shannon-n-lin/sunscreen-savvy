import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Sunscreens from '../components/Sunscreens'

export default function IndexPage() {
  const [sunscreens, setSunscreens] = useState([])

  // Set list of sunscreens  
  useEffect(() => {
    const getSunscreens = async () => {
      const sunscreens = await fetchSunscreens()
      setSunscreens(sunscreens)
    }
    getSunscreens()
  }, [sunscreens]) // dependencies array checks if values have changed between renders

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
