import githubIcon from '../assets/github.png';
import linkedinIcon from '../assets/linkedin.png';
import instagramIcon from '../assets/instagram.png';
import gmailIcon from '../assets/gmail.png';
import vercelIcon from '../assets/vercel.png';

import '../styles/socialLinks.css';

export default function SocialLinks() {
  const socials = [
    { name: 'Gmail', icon: gmailIcon, link: 'mailto:haristdwiprasetya@gmail.com' },
    { name: 'GitHub', icon: githubIcon, link: 'https://github.com/Harist-Prasetya' },
    { name: 'LinkedIn', icon: linkedinIcon, link: 'https://linkedin.com/in/haristdprasetya' },
    { name: 'Instagram', icon: instagramIcon, link: 'https://instagram.com/harisdwi_p' },
    { name: 'Vercel', icon: vercelIcon, link: 'https://vercel.com/harist-dwi-prasetyas-projects' }
  ];

  return (
    <div className="social-container">
      {socials.map((social, index) => (
        <a 
          key={index} 
          href={social.link} 
          className="social-node" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {/* FIX: Use an <img> tag here */}
          <img 
            src={social.icon} 
            alt={social.name} 
            className="node-icon-img" 
          />
          <div className="node-glow" />
        </a>
      ))}
    </div>
  );
}