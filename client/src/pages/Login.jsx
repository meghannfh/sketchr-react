import LoginForm from "../components/forms/LoginForm";
import { useRef } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = ({ handleSetGreeting }) => {
    
    const formRef = useRef();
    const { loginUser, error, isLoading } = useLogin();
  
    const handleLogin = async (e) => {
        e.preventDefault();

    const formData = new FormData(formRef.current)//grab the form data using useRef
    const body = {} 
    formData.forEach((value, key) => {
        body[key] = value
    }, {})

    console.log(`${body} info sent to login`)

    const output = await loginUser(body)

    console.log(`${output} output sent to loginUser`)
    handleSetGreeting();
  };


    return (
        <div className="home-login-signup-w-h grid relative place-content-center">
            <LoginForm handleLogin={handleLogin} error={error} isLoading={isLoading} formRef={formRef} />
        </div>
    )
}

export default Login