import { React, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import UserContext from './contexts/UserContext'
import Layout from './components/Layout'
import Header from './components/Header'
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
        console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>

          {/* Apply layout component to all pages */}
          <Route element={<Layout handleLogout={handleLogout}/>}> 
            <Route path='/' element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/all-sunscreens' element={<AllSunscreens />} />
            <Route path='/chemical-sunscreens' element={<ChemicalSunscreens />} />
            <Route path='/mineral-sunscreens' element={<MineralSunscreens />} />
            <Route path='/budget-sunscreens' element={<BudgetSunscreens />} />
          </Route>
          
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App

// import { React, useState, useEffect } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import axios from 'axios'
// import UserContext from './contexts/UserContext'
// import Layout from './components/Layout'
// import Header from './components/Header'
// import IndexPage from './pages/IndexPage'
// import LoginPage from './pages/LoginPage'
// import SignupPage from './pages/SignupPage'
// import AboutPage from './pages/AboutPage'
// import AllSunscreens from './pages/ProductListPages/AllSunscreens'
// import ChemicalSunscreens from './pages/ProductListPages/ChemicalSunscreens'
// import MineralSunscreens from './pages/ProductListPages/MineralSunscreens'
// import BudgetSunscreens from './pages/ProductListPages/BudgetSunscreens'


// const App = () => {
//   const [user, setUser] = useState('')

//   useEffect(() => {
//     const checkAuth = async () => {
//       const res = await axios.get('http://localhost:2003/user', {
//         withCredentials:true
//       })
//       setUser(res.data.username)
//       console.log(res)
//     }
//     checkAuth()
//   }, []) 

//   async function handleLogout(e) {
//     try {
//       const res = await axios.post('http://localhost:2003/logout', {}, {withCredentials: true})
//         setUser(res.data.user)
//         console.log(res.data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   return (
//     <>
//       <UserContext.Provider value={user}>
//         <Routes>
//           <Route element={<Header />} />
//           {/* TODO: Fix routing issue when applying layout component to all pages */}
//           {/* <Route element={<Layout handleLogout={handleLogout}/>}>  */}

//             <Route path='/' element={<IndexPage handleLogout={handleLogout}/>} />
//             <Route path='/login' element={<LoginPage handleLogout={handleLogout}/>} />
//             <Route path='/signup' element={<SignupPage handleLogout={handleLogout}/>} />
//             <Route path='/about' element={<AboutPage handleLogout={handleLogout}/>} />
//             <Route path='/all-sunscreens' element={<AllSunscreens handleLogout={handleLogout}/>} />
//             <Route path='/chemical-sunscreens' element={<ChemicalSunscreens handleLogout={handleLogout}/>} />
//             <Route path='/mineral-sunscreens' element={<MineralSunscreens handleLogout={handleLogout}/>} />
//             <Route path='/budget-sunscreens' element={<BudgetSunscreens handleLogout={handleLogout}/>} />
            
//             {/* Wildcard route */}
//             {/* <Route path='*' element={<IndexPage />} /> */}

//         </Routes>
//       </UserContext.Provider>
//     </>
//   )
// }

// export default App
