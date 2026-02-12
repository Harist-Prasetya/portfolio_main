import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../styles/navbar.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e, path) => {
    setIsOpen(false); // Close menu on click
    if (location.pathname === path) {
      const servicesContainer = document.querySelector('.services-page');
      if (servicesContainer) {
        servicesContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <h2 className="logo">HDP<span>.</span></h2>

      {/* Hamburger Icon */}
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Nav Links Container */}
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" end onClick={(e) => handleNavClick(e, '/')}>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/works" onClick={(e) => handleNavClick(e, '/works')}>
            <span>Works</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" onClick={(e) => handleNavClick(e, '/services')}>
            <span>Services</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={(e) => handleNavClick(e, '/about')}>
            <span>About</span>
          </NavLink>
        </li>
        
        {/* Mobile-only Contact Btn in Menu */}
        <li className="mobile-contact">
          <a
            href="https://wa.me/081210849955"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn-mobile"
          >
            Contact Me
          </a>
        </li>
      </ul>

      {/* Desktop Contact Button */}
      <a
        href="https://wa.me/081210849955"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-btn desktop-contact"
      >
        <span className="btn-glow" />
        <span className="btn-glass" />
        <span className="btn-text">Contact Me</span>
      </a>
      
    </nav>
  );
}