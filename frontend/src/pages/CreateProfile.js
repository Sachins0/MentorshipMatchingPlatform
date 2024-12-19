import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import { toast } from "react-toastify";

const CreateProfile = () => {

    const [profile, setProfile]= useState({
        role: "",
        bio: "",
        interests: "",
        skills: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          role: profile.role,
          bio: profile.bio,
          interests: profile.interests.split(",").map((item) => item.trim()),
          skills: profile.skills.split(",").map((item) => item.trim()),
        };
        try {
            //create a new profile
            const response = await axios.post("/profile", payload);
            setMessage("Profile created successfully!");
            console.log(response.data);
            const userId = response.data.data.userId;
            if (response.status === 201) {
              toast.success("Profile created successfully!");
              if(response.data.data.role==='mentee'){
                navigate('/browse/connect', { state: { userId}  })
              }else{
                navigate(`/browse/myconnection/${userId}`)
              }
            }
           
        } catch (error) {
            setMessage("Failed to save profile. Try again.");
            toast.error(
              error.response?.data?.message || message
            );
        }
    };

  return (
    <div className="register-container">
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
              <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
              <form onSubmit={handleSubmit} className='flex w-full flex-col gap-y-4'>
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Profile Setup</h1>
                <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Role <sup className="text-pink-200">*</sup>
              </p>
              </label>
                <select
                  id="role"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="mentor">Mentor</option>
                  <option value="mentee">Mentee</option>
               </select>
                <div>
                <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Bio
                </p>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  rows="3"
                ></textarea>
                </div>
                <div>
                <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Interests (comma-separated)
                </p>
                </label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  value={profile.interests}
                  onChange={handleChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                />
                </div>
                <div>
                <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Skills (comma-separated)
                </p>
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  rows="3"
                />
                </div>
                <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Save Profile</button>
            </form>
                </div>
                </div>
             
        </div>
    </div>
  )
}

export default CreateProfile