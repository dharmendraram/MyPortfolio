import React from 'react'
import { useTheme } from '../context/ThemeContext'

const Footer = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`border-t-1 ${
      isDark ? 'border-white/40' : 'border-gray-900/40'
    }`}>
        <footer className={`py-4 px-6 text-center text-sm ${
          isDark ? 'text-white/50' : 'text-gray-600'
        }`}>
        &copy; {new Date().getFullYear()} Dharmendra Kumar Ram. All rights reserved.
        </footer>
    </div>
  )
}

export default Footer
