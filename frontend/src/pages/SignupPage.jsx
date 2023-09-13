
import { Link } from 'react-router-dom'

const SignupPage = ({ signupUser }) => {
  return (
    <div className='mt-8'>
      <h1 className='text-center mb-4'>Sign Up</h1>
      <form className='w-[80%] max-w-md mx-auto'>
        <div> 
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName'/>
        </div>
        <div>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email'/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password'/>
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' id='confirmPassword'/>
        </div>
        <button className='w-full btn-secondary mt-2 mb-8' type='submit'>Sign Up</button>
        <div className='text-center'>
          <Link to='/login'>Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  )
}

export default SignupPage