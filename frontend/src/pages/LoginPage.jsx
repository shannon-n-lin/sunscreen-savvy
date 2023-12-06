import { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage({ user, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:2003/login', {
        email: email,
        password: password,
      })
      setError(res.data.msg)
      // setUser(res.data.email)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // if (success) {
  //   console.log(`Sucessfully logged in ${email}`)
  //   return<Navigate to='/' />
  // }

  return (
    <div className='mt-16'>
      <h1 className='text-center mb-4'>Log In</h1>
      {error && <span className='text-center mb-4'>{error}</span>}
      <form className='w-[80%] max-w-md mx-auto' onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email address</label>
          <input id='email' type='email' 
            value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' 
            value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button className='w-full btn-secondary mt-2 mb-8' type='submit'>Log In</button>
        <div className='text-center'>
          <Link to='/signup'>Sign up for an account</Link>
        </div>
      </form>
    </div>
  )
}
