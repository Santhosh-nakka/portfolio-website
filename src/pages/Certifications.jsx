import React from 'react';
import { FaAward } from 'react-icons/fa';

const Certifications = () => {
  const certifications = [
    {
      title: 'Google Cloud Career Launchpad',
      issuer: 'Generative AI Leader Track',
      img: 'cert-google-cloud.jpg' // Placeholder name
    },
    {
      title: 'Salesforce Certified',
      issuer: 'Agentforce Specialist',
      img: 'cert-salesforce.jpg' // Placeholder name
    },
    {
      title: 'Infosys Springboard',
      issuer: 'Cloud Technologies',
      img: 'cert-infosys.jpg' // Placeholder name
    },
    {
      title: 'Hexart Certifications',
      issuer: 'AI Beginner, AI Foundation, and AI Advanced',
      img: 'cert-hexart.jpg' // Placeholder name
    }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Certifications & Achievements</h2>
      
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaAward color="var(--primary-color)" /> Professional Certifications
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          *Note: Please place your certificate screenshots named <code>cert-google-cloud.png</code>, <code>cert-salesforce.png</code>, <code>cert-infosys.png</code>, and <code>cert-hexart.png</code> inside the <code>public/assets/certificates/</code> folder to display them below.*
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {certifications.map((cert, index) => (
            <div key={index} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--card-border)' }}>
                <img 
                  src={`/assets/certificates/${cert.img}`} 
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
              src="/assets/certificates/internship_cert.jpg" 
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
