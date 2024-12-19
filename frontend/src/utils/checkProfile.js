import { useNavigate } from 'react-router-dom';
import axios from "../api/api";

const checkProfileExistence = async (navigate) => {

  try {
    const { data } = await axios.get('/profile/exist-profile');

    console.log(data);

    if (data.exists) {
      // If profile exists, navigate to Profile page
      navigate('/browse/profile', { state: { profile: data.SuccessResponse.data } });
    } else {
      // If profile doesn't exist, navigate to Create Profile page
      navigate('/browse/createProfile');
    }
  } catch (error) {
    console.error('Error checking profile existence:', error);
    alert('Failed to check profile existence. Please try again.');
  }
};

export default checkProfileExistence;
