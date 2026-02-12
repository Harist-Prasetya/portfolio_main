import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div 
      onClick={toggleTheme}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        marginLeft: '20px', // Spacing from Contact button
        position: 'relative'
      }}
      title="SWITCH_THEME_MODULE"
    >
      {/* Outer Ring */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '1px solid var(--green)',
        opacity: 0.5
      }} />

      {/* Inner Core (Animated) */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          backgroundColor: theme === 'green' ? '#00ff9c' : '#d45bff',
          boxShadow: theme === 'green' 
            ? '0 0 10px #00ff9c' 
            : '0 0 10px #d45bff'
        }}
        transition={{ duration: 0.5 }}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}