import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import api from '../api/api';

const Myconnections = () => {

    const {id}= useParams();
    console.log(id);

    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate= useNavigate()

    useEffect(() => {

        if (!id) {
            navigate('/browse'); // Redirect to profile creation if userId is missing
            return;
          }
    
        const fetchMatches = async () => {
          try {
            setLoading(true); // Show loading state
            const data  = await api.get(`connection/getallconnections/${id}`);
            console.log(data);
            setConnections(data.data.data || []);
          } catch (err) {
            console.error("Error fetching matches:", err.response || err.message);
            setError(err.response?.data?.message || "Failed to fetch matches.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchMatches();
      }, [id, navigate]);

      console.log(connections);
      if (loading) return <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100">Loading matches...</p>;
      if (error) return <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100">Error: {error}</p>;
    

    return (
        <div>
         <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            My Connections
          </h1>
          <div >
          {connections.length > 0 ? (
            connections.map((connection) => (
              <div className='flex gap-4 items-start'
               key={connection.mentor.id}>
               <div className="border-2 rounded-md border-white h-20 w-max gap-10 justify-center items-center flex text-richblack-5 mb-7 px-3">
                <h3>Mentor Name: {connection.mentor.User.firstName} {connection.mentor.User.lastName}</h3>
                <h3>Mentor email: {connection.mentor.User.email}</h3>
                <h3>Mentee Name: {connection.mentee.User.firstName} {connection.mentee.User.lastName}</h3>
                <h3>Mentee email: {connection.mentee.User.email}</h3>
                <h3>status: {connection.status}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-[1.125rem] leading-[1.625rem] font-edu-sa font-bold italic text-blue-100 cursor-pointer">No connections found. Please try again later.</p>
          )}
          </div>
        </div>
      );
    
}

export default Myconnections