import { useRef, useState } from 'react';
import { useSignupContext } from '../hooks/useSignupContext';
import { BsEyeSlash, BsEye } from 'react-icons/bs'

const SignupForm = () => {
  const [eye, setEye] = useState(<BsEyeSlash />)
  //set reference to form element
  const formRef = useRef();
  const { signup, error, isLoading } = useSignupContext();

  const handleToggleEye = (e) => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current)//grab the form data using useRef
    const body = {} //we're going to organize our formdata into body and return that
    console.log(formData)

    formData.forEach((value, key) => {
      body[key] = value
    }, {})

    console.log(body)

    await signup(body)

  };
    return (
    <div className="grid h-screen place-content-center">
      <div className="forms-styles">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data">
          <h3 className="font-bold text-xl">Sign Up</h3>
          <div className="form-layout">
            <input 
              type="text" 
              name="username"
              className='border-2'
              placeholder="choose a username" 
            />
          </div>
          <div className="form-layout">
            <input 
              type="text" 
              name="email"
              className='border-2'
              placeholder="email" 
            />
          </div>
          <div className="form-layout relative">
            <input 
              type="password" 
              name="password"
              className='border-2'
              placeholder="password" 
            />
            <i className="absolute right-3 top-2 text-2xl" onClick={handleToggleEye}>{eye}</i>
          </div>

          <button disabled={isLoading} className='transition-color ease-in-out border-2 p-2 rounded-md font-bold uppercase hover:outline-none'>sign up</button>
        </form>
        {error && <div className='border-2 border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
    </div>
  )
}

export default SignupForm