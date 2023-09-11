import React from 'react'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sunscreens from './components/Sunscreens'

const App = () => {
  const [sunscreens, setSunscreens] = useState([])
  
  useEffect(() => {
    const getSunscreens = async () => {
      const sunscreens = await fetchSunscreens()
      setSunscreens(sunscreens)
    }
    getSunscreens()
  }, []) // empty array is placeholder for dependency array, e.g. [user]

  const fetchSunscreens = async () => {
    const res = await fetch('http://localhost:2003/sunscreens')
    const data = await res.json()
    console.log(data[0].name)
    return data
  }

  return (
    <>
      <Navbar />
      <Hero />
      
      <Routes>
        <Route path='/' element = {
          sunscreens == undefined ?  (<p>{sunscreens[0].name}</p>) : (<Sunscreens sunscreens={sunscreens} />)
        }/>
      </Routes>

    </>
  )
}

export default App