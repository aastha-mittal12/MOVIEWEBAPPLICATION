import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css'; // Import the CSS file for styling

const Error = () => {
  return (
    <div className="error-container">
      <div className="content">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <p className="error-description">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="home-link">Go to Home Page</Link>
      </div>
      
    </div>
  );
};

export default Error;
