import LoginForm from "../components/LoginForm";
import { useRef } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const formRef = useRef();
    const { login, error, isLoading } = useLogin();
  
    const handleSubmit = async (e) => {
        e.preventDefault();

    const formData = new FormData(formRef.current)//grab the form data using useRef
    const body = {} 
    formData.forEach((value, key) => {
        body[key] = value
    }, {})

    await login(body)
  };


    return (
        <div className="home-login-signup-w-h grid relative place-content-center">
            <LoginForm handleSubmit={handleSubmit} error={error} isLoading={isLoading} formRef={formRef} />
        </div>
    )
}

export default Login