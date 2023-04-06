import { useState, useRef } from 'react';
import axios from 'axios';

const SignupForm = () => {
  //set reference to form element
  const formRef = useRef();
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current)//grab the form data using useRef

    const body = {};
    formData.forEach((value, key) => {
      body[key] = value
    }, {})

    console.log(body)
    // try{

    //   const body = {} //we're going to organize our formdata into body and return that

    //   formData.forEach((value, key) => {
    //     body[key] = value
    //   }, {})

    //   const res = await axios.post('/user/signup', body)
    //   console.log(body)
    //   console.log(res.data)

    // }catch(err){
    //   setError(err.response.data.err)
    //   console.log(err)
    // };
  };
    return (
      <div className="forms-styles">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data">
          <h3 className="font-bold text-xl">Sign Up</h3>
          <div className="form-layout">
            <input 
              type="text" 
              name="username"
              className={emptyFields.includes('username') ? 'error' : 'border-2'}
              placeholder="choose a username" 
            />
          </div>
          <div className="form-layout">
            <input 
              type="text" 
              name="email"
              className={emptyFields.includes('email') ? 'error' : 'border-2'}
              placeholder="email" 
            />
          </div>
          <div className="form-layout">
            <input 
              type="text" 
              name="password"
              className={emptyFields.includes('password') ? 'error' : 'border-2'}
              placeholder="password" 
            />
          </div>

          <button className='transition-color ease-in-out border-2 p-2 rounded-md font-bold uppercase hover:outline-none'>sign up</button>
        </form>
        {error && <div className='border-2 border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
    )
}

export default SignupForm