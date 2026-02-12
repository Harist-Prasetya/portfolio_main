import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import '../styles/vfxCarousel.css';

const projects = [
  { id: 1, title: "Cinematic Color Grade", type: "VFX_RENDER_01", video: "/videos/video_1.mp4" },
  { id: 2, title: "3D Camera Tracking", type: "VFX_RENDER_02", video: "/videos/video_2.mp4" },
  { id: 3, title: "Motion Blur and Looks", type: "VFX_RENDER_03", video: "/videos/video_3.mp4" },
  { id: 4, title: "Fast Video Rendering", type: "VFX_RENDER_04", video: "/videos/video_4.mp4" },
];

function CarouselCard({ item, isActive, sectionInView, isNext }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Reset and Play logic
    if (isActive && sectionInView) {
      videoRef.current.currentTime = 0; 
      videoRef.current.play().catch(() => {
        // Most browsers require a user gesture (like a click) to play unmuted video
        console.warn("Autoplay with audio blocked. Muting to ensure playback.");
        if (videoRef.current) videoRef.current.muted = true;
        videoRef.current?.play();
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; 
    }
  }, [isActive, sectionInView]);

  return (
    <motion.div
      className={`carousel-card ${isActive ? 'active' : 'secondary'}`}
      // Fixed: Re-adding the missing motion props for the "sliding" feel
      initial={{ opacity: 0, scale: 0.8, x: isNext ? 400 : -400 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        scale: isActive ? 1 : 0.65,
        x: isActive ? 0 : isNext ? 450 : -450, 
        z: isActive ? 0 : -250,
        rotateY: isActive ? 0 : isNext ? -30 : 30
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
    >
      <div className="video-viewport-wrapper">
        <div className="vfx-card-info">
          <div className="vfx-info-top">
            <span className="vfx-tag-label">{item.type}</span>
            <div className={`status-node ${isActive && sectionInView ? 'online' : ''}`} />
          </div>
          <h3 className="vfx-info-title">{item.title}</h3>
        </div>

        {item.video ? (
          <video 
            ref={videoRef}
            src={item.video} 
            loop 
            muted={!isActive} 
            playsInline
            className="vfx-main-video"
          />
        ) : (
          <div className="vfx-signal-lost">
            <span>[ SIGNAL_WAITING ]</span>
          </div>
        )}
        <div className="vfx-gradient-overlay" />
      </div>
    </motion.div>
  );
}

export default function VFXCarousel() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const isSectionVisible = useInView(sectionRef, { amount: 0.3 });

  // Navigation Handlers
  const nextProject = () => setIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="vfx-viewport" ref={sectionRef}>

      {/* 3D STAGE */}
      <div className="vfx-stage">
        <div className="carousel-container">
          <AnimatePresence mode="popLayout">
            {projects.map((item, i) => {
              const isActive = i === index;
              const isPrev = i === (index - 1 + projects.length) % projects.length;
              const isNext = i === (index + 1) % projects.length;

              if (!isActive && !isPrev && !isNext) return null;

              return (
                <CarouselCard
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  sectionInView={isSectionVisible}
                  isNext={isNext}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* UI CONTROLS */}
      <div className="vfx-controls">
        <div className="carousel-nav">
          <button onClick={prevProject} className="nav-circ">←</button>
          <button onClick={nextProject} className="nav-circ">→</button>
        </div>

        <div className="nav-indicators">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}