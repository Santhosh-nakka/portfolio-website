import React, { useState, useEffect } from 'react';
import AnimatedLetters from '../components/AnimatedLetters';
import { FaAward } from 'react-icons/fa';

import googleCloudCert from '../assets/certificates/cert-google-cloud.jpg';
import salesforceCert from '../assets/certificates/cert-salesforce.jpg';
import infosysCert from '../assets/certificates/cert-infosys.jpg';
import hexartCert from '../assets/certificates/cert-hexart.jpg';
import internshipCert from '../assets/certificates/internship_cert.jpg';
import codeAlphaCert from '../assets/certificates/codealpha_cert.jpg';
import l4gGenAiCert from '../assets/certificates/l4g_genai.jpg';
import l4gAceCert from '../assets/certificates/l4g_ace.jpg';

const Certifications = () => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const certifications = [
    { title: 'Google Cloud Career Launchpad', issuer: 'Generative AI Leader Track', img: googleCloudCert },
    { title: 'Salesforce Certified', issuer: 'Agentforce Specialist', img: salesforceCert },
    { title: 'Infosys Springboard', issuer: 'Cloud Technologies', img: infosysCert },
    { title: 'Hexart Certifications', issuer: 'AI Beginner, Foundation, Advanced', img: hexartCert }
  ];

  const internships = [
    { title: 'Full Stack Development', issuer: 'CodeAlpha', img: codeAlphaCert },
    { title: 'AI & Machine Learning', issuer: 'CraftBrain × Inikola', img: internshipCert },
    { title: 'Generative AI Virtual Internship', issuer: 'L4G & Google for Developers', img: l4gGenAiCert },
    { title: 'Associate Cloud Engineering', issuer: 'L4G & Google for Developers', img: l4gAceCert }
  ];

  return (
    <div className="container" style={{ padding: '0 5%', paddingBottom: '100px' }}>
      <h1 style={{ fontSize: '53px', fontFamily: 'Coolvetica', color: '#08fdd8', marginBottom: '30px' }}>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['C', 'e', 'r', 't', 'i', 'f', 'i', 'c', 'a', 't', 'i', 'o', 'n', 's']}
          idx={15}
        />
      </h1>
      
      <style>
        {`
          .marquee-container {
            display: flex;
            overflow: hidden;
            width: 100%;
            position: relative;
          }
          .marquee-content {
            display: flex;
            gap: 2rem;
            padding-right: 2rem;
            animation: scroll 25s linear infinite;
            width: max-content;
          }
          .marquee-container:hover .marquee-content {
            animation-play-state: paused;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaAward color="#08fdd8" /> Professional Certifications
        </h3>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...certifications, ...certifications].map((cert, index) => (
              <div key={index} style={{ minWidth: '300px', maxWidth: '300px', flex: '0 0 auto', background: '#111', border: '1px solid #333', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#08fdd8'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ height: '200px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #333' }}>
                  <img src={cert.img} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', color: '#8d8d8d' }}>
                    <FaAward size={48} opacity={0.5} style={{ marginBottom: '1rem' }} />
                    <span>Image not found</span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{cert.title}</h4>
                  <p style={{ color: '#08fdd8', fontSize: '14px' }}>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaAward color="#08fdd8" /> Internship Certificates
        </h3>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...internships, ...internships].map((internship, index) => (
              <div key={index} style={{ minWidth: '350px', maxWidth: '350px', flex: '0 0 auto', background: '#111', border: '1px solid #333', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#08fdd8'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ background: '#000', borderBottom: '1px solid #333', height: '230px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={internship.img} alt={internship.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div style={{ display: 'none', padding: '4rem', flexDirection: 'column', alignItems: 'center', color: '#8d8d8d' }}>
                    <FaAward size={48} opacity={0.5} style={{ marginBottom: '1rem' }} />
                    <span>Image not found</span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{internship.title}</h4>
                  <p style={{ color: '#08fdd8', fontSize: '14px' }}>{internship.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
