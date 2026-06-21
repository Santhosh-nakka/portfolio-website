import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="container">
      <div className="home-content glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem' }}>
        <img 
          src="/assets/profile_pic.jpeg" 
          alt="Santhosh Nakka" 
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-color)', marginBottom: '1.5rem' }} 
          onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santhosh+Nakka&background=random&size=150' }}
        />
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Santhosh Nakka
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: '500' }}>
          Full Stack & AI/ML Developer
        </h2>
        
        <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
          A passionate software engineer specializing in building dynamic, full-stack web applications and applying modern Machine Learning techniques to solve real-world problems.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          <a href="https://github.com/Santhosh-nakka" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <FaGithub size={20} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/santhosh-nakka6/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59,130,246,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', color: '#60a5fa' }}>
            <FaLinkedin size={20} /> LinkedIn
          </a>
          <a href="mailto:238r1a05h1@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <FaEnvelope size={20} /> Email
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <FaMapMarkerAlt size={18} /> Hyderabad, India
        </div>
      </div>
    </div>
  );
};

export default Home;
