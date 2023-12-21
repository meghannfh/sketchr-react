import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../reducers/authSlice';

import axios from 'axios';
axios.defaults.baseURL = 'https://sketchr-react-production.up.railway.app/'
// axios.defaults.baseURL = 'http://127.0.0.1:8002'

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupUser = async (data) =>  {
    console.log(`this is the incoming request:`, data)
    setIsloading(true)
    setError(null)
    try {
      const res = await axios.post('/user/signup', data)
      console.log(res)
      const output = await res.data
      console.log(output)

      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(output))

      //update the auth context
      dispatch(login());
      setIsloading(false);
      navigate("/feed")
    } catch(err){

      setIsloading(false)
      console.log(err)
      setError(err.response.data.error)

    }
  }
  return { signupUser, isloading, error }
}