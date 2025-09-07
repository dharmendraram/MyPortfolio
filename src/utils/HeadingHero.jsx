import React, { useEffect, useState } from 'react'

const HeadingHero = () => {
    const roles=[
        { title: "Frontend Developer" },
        { title: "Backend Developer" },
        { title: "Full Stack Developer" },  
        { title: "Web Developer" },
        { title: "UI/UX Designer" },
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
        <h1 className='text-3xl md:text-5xl font-bold text-white mb-6'>
            <span className='text-outline pb-1'>{currText}</span>
            <span className=' inline-block h-7 md:h-14 w-0.5 bg-cyan-400 ml-1'>

            </span>
        </h1>
      
    </div>
  )
}

export default HeadingHero
