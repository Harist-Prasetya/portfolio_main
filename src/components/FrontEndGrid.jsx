import { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/frontEndGrid.css';

const projects = [
  { 
    id: 1, 
    title: "Ocean Data Dashboard", 
    category: "REACT // GIS", 
    preview: "/videos/project_3.mp4", link: "https://project-3-nine-pearl.vercel.app/" 
  },
  { 
    id: 2, 
    title: "VFX Portfolio Landing", 
    category: "JS // GSAP", 
    preview: "/videos/project_4.mp4", link: "https://project-4-gamma-ten.vercel.app/" 
  },
  { 
    id: 3, 
    title: "Oil Spill Simulation UI", 
    category: "REDUX // D3", 
    preview: "/videos/project_5.mp4", link: "https://project-5-woad-ten.vercel.app/" 
  },
  { 
    id: 4, 
    title: "E-Commerce System", 
    category: "NEXT.JS // CSS", 
    preview: "/videos/project_6.mp4",  
    link: "https://project-6-lime.vercel.app/" 
  },
  { 
    id: 5, 
    title: "Research Stats App", 
    category: "VITE // RECHARTS", 
    preview: "/videos/project_1.mp4", link: "https://react-vite-deploy-three-zeta.vercel.app/" 
  },
  { 
    id: 6, 
    title: "Cyber-Security Portal", 
    category: "WEBGL // REACT", 
    preview: "/videos/project_2.mp4", 
    link: "https://project-2-sooty-one.vercel.app/" 
  },
];

function ProjectCard({ project, index }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // RESET: Video starts from 00:00
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // UNPLAY: Halts playback immediately
    }
  };

  return (
    <motion.div 
      className="fe-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(project.link, '_blank')}
    >
      <div className="card-image-wrap">
        {project.preview ? (
          <video 
            ref={videoRef}
            src={project.preview}
            loop 
            muted 
            playsInline 
            className="fe-card-video"
          />
        ) : (
          <div className="project-placeholder"> [ PREVIEW_0{project.id} ] </div>
        )}
        <div className="fe-card-overlay" />
      </div>

      <div className="card-details">
        <span className="p-category">{project.category}</span>
        <h3 className="p-title">{project.title}</h3>
        <div className="p-link-btn">ACCESS_SYSTEM →</div>
      </div>
    </motion.div>
  );
}

export default function FrontEndGrid() {
  return (
    <div className="fe-grid-container">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}