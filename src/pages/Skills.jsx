import React, { useEffect, useState } from 'react';
import { FaCode, FaServer, FaDatabase, FaBrain, FaTools, FaGraduationCap } from 'react-icons/fa';
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud';

const slugs = [
  'javascript', 'python', 'java', 'html5', 'css3', 'react', 
  'django', 'fastapi', 'nodedotjs', 'sqlite', 'scikitlearn',
  'git', 'github', 'visualstudiocode', 'tableau', 'render', 
  'googlecloud', 'openai'
];

const useIcons = (slugs) => {
  const [icons, setIcons] = useState();
  useEffect(() => {
    fetchSimpleIcons({ slugs }).then(setIcons);
  }, [slugs]);

  if (icons) {
    return Object.values(icons.simpleIcons).map((icon) => renderSimpleIcon({
      icon,
      size: 50,
      aProps: {
        href: undefined,
        target: undefined,
        rel: undefined,
        onClick: (e) => e.preventDefault(),
      },
    }));
  }
  return <div>Loading...</div>;
};

const Skills = () => {
  const globeIcons = useIcons(slugs);

  const skillCategories = [
    {
      title: 'Languages',
      icon: <FaCode size={24} />,
      skills: ['Java', 'Python', 'JavaScript']
    },
    {
      title: 'Frontend',
      icon: <FaCode size={24} />,
      skills: ['HTML', 'CSS', 'React.js']
    },
    {
      title: 'Backend',
      icon: <FaServer size={24} />,
      skills: ['Django', 'FastAPI', 'Node.js']
    },
    {
      title: 'Database',
      icon: <FaDatabase size={24} />,
      skills: ['SQL', 'SQLite']
    },
    {
      title: 'AI / ML',
      icon: <FaBrain size={24} />,
      skills: ['Generative AI', 'LLMs', 'Prompt Engineering', 'Scikit-learn', 'Machine Learning', 'NLP']
    },
    {
      title: 'Tools & Cloud',
      icon: <FaTools size={24} />,
      skills: ['Google Cloud Platform', 'Cloud Computing', 'Git', 'GitHub', 'VS Code', 'Tableau', 'Render']
    }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Technical Skills</h2>
      
      {/* Globe Container */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px', marginBottom: '4rem', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <Cloud
            options={{
              clickToFront: 500,
              depth: 1,
              imageScale: 2,
              initial: [0.1, -0.1],
              outlineColour: '#0000',
              reverse: true,
              tooltip: 'native',
              tooltipDelay: 0,
              wheelZoom: false,
            }}
          >
            {globeIcons}
          </Cloud>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {skillCategories.map((category, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
              <div style={{ background: 'rgba(59,130,246,0.2)', padding: '0.8rem', borderRadius: '12px', color: 'var(--primary-color)' }}>
                {category.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>{category.title}</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {category.skills.map((skill, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '0.4rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.95rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Education</h2>
      <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(139,92,246,0.2)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-color)' }}>
            <FaGraduationCap size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>B.Tech in Computer Science and Engineering</h3>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>CMR Engineering College</h4>
            <p style={{ color: 'var(--text-muted)' }}>2023 – Present | <span style={{ color: '#a78bfa', fontWeight: '500' }}>CGPA: 8.5+ / 10.0</span></p>
          </div>
        </div>
        
        <div style={{ height: '1px', background: 'var(--card-border)', width: '100%' }}></div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(139,92,246,0.2)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-color)' }}>
            <FaGraduationCap size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>Central Board of Secondary Education (CBSE)</h3>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Lakshya School</h4>
            <p style={{ color: 'var(--text-muted)' }}>2021 – 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
