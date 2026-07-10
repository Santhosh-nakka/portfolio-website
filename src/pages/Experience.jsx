import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      role: 'Full Stack Development Intern',
      company: 'CodeAlpha',
      date: 'May 2026 – June 2026',
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
      date: 'May 2026 – May 2026',
      location: 'Remote',
      points: [
        'Recognized as a Top Performer among cohort members, receiving a Certificate of Excellence for outstanding real-time AI project work.',
        'Executed end-to-end dataset cleaning and preprocessing, leveraging Tableau to create impactful data visualizations and extract actionable insights.',
        'Applied foundational Machine Learning concepts to develop practical AI solutions, actively collaborating with mentors and cross-functional teammates.'
      ]
    }
  ];

  return (
    <div className="container experience-page" style={{ padding: '50px 20px', maxWidth: '1000px' }}>
      <h2 className="section-title">
        <span>Experience & </span>
        <span style={{ color: '#fff' }}>Internships</span>
      </h2>
      
      <VerticalTimeline>
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: '#111111', color: '#fff', borderTop: '3px solid #08fdd8', boxShadow: '0 3px 15px rgba(0,0,0,0.5)' }}
            contentArrowStyle={{ borderRight: '7px solid  #111111' }}
            date={exp.date}
            dateClassName="timeline-date-custom"
            iconStyle={{ background: '#08fdd8', color: '#111' }}
            icon={<FaBriefcase />}
          >
            <h3 className="vertical-timeline-element-title" style={{ color: '#08fdd8', fontSize: '22px' }}>{exp.role}</h3>
            <h4 className="vertical-timeline-element-subtitle" style={{ fontSize: '16px', marginTop: '5px' }}>{exp.company} <span style={{ opacity: 0.6 }}>| {exp.location}</span></h4>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginTop: '15px', color: '#a1a1aa' }}>
              {exp.points.map((point, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>{point}</li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;
