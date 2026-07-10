import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLetters from '../components/AnimatedLetters';
import profilePic from '../assets/profile_pic.jpeg';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const nameArray = ['S', 'a', 'n', 't', 'h', 'o', 's', 'h'];
  const jobArray = ['w', 'e', 'b', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container home-page" style={{ height: '100%', position: 'relative' }}>
      <div className="text-zone">
        <h1 style={{ fontSize: '70px', lineHeight: '65px', color: '#fff', fontWeight: 400, fontFamily: 'Coolvetica, sans-serif' }}>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>'m</span>
          <img src="" alt="" style={{ display: 'none' }} /> 
          <span style={{ marginLeft: '20px' }}>
            <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
          </span>
          <br />
          <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22} />
        </h1>
        
        <h2 style={{ color: '#8d8d8d', marginTop: '20px', fontWeight: '400', fontSize: '15px', fontFamily: 'Open Sans, sans-serif', letterSpacing: '3px' }}>
          FULL STACK DEVELOPER / AI EXPERT
        </h2>
        
        <Link to="/experience" style={{
          color: '#08fdd8',
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '4px',
          fontFamily: 'Open Sans, sans-serif',
          textDecoration: 'none',
          padding: '10px 18px',
          border: '1px solid #08fdd8',
          marginTop: '35px',
          display: 'inline-block',
          transition: 'all 0.3s ease-out'
        }}
        onMouseEnter={(e) => { e.target.style.background = '#08fdd8'; e.target.style.color = '#333'; }}
        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#08fdd8'; }}
        >
          VIEW MY WORK
        </Link>
      </div>
      
      <div style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div id="avatarWrap" className="avatar-wrap">
          <img 
            src={profilePic} 
            alt="Santhosh Nakka" 
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santhosh+Nakka&background=random&size=300' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
