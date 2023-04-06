import { useState } from 'react';
import { useAuthContext } from 'react';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext()

  const signup = async (body) =>  {
    setIsloading(true)
    setError(null)
    try {
      const res = await axios.post('/post/addPost', body)
      const data = await res.data

      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      //update the auth context
      dispatch({type: 'LOGIN', payload: data})
      setIsloading(false)
    } catch(err){
      setIsloading(false)
      setError(err.response.data.err)

    }


  }

  return { signup, isloading, error }
}