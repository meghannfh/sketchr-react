import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (data) =>  {
    setIsloading(true)
    setError(null)
    try {
      const res = await axios.post('/user/login', data);
      const output = await res.data;

      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(output))

      //update the auth context
      dispatch({type: 'LOGIN', payload: output})
      setIsloading(false)
      navigate("/feed")

    } catch(err){
      
      setIsloading(false)
      console.log(err)
      setError(err.response.data.error)

    }
  }
  return { login, isLoading, error }
}
