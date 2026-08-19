import React, { useState } from 'react';
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
        <a href="#home" onClick={() => setShowNav(false)}>
          <FaHome color="#4d4d4e" />
        </a>
        <a className="about-link" href="#experience" onClick={() => setShowNav(false)}>
          <FaUser color="#4d4d4e" />
        </a>
        <a className="portfolio-link" href="#projects" onClick={() => setShowNav(false)}>
          <FaSuitcase color="#4d4d4e" />
        </a>
        <a className="skills-link" href="#skills" onClick={() => setShowNav(false)}>
          <FaCog color="#4d4d4e" />
        </a>
        <a className="cert-link" href="#certifications" onClick={() => setShowNav(false)}>
          <FaAward color="#4d4d4e" />
        </a>
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
