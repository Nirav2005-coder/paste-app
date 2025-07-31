import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
   <div className="bg-gray-900 text-white py-4 px-6 shadow-md">
  <div className="flex gap-6 justify-center text-lg font-semibold">
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
          : "hover:text-yellow-400"
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/pastes"
      className={({ isActive }) =>
        isActive
          ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
          : "hover:text-yellow-400"
      }
    >
      Pastes
    </NavLink>
  </div>
</div>

  )
}

export default Navbar
