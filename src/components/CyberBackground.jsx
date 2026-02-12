import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/cyberBackground.css';

// --- PERBAIKAN: CLASS DIPINDAHKAN KE SINI (DI LUAR FUNGSI UTAMA) ---
class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2;
  }

  update(width, height) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw(ctx, color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

export default function CyberBackground() {
  const canvasRef = useRef(null);
  const { colors } = useTheme();
  
  // Ref untuk menyimpan warna agar animasi loop bisa membacanya real-time
  const colorRef = useRef(colors.primary);

  useEffect(() => {
    colorRef.current = colors.primary;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const connectionDistance = 150;

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentColor = colorRef.current; 
      
      particles.forEach((particle, index) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx, currentColor);

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.globalAlpha = 1 - distance / connectionDistance;
            ctx.strokeStyle = currentColor; 
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="cyber-bg-container">
      <div className="cyber-grid-overlay"></div>
      <canvas ref={canvasRef} className="cyber-canvas"></canvas>
    </div>
  );
}