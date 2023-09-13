import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Sunscreens from '../components/Sunscreens'

const IndexPage = () => {
  const [sunscreens, setSunscreens] = useState([])
    
    useEffect(() => {
      const getSunscreens = async () => {
        const sunscreens = await fetchSunscreens()
        setSunscreens(sunscreens)
      }
      getSunscreens()
    }, [])

    const fetchSunscreens = async () => {
      const res = await fetch('http://localhost:2003/sunscreens')
      const data = await res.json()
      // console.log(data[0].name)
      return data
    }

  return (
    <>
      <Hero />
      <div>
        <Sunscreens sunscreens={sunscreens} />
      </div>
    </>
  )
}

export default IndexPage