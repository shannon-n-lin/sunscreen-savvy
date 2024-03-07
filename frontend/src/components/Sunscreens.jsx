import { useState, useEffect, useRef } from 'react'
import SunscreenCard from '../components/SunscreenCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Sunscreens({ presetQuery='' }) {
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

  const host = 'http://localhost:2003'
  const dropdownIcon = <FontAwesomeIcon icon={faAngleDown} />
  const xIcon = <FontAwesomeIcon icon={faXmark} size="xs" />

  const dropdownRefs = {
    form: useRef(null),
    type: useRef(null),
    spf: useRef(null),
    price: useRef(null)
  }

  // Get list of sunscreens from backend API 
  const getSunscreens = async () => {
    const res = await fetch(host + '/sunscreens' + query)
    const data = await res.json()
    setSunscreens(data)
  }

  // Add new selected filter to state
  const addFilter = (filter, value) => {
    if (filter === 'spf' || filter === 'price') {
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
    setDropdownStates((prevState) => ({
      form: false,
      type: false,
      spf: false,
      price: false
    }))
  }

  // Remove filter from state
  const removeFilter = (filter, value) => {
    if (filter === 'spf' || filter === 'price') {
      setSelectedFilters((prevState) => ({
        ...prevState,
        [filter]: ''
      }))
    } else {
      setSelectedFilters((prevState) => ({
        ...prevState,
        [filter]: prevState[filter].filter(v => v !== value)
      }))
    }
  }

  // Update API query when filters change
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

  // Use presetQuery for initial API call
  useEffect(() => {
    setQuery(presetQuery)
  }, [presetQuery]) 


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
      <div className='max-w-[1240px] grid grid-flow-col justify-start mx-auto mt-12 mb-4 gap-4'>
        <h3 className='h3 my-auto'>Filter by</h3>
        
        {/* FORM */}
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

        {/* TYPE */}
        <div ref={dropdownRefs.type}>
          <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('type')}> 
            Type {dropdownIcon}
          </button>
          {dropdownStates.type && (
            <div className='dropdown'>
              <span className='dropdown-link' onClick={() => addFilter('type', 'chemical')}>Chemical</span>
              <span className='dropdown-link' onClick={() => addFilter('type', 'physical')}>Mineral</span>
              <span className='dropdown-link' onClick={() => addFilter('type', 'hybrid')}>Hybrid</span>
            </div>
          )}
        </div>

        {/* SPF */}
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

        {/* PRICE */}
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

      {/* SELECTED FILTERS */}
      <div className='max-w-[1240px] mx-auto mb-8 flex flex-row gap-2'>
        <div className='flex flex-row gap-2'>
          {selectedFilters.form.includes('lotion') && 
            <button className='btn-remove-filter' onClick={() => removeFilter('form', 'lotion')}>{xIcon} Lotion</button>
          }
          {selectedFilters.form.includes('spray') && 
            <button className='btn-remove-filter' onClick={() => removeFilter('form', 'spray')}>{xIcon} Spray</button>
          }
          {selectedFilters.form.includes('stick') && 
            <button className='btn-remove-filter' onClick={() => removeFilter('form', 'stick')}>{xIcon} Stick</button>
          }   
        </div>
        <div className='flex flex-row gap-2'>
          {selectedFilters.type.includes('chemical') && 
            <button className='btn-remove-filter' onClick={() => removeFilter('type', 'chemical')}>{xIcon} Chemical</button>
          }
          {selectedFilters.type.includes('physical') && 
            <button className='btn-remove-filter' onClick={() => removeFilter('type', 'physical')}>{xIcon} Mineral</button>
          }
          {selectedFilters.type.includes('hybrid') && 
            <button className='btn-remove-filter' onClick={() => removeFilter('type', 'hybrid')}>{xIcon} Hybrid</button>
          }
        </div>
        <div className='flex flex-row gap-2'>
          {selectedFilters.spf.includes(15) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('spf')}>{xIcon} SPF 15+</button>
          }
          {selectedFilters.spf.includes(30) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('spf')}>{xIcon} SPF 30+</button>
          }
          {selectedFilters.spf.includes(50) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('spf')}>{xIcon} SPF 50+</button>
          }
          {selectedFilters.spf.includes(70) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('spf')}>{xIcon} SPF 70+</button>
          }
        </div>
        <div className='flex flex-row gap-2'>
          {selectedFilters.price.length > 0 && selectedFilters.price.every(p => p === 0 || p === 5) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('price')}>{xIcon} $</button>
          }
          {selectedFilters.price.length > 0 && selectedFilters.price.every(p => p === 5 || p === 10) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('price')}>{xIcon} $$</button>
          }
          {selectedFilters.price.length > 0 && selectedFilters.price.every(p => p === 10 || p === 15) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('price')}>{xIcon} $$$</button>
          }
          {selectedFilters.price.length > 0 && selectedFilters.price.every(p => p === 15 || p === 25) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('price')}>{xIcon} $$$$</button>
          }
          {selectedFilters.price.length > 0 && selectedFilters.price.every(p => p === 25 || p === 10000) && 
            <button className='btn-remove-filter' onClick={() => removeFilter('price')}>{xIcon} $$$$$</button>
          }
        </div>
      </div>

      {/* Pass in list of sunscreens to render SunscreenCard components */}
      <div className='max-w-[1240px] grid grid-cols-auto gap-6 mx-auto'>
        {sunscreens.map(sunscreen => (
          <SunscreenCard 
            key={sunscreen._id}
            sunscreen={sunscreen} 
          />
        ))}
      </div>
    </>
  )
}
