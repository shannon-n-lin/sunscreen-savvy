import { useState, useEffect, useContext, useRef } from 'react'
import UserContext from '../contexts/UserContext'
import Sunscreens from '../components/Sunscreens'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function IndexPage() {
  const [sunscreens, setSunscreens] = useState([])
  const [query, setQuery] = useState('')
  const [dropdownStates, setDropdownStates] = useState({
    type: false,
    form: false,
    spf: false,
    price: false
  })
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    form: [],
    spf: [],
    price: []
  })

  const user = useContext(UserContext)
  const host = 'http://localhost:2003'
  const dropdownIcon = <FontAwesomeIcon icon={faAngleDown} />

  const dropdownRefs = {
    form: useRef(null),
    type: useRef(null),
    spf: useRef(null),
    price: useRef(null)
  }

  // Get list of sunscreens from backend API 
  const getSunscreens = async () => {
    const res = await fetch(host + '/sunscreens' + query)
    // const res = await fetch(host + '/sunscreens' + '?spf=50')
    const data = await res.json()
    setSunscreens(data)
  }

  // Add new selected filter to state
  const addFilter = (filter, value) => {
    if (filter === 'spf' || 'price') {
      setSelectedFilters((prevState) => ({
        ...prevState,
        [filter]: value
      }))
    } else {
      setSelectedFilters((prevState) => ({
        ...prevState,
        [filter]: [...prevState[filter], value]
      }))
    }
  }

  // Update API query when there is a new selected filter
  useEffect(() => {
    let newQuery = ''
    for (let key in selectedFilters) {
      if (selectedFilters[key].length > 0) {
        newQuery += `&${key}=${selectedFilters[key]}`
      }
    }
    if (newQuery) {
      newQuery = '?' + newQuery.slice(1)
    }
    setQuery(newQuery)
  }, [selectedFilters])

  // Make a new API request when there is a new query
  useEffect(() => {
    console.log(query)
    getSunscreens()
  }, [query]) 

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
      <h1 className='h1 text-center my-16'>All Sunscreens</h1>
      <div>
        <div className='max-w-[1240px] grid grid-flow-col justify-start mx-auto mt-12 mb-10 gap-4'>
          <h3 className='h3 my-auto'>Filter by</h3>
          <div ref={dropdownRefs.form}>
            <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('form')}> 
              Form {dropdownIcon}
            </button>
            {dropdownStates.form && (
              <div className='dropdown'>
                <span className='dropdown-link' onClick={() => addFilter('form', 'lotion')}>Lotion</span>
                <span className='dropdown-link' onClick={() => addFilter('form', 'spray')}>Spray</span>
                <span className='dropdown-link' onClick={() => addFilter('form', 'stick')}>Stick</span>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.type}>
            <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('type')}> 
              Type {dropdownIcon}
            </button>
            {dropdownStates.type && (
              <div className='dropdown'>
                <span className='dropdown-link' onClick={() => addFilter('type', 'chemical')}>Chemical</span>
                <span className='dropdown-link' onClick={() => addFilter('type', 'physical')}>Physical</span>
                <span className='dropdown-link' onClick={() => addFilter('type', 'hybrid')}>Hybrid</span>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.spf}>
            <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('spf')}> 
              SPF {dropdownIcon}
            </button>
            {dropdownStates.spf && (
              <div className='dropdown'>
                <span className='dropdown-link' onClick={() => addFilter('spf', [15])}>15+</span>
                <span className='dropdown-link' onClick={() => addFilter('spf', [30])}>30+</span>
                <span className='dropdown-link' onClick={() => addFilter('spf', [50])}>50+</span>
                <span className='dropdown-link' onClick={() => addFilter('spf', [70])}>70+</span>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.price}>
            <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('price')}> 
              Price {dropdownIcon} 
            </button>
            {dropdownStates.price && (
              <div className='dropdown'>
                <span className='dropdown-link' onClick={() => addFilter('price', [0,5])}>$</span>
                <span className='dropdown-link' onClick={() => addFilter('price', [5,10])}>$$</span>
                <span className='dropdown-link' onClick={() => addFilter('price', [10,15])}>$$$</span>
                <span className='dropdown-link' onClick={() => addFilter('price', [15,25])}>$$$$</span>
                <span className='dropdown-link' onClick={() => addFilter('price', [25,10000])}>$$$$$</span>
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
