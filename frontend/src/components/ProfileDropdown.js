import React, { useRef, useState } from 'react'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { AiOutlineCaretDown } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import checkProfileExistence from '../utils/checkProfile';

const ProfileDropdown = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const handleLogout = async () => {
    try {

      // Remove token from local storage
      localStorage.removeItem("jwtToken");
      alert("Logged out successfully!");

      // Redirect to login
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
      <FaRegUserCircle color='white' size='30px'/>
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <div onClick={() => {
            checkProfileExistence(navigate)
            setOpen(false)
            }}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Profile
              </div>
            </div>
          <div
            onClick={() => {
              setOpen(false)
              handleLogout()
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}

export default ProfileDropdown