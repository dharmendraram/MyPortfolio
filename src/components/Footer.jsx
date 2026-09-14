import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { LuLock } from 'react-icons/lu'

const Footer = ({ onNavigateToAdmin }) => {
  const { isDark } = useTheme();

  const handleAdminClick = () => {
    if (onNavigateToAdmin) {
      onNavigateToAdmin();
    } else {
      window.location.hash = "#admin";
    }
  };
  
  return (
    <div className={`border-t-1 ${
      isDark ? 'border-white/40' : 'border-gray-900/40'
    }`}>
      <footer className={`py-4 px-6 text-center text-sm flex items-center justify-center gap-2 ${
        isDark ? 'text-white/50' : 'text-gray-600'
      }`}>
        <span>&copy; {new Date().getFullYear()} Dharmendra Kumar Ram. All rights reserved.</span>
        <button
          type="button"
          onClick={handleAdminClick}
          className="opacity-40 hover:opacity-100 hover:text-teal-400 transition-opacity p-1 cursor-pointer rounded"
          title="Admin Login"
          aria-label="Admin Login"
        >
          <LuLock className="text-xs" />
        </button>
      </footer>
    </div>
  )
}

export default Footer

