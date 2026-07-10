import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>Santhosh Nakka</Link>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Experience</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Projects</NavLink>
          <NavLink to="/skills" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Skills</NavLink>
          <NavLink to="/certifications" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Certifications</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
