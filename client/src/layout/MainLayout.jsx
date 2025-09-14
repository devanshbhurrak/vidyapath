import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Login from '@/pages/Login'
import HeroSection from '@/pages/student/HeroSection'
import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-1 mt-16'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default MainLayout