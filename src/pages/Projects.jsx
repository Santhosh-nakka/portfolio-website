import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import AnimatedLetters from '../components/AnimatedLetters';

const Projects = () => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const projectsList = [
    {
      title: 'Smart Job Portal AI',
      desc: 'Developed an AI-powered job portal utilizing React.js and Flask. Implemented NLP techniques to extract technical skills, calculate ATS scores, and generate personalized feedback to improve candidate readiness.',
      tech: ['React.js', 'Flask', 'Python', 'NLP', 'HTML', 'CSS'],
      github: 'https://github.com/Santhosh-nakka/smart-job-portal-ai',
      live: 'https://smart-job-portal-ai-2.onrender.com'
    },
    {
      title: 'Loan Approval Prediction System',
      desc: 'Trained and deployed a Logistic Regression model on 1,000+ records achieving 87% accuracy. Built a responsive Flask dashboard to deliver real-time loan eligibility predictions.',
      tech: ['Python', 'Flask', 'Machine Learning', 'Logistic Regression'],
      github: 'https://github.com/Santhosh-nakka/Loan-approval-system',
      live: 'https://loan-approval-system-j2tc.onrender.com'
    },
    {
      title: 'NexSite AI',
      desc: 'An AI-powered website builder with modern UI, animations, theme customization, template generation, and export capabilities. Built with React and Framer Motion.',
      tech: ['React.js', 'Vite', 'JavaScript', 'Framer Motion', 'CSS'],
      github: 'https://github.com/Santhosh-nakka/nexsite-ai',
      live: 'https://nexsite-ai-1-74m2.onrender.com/'
    },
    {
      title: 'Weather Dashboard',
      desc: 'Real-time weather application featuring 5-day forecasts, analysis charts, voice search, current location detection, and favorites system using OpenWeather API.',
      tech: ['React', 'JavaScript', 'Vite', 'OpenWeather API'],
      github: 'https://github.com/Santhosh-nakka/weather-dashboard',
      live: 'https://weather-dashboard-eefl.onrender.com'
    },
    {
      title: 'Ecommerce Store',
      desc: 'Scalable e-commerce platform featuring dynamic product listings, secure authentication, and an administrative dashboard for inventory management utilizing Django ORM.',
      tech: ['Python', 'Django', 'SQLite', 'HTML', 'CSS'],
      github: 'https://github.com/Santhosh-nakka/CodeAlpha_Django_Ecommerce_Store',
      live: 'https://codealpha-django-ecommerce-store.onrender.com/'
    }
  ];

  return (
    <div className="container" style={{ padding: '0 5%', paddingBottom: '100px' }}>
      <h1 style={{ fontSize: '53px', fontFamily: 'Coolvetica', color: '#08fdd8', marginBottom: '30px' }}>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['P', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o']}
          idx={15}
        />
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {projectsList.map((project, index) => (
          <div key={index} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', background: '#111', border: '1px solid #333', transition: 'all 0.3s ease' }} 
               onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#08fdd8'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff', fontFamily: 'Coolvetica, sans-serif', letterSpacing: '1px' }}>{project.title}</h3>
            <p style={{ color: '#8d8d8d', marginBottom: '1.5rem', flexGrow: 1, fontSize: '15px' }}>{project.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {project.tech.map((t, i) => (
                <span key={i} style={{ background: 'rgba(8, 253, 216, 0.1)', color: '#08fdd8', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {t}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
              <a href={project.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}
                 onMouseEnter={(e) => e.target.style.color = '#08fdd8'} onMouseLeave={(e) => e.target.style.color = '#fff'}>
                <FaGithub size={16} /> Code
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}
                   onMouseEnter={(e) => e.target.style.color = '#08fdd8'} onMouseLeave={(e) => e.target.style.color = '#fff'}>
                  <FaExternalLinkAlt size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
