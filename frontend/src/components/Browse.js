import React from 'react'
import Navbar from './Navbar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"

const Browse = () => {

  const token = localStorage.getItem('jwtToken');
  const location = useLocation();
  const showDetailsOnRoutes = ['/browse'];
  const showDetails = showDetailsOnRoutes.includes(location.pathname);

  return (
    <div>
      <Navbar/>
      
      {token === null && 
        <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100">You have not signed in....</p>
      }

      {showDetails && <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become a Mentor */}
        <Link to={"/"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become a mentor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
        Your one stop solution for every problem.
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
        Connect with peers for jobs, projects and much more.Build connections that help you grow!
        Expert advice a one click away for jobs, mock interviews
        </div>
      </div>}
      <Outlet/>
    </div>
  )
}

export default Browse