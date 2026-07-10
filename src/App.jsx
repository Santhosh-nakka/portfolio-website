import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Certifications from './pages/Certifications';
import OceanBackground from './components/OceanBackground';

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="page">
        <OceanBackground />
        <span className="tags top-tags">&lt;body&gt;</span>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
        </Routes>
        
        <span className="tags bottom-tags">
          &lt;/body&gt;
          <br />
          <span className="bottom-tag-html">&lt;/html&gt;</span>
        </span>
      </div>
    </Router>
  );
}

export default App;
