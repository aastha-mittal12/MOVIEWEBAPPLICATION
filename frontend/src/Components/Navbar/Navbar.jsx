import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import { GiFallingStar } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const logouthandler = () => {
    localStorage.removeItem('token');
    navigate('/');
    setMenuOpen(false);  // Close the menu after logging out
  };

  const goToMyPlaylist = () => {
    navigate('/myplaylist');
    setMenuOpen(false);  // Close the menu after navigating
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);  // Close the menu after navigating
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><h1>COLD STAR <span className="reacticon"><GiFallingStar /></span></h1></Link>
      </div>
      <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        {token ? (
          <>
            <li>
              <button className="nav-button" onClick={() => handleNavigation('/home')}>Home</button>
            </li>
            <li>
              <button className="nav-button" onClick={() => handleNavigation('/publicplaylist')}>Public Playlist</button>
            </li>
            <li>
              <button className="nav-button" onClick={goToMyPlaylist}>My Playlist</button>
            </li>
            <li>
              <button className="nav-button" onClick={logouthandler}>LogOut</button>
            </li>
          </>
        ) : (
          <li>
            <button className="nav-button" onClick={() => handleNavigation('/login')}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
