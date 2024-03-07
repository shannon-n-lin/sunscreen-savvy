import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout({ handleLogout, textColor }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header handleLogout={handleLogout} textColor={textColor} />
      
      {/* This section will grow to fit the content for each page */}
      <div className='grow'>
        <Outlet />
      </div> 
      
      <Footer />
    </div>
  )
}
