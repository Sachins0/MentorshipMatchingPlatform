import React from 'react'
import logo from '../assests/images/logo.png'
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';
const Navbar = () => {

    const token = localStorage.getItem('jwtToken');

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 transition-all duration-200`}
    >
    <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to='/browse'>
          <img src={logo} alt="Logo" width={150} height={40} loading="lazy" />
        </Link> 
        {/* Navigation links */}
        <nav className="hidden md:block">
        <ul className="flex gap-x-6 text-richblack-25">
            <li>
            <Link to='/browse'>
            Home
            </Link>
            </li>
            <li>
            <Link to='/browse/about'>
            About us
            </Link>
            </li>
            <li>
            <Link to='/browse/contact'>
            Contact us
            </Link>
            </li>
        </ul>
        </nav>
        <div className='flex gap-3'>
        {token === null && (
          <Link to="/">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in or Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown/>}
          </div>
        </div>
        </div>
  )
}

export default Navbar