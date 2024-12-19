import React, { useRef, useState } from 'react'
import { checkValidDate } from '../utils/validate';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser, signInUser } from "../api/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import checkProfileExistence from '../utils/checkProfile';



const Login = () => {

    const navigate = useNavigate();

    const [isSignInForm,setSignInForm]=useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const firstName=useRef(null)
    const lastName=useRef(null)
    const email=useRef(null)
    const password=useRef(null)
    const confirmPassword=useRef(null)

    const togglesignInEvent=()=>{
        setSignInForm(!isSignInForm)
    }

    const handleBtnClick=async()=>{
        const message=checkValidDate(email.current.value,password.current.value)
        toast.error(message);
        if(message) return;

        if (!isSignInForm && (password.current.value !== confirmPassword.current.value)) {
            toast.error("Passwords do not match!");
            return;
        }

        //sign up, sign in logic
        if(!isSignInForm){
            //sign up

            try {
                const response = await registerUser({
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    email: email.current.value,
                    password: password.current.value,
                });
        
                if (response.status === 201) {
                    toast.success("Registration successful! Now sign in");
                    togglesignInEvent()
                    navigate('/')
                }
            } catch (error) {
              console.log( error.response.data);
                toast.error(
                    error.response?.data?.error?.explanation[0] || "An error occurred. Please try again."
                );
            }

        }else{
            //sign in
            try {
                const response = await signInUser({
                    email: email.current.value,
                    password: password.current.value,
                });
        
                if (response.status === 201) {
                    toast.success("login successful!.");
                    const token = response.data.data; // Assuming the token is returned as `response.data.data`
                    localStorage.setItem('jwtToken', token); // Save to localStorage
                    console.log("sign in",response.data);
                    checkProfileExistence(navigate);
                }
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "An error occurred. Please try again."
                );
            }
        }

    }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <form onSubmit={(e)=>{e.preventDefault()}} className='flex w-full flex-col gap-y-4'>
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{isSignInForm?"Sign In":"Sign Up"}</h1>
            <div className="flex gap-x-4">
            {
                !isSignInForm && <>
                <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
                <input ref={firstName} type='text' placeholder='Enter First Name' style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"/>
                </label>
                <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name
            </p>
                <input ref={lastName} type='text' placeholder='Enter Last Name' style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"/>
                </label>
                </>
            }
            </div>
            <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
            <input ref={email} type='text' placeholder='Email Address' style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"/>
            </label>
            <div className="flex gap-x-4">
            <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            
            <input ref={password} type={showPassword ? "text" : "password"} placeholder='Password' style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"/>
               <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
              </span>
              </label>
            {
                !isSignInForm && 
                <>
                <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
                <input ref={confirmPassword} type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password'  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"/>
              <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
              </label>
                </>

            }
            </div>
            <button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" onClick={handleBtnClick}>{isSignInForm?"Sign In":"Create Account"}</button>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100 cursor-pointer" onClick={togglesignInEvent}>{isSignInForm?"New here ? Sign Up Now...":"Already registered ? sign In...."}</p>
        </form>
            </div>
            </div>
         
    </div>
  )
}

export default Login