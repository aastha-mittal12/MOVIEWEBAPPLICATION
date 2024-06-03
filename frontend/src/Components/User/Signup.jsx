import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import the CSS file
import { base_url } from '../services/helper';

const SignUp = () => {
    let navigate = useNavigate();
    const usernameRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();
    const emailRef = useRef();

    const [error, setError] = useState('');

    const signuphandler = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passRef.current.value;
        const confirmPassword = confirmPassRef.current.value;
        const email = emailRef.current.value;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.post(`${base_url}/register`, { username, password, email });
            navigate('/login');
        } catch (e) {
            if (e.response && e.response.data) {
                setError(e.response.data.message);
            } else {
                setError('Cannot Sign Up');
            }
        }
    }

    return (
        <div className="register-container">
            <form onSubmit={signuphandler} className='signup-form'>
                <h2 className="welcome-text">Welcome, Please Register</h2>
                <div className="form-group">
                    <label htmlFor='username' className="form-label">Username:</label>
                    <input type="text" id='username' ref={usernameRef} placeholder="Enter username" required className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor='email' className="form-label">Email:</label>
                    <input type="email" id='email' ref={emailRef} placeholder="Enter Email" required className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor='password' className="form-label">Password:</label>
                    <input type="password" id='password' ref={passRef} placeholder="Enter Password" required className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor='confirmPassword' className="form-label">Confirm Password:</label>
                    <input type="password" id='confirmPassword' ref={confirmPassRef} placeholder="Confirm Password" required className="form-control" />
                </div>
                {error && <p className='error'>{error}</p>}
                <button className='signup-button'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;
