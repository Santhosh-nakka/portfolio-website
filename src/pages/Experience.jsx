import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      role: 'Full Stack Development Intern',
      company: 'CodeAlpha',
      date: 'May 17, 2026 – June 13, 2026',
      location: 'Remote',
      points: [
        'Developed and deployed 2 responsive web applications using React, Node.js, and REST APIs with full cross-device compatibility.',
        'Reduced frontend load time by 30% through component-level optimization, code splitting, and lazy loading in React.',
        'Built Django REST API endpoints with structured input validation and error handling, eliminating runtime errors in staging.'
      ]
    },
    {
      role: 'Virtual Internship - Generative AI',
      company: 'L4G & Google for Developers',
      date: 'May 2026 – July 2026',
      location: 'Remote',
      points: [
        'Completed a comprehensive 10-week virtual internship program focused on Generative AI technologies and applications.',
        'Achieved 22 Skill Badges supported by Google for Developers, demonstrating proficiency in cutting-edge AI tools.',
        'Gained hands-on experience in building and deploying LLM-based solutions and advanced prompt engineering.'
      ]
    },
    {
      role: 'Virtual Internship - Associate Cloud Engineering',
      company: 'L4G & Google for Developers',
      date: 'May 2026 – July 2026',
      location: 'Remote',
      points: [
        'Completed a 10-week intensive virtual internship focused on cloud architecture and deployment on Google Cloud Platform.',
        'Earned 10 Skill Badges supported by Google for Developers, validating core competencies in cloud engineering.',
        'Applied cloud computing best practices to manage infrastructure, deploy scalable applications, and optimize cloud resources.'
      ]
    },
    {
      role: 'AI & Machine Learning Intern',
      company: 'Inikola × CraftingBrain',
      date: 'May 2, 2026 – May 9, 2026',
      location: 'Remote',
      points: [
        'Recognized as a Top Performer among cohort members, receiving a Certificate of Excellence for outstanding real-time AI project work.',
        'Executed end-to-end dataset cleaning and preprocessing, leveraging Tableau to create impactful data visualizations and extract actionable insights.',
        'Applied foundational Machine Learning concepts to develop practical AI solutions, actively collaborating with mentors and cross-functional teammates.'
      ]
    }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
        {experiences.map((exp, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '2rem', background: 'var(--accent-color)', padding: '0.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaBriefcase size={24} color="#fff" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{exp.role}</h3>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)' }}>{exp.company} <span style={{ color: 'var(--text-muted)' }}>| {exp.location}</span></h4>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
                {exp.date}
              </span>
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              {exp.points.map((point, i) => (
                <li key={i} style={{ marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-muted)' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }}></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
