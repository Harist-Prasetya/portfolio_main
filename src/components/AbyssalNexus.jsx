import { useEffect, useRef } from 'react';
import '../styles/sections.css';

const COLORS = ['#00ff88', '#00ffff', '#ff00ff', '#bd00ff', '#fff01f'];

// Particle Logic
class Particle {
  constructor(w, h) {
    this.reset(w, h);
  }

  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.baseSize = Math.random() * 2 + 1;
    this.size = this.baseSize;
    this.colorHex = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.angle = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.05 + Math.random() * 0.05;
  }

  update(w, h, mouse, mouseInfluenceRadius, pulseRef) {
    // 1. Base Movement
    this.x += this.vx;
    this.y += this.vy;

    // 2. Pulse
    this.angle += this.pulseSpeed;
    this.size = this.baseSize + Math.sin(this.angle) * 1;

    // 3. Wall Bounce
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;

    // 4. Mouse Gentle Wake
    if (mouse.x != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouseInfluenceRadius) {
        const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
        this.vx -= (dx / distance) * force * 0.05;
        this.vy -= (dy / distance) * force * 0.05;
      }
    }

    // 5. SONAR SHOCKWAVE (Triggered by Button)
    if (pulseRef.current.active) {
      const dx = pulseRef.current.x - this.x;
      const dy = pulseRef.current.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const shockwaveRadius = 500; // Large blast radius

      if (distance < shockwaveRadius) {
        const force = (shockwaveRadius - distance) / shockwaveRadius;
        const angle = Math.atan2(dy, dx);
        
        // Massive push force
        this.vx -= Math.cos(angle) * force * 5; 
        this.vy -= Math.sin(angle) * force * 5;
      }
    }

    // Friction
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
    ctx.fillStyle = this.colorHex;
    ctx.fill();
  }
}

export default function AbyssalNexus() {
  const canvasRef = useRef(null);
  
  // SHARED REFERENCE: Allows the button to talk to the canvas loop
  const pulseRef = useRef({ x: 0, y: 0, active: false });

  // Button Click Handler
  const triggerSonar = () => {
    // Set pulse origin to Center of Screen
    pulseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: true
    };

    // Deactivate after 100ms so it doesn't keep pushing forever
    setTimeout(() => {
        pulseRef.current.active = false;
    }, 100);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let animationFrameId;

    const particleCount = window.innerWidth < 768 ? 50 : 100;
    const connectionDistance = 140;
    const mouseInfluenceRadius = 150;
    const mouse = { x: null, y: null };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter'; 

      particles.forEach(particle => {
        // Pass pulseRef to update logic
        particle.update(width, height, mouse, mouseInfluenceRadius, pulseRef);
        particle.draw(ctx);
      });

      // Connections logic (same as before)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - distance / connectionDistance;
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            gradient.addColorStop(0, particles[i].colorHex);
            gradient.addColorStop(1, particles[j].colorHex);

            ctx.strokeStyle = gradient;
            ctx.globalAlpha = opacity * 0.4;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1; 
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    resize(); 
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="section-container majestic-section">
      <canvas ref={canvasRef} className="abyssal-canvas" />
      <div className="majestic-content">
        <h2 className="glitch-text-sm">THE PLEXUS EFFECT</h2>
        <p>Setiap Titik Atau Nodes Terhubung Secara Otomatis Jika Berdekatan.</p>
        
        {/* THE NEW BUTTON */}
        <button className="sonar-btn" onClick={triggerSonar}>
          <span>Click For Effect</span>
        </button>

      </div>
    </section>
  );
}