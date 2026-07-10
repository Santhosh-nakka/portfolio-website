import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaEnvelope, FaSuitcase, FaCog, FaAward, FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="nav-bar">
      <div className="logo-section">
        <h1 className="sidebar-logo">S</h1>
        <p className="sidebar-subtitle">Santhosh</p>
      </div>

      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink 
          exact="true" 
          activeclassname="active" 
          to="/"
          onClick={() => setShowNav(false)}>
          <FaHome color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active" 
          className="about-link" 
          to="/experience"
          onClick={() => setShowNav(false)}>
          <FaUser color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active" 
          className="portfolio-link" 
          to="/projects"
          onClick={() => setShowNav(false)}>
          <FaSuitcase color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active" 
          className="skills-link" 
          to="/skills"
          onClick={() => setShowNav(false)}>
          <FaCog color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active" 
          className="cert-link" 
          to="/certifications"
          onClick={() => setShowNav(false)}>
          <FaAward color="#4d4d4e" />
        </NavLink>
        <FaTimes 
          onClick={() => setShowNav(false)} 
          color="#ffd700" 
          size={30} 
          className="close-icon" />
      </nav>
      
      <ul>
        <li>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin color="#4d4d4e" />
          </a>
        </li>
        <li>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <FaGithub color="#4d4d4e" />
          </a>
        </li>
      </ul>
      
      <FaBars 
        onClick={() => setShowNav(true)} 
        color="#08fdd8" 
        size={30} 
        className="hamburger-icon" />
    </div>
  );
};

export default Sidebar;
