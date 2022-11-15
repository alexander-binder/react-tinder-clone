

import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthModal = ({setShowModal, isSignUp}) => {

    let navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState();
    const [cookie, setCookie, removeCookie] = useCookies(['user']);


    const handleClick = () => {
        setShowModal(false);
    }

    // const isSignUp = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if(isSignUp && password !== confirmPassword){
                setError('Passwords need to match !');
                return
            }
            
           const response = await axios.post(`http://localhost:8000/${ isSignUp ? 'signUp' : 'login'}`,{ email, password });

            // setCookie('Email', response.data.email);
            setCookie('UserId', response.data.userId);
            setCookie('AuthToken', response.data.token);
            
           const success = response.status === 201;
           
           if(success && isSignUp) navigate('/onboarding');
           if(success && !isSignUp) navigate('/dashboard');

           window.location.reload();
           
        } catch (error) {
            console.log(error);
        }
    }


    // console.log(email, password, confirmPassword);

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>X</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {isSignUp && <input 
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirmPassword"
                    required={true}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />}
                <input className="secondary-button" type="submit" />
                <p>{error && error}</p>
            </form>
            <hr/>
            <h2>GET THE APP</h2>
                    AuthModal

        </div>
    );
}

export default AuthModal;