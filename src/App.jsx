import React from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import OceanBackground from './components/OceanBackground';

function App() {
  return (
    <div>
      <Sidebar />
      <div className="page" style={{ overflowY: 'auto', height: '100vh', scrollBehavior: 'smooth', position: 'relative', overflowX: 'hidden' }}>
        <OceanBackground />
        <span className="tags top-tags" style={{ position: 'absolute' }}>&lt;body&gt;</span>
        
        <section id="home" style={{ minHeight: '100vh', position: 'relative' }}>
          <Home />
        </section>
        <section id="experience" style={{ minHeight: '100vh', position: 'relative' }}>
          <Experience />
        </section>
        <section id="projects" style={{ minHeight: '100vh', position: 'relative' }}>
          <Projects />
        </section>
        <section id="skills" style={{ minHeight: '100vh', position: 'relative' }}>
          <Skills />
        </section>
        <section id="certifications" style={{ minHeight: '100vh', position: 'relative' }}>
          <Certifications />
        </section>
        <section id="contact" style={{ minHeight: '100vh', position: 'relative' }}>
          <Contact />
        </section>
        
        <span className="tags bottom-tags" style={{ position: 'relative', display: 'block', paddingBottom: '20px', left: '120px' }}>
          &lt;/body&gt;
          <br />
          <span className="bottom-tag-html" style={{ marginLeft: '-20px' }}>&lt;/html&gt;</span>
        </span>
      </div>
    </div>
  );
}

export default App;
