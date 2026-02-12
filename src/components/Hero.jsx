import { useState, useEffect } from 'react'; // Tambahkan useEffect
import ServiceCard from './ServiceCard';
import SocialLinks from './SocialLinks';
import '../styles/hero.css';
// import placeholder from '../assets/avatar.png';

export default function Hero() {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const roles = ["Visual Effects Editor", "Front End Web Developer", "Oceanographic Enthusiast"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
  let charIndex = 0;
  const typeInterval = setInterval(() => {
    setCurrentText(roles[roleIndex].substring(0, charIndex));
    charIndex++;
    if (charIndex > roles[roleIndex].length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 2000);
    }
  }, 100);
  return () => clearInterval(typeInterval);
  }, [roleIndex]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const wrap = document.querySelector('.avatar-wrap');
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 1. Logika Pupil (Seluruh Layar)
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      // Jarak maksimal pupil bergerak (20px)
      const distance = Math.min(20, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 15);
      
      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });

      // 2. Logika Tilt Avatar (Seluruh Layar - Halus)
      const rx = ((e.clientY - centerY) / window.innerHeight) * 15;
      const ry = ((e.clientX - centerX) / window.innerWidth) * 15;
      setTilt({ x: -rx, y: ry });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <section className="hero-dashboard"> 
      <div className="sector left-panel">
        <div className="panel-inner">
          <span className="system-tag">PERSON_ID // 099</span>
          <h4 className="greeting">MSG_INIT_NAME:</h4>
          <h1 className="glitch-text" data-text="Harist D Prasetya">Harist Dwi Prasetya</h1>
          
          <div className="role-container">
             <p className="typewriter-text">
               <span className="bracket">[</span> {currentText} <span className="cursor">_</span> <span className="bracket">]</span>
             </p>
          </div>

          <SocialLinks />

          <div className="marine-data-feed">
             <div className="feed-item">
               <label>CURRENT_STATUS</label>
               <span>OPEN TO WORK</span> {/* From internship data */}
             </div>
             <div className="feed-item">
               <label>PROJECT_FOCUS</label>
               <span>VISUAL EFFECTS, WEB DEV, OCEANOGRAPHY</span> {/* From research interests */}
             </div>
          </div>
        </div>
      </div>

      {/* SECTOR 02: The Core Observer (The Eye) */}
      <div className="sector center-focus">
        <div className="avatar-wrap" style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <div className="eye-border" />
          <div className="eye-iris" />
          <div className="eye-pupil-container">
             <div className="eye-pupil-inner" style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }} />
          </div>
        </div>
      </div>

      {/* SECTOR 03: Service Modules */}
      <div className="sector right-panel">
        <div className="module-stack">
          <ServiceCard 
            index={1}
            title="Visual Effects Editor" 
            tag="VFX_PROC" 
            anchor="vfx" 
            desc="Specializing in motion compositing and high-end visual storytelling."
          />
          <ServiceCard 
            index={2}
            title="Front End Developer" 
            tag="JS_CORE" 
            anchor="frontend" 
            desc="Crafting immersive, interactive web experiences with React."
          />
          <ServiceCard 
            index={3}
            title="Oceanographic Enthusiast" 
            tag="ENV_DATA" 
            anchor="oceanography" 
            desc="Expertise in oil spill modeling (MIKE 21)" 
          />
        </div>
      </div>
    </section>
  );
}