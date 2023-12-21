import { useRef } from 'react';
import { useSignup } from '../hooks/useSignup';
import SignupForm from "../components/forms/SignupForm";

const Signup = ({ handleSetGreeting }) => {
      //set reference to form element
    const formRef = useRef();
    const { signupUser, error, isLoading } = useSignup();

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current)//grab the form data using useRef
        const body = {} //we're going to organize our formdata into body and return that

        formData.forEach((value, key) => {
          body[key] = value
        }, {})

        console.log(body)

        await signupUser(body)
        handleSetGreeting();
      };

    return (
        <div className="home-login-signup-w-h grid relative place-content-center">
            <SignupForm handleSignup={handleSignup} error={error} isLoading={isLoading} formRef={formRef}/>
        </div>
    )
}

export default Signup