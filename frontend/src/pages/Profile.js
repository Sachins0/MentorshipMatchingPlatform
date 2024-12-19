import { RiEditBoxLine } from "react-icons/ri"
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconBtn from "../assests/common/IconBtn";

const Profile = () => {
  const { state } = useLocation();
  const { profile } = state; // Retrieved profile data from location state
  const navigate= useNavigate();

  console.log(profile);

  const userId= profile?.userId;

  return (
    <div>
    <div className="mb-14">
    {
      profile.role === 'mentee' ? (<button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" onClick={()=>navigate('/browse/connect', { state: { userId}  })}>Connect to Mentor</button>)
                              : (<button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" onClick={()=>navigate(`/browse/myconnection/${userId}`)}>Connection Requests</button>)
    }
      </div>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
        <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {profile?.User?.firstName + " " + profile?.User?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{profile?.User?.email}</p>
            <p className="text-sm text-richblack-300">{profile?.role}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            // navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Bio</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              // navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
          <p
          className="text-richblack-5 text-sm font-medium">
          {profile?.bio ?? "Write Something About Yourself"}
        </p>
        <p className="text-richblack-5 text-sm font-medium">Skills: {profile.skills.join(', ')}</p>
      <p className="text-richblack-5 text-sm font-medium">Interests: {profile.interests.join(', ')}</p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              // navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {profile?.User?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {profile?.User?.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {profile?.User?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Role</p>
              <p className="text-sm font-medium text-richblack-5">
                {profile?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Profile;
