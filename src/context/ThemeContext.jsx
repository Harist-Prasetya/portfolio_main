import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('green');

  const themes = {
    green: {
      primary: '#00ff9c',
      soft: 'rgba(0, 255, 156, 0.15)',
      rgb: '0, 255, 156' // TAMBAHAN: Untuk penggunaan RGBA di CSS
    },
    purple: {
      primary: '#d45bff', 
      soft: 'rgba(212, 91, 255, 0.15)',
      rgb: '212, 91, 255' // TAMBAHAN
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'green' ? 'purple' : 'green');
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];

    root.style.setProperty('--green', currentTheme.primary);
    root.style.setProperty('--green-soft', currentTheme.soft);
    root.style.setProperty('--green-rgb', currentTheme.rgb); // Set variable baru
    
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);