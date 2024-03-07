import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import UserContext from './contexts/UserContext'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AllSunscreensPage from './pages/AllSunscreensPage'


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
  }, [user]) 

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
          {/* use Layout component on all pages */}
          <Route path='/' element={<Layout handleLogout={handleLogout}/>}> 
            <Route path='/login' element={<LoginPage headerColor="black"/>} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/all-sunscreens' element={<AllSunscreensPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
