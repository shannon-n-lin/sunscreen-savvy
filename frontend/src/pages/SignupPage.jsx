import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignup(e) {
    e.preventDefault()
    try {
      await axios.post('http://localhost:2003/signup', {
        username,
        email,
        password,
        confirmPassword,
      })
      setSuccess(true)
    } catch (err) {
      console.log(err)
    }
  }

  if (success) {
    console.log(`Successfully created account for ${username}`)
    return<Navigate to='/' />
  }

  return (
    <div className='mt-8'>
      <h1 className='text-center mb-4'>Sign Up</h1>
      <form className='w-[80%] max-w-md mx-auto' onSubmit={handleSignup}>
        <div> 
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' 
            value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email'
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password'
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' id='confirmPassword'
            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <button className='w-full btn-secondary mt-2 mb-8' type='submit'>Sign Up</button>
        <div className='text-center'>
          <Link to='/login'>Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  )
}
