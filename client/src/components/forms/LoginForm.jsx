import { useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const LoginForm = ({ handleLogin, error, isLoading, formRef }) => {

  const [showEye, setShowEye] = useState(false)

  const handleToggleEye = () => {
    setShowEye(prevShowEye => !prevShowEye)
  }

    return (
      <div className="grid h-screen place-content-center">
      <div className="forms-styles">
        <form className="flex flex-col gap-2" onSubmit={handleLogin} ref={formRef} encType="multipart/form-data">
          <h3 className="font-bold text-xl">Login</h3>
          <div className="form-layout">
            <input 
              type="text" 
              name="email"
              placeholder="email" 
            />
          </div>
          <div className="form-layout relative">
            <input 
              type={showEye ? "text" : "password"} 
              name="password"
              placeholder="password" 
            />
            <i className="absolute right-3 top-2 text-2xl hover:cursor-pointer" onClick={handleToggleEye}>{showEye ? <BsEye /> : <BsEyeSlash />}</i>
          </div>
          <button disabled={isLoading} className='w-full transition-color ease-in-out bg-pink-400 p-2 text-white rounded-md uppercase transition-colors hover:bg-pink-200 hover:text-pink-800'>login</button>
        </form>
        {error && <div className='border border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
      </div>
    )
}

export default LoginForm