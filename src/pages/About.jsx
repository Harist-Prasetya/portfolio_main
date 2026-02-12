import { useState, useRef, useEffect } from 'react';
import profilepict from '../assets/avatar_2.jpeg'
import { motion, AnimatePresence, useInView } from 'framer-motion';
import '../styles/about.css';

// --- SKILLS DATA ---
const leftSkills = [
  { name: 'MIKE 21', level: '80%', y: -160, x: -300, sub: 'OIL_SPILL_MODELING' },
  { name: 'PAH Analysis', level: '85%', y: 0, x: -340, sub: 'SEDIMENT_FORENSICS' },
  { name: 'ArcGIS', level: '82%', y: 160, x: -300, sub: 'GEOSPATIAL_MAPPING' },
];
const rightSkills = [
  { name: 'After Effects', level: '92%', y: -160, x: 300, sub: 'VFX_COMPOSITING' },
  { name: 'React.js', level: '88%', y: 0, x: 340, sub: 'UI_ARCHITECTURE' },
  { name: 'Color Grading', level: '90%', y: 160, x: 300, sub: 'CINEMATIC_FINISHING' },
];

const protocols = [
  {
    id: "01",
    title: "ANALYTICAL",
    subtitle: "DATA_SYNTHESIS",
    desc: "Kartu Ini Akan Saya Isi Dengan Jurnal Sehari-hari Dengan Update Terbaru Terkait Dunia Akademik dan Penelitian.",
    icon: "🔬",
    // Data dummy untuk box nanti
    details: {
      log: "System Entry: Menunggu input jurnal penelitian...",
      stats: "Status: Active",
      tags: ["#Research", "#Data", "#Science"]
    }
  },
  {
    id: "02",
    title: "VISUAL NARRATIVE",
    subtitle: "CREATIVE_OUTPUT",
    desc: "Card Yang Ini Didedikasikan Untuk Dunia Teknologi Yang Tengah Meroket. Mencakup Computer Vision, Data Science, & VFX.",
    icon: "🎬",
    details: {
      log: "System Entry: Menunggu portofolio render terbaru...",
      stats: "Render Time: N/A",
      tags: ["#VFX", "#Cinema", "#Tech"]
    }
  },
  {
    id: "03",
    title: "ITERATIVE GROWTH",
    subtitle: "SKILL_TREE",
    desc: "Update Terkait Soft Skill dan Hard Skill Yang Diasah dan Dipelajari Setiap Harinya.",
    icon: "🚀",
    details: {
      log: "System Entry: Tracking progress pembelajaran harian...",
      stats: "Level: Grinding",
      tags: ["#Growth", "#Learning", "#Life"]
    }
  }
];

export default function About() {
  const [active, setActive] = useState(false);
  // State untuk menyimpan protokol mana yang sedang dibuka
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  
  const allSkills = [...leftSkills, ...rightSkills];
  
  const bioRef = useRef(null);
  const skillsRef = useRef(null);
  const manifestoRef = useRef(null); 

  const isSkillsInView = useInView(skillsRef, { margin: "-30% 0px -30% 0px" });

  // Fungsi untuk mencegah scroll body saat modal terbuka
  useEffect(() => {
    if (selectedProtocol) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProtocol]);

  return (
    <div className="about-scroll-container no-scrollbar">
      
      {/* ================= SECTION 1: BIOGRAPHY ================= */}
      <section className="about-section bio-section" ref={bioRef}>
        <div className="bio-content">
          <motion.div 
            className="bio-text-panel"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bio-header">
              <span className="section-tag">IDENTITY_LOG // BIOGRAPHY</span>
              <h1 className="glitch-header" data-text="THE ORIGIN">HARIST DWI PRASETYA</h1>
            </div>

            <div className="bio-body">
              <h3 className="bio-subtitle">
                <span className="bracket">[</span> Technology and Oceanography Enthusiast <span className="bracket">]</span>
              </h3>
              
              <p>
                I am a final-year <strong>Marine Science Undergraduate</strong> possessing a rare duality of skills. My academic foundation lies in rigorous data analysis, currently focused on <strong>PAH sediment analysis</strong> and <strong>Oil Spill Dispersion Modeling (MIKE 21)</strong>—skills honed during my time with <strong>Pertamina Patra Niaga</strong>.
              </p>
              <p>
                Parallel to my scientific pursuits, I am a passionate <strong>VFX Editor and Front-End Developer</strong>. I don't just analyze data; I visualize it, crafting immersive digital experiences.
              </p>

              <div className="bio-meta-tags">
                <span>#EDITOR</span>
                <span>#DEVELOPER</span>
                <span>#VFX_ARTIST</span>
              </div>
            </div>

            <motion.div 
              className="scroll-indicator-relative"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>SCROLL FOR SYSTEMS CHECK</span>
              <div className="arrow-down">↓</div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bio-visual-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="cyber-frame">
              <div className="placeholder-image">
                <img className='profile-img' src={profilepict} alt="profile_picture" />
              </div>
              <div className="frame-corner tl"></div>
              <div className="frame-corner tr"></div>
              <div className="frame-corner bl"></div>
              <div className="frame-corner br"></div>
              <div className="scan-line-overlay"></div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ================= SECTION 2: INTERACTIVE SKILLS HUD ================= */}
      <section className="about-section skills-section" ref={skillsRef}>
        <motion.div 
          className="hud-wrapper"
          initial={{ opacity: 0 }}
          animate={isSkillsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
        <svg className="hud-svg">
          {active && allSkills.map((skill, i) => (
            <motion.line
              key={`line-${i}`}
              x1="50%" y1="50%"
              x2={`calc(50% + ${skill.x}px)`}
              y2={`calc(50% + ${skill.y}px)`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              className="hud-line-glow"
            />
          ))}
        </svg>

        <motion.div 
          className={`hud-core ${active ? 'active' : ''}`}
          onClick={() => setActive(!active)}
          whileHover={{ scale: 1.05 }}
        >
          <div className="core-inner-glow" />
          <div className="core-content">
            <span className="core-status">{active ? 'SYSTEM_LIVE' : 'CLICK_TO_INIT'}</span>
            <h2 className="core-title">HARIST_CORE</h2>
          </div>
        </motion.div>

        <AnimatePresence>
          {active && allSkills.map((skill, i) => (
            <motion.div
              key={i}
              className="hud-node-detailed hud-node-responsive"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: skill.x, y: skill.y, opacity: 1, scale: 1 }}
              exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: i * 0.06 }}
            >
              <div className="corner tl" /><div className="corner tr" />
              <div className="corner bl" /><div className="corner br" />
              <div className="node-scanner" /> 

              <div className="node-body">
                <div className="node-header">
                  <span className="node-sub">{skill.sub}</span>
                  <span className="node-index">MOD_0{i+1}</span>
                </div>
                <h3 className="node-title">{skill.name}</h3>
                <div className="node-stats-wrap">
                  <div className="node-progress-bg">
                    <motion.div 
                      className="node-progress-fill" 
                      initial={{ width: 0 }} 
                      animate={{ width: skill.level }} 
                      transition={{ delay: 0.8 + (i * 0.1), duration: 1.5 }}
                    />
                  </div>
                  <span className="node-percentage">{skill.level}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        </motion.div>
      </section>

      {/* ================= SECTION 4 (UPDATED): HYBRID MANIFESTO ================= */}
      <section className="about-section manifesto-section" ref={manifestoRef}>
        <div className="manifesto-container">
          <motion.div 
            className="manifesto-header"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
             <span className="section-tag">SYSTEM_DIRECTIVE // NEURAL_SYNTHESIS</span>
             <h2 className="glitch-header-small">THE HYBRID PROTOCOL</h2>
             <p className="manifesto-sub">Bridging the gap between <strong>Organic Data</strong> and <strong>Digital Construction</strong>.</p>
          </motion.div>

          <div className="manifesto-grid">
            {protocols.map((item, index) => (
              <motion.div 
                key={item.id}
                className="protocol-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProtocol(item)} // KLIK DISINI
                style={{ cursor: 'pointer' }}
                whileHover={{ y: -10, borderColor: '#00ff9c', boxShadow: '0 0 20px rgba(0,255,156,0.2)' }}
              >
                <div className="protocol-icon">{item.icon}</div>
                <div className="protocol-id">DIR_0{item.id}</div>
                <h3 className="protocol-title">{item.title}</h3>
                <span className="protocol-sub">{item.subtitle}</span>
                <p className="protocol-desc">{item.desc}</p>
                
                <div className="protocol-corner tl"></div>
                <div className="protocol-corner br"></div>
                <div className="protocol-scanline"></div>
                
                {/* Visual cue that it's clickable */}
                <div className="click-hint" style={{ marginTop: '20px', fontSize: '10px', color: '#00ff9c', opacity: 0.6 }}>
                  [ CLICK TO EXPAND ]
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODAL / POP-UP SECTION ================= */}
      <AnimatePresence>
        {selectedProtocol && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProtocol(null)} // Klik luar untuk tutup
          >
            <motion.div 
              className="protocol-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Supaya klik modal tidak menutup
            >
              {/* Modal Header */}
              <div className="modal-header">
                <div className="modal-title-group">
                  <span>PROTOCOL_ID: {selectedProtocol.id}</span>
                  <h2>{selectedProtocol.title}</h2>
                </div>
                <button className="btn-close" onClick={() => setSelectedProtocol(null)}>×</button>
              </div>

              {/* Modal Content - BOX BOX YANG AKAN DIISI */}
              <div className="modal-content-grid">
                
                {/* BOX 1: Main Description (Large) */}
                <div className="detail-box box-large">
                  <span className="box-label">MAIN_LOG</span>
                  <p className="placeholder-text">
                    {selectedProtocol.desc}
                    <br/><br/>
                    [SECTION_EXPANDED]:<br/>
                    Ruang ini disiapkan untuk konten detail yang lebih mendalam. Nantinya Aku bakal mengisi ini dengan paragraf panjang, hasil riset, atau metodologi.
                  </p>
                </div>

                {/* BOX 2: Statistics / Info */}
                <div className="detail-box">
                  <span className="box-label">SYS_STATS</span>
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#fff', margin: 0 }}>STATUS:</h4>
                    <span style={{ color: 'var(--green)', fontFamily: 'monospace' }}>ONLINE / RECORDING</span>
                  </div>
                </div>

                {/* BOX 3: Related Tags / Links */}
                <div className="detail-box">
                  <span className="box-label">TAGS</span>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                    {['#DATA', '#ANALYSIS', '#CORE'].map(tag => (
                      <span key={tag} style={{ 
                        border: '1px solid var(--green)', 
                        padding: '4px 8px', 
                        fontSize: '10px', 
                        borderRadius: '4px',
                        color: 'var(--green)' 
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BOX 4: Wide Footer Box */}
                <div className="detail-box box-wide">
                  <span className="box-label">ADDITIONAL_NOTES</span>
                  <span className="placeholder-text">[ AWAITING_MANUAL_INPUT ]</span>
                </div>

              </div>

              {/* Decor */}
              <div className="scan-line-overlay" style={{opacity: 0.1}}></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}