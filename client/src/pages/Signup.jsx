import SignupForm from "../components/SignupForm";
import { useRef } from 'react';
import { useSignupContext } from '../hooks/useSignupContext';

const Signup = () => {
      //set reference to form element
    const formRef = useRef();
    const { signup, error, isLoading } = useSignupContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(formRef.current)//grab the form data using useRef
        const body = {} //we're going to organize our formdata into body and return that
    
        formData.forEach((value, key) => {
          body[key] = value
        }, {})
    
        console.log(body)
    
        await signup(body)
    
      };

    return (
        <div className="home-login-signup-w-h grid relative place-content-center">
            <SignupForm handleSubmit={handleSubmit} error={error} isLoading={isLoading} formRef={formRef}/>
        </div>
    )
}

export default Signup