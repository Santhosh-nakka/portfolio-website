import React, { useState, useEffect } from 'react';
import AnimatedLetters from '../components/AnimatedLetters';
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container contact-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5%' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1100px', gap: '50px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Side: Contact Info */}
        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontSize: '53px', fontFamily: 'Coolvetica', color: '#08fdd8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ width: '5px', height: '40px', background: '#08fdd8', display: 'inline-block' }}></span>
            <AnimatedLetters letterClass={letterClass} strArray={['G', 'e', 't', ' ', 'I', 'n', ' ', 'T', 'o', 'u', 'c', 'h']} idx={15} />
          </h1>
          
          <h2 style={{ fontSize: '32px', color: '#fff', fontFamily: 'Coolvetica, sans-serif', marginBottom: '20px' }}>Let's Connect</h2>
          <p style={{ color: '#8d8d8d', fontSize: '15px', marginBottom: '40px', lineHeight: '1.6' }}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="mailto:238r1a05h1@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(8, 253, 216, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#08fdd8' }}>
                <FaEnvelope size={18} />
              </div>
              <span style={{ color: '#fff', fontSize: '15px' }}>238r1a05h1@gmail.com</span>
            </a>
            
            <a href="https://github.com/Santhosh-nakka" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(8, 253, 216, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#08fdd8' }}>
                <FaGithub size={18} />
              </div>
              <span style={{ color: '#fff', fontSize: '15px' }}>github.com/Santhosh-nakka</span>
            </a>
            
            <a href="https://www.linkedin.com/in/santhosh-nakka6/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(8, 253, 216, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#08fdd8' }}>
                <FaLinkedin size={18} />
              </div>
              <span style={{ color: '#fff', fontSize: '15px' }}>linkedin.com/in/santhosh-nakka6</span>
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: '1 1 400px', background: '#111', padding: '40px', borderRadius: '10px', border: '1px solid #333' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! Form submission is not hooked to a backend yet."); }}>
            <div>
              <label style={{ display: 'block', color: '#8d8d8d', marginBottom: '8px', fontSize: '14px' }}>Name</label>
              <input type="text" placeholder="Nakka Santhosh" required style={{ width: '100%', padding: '12px 15px', background: '#181818', border: '1px solid #333', borderRadius: '5px', color: '#fff', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#08fdd8'} onBlur={(e) => e.target.style.borderColor = '#333'} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8d8d8d', marginBottom: '8px', fontSize: '14px' }}>Email</label>
              <input type="email" placeholder="238r1a05h1@gmail.com" required style={{ width: '100%', padding: '12px 15px', background: '#181818', border: '1px solid #333', borderRadius: '5px', color: '#fff', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#08fdd8'} onBlur={(e) => e.target.style.borderColor = '#333'} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8d8d8d', marginBottom: '8px', fontSize: '14px' }}>Message</label>
              <textarea placeholder="Hello Santhosh..." rows="5" required style={{ width: '100%', padding: '12px 15px', background: '#181818', border: '1px solid #333', borderRadius: '5px', color: '#fff', fontSize: '15px', outline: 'none', resize: 'vertical', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#08fdd8'} onBlur={(e) => e.target.style.borderColor = '#333'}></textarea>
            </div>
            <button type="submit" style={{ width: '100%', padding: '15px', background: '#08fdd8', color: '#111', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s', marginTop: '10px' }} onMouseEnter={(e) => e.target.style.background = '#05d6b6'} onMouseLeave={(e) => e.target.style.background = '#08fdd8'}>
              Send Message <FaPaperPlane />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Contact;
