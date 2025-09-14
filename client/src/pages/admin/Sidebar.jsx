import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Sidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 
     ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`

  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[280px] space-y-8 border-r border-gray-200 dark:border-gray-800 bg-[#f9f9f9] dark:bg-[#141414] p-5 sticky top-0 h-screen">
        <div className="space-y-2">
          <NavLink to="dashboard" className={navLinkClasses}>
            <ChartNoAxesColumn size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="courses" className={navLinkClasses}>
            <SquareLibrary size={20} />
            <span>Courses</span>
          </NavLink>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar
