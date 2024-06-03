import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling
import { base_url } from '../services/helper';

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  let navigate = useNavigate();
  const [error, setError] = useState(''); // State to store error message

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    try {
      console.log("req sent");
      let res = await axios.post(`${base_url}/login`, { email, password });
      const token = res.data.token;
      console.log(token);

      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      } else {
        console.log("Token is Not Generated");
      }
    } catch (e) {
      if (e.response && e.response.data) {
        setError(e.response.data.message);
      } else {
        setError('Cannot Login');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={loginHandler} className="login-form">
        <h2 className="welcome-text">Welcome, Please Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" ref={emailRef} placeholder="Enter Email" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" ref={passRef} placeholder="Enter Password" className="form-control" required />
        </div>
        {error && <p className='error'>{error}</p>} {/* Display error message */}
        <button type="submit" className="login-button">Login</button>
        <p className="register-text">Not registered yet? <Link to="/register" className="register-link">Register here</Link></p>
      </form>
    </div>
  );
};

export default Login;
