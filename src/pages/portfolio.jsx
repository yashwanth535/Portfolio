import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaCloud } from "react-icons/fa";
import profilePhoto from "../assets/profile.png";

const Portfolio = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null);

  const [aboutVisible, setAboutVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particles, setParticles] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsContainerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  const majorProjects = [
    {
      name: "PrintEase",
      description:
        "A website to share PDFs with printing shops for streamlined printing.",
      image: "/printease.png",
      link: "https://printease.yashwanth.site/",
      vercellink: "https://print-ease-frontend.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/PrintEase-frontend",
      backendRepo: "https://github.com/yashwanth535/PrintEase-backend",
      type: "major",
      body: `
  PrintEase is a full-stack MERN (MongoDB, Express, React, Node.js) application that connects users with local print service vendors. On the frontend we used React with Tailwind and Vite, providing a smooth file‑upload interface that uses Supabase-signed URLs for secure PDF transfer. Vendors manage incoming orders in real time within an Express dashboard, and we integrated Firebase Storage for storing and serving PDF documents. 
  
  On the backend, we built RESTful APIs in Express.js with JWT authentication for Customers and Vendors, a 50% advance payment flow secured via Stripe, and Socket.io–powered WebSockets to push live order status updates (accepted, printing, out for delivery). We also automated PDF cleanup once jobs complete, and provided PDF preview links in both user and vendor dashboards—resulting in a fully end‑to‑end, real‑time print ordering system.`,
    },
    {
      name: "Kriya",
      description: "Monitor the uptime and response time of your favorite URLs.",
      image: "/kriya.png",
      link: "https://kriya.yashwanth.site",
      vercellink: "https://kriya-frontend-ten.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/Kriya-frontend",
      backendRepo: "https://github.com/yashwanth535/Kriya-backend",
      type: "major",
      body: `
  Kriya is a Node.js + Express monitoring tool with a React frontend built on Vite. It allows users to register URLs they want tracked, and runs scheduled health checks using node-cron on the backend to ping these endpoints at configurable intervals. We stored uptime/response metrics in MongoDB and expose them via REST APIs, which power a dynamic dashboard showing historical graphs.
  
  To deliver near real‑time alerts, Kriya uses Socket.io for WebSocket notifications: when an endpoint goes down or exceeds a response threshold, users immediately see toast alerts on the frontend and can opt into email notifications. The result is a lightweight but robust uptime monitoring platform with customizable alerts and live stats.`,
    },
    {
      name: "InShareX",
      description: "A fast and secure file sharing platform for all your needs.",
      image: "/insharex.png",
      link: "https://insharex.yashwanth.site/",
      vercellink: "https://insharex-frontend.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/InShareX-frontend",
      backendRepo: "https://github.com/yashwanth535/InShareX-backend",
      type: "major",
      body: `
  InShareX is a peer‑to‑peer file sharing service built with React, WebRTC, and WebSockets. The frontend implements chunked file transfer using the browser’s WebRTC data channels for direct browser‑to‑browser transfers, and falls back to a secure Express‑based relay server when peers cannot connect directly. A chat overlay lets users communicate during transfers, and transfer progress is tracked with live updates.
  
  On the backend, we use Node.js + Express to handle signaling via Socket.io and manage one‑time download URLs. File metadata and user permissions are stored in MongoDB. We added transfer resume support and optional encryption for file chunks, ensuring high speed and security without requiring users to register or install an app.`,
    },
    {
      name: "Flavour Fusion",
      description:
        "Discover and share unique recipes with a vibrant food community.",
      image: "/fusion.png",
      link: "https://fusion.yashwanth.site",
      vercellink: "https://fusion-frontend-omega.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/Fusion-frontend",
      backendRepo: "https://github.com/yashwanth535/Fusion-backend",
      type: "major",
      body: `
  Flavour Fusion is a social cooking platform built on the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS for styling. Users can create accounts, post recipes with images, tag ingredients, and browse a personalized feed powered by keyword‑based searches. The frontend uses React Context for global state and React Router for client‑side navigation.
  
  The backend features RESTful APIs in Express with JWT‑based authentication and role‑based access control. We implemented file uploads via Multer for recipe images, real‑time notifications for comments using Socket.io, and full-text search indexing in MongoDB for efficient recipe discovery. Flavour Fusion fosters community engagement through likes, comments, and curated recipe collections.`,
    },
    {
      name: "MoneyMind",
      description:
        "A website to track your finances, create budgets, savings, etc.",
      image: "/moneymind.png",
      link: "https://moneymind.yashwanth.site/",
      vercellink: "https://moneymind-frontend.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/MoneyMind-frontend",
      backendRepo: "https://github.com/yashwanth535/MoneyMind-backend",
      type: "minor",
      body: `
  MoneyMind is a personal finance dashboard developed with React (Vite) on the frontend and Express + MongoDB on the backend. It provides expense tracking, budget setup, and savings goals visualization. We integrated Tesseract.js for OCR scanning of receipts so users can snap a photo and automatically log transactions.
  
  The backend offers REST endpoints secured with JWT authentication, and data analytics endpoints that calculate monthly spend breakdowns. We added CSV export and PDF report generation, as well as integration with Chart.js for interactive spending charts. MoneyMind makes budgeting effortless with AI‑powered receipt parsing and rich data visualizations.`,
    },
    {
      name: "SkyWatch",
      description: "A weather monitoring and alert system for your local area.",
      image: "/skywatch.png",
      link: "https://skywatch.yashwanth.site/",
      vercellink: "https://skywatch.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/SkyWatch",
      type: "minor",
      body: `
  SkyWatch is a React app that consumes OpenWeatherMap’s public APIs to display current conditions, hourly forecasts, and 7‑day outlooks. We implemented geolocation detection and allow users to save multiple locations. The UI leverages Tailwind CSS for a clean responsive design and Chart.js for rainfall and temperature graphs.
  
  For alerts, SkyWatch uses browser push notifications: when temperature or precipitation exceed user-defined thresholds, a service worker sends real‑time alerts. This project demonstrates integrating third‑party weather APIs with modern React patterns and offline‑capable notification features.`,
    },
    {
      name: "Dispensary Management System",
      description:
        "Streamlines patient records, medicine inventory, and appointment tracking for efficient dispensary operations.",
      image: "/dispensary.png",
      link: "https://dispensarymanagement.yashwanth.site/",
      cloudflarelink: "https://patient-prescription.pages.dev/",
      frontendRepo: "https://github.com/yashwanth535/patient-prescription",
      type: "minor",
      body: `
  The Dispensary Management System is a MERN‑stack application designed for pharmacies to manage patient profiles, prescription histories, and medication stock. The React frontend provides form‑based data entry for new prescriptions and real‑time inventory levels. We used Redux Toolkit for state management and React Query for server‑state syncing.
  
  On the backend, Node.js and Express serve RESTful APIs with JWT authentication for pharmacists and staff roles. MongoDB stores patient and prescription data, and we built endpoints for appointment scheduling and automated low‑stock alerts. This system simplifies daily dispensary workflows with real‑time data updates and role‑based access control.`,
    },
  ];
  

  useEffect(() => {
    const calculateConstraints = () => {
      if (projectsContainerRef.current) {
        const container = projectsContainerRef.current;
        const maxDrag = container.scrollWidth - container.offsetWidth;
        setDragConstraints({ right: 0, left: -maxDrag });
      }
    };

    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [majorProjects]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.3,
      color: ['#f97316', '#fb923c', '#fdba74', '#fed7aa'][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);

    let animationId;
    const animateParticles = () => {
      setParticles(prev => prev.map(p => {
        let newX = p.x + p.speedX;
        let newY = p.y + p.speedY;
        if (newX < 0 || newX > window.innerWidth) p.speedX *= -1;
        if (newY < 0 || newY > window.innerHeight) p.speedY *= -1;
        return { ...p, x: newX, y: newY };
      }));
      animationId = requestAnimationFrame(animateParticles);
    };
    animationId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "about") setAboutVisible(true);
          if (entry.target.id === "skills") setSkillsVisible(true);
          if (entry.target.id === "projects") setProjectsVisible(true);
          if (entry.target.id === "contact") setContactVisible(true);
        }
      });
    }, { threshold: 0.2 });

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navigate = useNavigate();

  return (
    <>
    
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 relative overflow-hidden">
     
      <div className="fixed inset-0 z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              position: 'fixed',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
      <div className="relative z-10">
      <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md text-gray-800 border-b border-white/20 select-none">
  <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
    
    {/* Name */}
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent text-center md:text-left"
    >
      Yashwanth Munikuntla
    </motion.h1>

    {/* Navigation */}

    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-4 md:mt-0 flex flex-wrap gap-4 md:gap-6"
    >
      {[
        { text: "About Me", id: "about" },
        { text: "Skills", id: "skills" },
        { text: "Projects", id: "projects" },
        { text: "Contact", id: "contact" }
      ].map((item) => (
        <motion.button
          key={item.text}
          onClick={() => scrollToSection(item.id)}
          whileHover={{ scale: 1.05, color: "#f97316" }}
          whileTap={{ scale: 0.95 }}
          className="text-lg font-medium text-gray-800 hover:text-orange-600 transition relative group px-2"
        >
          {item.text}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.button>
      ))}
    </motion.nav>


  </div>
</header>

      

      <main className="flex-grow p-6 md:p-12 max-w-6xl mx-auto w-full mt-[72px] z-10">
        <motion.section
          id="about"
          ref={aboutRef}
          initial="hidden"
          animate={aboutVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 mb-12 shadow-xl border border-white/30"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left side - Title and Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aboutVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/3 flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-64 h-64"
              >
                <img
                  src={profilePhoto}
                  alt="Yashwanth Munikuntla"
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
              </motion.div>
            </motion.div>


            {/* Right side - Content */}
            <div className="lg:w-2/3">
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                animate={aboutVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-700 leading-relaxed"
              >
                Hello! I am Yashwanth Munikuntla, a passionate developer and designer
                who loves building user-friendly applications and creative solutions.
                My goal is to combine design thinking and development skills to create
                impactful digital experiences.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={aboutVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6 space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-700">Full-stack development with modern technologies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-700">UI/UX design and user experience optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-700">Problem-solving and creative thinking</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

          <motion.section
            id="skills"
            ref={skillsRef}
            initial="hidden"
            animate={skillsVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 mb-12 shadow-xl border border-white/30 relative overflow-hidden"
          >
            <motion.h2 
              className="text-3xl font-bold text-orange-600 mb-6"
              transition={{ duration: 0.2 }}
            >
              Skills
            </motion.h2>
            <div className="relative">
              <div 
                className="skills-container"
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollPosition = container.scrollLeft;
                  const cardWidth = container.offsetWidth;
                  const activeIndex = Math.round(scrollPosition / cardWidth);
                  
                  // Update active dot
                  const dots = document.querySelectorAll('.scroll-dot');
                  dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                      dot.classList.add('active');
                    } else {
                      dot.classList.remove('active');
                    }
                  });
                }}
              >
                <div className="grid grid-flow-col md:grid-flow-row auto-cols-[80vw] md:auto-cols-fr md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
                  {[
                    { name: "Programming Languages", skills: ["C", "C++", "Java"] },
                    { name: "Frontend Development", skills: ["React", "JavaScript","Tailwind css" ] },
                    { name: "Backend Development", skills: ["Node.js", "Express", "MongoDB"] },
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ 
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        background: "rgba(255, 255, 255, 0.4)"
                      }}
                      className="skill-card bg-white/30 rounded-xl backdrop-blur-sm transform transition-all duration-300"
                    >
                      <div className="card-content">
                        <motion.h3 
                          className="text-xl font-semibold text-gray-800 mb-4 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {category.name}
                        </motion.h3>
                        <ul className="space-y-2">
                          {category.skills.map((skill, idx) => (
                            <motion.li 
                              key={idx} 
                              className="text-gray-700 flex items-center"
                              whileHover={{ x: 10, color: "#f97316" }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 flex-shrink-0"></span>
                              <span className="truncate">{skill}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="scroll-indicator md:hidden">
                {[0, 1, 2].map((index) => (
                  <div 
                    key={index} 
                    className={`scroll-dot ${index === 0 ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          {/* --- UPDATED PROJECTS SECTION --- */}
          <motion.section
  id="projects"
  ref={projectsRef}
  initial="hidden"
  animate={projectsVisible ? "visible" : "hidden"}
  variants={fadeInUp}
  transition={{ duration: 0.6 }}
  className="py-8 mb-12 border-white/30 relative"
>
  <div className="flex items-center mb-6 relative px-8">
    <motion.h2
      className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mx-auto"
      transition={{ duration: 0.2 }}
    >
      Projects
    </motion.h2>
  </div>

  <div className="relative px-8">
    {/* Timeline Line */}
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-400 z-0" />

    {/* Timeline Items */}
    <div className="space-y-16 relative z-10">
      {majorProjects.map((project, index) => (
        <div
          key={project.name}
          className={`relative flex items-center w-full ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Connector Dot */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange-500 border-4 border-white rounded-full z-10 cursor-pointer"
            whileHover={{ 
              scale: 1.3,
              backgroundColor: "#ea580c",
              boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          />

          {/* Content Card */}
          <motion.div
            className={`w-full md:w-1/2 p-6 rounded-lg shadow-md bg-white/40 backdrop-blur-md cursor-pointer group ${
              index % 2 === 0 ? "ml-10" : "mr-2"
            }`}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            onClick={() => setSelectedProject(project)}
          >
            {/* Project Type Badge */}
            <motion.div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{
                backgroundColor: project.type === "major" ? "rgba(249, 115, 22, 0.2)" : "rgba(156, 163, 175, 0.2)",
                color: project.type === "major" ? "#ea580c" : "#6b7280",
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {project.type === "major" ? "Major Project" : "Minor Project"}
            </motion.div>

            <motion.h3 
              className="text-2xl font-bold text-orange-600 mb-2 group-hover:text-orange-700 transition-colors duration-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {project.name}
            </motion.h3>
            
            <motion.p 
              className="text-gray-800 mb-4 leading-relaxed"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {project.description}
            </motion.p>

            {/* Links Section */}
            <div className="flex flex-wrap gap-3 text-sm" onClick={(e) => e.stopPropagation()}>
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-orange-600 hover:text-orange-700 gap-1 px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(249, 115, 22, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="text-sm" /> Live Demo
                </motion.a>
              )}
              {project.vercellink && (
                <motion.a
                  href={project.vercellink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-gray-900 gap-1 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(55, 65, 81, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCloud className="text-sm" /> Vercel
                </motion.a>
              )}
              {project.cloudflarelink && (
                <motion.a
                  href={project.cloudflarelink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-orange-500 hover:text-orange-600 gap-1 px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(249, 115, 22, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCloud className="text-sm" /> Cloudflare
                </motion.a>
              )}
              {project.frontendRepo && (
                <motion.a
                  href={project.frontendRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-gray-900 gap-1 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(55, 65, 81, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-sm" /> Frontend
                </motion.a>
              )}
              {project.backendRepo && (
                <motion.a
                  href={project.backendRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-gray-900 gap-1 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(55, 65, 81, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-sm" /> Backend
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  </div>
</motion.section>
          <motion.section
            id="contact"
            ref={contactRef}
            initial="hidden"
            animate={contactVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 mb-12 shadow-xl border border-white/30"
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.h2>
            <div className="space-y-4">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  link: "mailto:yashwanthmunikuntla@gmail.com",
                  text: "yashwanthmunikuntla@gmail.com"
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  link: "https://www.linkedin.com/in/yashwanth-munikuntla-370666281",
                  text: "linkedin.com/in/yashwanth-munikuntla"
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
                  link: "https://github.com/yashwanth535",
                  text: "github.com/yashwanth535"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-4"
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.svg 
                    className="w-6 h-6 text-orange-500"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </motion.svg>
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-orange-600 transition-all duration-300"
                    whileHover={{ scale: 1.05, color: "#f97316" }}
                  >
                    {item.text}
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        <footer className="backdrop-blur-md bg-white/10 text-gray-800 text-center py-6 border-t border-white/20">
          <p className="text-lg">© 2025 Yashwanth Munikuntla </p>
        </footer>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-orange-600 transition-colors duration-300 z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Project Header */}
            <div className="p-8 pb-4">
              <motion.h2 
                className="text-4xl font-bold text-center mb-6 text-orange-600"
                style={{
                  textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {selectedProject.name}
              </motion.h2>

              {/* Project Type Badge */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedProject.type === "major" 
                      ? "bg-orange-100 text-orange-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selectedProject.type === "major" ? "Major Project" : "Minor Project"}
                </div>
              </motion.div>

              {/* Links Section */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4 mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedProject.link && (
                  <motion.a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-600 hover:text-orange-700 gap-2 px-4 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                )}
                {selectedProject.vercellink && (
                  <motion.a
                    href={selectedProject.vercellink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-gray-900 gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCloud /> Vercel
                  </motion.a>
                )}
                {selectedProject.cloudflarelink && (
                  <motion.a
                    href={selectedProject.cloudflarelink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-500 hover:text-orange-600 gap-2 px-4 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCloud /> Cloudflare
                  </motion.a>
                )}
                {selectedProject.frontendRepo && (
                  <motion.a
                    href={selectedProject.frontendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-gray-900 gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> Frontend
                  </motion.a>
                )}
                {selectedProject.backendRepo && (
                  <motion.a
                    href={selectedProject.backendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-gray-900 gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> Backend
                  </motion.a>
                )}
              </motion.div>

              {/* Project Body */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.p 
                  className="text-gray-800 leading-relaxed text-lg whitespace-pre-line"
                >
                  {selectedProject.body}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
    </>
  );
};


export default Portfolio;
