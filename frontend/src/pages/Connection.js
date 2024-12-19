import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Connection = () => {
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = location.state?.userId;
  console.log(userId);

  useEffect(() => {
    // Redirect if userId is not available
    if (!userId) {
      navigate('/browse'); // Redirect to profile creation if userId is missing
      return;
    }

    const fetchMatches = async () => {
      try {
        setLoading(true); // Show loading state
        const data  = await api.get(`/connection/matches/${userId}`);
        setMatches(data.data.data || []); // Assuming response structure has `matches`
      } catch (err) {
        console.error("Error fetching matches:", err.response || err.message);
        setError(err.response?.data?.message || "Failed to fetch matches.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId, navigate]);

  let res;

  const sendRequest = async (id) => {
    try {
      res= await api.get(`/connection/auto-connect/${id}`);
      console.log(res?.data);
      alert('Connection request sent!');
    } catch (err) {
      toast.error(err.response.data.error.explanation)
      console.error(err.response.data);
    }
    navigate(`/browse/myconnection/${id}`)
  };

  if (loading) return <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100">Loading matches...</p>;
  if (error) return <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100">Error: {error}</p>;

  console.log(matches);

  return (
    <div>
     <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Potential Matches
      </h1>
      <div >
      {matches.length > 0 ? (
        matches.map((match) => (
          <div className='flex gap-4 items-start'
           key={match.mentor.id}>
           <div className="border-2 rounded-md border-white h-20 w-max gap-10 justify-center items-center flex text-richblack-5 mb-7 px-3">
            <h3>Name: {match.mentor.User.firstName} {match.mentor.User.lastName}</h3>
            <h3>email: {match.mentor.User.email}</h3>
            <h3>Bio: {match.mentor.bio}</h3>
            <h3>Skills: {match.mentor.skills.join(', ')}</h3>
            <h3>Interests: {match.mentor.interests.join(', ')}</h3>
            <p>Matching skills: {match.score}</p>
            </div>
            
          </div>
        ))
      ) : (
        <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100 cursor-pointer">No matches found. Please try again later.</p>
      )}
      </div>
      <div className='flex gap-4'>
      {matches.length>0
        ?(<button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" onClick={() => sendRequest(userId)}>Auto connect</button>)
        :""

      }
      <button className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" onClick={()=>navigate(`/browse/myconnection/${userId}`)}>My all Connections</button>
      </div></div>
  );

};

export default Connection;
