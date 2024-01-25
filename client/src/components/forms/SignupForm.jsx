import { useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs'

const SignupForm = ({ handleSignup, error, isLoading, formRef }) => {
  const [showEye, setShowEye] = useState(false)
  const [isPassingPwd, setIsPassingPwd] = useState(false);
  const [pwdNotMatchingCriteria, setPwdNotMatchingCriteria] = useState([]);
  console.log(pwdNotMatchingCriteria)

  const handleToggleEye = () => {
    setShowEye(prevShowEye => !prevShowEye)
  }

  const checkPwdRequirements = (pwd) => {
    console.log(`the value coming in for pwd ${pwd}`)
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /\d+/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;
    const notPassingCriteria = [];

    if(pwd.length < 8 && !pwdNotMatchingCriteria.includes("length")){
      console.log(`pwd is 8 or more characters`)
      notPassingCriteria.push("length")
    }

    if(!uppercase.test(pwd) && !pwdNotMatchingCriteria.includes("uppercase")) {
      console.log(`there is an uppercase`)
      notPassingCriteria.push("uppercase")
    } 
    
    if (!lowercase.test(pwd) && !pwdNotMatchingCriteria.includes("lowercase")) {
      console.log(`there is a lowercase`)
      notPassingCriteria.push("lowercase")
    } 
    
    if (!number.test(pwd) && !pwdNotMatchingCriteria.includes("number")) {
      console.log(`there is a number`)
      notPassingCriteria.push("number")
    } 
    
    if (!special.test(pwd) && !pwdNotMatchingCriteria.includes("special")) {
      console.log(`there is a special character`)
      notPassingCriteria.push("special")
    }

    setPwdNotMatchingCriteria(notPassingCriteria)
  }
    return (
    <div className="grid h-screen place-content-center">
      <div className="forms-styles">
        <form className="flex flex-col gap-2" onSubmit={handleSignup} ref={formRef} encType="multipart/form-data">
          <h3 className="font-bold text-xl">Sign Up</h3>
          {/* <div className="form-layout">
            <input 
              type="text" 
              name="username"
              className='border-2'
              placeholder="username" 
            />
          </div> */}
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
            <i className="absolute right-3 top-2 text-2xl hover:cursor-pointer" onClick={handleToggleEye}>{showEye ? <BsEye /> : <BsEyeSlash />}</i>
            <ul className="lowercase text-xs text-red-500 p-3">
              {pwdNotMatchingCriteria.includes("length") || pwdNotMatchingCriteria.length === 0 ? <li>✗ password is not 8-12 characters</li> : <li className="text-green-500">✓ password is 8 characters or longer</li>}
              {pwdNotMatchingCriteria.includes("number") || pwdNotMatchingCriteria.length === 0 ? <li>✗ password needs at least one (1) number</li> : <li className="text-green-500">✓ password includes at least one (1) number</li>}
              {pwdNotMatchingCriteria.includes("lowercase") || pwdNotMatchingCriteria.length === 0 ? <li>✗ password needs at least one (1) lowercase letter</li> : <li className="text-green-500">✓ password includes at least one (1) lowercase letter</li>}
              {pwdNotMatchingCriteria.includes("uppercase") || pwdNotMatchingCriteria.length === 0 ? <li>✗ password needs at least one (1) uppercase letter</li> : <li className="text-green-500">✓ password includes at least one (1) uppercase letter</li>}
              {pwdNotMatchingCriteria.includes("special") || pwdNotMatchingCriteria.length === 0 ? <li>✗ password needs at least one (1) special character</li> : <li className="text-green-500">✓ password includes at least one (1) special character</li>}
            </ul>
          </div>
          <button disabled={isLoading} className='transition-color ease-in-out bg-pink-400 p-2 text-white rounded-md font-bold uppercase transition-colors hover:bg-pink-200 hover:text-pink-800'>sign up</button>
        </form>
        {error && <div className='border border-red-600 rounded-md p-4 mt-3 bg-red-300/25 text-red-600 text-center'>{error}</div>}
      </div>
    </div>
  )
}

export default SignupForm