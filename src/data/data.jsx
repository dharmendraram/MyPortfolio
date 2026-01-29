import {
  FaAngular,
  FaBootstrap,
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaSass,
} from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";
import {
  SiC,
  SiCanva,
  SiCplusplus,
  SiFigma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiIntellijidea,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPycharm,
  SiSpring,
  SiTypescript,
  SiVercel,
  SiWebstorm,
} from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { GiMaterialsScience, GiSandsOfTime } from "react-icons/gi";
import { DiJava, DiPython, DiVisualstudio } from "react-icons/di";
import { TbBrandCSharp } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { LuCircleUser, LuContact } from "react-icons/lu";
import { IoBagHandleOutline } from "react-icons/io5";

import nirc from "../assets/nirc.png";
import tu from "../assets/tu.png";
import rakmina from "../assets/portfolio/rakmina.png";
import imgportfolio from "../assets/portfolio/personal.png";
import nircwebsite from "../assets/portfolio/nirc-website.png";
import hms from "../assets/portfolio/hms.png";
import gwp from "../assets/portfolio/gwp.png";
import kic from "../assets/portfolio/kic.png";
import pratishthan from "../assets/portfolio/pratishthan.png";
import brandwave from "../assets/portfolio/brandwave.png";
import aarambha from "../assets/portfolio/aarambha.png";
import startupghar from "../assets/portfolio/startupghar.png";

export const skillsData = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
      { name: "SASS", icon: <FaSass className="text-pink-400" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "React JS", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next JS", icon: <RiNextjsFill className="text-white" /> },
      {
        name: "Tailwind CSS",
        icon: <RiTailwindCssFill className="text-teal-400" />,
      },

      {
        name: "Material UI",
        icon: <GiMaterialsScience className="text-blue-400" />,
      },
      { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", icon: <SiSpring className="text-green-600" /> },
      { name: "Django", icon: <DiPython className="text-yellow-400" /> },
      { name: "Node JS", icon: <FaNodeJs className="text-green-400" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-500" /> },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "C", icon: <SiC className="text-blue-400" /> },
      { name: "PHP", icon: <SiPhp className="text-indigo-500" /> },
      { name: "Java", icon: <DiJava className="text-red-600" /> },
      { name: "Python", icon: <DiPython className="text-yellow-400" /> },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400" />,
      },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: <SiGit className="text-orange-500" /> },
      { name: "GitHub", icon: <SiGithub className="text-white" /> },
      { name: "GitLab", icon: <SiGitlab className="text-orange-500" /> },
      { name: "VS Code", icon: <DiVisualstudio className="text-blue-500" /> },
      {
        name: "IntelliJ IDEA",
        icon: <SiIntellijidea className="text-[#087CFA]" />,
      },
      { name: "WebStorm", icon: <SiWebstorm className="text-[#00CFFF]" /> },
      { name: "PyCharm", icon: <SiPycharm className="text-[#21D789]" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-400" /> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "Netlify", icon: <SiNetlify className="text-teal-400" /> },
      { name: "Figma", icon: <SiFigma className="text-pink-500" /> },
      { name: "Canva", icon: <SiCanva className="text-[#00C4CC]" /> },
    ],
  },
];

export const navItems = [
  { id: "home", icon: <FaHome />, title: "Home" },
  { id: "about", icon: <LuCircleUser />, title: "About" },
  { id: "skills", icon: <GiSandsOfTime />, title: "Skills" },
  { id: "portfolio", icon: <IoBagHandleOutline />, title: "Portfolio" },
  { id: "contact", icon: <LuContact />, title: "Contact" },
];

// Testimonials data
export const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechStart",
    content:
      '"Imam delivered exceptional work on our website redesign. His attention to detail and communication throughout the project was impressive."',
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Michael Chen",
    position: "Product Manager, InnovateCo",
    content:
      '"Working with Imam was a great experience. He transformed our complex requirements into a beautiful, user-friendly interface."',
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "David Wilson",
    position: "Founder, StartupHub",
    content:
      '"Imam\'s technical skills and creative design solutions helped us create an engaging platform that our users love. Highly recommended!"',
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

// Portfolio data
export const portfolioItems = [
  {
    title: "National Incubation and Research Center (NIRC) Website",
    category: "Full Stack Developer",
    company: "Company",
    username: "",
    password: "",
    image: nircwebsite,
    technology: ["HTML", "CSS", "JavaScript", "Python & Django"],
    github: "",
    link: "https://nirc.com.np/",
    description:
      "A leading software development company dedicated to delivering cutting-edge digital solutions.",
  },

  {
    title: "Hospital Management System (HMS)",
    category: "Core Designer & Lead Developer",
    company: "Company",
    username: "demo_user",
    password: "demo",
    image: hms,
    technology: ["HTML", "CSS", "JavaScript", "Django"],
    github: "",
    link: "https://hms.nirc.com.np/login/",
    description:
      "A comprehensive digital platform designed to streamline hospital operations, including patient registration, medical record management, and administrative workflows. Developed by Me & NIRC Team to enhance healthcare service efficiency.",
  },
  {
    title: "Government With People (GWP)",
    category: "Core Front-End Developer",
    company: "Company",
    username: "p.demo",
    password: "@dminP@ssw0rd",
    image: gwp,
    technology: ["HTML", "CSS", "JavaScript", "Java Grails"],
    github: "",
    link: "https://gwp.nirc.com.np/",
    description:
      "A comprehensive digital platform designed for local municipalities to provide citizens with easy access to information, online services, and community updates. The website enhances transparency, efficiency, and engagement between the Palika and its residents. Developed by Me & NIRC Team.",
  },
  {
    title: "प्रदेश अनुसन्धान तथा प्रशिक्षण प्रतिष्ठान",
    category: "Front-End Developer",
    company: "Company",
    username: "",
    password: "",
    image: pratishthan,
    technology: [
      "React.js",
      "TailWind CSS",
      "JavaScript",
      "Django REST framework API",
    ],
    github: "",
    link: "https://training.nirc.com.np/",
    description:
      "An official digital platform developed for the Government of Nepal’s Provincial Research and Training Institute to deliver training programs, research resources, and institutional information. The system improves accessibility, transparency, and digital learning for government officials and trainees. Developed collaboratively with the NIRC team.",
  },
  {
    title: "Rakmina Recruitment & Migration Platform",
    category: "Lead Front-End Developer",
    company: "Company",
    username: "",
    password: "",
    image: rakmina,
    technology: ["Next.js", "TailWind CSS", "Django rest framework API"],
    github: "",
    link: "https://rakmina.lt/",
    description:
      "A professional recruitment and migration portal that connects Nepali talent with global career opportunities, offering end-to-end support from job search to visa processing.",
  },
  {
    title:
      "BrandWave — Digital Agency in Biratnagar | Web, Marketing & Event Services",
    category: "Full Stack Developer",
    company: "Personal",
    username: "",
    password: "",
    image: brandwave,
    technology: ["HTML", "Bootstrap", "JavaScript"],
    github: "",
    link: "https://brandwave.com.np/",
    description:
      "BrandWave is a premier digital agency in Biratnagar, Nepal, offering website development, digital marketing, meta ads, branding, and event shooting services to elevate your brand.",
  },
  {
    title: "Portfolio Website",
    category: "Full Stack Developer",
    company: "Personal",
    username: "",
    password: "",
    image: imgportfolio,
    technology: ["React.js", "TailWind CSS", "JavaScript"],
    github: "https://github.com/dharmendraram/MyPortfolio",
    link: "http://dharmendraram.com.np/",
    description:
      "A personal portfolio website, showcasing my interests, knowledge, experiences, skills and projects that I have done.In this digital era it has been mandatory to have digital exiatence. It becomes even more neccessary for the people in IT field. Personal portfolio website the resume of this digital world.",
  },
  {
    title: "KIEC – Study Abroad & Immigration Services | Your Global Gateway",
    category: "Full Stack Developer",
    company: "Personal",
    username: "",
    password: "",
    image: kic,
    technology: ["HTML", "CSS", "JavaScript", "Django"],
    github: "",
    link: "https://kiceducation.edu.np/",
    description:
      "KIEC guides students and professionals in achieving global education and migration goals — from university selection to visa support and pre-departure readiness.",
  },
  {
    title: "Aarambha Foundation",
    category: "Front-End Developer",
    company: "Personal",
    username: "",
    password: "",
    image: aarambha,
    technology: ["HTML", "CSS", "JavaScript", "Django REST framework API"],
    github: "",
    link: "https://aarambhafoundation.org.np/",
    description:
      "A purpose-driven digital platform focused on promoting quality education, better health, and a safe, nurturing environment for children across the nation. The platform supports initiatives that amplify children’s voices, protect their rights, and create equal opportunities for learning, growth, and well-being.",
  },
  {
    title: "StartupGhar",
    category: "Full Stack Developer",
    company: "Personal",
    username: "",
    password: "",
    image: startupghar,
    technology: ["HTML", "CSS", "JavaScript", "Django"],
    github: "",
    link: "https://startupghar.com/",
    description:
      "StartupGhar is an innovative digital platform designed to support startups and businesses through modern IT solutions. The platform focuses on delivering scalable web applications, efficient system integration, and user-friendly digital experiences that help organizations grow, innovate, and succeed in the digital era.",
  },
];
export const experiences = [
  {
    id: 1,
    company: "National Incubation & Research Center",
    logo: nirc,
    title: "Full-Stack Developer",
    period: "Jul 2025 - Present",
    description:
      "Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize application performance in an agile environment.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React JS",
      "TypeScript",
      "Node JS",
      "Tailwind CSS",
      "MySQL",
      "Python & Django",
      "Java Grails",
    ],
  },
  {
    id: 2,
    company: "National Incubation & Research Center",
    logo: nirc, // replace with actual logo
    title: "Front-End Developer",
    period: "Oct 2023 - Jul 2024", //
    description:
      "Designed and implemented responsive, user-friendly interfaces using modern frontend technologies. Collaborated with designers and backend developers to deliver seamless user experiences. Optimized web applications for performance, accessibility, and cross-browser compatibility.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React JS",
      "Next JS",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
      "Git/GitHub/GitLab",
    ],
  },
  {
    id: 3,
    company: "Tribhuvan University",
    logo: tu, // replace with actual logo
    title: "Bachelor in Computer Application",
    period: "2020 - 2025", //
    description:
      "Completed a Bachelor’s degree in Computer Application with a strong focus on software development, web technologies, databases, and practical project work. Gained hands-on experience through academic projects and collaborative learning.",
    skills: [],
  },
];
