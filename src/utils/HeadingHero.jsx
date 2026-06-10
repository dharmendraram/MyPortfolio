import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const HeadingHero = () => {
    const { isDark } = useTheme();
    const roles=[
        { title: "Full-Stack Developer" },
        { title: "React.js" },
        { title: "Django" },  
        { title: "Java Grails" },
        
    ]
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currText, setCurrText] = useState('');
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = ()=>{
            const current = roles[currentRoleIndex].title;
            if(!isDeleting){
                if(currText === current){
                    setTimeout(()=>setIsDeleting(true), 1000);
                    setTypingSpeed(500);
                } else {
                    setCurrText(current.substring(0, currText.length + 1));
                    setTypingSpeed(150);
                }
            } else{
                if(currText === ''){
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                    setTypingSpeed(500);
                } else {
                    setCurrText(current.substring(0, currText.length - 1));
                    setTypingSpeed(50);
                }
                
            }
        }
        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currText, isDeleting, roles, currentRoleIndex, typingSpeed]);

  return (
    <div className='text-center md:text-left'>
        <h1 className={`text-xl md:text-3xl mb-6 mt-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
            And I'm a<span className='text-outline pb-1'> {currText}</span>
            <span className=' inline-block h-7 md:h-7 w-0.5 bg-cyan-400 ml-1'>
            </span>
        </h1>
      
    </div>
  )
}

export default HeadingHero
