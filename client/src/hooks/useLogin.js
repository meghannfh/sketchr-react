import { useState } from 'react';
// import { useAuthContext } from './useAuthContext';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (data) =>  {
    setIsloading(true)
    setError(null)
    try {
      const res = await axios.post('/user/login', data);
      const output = await res.data;

      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(output))

      //update the auth context
      dispatch(login())
      setIsloading(false)
      navigate("/feed")

    } catch(err){
      
      setIsloading(false)
      console.log(err)
      setError(err.response.data.error)

    }
  }
  return { loginUser, isLoading, error }
}
