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
    type: '',
    form: '',
    spft: '',
    price: ''
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
  useEffect(() => {
    const getSunscreens = async () => {
      const res = await fetch(host + '/sunscreens' + '?type=chemical,physical&form=stick,spray')
      const data = await res.json()
      setSunscreens(data)
    }
    getSunscreens()
  }, [query]) 

  // // Add selected filter dropdowns to API request
  // const addQuery = (newQuery) => {
  //   setQuery((prevState) => {
  //     if (prevState) {
  //       return prevState + '&' + newQuery
  //     } else {
  //       return prevState + '?' + newQuery 
  //     }
  //   })
  // }

  // Add selected filter dropdowns to API request
  const addQuery = (newQuery) => {
    setQuery((prevState) => {
      if (prevState) {
        return prevState + '&' + newQuery
      } else {
        return prevState + '?' + newQuery 
      }
    })
  }

  /* 
    let filters = {}
    if (req.query.type) {
      filters.type = req.query.type
    }
    if (req.query.form) {
      filters.form = req.query.form
    }
  */



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
                <span className='dropdown-link' onClick={() => addQuery('form=lotion')}>Lotion</span>
                <span className='dropdown-link' onClick={() => addQuery('form=spray')}>Spray</span>
                <span className='dropdown-link' onClick={() => addQuery('form=stick')}>Stick</span>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.type}>
            <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('type')}> 
              Type {dropdownIcon}
            </button>
            {dropdownStates.type && (
              <div className='dropdown'>
                <span className='dropdown-link' onClick={() => addQuery('type=chemical')}>Chemical</span>
                <span className='dropdown-link' onClick={() => addQuery('type=physical')}>Physical</span>
                <span className='dropdown-link' onClick={() => addQuery('type=hybrid')}>Hybrid</span>
              </div>
            )}
          </div>
          <div ref={dropdownRefs.spf}>
            <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('spf')}> 
              SPF {dropdownIcon}
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
            <button className='btn-dropdown flex justify-between items-center' onClick={() => toggleDropdown('price')}> 
              Price {dropdownIcon} 
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
