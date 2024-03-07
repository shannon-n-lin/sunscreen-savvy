import { useState, useEffect, useContext, useRef } from 'react'
import UserContext from '../contexts/UserContext'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Sunscreens from '../components/Sunscreens'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function IndexPage( handleLogout ) {
  const [sunscreens, setSunscreens] = useState([])
  const [dropdownStates, setDropdownStates] = useState({
    type: false,
    form: false,
    spf: false,
    price: false
  })

    console.log(typeof handleLogout)


  const user = useContext(UserContext)
  const host = 'http://localhost:2003'
  const dropdownIcon = <FontAwesomeIcon icon={faAngleDown} />

  const dropdownRefs = {
    form: useRef(null),
    type: useRef(null),
    spf: useRef(null),
    price: useRef(null)
  }

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
    const res = await fetch(host + '/sunscreens')
    const data = await res.json()
    return data
  }

  // Toggle filter dropdowns on/off
  // When one filter dropdown is clicked, toggle off other dropdowns
  const toggleDropdown = (dropdownId) => {
    setDropdownStates((prevState) => ({
      type: dropdownId === 'type' ? !prevState.type : false,
      form: dropdownId === 'form' ? !prevState.form : false,
      spf: dropdownId === 'spf' ? !prevState.spf : false,
      price: dropdownId === 'price' ? !prevState.price : false,
    }))
  }
  
  // Close filter dropdowns when user clicks on page
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isDropdownClick = Object.values(dropdownRefs)
        .some(ref => ref.current && ref.current.contains(event.target))
      if (!isDropdownClick) {
        setDropdownStates((prevState) => ({
          form: false,
          type: false,
          spf: false,
          price: false
        }))
      }
    }

    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [dropdownRefs])

  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <Header handleLogout={handleLogout} textColor='white'/>
      <Hero />

      <div> 
        {user && <h2 className='h2 text-center mt-16'>Welcome, {user}!</h2>}
      </div>

      <div className='max-w-[1240px] grid grid-flow-col gap-12 justify-center mx-auto my-20'>
        <div className='h-80 w-64 rounded-md bg-[url("src/assets/gradient1.png")] bg-cover bg-bottom 
        flex justify-center items-center shadow-lg'>
          <a href='/'><h2 className='h2 text-center mx-8 uppercase'>Chemical Sunscreens</h2></a>
        </div>
        <div className='h-80 w-64 rounded-md bg-[url("src/assets/gradient2.png")] bg-cover  
        flex justify-center items-center shadow-lg'>
          <a href='/'><h2 className='h2 text-center mx-8 uppercase'>Mineral Sunscreens</h2></a>
        </div>
        <div className='h-80 w-64 rounded-md bg-[url("src/assets/gradient2.png")] bg-cover bg-top
        flex justify-center items-center shadow-lg'>
          <a href='/'><h2 className='h2 text-center mx-8 uppercase'>Budget Sunscreens</h2></a>
        </div>
      </div>

      <div>
        <Sunscreens />
      </div>

      <Footer />
    </div>
    </>
  )
}
