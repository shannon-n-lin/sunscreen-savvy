import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { FiAlertCircle } from 'react-icons/fi'

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [accountError, setAccountError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')

  const user = useContext(UserContext)
  const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:2003/signup', {
        username,
        email,
        password,
        confirmPassword,
      })
      switch (res.data.msgType) {
        case 'email':
          setEmailError(res.data.msg)
          break;
        case 'password':
          setPasswordError(res.data.msg)
          break;
        case 'confirm':
          setConfirmError(res.data.msg)
          break;
        default:
          setAccountError(res.data.msg)
      }
      console.log(res.data)
      if (res.data.user) {
        handleLogin()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleLogin(e) {
    try {
      const res = await axios.post('http://localhost:2003/login', {
        email: email,
        password: password,
      }, {
        withCredentials: true,
      } )
      if (!res.data.msg) {
        navigate('/')
        navigate(0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  function resetErrors() {
    setEmailError('')
    setPasswordError('')
    setConfirmError('')
    setAccountError('')
  }

  return (
    <div className='mt-8'>
      <h1 className='text-center mb-4'>Sign Up</h1>
      {user && <span>Welcome {user}</span>}
      <form className='w-[80%] max-w-md mx-auto' onSubmit={handleSignup}>
        
        {/* Email address */}
        <div>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email' aria-describedby='emailError'
            value={email} onChange={e => setEmail(e.target.value)} />
          {emailError && <div className='error' id='emailError'>
            <FiAlertCircle className='mr-1' size={16} alt='error'/>
            {emailError}
          </div>}
        </div>
        
        {/* Username */}
        <div> 
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' aria-describedby='accountError'
            value={username} onChange={e => setUsername(e.target.value)} />
          {accountError && <div className='error' id='accountError'>
            <FiAlertCircle className='mr-1' size={16} alt='error'/>
            {accountError}
          </div>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor='password'>Password</label>
          <div id='passwordLength' className='italic text-sm my-2'>Must be 8 characters or longer.</div>
          <input type='password' id='password' aria-describedby='passwordLength passwordError'
            value={password} onChange={e => setPassword(e.target.value)} />
          {passwordError && <div className='error' id='passwordError'>
            <FiAlertCircle className='mr-1' size={16} alt='error'/>
            {passwordError}
          </div>}
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor='confirmPassword'>Confirm password</label>
          <input type='password' id='confirmPassword' aria-describedby='confirmError'
            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          {confirmError && <div className='error' id='confirmError'>
            <FiAlertCircle className='mr-1' size={16} alt='error'/>
            {confirmError}
          </div>}
        </div>

        {/* Submit */}
        <button className='w-full btn-secondary mt-2 mb-8' type='submit' onClick={resetErrors}>
          Sign Up
        </button>

      </form>

      <div className='text-center italic'>
        <Link to='/login'>Already have an account? Log in</Link>
      </div>

    </div>
  )
}
