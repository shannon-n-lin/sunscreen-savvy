import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { FiAlertCircle } from 'react-icons/fi'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const user = useContext(UserContext)
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:2003/login', {
        email: email,
        password: password,
      }, {
        withCredentials: true,
      } )
      setError(res.data.msg)
      console.log(res.data)
      if (!res.data.msg) {
        navigate('/')
        navigate(0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='mt-16'>
      <h1 className='text-center mb-4'>Log In</h1>
      {user && <span>Welcome {user}</span>}
      
      <form className='w-[80%] max-w-md mx-auto' onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email address</label>
          <input id='email' type='email' value={email} required aria-describedby='error'
            onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' value={password} required aria-describedby='error'
            onChange={e => setPassword(e.target.value)}/>
        </div>
        {error && <div id='error' className='justify-center error mt-2'>
          <FiAlertCircle className='mr-1' size={16} alt='error'/>
          {error}
        </div>}
        <button className='w-full btn-secondary mt-2 mb-8' type='submit'>Log In</button>
        
        <div className='text-center italic'>
          <Link to='/signup'>Sign up for an account</Link>
        </div>
      </form>

    </div>
  )
}
