import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='mt-16'>
      <h1 className='text-center mb-4'>Log In</h1>
      <form className='w-[80%] max-w-md mx-auto'>
        <div>
          <label htmlFor='email'>Email address</label>
          <input id='email' type='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' />
        </div>
        <button className='w-full btn-secondary mt-2 mb-8' type='submit'>Log In</button>
        <div className='text-center'>
          <Link to='/register'>Sign up for an account</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage