import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import UserContext from './contexts/UserContext'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AboutPage from './pages/AboutPage'
import AllSunscreens from './pages/ProductListPages/AllSunscreens'
import ChemicalSunscreens from './pages/ProductListPages/ChemicalSunscreens'
import MineralSunscreens from './pages/ProductListPages/MineralSunscreens'
import BudgetSunscreens from './pages/ProductListPages/BudgetSunscreens'


const App = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get('http://localhost:2003/user', {
        withCredentials:true
      })
      setUser(res.data.username)
      console.log(res)
    }
    checkAuth()
  }, []) 

  async function handleLogout(e) {
    try {
      const res = await axios.post('http://localhost:2003/logout', {}, {withCredentials: true})
        setUser(res.data.user)
        console.log(user)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(typeof handleLogout)

  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>
          <Route index element={<IndexPage headerColor="white" handleLogout={handleLogout}/>} />
          
          {/* Use Layout component on all pages */}
          <Route element={<Layout handleLogout={handleLogout}/>}> 
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/all-sunscreens' element={<AllSunscreens />} />
            <Route path='/chemical-sunscreens' element={<ChemicalSunscreens />} />
            <Route path='/mineral-sunscreens' element={<MineralSunscreens />} />
            <Route path='/budget-sunscreens' element={<BudgetSunscreens />} />
            {/* Wildcard route */}
            {/* <Route path='*' element={<IndexPage />} /> */}
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
