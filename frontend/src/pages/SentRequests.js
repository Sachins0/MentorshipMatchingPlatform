import React from 'react'
import { useLocation } from 'react-router-dom';

const SentRequests = () => {

    const location = useLocation();
    const userId = location.state?.userId;
    console.log(userId);

  return (
    <div>SentRequests</div>
  )
}

export default SentRequests