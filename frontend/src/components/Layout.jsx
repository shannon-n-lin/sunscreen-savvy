import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='grow'><Outlet /></div>
      <Footer />
    </div>
  )
}
