import { useState, useEffect, useContext, useRef } from 'react'
import UserContext from '../contexts/UserContext'
import Hero from '../components/Hero'
import Sunscreens from '../components/Sunscreens'

export default function IndexPage() {
  const [sunscreens, setSunscreens] = useState([])
  const [dropdownStates, setDropdownStates] = useState({
    type: false,
    form: false,
    spf: false,
    price: false
  })

  const user = useContext(UserContext)
  const host = 'http://localhost:2003'

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

  const toggleDropdown = (dropdownId) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownId]: !prevState[dropdownId]
    }))
  }

  useEffect(() => {
    // const handleOutsideClick = (event) => {
    //   Object.values(dropdownRefs).forEach((ref) => {
    //     if (ref.current && !ref.current.contains(event.target)) {
    //       setDropdownStates((prevState) => ({
    //         ...prevState,
    //         form: false,
    //         type: false,
    //         spf: false,
    //         price: false
    //       }))
    //     }
    //   })
    // }
    const handleOutsideClick = (event) => {
      const isDropdownClick = Object.values(dropdownRefs)
        .some(ref => ref.current && ref.current.contains(event.target))
      if (!isDropdownClick) {
        setDropdownStates((prevState) => ({
          ...prevState,
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
      <Hero />
      <div>
        <div>
          <h2 className='h2 text-center mt-16'>Welcome, {user}!</h2>
        </div>
        <div className='grid grid-flow-col justify-center mx-16 my-4 gap-4'>
          <div ref={dropdownRefs.form}>
            <button className='btn-dropdown' onClick={() => toggleDropdown('form')}> 
              Form
            </button>
            {dropdownStates.form && (
              <div className='dropdown'>
                <a href='' className='dropdown-link'>Lotion</a>
                <a href='' className='dropdown-link'>Spray</a>
                <a href='' className='dropdown-link'>Stick</a>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.type}>
            <button className='btn-dropdown' onClick={() => toggleDropdown('type')}> 
              Type
            </button>
            {dropdownStates.type && (
              <div className='dropdown'>
                <a href='' className='dropdown-link'>Chemical</a>
                <a href='' className='dropdown-link'>Mineral</a>
                <a href='' className='dropdown-link'>Hybrid</a>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.spf}>
            <button className='btn-dropdown' onClick={() => toggleDropdown('spf')}> 
              SPF
            </button>
            {dropdownStates.spf && (
              <div className='dropdown'>
                <a href='' className='dropdown-link'>15+</a>
                <a href='' className='dropdown-link'>30+</a>
                <a href='' className='dropdown-link'>50+</a>
                <a href='' className='dropdown-link'>70+</a>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.price}>
            <button className='btn-dropdown' onClick={() => toggleDropdown('price')}> 
              Price
            </button>
            {dropdownStates.price && (
              <div className='dropdown'>
                <a href='' className='dropdown-link'>$</a>
                <a href='' className='dropdown-link'>$$</a>
                <a href='' className='dropdown-link'>$$$</a>
                <a href='' className='dropdown-link'>$$$$</a>
                <a href='' className='dropdown-link'>$$$$$</a>
              </div>
            )}
          </div>
        </div>

        {/* Pass in list to Sunscreens component, which loads individual Sunscreen components */}
        <Sunscreens sunscreens={sunscreens} />
      </div>
    </>
  )
}
