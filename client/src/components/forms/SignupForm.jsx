import { useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs'

const SignupForm = ({ 
  handleSignup, 
  error, 
  isLoading, 
  formRef, 
  setIsPassingPwd, 
  isPassingPwd,
  setPwdNotMatchingCriteria, 
  pwdNotMatchingCriteria }) => {

  const [showEye, setShowEye] = useState(false);
  const [firstPwd, setFirstPwd] = useState("");

  const handleToggleEye = () => {
    setShowEye(prevShowEye => !prevShowEye)
  }

  const checkMatchingPwd = (validatedPwd) => {
    if(firstPwd === validatedPwd) {
      setIsPassingPwd(true)
    }
  }

  const checkPwdRequirements = (pwd) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /\d+/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;
    const lengthOK = pwd.length >= 8;
    const notPassingCriteria = [];

    if(!lengthOK){
      console.log(`pwd is not 8 or more characters`)
      notPassingCriteria.push("length")
    }

    if(!uppercase.test(pwd)) {
      console.log(`there is not an uppercase`)
      notPassingCriteria.push("uppercase")
    } 
    
    if (!lowercase.test(pwd)) {
      console.log(`there is not a lowercase`)
      notPassingCriteria.push("lowercase")
    } 
    
    if (!number.test(pwd)) {
      console.log(`there is not a number`)
      notPassingCriteria.push("number")
    } 
    
    if (!special.test(pwd)) {
      console.log(`there is a not special character`)
      notPassingCriteria.push("special")
    }

    setFirstPwd(pwd)
    setPwdNotMatchingCriteria(notPassingCriteria)
  }


    return (
    <div className="grid h-screen place-content-center">
      <div className="forms-styles">
        <form className="flex flex-col gap-2" onSubmit={handleSignup} ref={formRef} encType="multipart/form-data">
          <h3 className="font-bold text-xl">Sign Up</h3>
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
              onInput={(e) => checkPwdRequirements(e.target.value)}
            />
            <i className="absolute right-3 top-1 text-2xl hover:cursor-pointer" onClick={handleToggleEye}>{showEye ? <BsEye /> : <BsEyeSlash />}</i>
          </div>
          <div className="form-layout">
            <input 
              type="password" 
              name="password-validation"
              placeholder="retype password" 
              onInput={(e) => checkMatchingPwd(e.target.value)}
            />
          </div>
          {/*start password validation msgs*/}
          <ul className="lowercase text-xs text-red-600 py-3 flex flex-col gap-1">
              {pwdNotMatchingCriteria.includes("length") || pwdNotMatchingCriteria === "none" ? <li className="p-2 bg-rose-100 border border-red-500 rounded">✗ password is not 8-12 characters</li> : <li className="text-emerald-600 bg-green-100 p-2 border rounded border-green-500">✓ password is 8 characters or longer</li>}
              {pwdNotMatchingCriteria.includes("number") || pwdNotMatchingCriteria === "none" ? <li className="p-2 bg-rose-100 border border-red-500 rounded">✗ password needs at least one (1) number</li> : <li className="text-emerald-600 bg-green-100 p-2 border rounded border-green-500">✓ password includes at least one (1) number</li>}
              {pwdNotMatchingCriteria.includes("lowercase") || pwdNotMatchingCriteria === "none" ? <li className="p-2 bg-rose-100 border border-red-500 rounded">✗ password needs at least one (1) lowercase letter</li> : <li className="text-emerald-600 bg-green-100 p-2 border rounded border-green-500">✓ password includes at least one (1) lowercase letter</li>}
              {pwdNotMatchingCriteria.includes("uppercase") || pwdNotMatchingCriteria === "none" ? <li className="p-2 bg-rose-100 border border-red-500 rounded">✗ password needs at least one (1) uppercase letter</li> : <li className="text-emerald-600 bg-green-100 p-2 border rounded border-green-500">✓ password includes at least one (1) uppercase letter</li>}
              {pwdNotMatchingCriteria.includes("special") || pwdNotMatchingCriteria === "none" ? <li className="p-2 bg-rose-100 border border-red-500 rounded">✗ password needs at least one (1) special character</li> : <li className="text-emerald-600 bg-green-100 p-2 border rounded border-green-500">✓ password includes at least one (1) special character</li>}
            </ul>
          <button disabled={isLoading} className='transition-color ease-in-out bg-pink-400 p-2 text-white rounded-md font-bold uppercase transition-colors hover:bg-white hover:text-pink-400'>sign up</button>
        </form>
        {error && <div className='border border-red-600 rounded p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
    </div>
  )
}

export default SignupForm