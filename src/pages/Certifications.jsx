import React from 'react';
import { FaAward } from 'react-icons/fa';

import googleCloudCert from '../assets/certificates/cert-google-cloud.jpg';
import salesforceCert from '../assets/certificates/cert-salesforce.jpg';
import infosysCert from '../assets/certificates/cert-infosys.jpg';
import hexartCert from '../assets/certificates/cert-hexart.jpg';
import internshipCert from '../assets/certificates/internship_cert.jpg';

const Certifications = () => {
  const certifications = [
    {
      title: 'Google Cloud Career Launchpad',
      issuer: 'Generative AI Leader Track',
      img: googleCloudCert
    },
    {
      title: 'Salesforce Certified',
      issuer: 'Agentforce Specialist',
      img: salesforceCert
    },
    {
      title: 'Infosys Springboard',
      issuer: 'Cloud Technologies',
      img: infosysCert
    },
    {
      title: 'Hexart Certifications',
      issuer: 'AI Beginner, AI Foundation, and AI Advanced',
      img: hexartCert
    }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Certifications & Achievements</h2>
      
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaAward color="var(--primary-color)" /> Professional Certifications
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {certifications.map((cert, index) => (
            <div key={index} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--card-border)' }}>
                <img 
                  src={cert.img} 
                  alt={cert.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex'; 
                  }}
                />
                <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
                  <FaAward size={48} opacity={0.5} style={{ marginBottom: '1rem' }} />
                  <span>Image not found</span>
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{cert.title}</h4>
                <p style={{ color: 'var(--primary-color)' }}>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaAward color="var(--accent-color)" /> Internship Certificates
        </h3>
        <div className="glass-panel" style={{ overflow: 'hidden', display: 'inline-flex', flexDirection: 'column', maxWidth: '600px' }}>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid var(--card-border)' }}>
            <img 
              src={internshipCert} 
              alt="CraftBrain x Inikola Internship Certificate" 
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => { 
                e.target.style.display = 'none'; 
                e.target.nextSibling.style.display = 'flex'; 
              }}
            />
            <div style={{ display: 'none', padding: '4rem', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
              <FaAward size={48} opacity={0.5} style={{ marginBottom: '1rem' }} />
              <span>Image not found</span>
            </div>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>AI & Machine Learning Internship</h4>
            <p style={{ color: 'var(--accent-color)' }}>CraftBrain × Inikola</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
