import React, { useEffect, useRef, useState } from 'react';
import TagCloud from 'TagCloud';
import AnimatedLetters from '../components/AnimatedLetters';

const Skills = () => {
  const containerRef = useRef(null);
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const texts = [
      'JavaScript', 'Python', 'Java', 'HTML5', 'CSS3', 'React.js', 
      'Django', 'FastAPI', 'Node.js', 'SQLite', 'Scikit-learn',
      'Data Analysis', 'Pandas', 'NumPy', 'SciPy',
      'Git', 'GitHub', 'VS Code', 'Tableau', 'Render', 
      'Google Cloud', 'Generative AI', 'Machine Learning', 
      'Prompt Engineering', 'LLMs', 'NLP', 'Cloud Engineering'
    ];

    const options = {
      radius: window.innerWidth < 1200 ? 150 : 220,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      direction: 135,
      keep: true
    };

    if (container && container.innerHTML === "") {
        TagCloud(container, texts, options);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="container skills-page" style={{ height: '100%', position: 'relative' }}>
      <div className="text-zone">
        <h1 style={{ fontSize: '53px', fontFamily: 'Coolvetica', color: '#08fdd8', marginBottom: '30px' }}>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['S', 'k', 'i', 'l', 'l', 's', ' ', '&', ' ', 'E', 'x', 'p', 'e', 'r', 'i', 'e', 'n', 'c', 'e']}
            idx={15}
          />
        </h1>
        <p style={{ color: '#fff', fontSize: '15px', marginBottom: '20px' }}>
          I specialize in <strong>Full Stack Web Development</strong>, <strong>Artificial Intelligence / Machine Learning</strong>, and <strong>Data Analysis</strong>. I love building scalable backend architectures and dynamic, responsive frontends.
        </p>
        <p style={{ color: '#fff', fontSize: '15px', marginBottom: '20px' }}>
          My recent focus has been on <strong>Generative AI</strong> and <strong>Cloud Engineering (GCP)</strong>, verified by my L4G internships where I earned 32 total Skill Badges supported by Google for Developers.
        </p>
        <p style={{ color: '#fff', fontSize: '15px' }}>
          Visit my <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/santhosh-nakka6/" style={{ color: '#08fdd8' }}>LinkedIn</a> profile for more details or just contact me.
        </p>
      </div>
      
      <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: -1 }}>
        <div ref={containerRef} className="tagcloud"></div>
      </div>
    </div>
  );
};

export default Skills;
