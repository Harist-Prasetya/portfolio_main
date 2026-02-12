import { useNavigate } from 'react-router-dom'
import '../styles/serviceCard.css'

export default function ServiceCard({ title, anchor, desc, tag, index }) {
  const navigate = useNavigate()
  const formatNumber = (num) => String(num).padStart(2, '0');

  function handleMouseMove(e) {
    const wrapper = e.currentTarget
    const rect = wrapper.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 6
    const rotateY = ((x - centerX) / centerX) * 6

    wrapper.style.transform = `
      perspective(900px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
    `
  }

  function handleMouseLeave(e) {
    e.currentTarget.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
    `
  }

  return (
    <div
      className="service-card-tilt"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/services#${anchor}`)}
    >
      <div className="service-card">
        <div className="card-header">
          <span className="card-tag">{tag}</span>
          <div className="card-status-dot"></div>
        </div>
        
        <div className="card-body">
          <h3>{title}</h3>
          {desc && <p className="card-desc">{desc}</p>}
        </div>

        <div className="card-footer">
          <span className="footer-label">ACCESS_MODULE_{formatNumber(index)}</span>
          <span className="footer-arrow">→</span>
        </div>
      </div>
    </div>
  );
}
