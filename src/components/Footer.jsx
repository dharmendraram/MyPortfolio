import React from 'react'

const Footer = () => {
  return (
    <div className='border-t-1 border-white/40'>
        <footer className="py-4 px-6  text-center text-white/50 text-sm">
        &copy; {new Date().getFullYear()} Dharmendra Kumar Ram. All rights reserved.
        </footer>
    </div>
  )
}

export default Footer
