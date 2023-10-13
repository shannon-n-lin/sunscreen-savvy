import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
