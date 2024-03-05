import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout({ handleLogout }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header handleLogout={handleLogout} />
      <div className='grow'><Outlet /></div> {/* this section will grow to fit the content for each page */}
      <Footer />
    </div>
  )
}
