import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">Santhosh Nakka</Link>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Experience</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Projects</NavLink>
          <NavLink to="/skills" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Skills</NavLink>
          <NavLink to="/certifications" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Certifications</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
