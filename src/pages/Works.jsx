
import SPK_2425 from '../assets/Works/Sertifikat_Asisten_SPK_2024_2025.jpg';
import SPK_2 from '../assets/Works/statis_2.jpeg'

import Renang_2324 from '../assets/Works/Sertifikat_Asisten_Renang_2023_2024.png'
import Renang_2425 from '../assets/Works/Sertifikat_Asisten_Renang_2024_2025.jpg'

import Ekola_2324 from '../assets/Works/Sertifikat_Asisten_EKOLA_2023_2024.png'
import Ekola_2425 from '../assets/Works/Sertifikat_Asisten_EKOLA_2024_2025.jpg'
import Ekola_3 from '../assets/Works/EKOLA_3.jpeg'
import Ekola_4 from '../assets/Works/EKOLA_4.jpeg'


import PKL_1 from '../assets/Works/PKL_1.jpeg'
import PKL_2 from '../assets/Works/PKL_2.jpeg'
import PKL_3 from '../assets/Works/PKL_3.jpeg'

import dinamika_1 from '../assets/Works/dinamika_1.jpeg'
import dinamika_2 from '../assets/Works/dinamika_2.jpeg'
import dinamika_3 from '../assets/Works/dinamika_3.jpeg'

import ABEL_1 from '../assets/Works/ABEL_1.jpeg'
import ABEL_2 from '../assets/Works/ABEL_2.jpeg'
import ABEL_3 from '../assets/Works/ABEL_3.jpeg'
import ABEL_4 from '../assets/Works/ABEL_4.jpeg'

import KKN_1 from '../assets/Works/KKN_1.jpeg'
import KKN_2 from '../assets/Works/KKN_2.jpeg'
import KKN_3 from '../assets/Works/KKN_3.jpeg'
import KKN_4 from '../assets/Works/KKN_4.jpeg'

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import '../styles/works.css';

const workLog = [
  {
    id: "LOG_01",
    title: "Oil Spill Dispersion Modeling",
    category: "INDUSTRIAL // RESEARCH",
    org: "Pertamina Patra Niaga",
    desc: "Simulating oil spill trajectories at Integrated Terminal Plumpang using MIKE 21.",
    tags: ["#MIKE21", "#MODELING", "#PERTAMINA"],
    span: "standard",
    images: [PKL_1,PKL_2, PKL_3] // Add multiple image paths here: ["img1.jpg", "img2.jpg"]
  },
  {
    id: "LOG_02",
    title: "Coordinator of Marine Ecosystem Dynamics Research Asisstant",
    category: "COORDINATOR // ACADEMIC",
    org: "University of Brawijaya",
    desc: "Assisting lecturers in marine dynamics, primary productivity, and ecosystem stressors.",
    tags: ["#ECOLOGY", "#TEACHING", "#FIELD_SAMPLING"],
    span: "standard",
    images: [dinamika_1, dinamika_2, dinamika_3]
  },
  {
    id: "LOG_03",
    title: "Marine Research Statistics Research Assistant",
    category: "ASSISTANT // DATA",
    org: "University of Brawijaya",
    desc: "Performing statistical analysis using IBM SPSS, including ANOVA and regression models.",
    tags: ["#SPSS", "#DATA_VIS", "#ANOVA"],
    span: "standard",
    images: [SPK_2425, SPK_2]
  },
  {
    id: "LOG_04",
    title: "Tropical Marine Ecology Research Assistant",
    category: "RESEARCH // ASSISTANT",
    org: "University of Brawijaya",
    desc: "Monitoring coral reefs, mangroves, and seagrass health.",
    tags: ["#MONITORING", "#CORAL", "#MANGROVE"],
    span: "wide",
    // These 4 items will now scroll side-to-side
    images: [Ekola_2324, Ekola_2425, Ekola_3, Ekola_4]
  },
  {
    id: "LOG_05",
    title: "Swimming Performance Coach",
    category: "TRAINING // K3",
    org: "University Instructor",
    desc: "Instructing over 300 students in fundamental techniques and water safety.",
    tags: ["#COACHING", "#WATER_SAFETY", "#TRAINING"],
    span: "standard",
    images: [Renang_2324, Renang_2425]
  },
  {
    id: "LOG_06",
    title: "Learning Center Staff",
    category: "STEM // TEACHING",
    org: "Ayo Belajar",
    desc: "Tutoring secondary and high school students in Physics, Maths, Chemistry, and Biology.",
    tags: ["#STEM", "#PHYSICS", "#TUTORING"],
    span: "wide",
    images: [ABEL_1,ABEL_2,ABEL_3,ABEL_4]
  },
  {
    id: "LOG_07",
    title: "COMMUNITY SERVICE PROGRAM (KKN)",
    category: "COMMUNITY // SERVICE",
    org: "University of Brawijaya | Kemloko Village",
    desc: "Participated in a community-based development program through Kuliah Kerja Nyata (KKN), focusing on local empowerment, environmental awareness, and data-driven village planning.",
    tags: ["#COMMUNITY", "#EMPOWERMENT", "#SERVICES"],
    span: "standard",
    images: [KKN_1,KKN_2,KKN_3,KKN_4]
  }
];

function WorkCard({ log }) {
  const scrollRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const scroll = (direction) => {

    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const isVideo = (path) => path.toLowerCase().endsWith('.mp4');

  return (
    <motion.div
      className={`works-card ${log.span}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="card-top">
        <span className="log-id">{log.id}</span>
        <span className="log-cat">{log.category}</span>
      </div>     

      <div className="card-content">
        <div className="card-text">
          <h2>{log.title}</h2>
          <span className="org-label">@ {log.org}</span>
          <p>{log.desc}</p>
          <div className="card-tags">
            {log.tags.map(tag => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div
          className="card-visual-multi"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Side-to-Side Navigation Buttons */}
          {log.images.length > 1 && showControls && (
            <>
              <button className="nav-btn-scroll left" onClick={() => scroll('left')}>‹</button>
              <button className="nav-btn-scroll right" onClick={() => scroll('right')}>›</button>
            </>
          )}

          <div className="multi-image-container no-scrollbar" ref={scrollRef}>
            {log.images.length > 0 ? (
              log.images.map((media, idx) => (
                isVideo(media) ? (
                  <video
                    key={idx}
                    src={media}
                    className="multi-img"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    key={idx}
                    src={media}
                    alt={`${log.title} preview ${idx}`}
                    className="multi-img"
                  />
                )
              ))
            ) : (
              <div className="visual-placeholder">
                <span className="visual-tag">[ ATTACH_MULTIPLE_IMAGES ]</span>
              </div>
            )}
          </div>
          <div className="hover-light-scan" />
          <div className="frame-line" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Works() {
  return (
    <div className="works-page no-scrollbar">
      <div className="works-container">
        <header className="works-header">
          <span className="system-tag">PRJ_ARCHIVE // HARIST_DP</span>
          <h1 className="glitch-title">THE_WORKS</h1>
          <div className="header-actions">
            <a
              href="https://linkedin.com/in/haristdprasetya"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link-btn"
            >
              CONNECT_VIA_LINKEDIN ↗
            </a>
          </div>
        </header>
        <div className="works-bento-grid">
          {workLog.map((log) => (
            <motion.div
              key={log.id}
              className={`works-card ${log.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="card-top">
                <span className="log-id">{log.id}</span>
                <span className="log-cat">{log.category}</span>
              </div>

              <div className="card-content">
                <div className="card-text">
                  <h2>{log.title}</h2>
                  <span className="org-label">@ {log.org}</span>
                  <p>{log.desc}</p>
                  <div className="card-tags">
                    {log.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>

                {/* MULTI-IMAGE CAROUSEL AREA */}

                <div className="card-visual-multi">
                  <div className="multi-image-container no-scrollbar">
                      {log.images.length > 0 ? (
                        log.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${log.title} preview ${idx}`}
                            className="multi-img"
                          />
                        ))
                      ) : (
                        <div className="visual-placeholder">
                          <span className="visual-tag">[ ATTACH_MULTIPLE_IMAGES ]</span>
                        </div>
                      )}
                  </div>
                  {/* This line provides the "scanning" light effect you liked */}
                  <div className="hover-light-scan" />
                  <div className="frame-line" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}