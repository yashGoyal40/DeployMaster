// ThemeContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize the theme with the stored value in localStorage or fallback to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Update the theme on change
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access theme context
export const useTheme = () => useContext(ThemeContext);
