import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8002'

export const useSignupContext = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext()

  const signup = async (data) =>  {
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
      dispatch({type: 'LOGIN', payload: output})
      setIsloading(false)
    } catch(err){
      setIsloading(false)
      console.log(err)
      setError(err.response.data.error)

    }
  }
  return { signup, isloading, error }
}