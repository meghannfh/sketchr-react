import { useState } from 'react';
import { useAuthContext } from 'react';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const signup = async (email, password, username) =>  {
    setIsloading(true)
    setError(null)
    try {
      const res = await axios.post('/post/addPost', body)
      const data = await res.data

      //save the user to local storage

    } catch(err){
      setIsloading(false)
      setError(err.response.data.err)

    }


  }
}