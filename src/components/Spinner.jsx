import React from "react";
import { useTheme } from "./ThemeContext";

export default function Spinner() {
  const { theme } = useTheme();

  // Determine spinner color based on theme
  const spinnerColor = theme === 'light' ? 'border-black' : 'border-white';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className={`animate-spin rounded-full h-32 w-32 border-t-8 ${spinnerColor} border-opacity-75`}
      ></div>
    </div>
  );
}
