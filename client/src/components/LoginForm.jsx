import { useRef } from 'react';
import { useLogin } from '../hooks/useLogin';

const LoginForm = () => {
  //set reference to form element
  const formRef = useRef();
  const { login, error, isLoading } = useLogin();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current)//grab the form data using useRef
    const body = {} //we're going to organize our formdata into body and return that
    formData.forEach((value, key) => {
      body[key] = value
    }, {})

    await login(body)

  };
    return (
      <div className="grid ">
      <div className="forms-styles">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} ref={formRef} encType="multipart/form-data">
          <h3 className="font-bold text-xl">Login</h3>
          <div className="form-layout">
            <input 
              type="text" 
              name="email"
              className='border-2'
              placeholder="email" 
            />
          </div>
          <div className="form-layout">
            <input 
              type="password" 
              name="password"
              className='border-2'
              placeholder="password" 
            />
          </div>
          <button disabled={isLoading} className='transition-color ease-in-out border-2 p-2 rounded-md font-bold uppercase hover:outline-none'>login</button>
        </form>
        {error && <div className='border-2 border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
      </div>
    )
}

export default LoginForm