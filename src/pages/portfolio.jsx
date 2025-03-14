import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Replace the particles import with a simpler implementation
// since the external library might be causing issues
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

  // Custom particles implementation instead of using the library
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create custom particles
    const particleCount = 50;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 2,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.3,
        color: ['#f97316', '#fb923c', '#fdba74', '#fed7aa'][Math.floor(Math.random() * 4)]
      });
    }
    
    setParticles(newParticles);
    
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // Bounce off edges
          if (newX < 0 || newX > window.innerWidth) {
            particle.speedX *= -1;
            newX = particle.x + particle.speedX;
          }
          
          if (newY < 0 || newY > window.innerHeight) {
            particle.speedY *= -1;
            newY = particle.y + particle.speedY;
          }
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        })
      );
      
      animationId = requestAnimationFrame(animateParticles);
    };
    
    let animationId = requestAnimationFrame(animateParticles);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "about") setAboutVisible(true);
            if (entry.target.id === "skills") setSkillsVisible(true);
            if (entry.target.id === "projects") setProjectsVisible(true);
            if (entry.target.id === "contact") setContactVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    // Handle scroll for sticky header effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 130; // Combined height of both header elements
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 relative overflow-hidden">
      <style jsx global>{`
        html {
          scroll-padding-top: 130px; /* Combined height of your sticky header */
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }

        @keyframes float-up {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }

        @keyframes subtle-shift {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }

        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,165,0,0) 70%);
          animation: sparkle 3s infinite;
          pointer-events: none;
        }

        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(to right, rgba(255,165,0,0.4), rgba(255,165,0,0));
          border-radius: 50%;
          animation: float-up 8s infinite linear;
          pointer-events: none;
        }

        .animate-subtle-shift {
          animation: subtle-shift 20s linear infinite;
        }

        .skills-container, .projects-container {
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-scroll-snap-type: x mandatory;
          padding: 1rem;
          position: relative;
          width: 100%;
        }
        
        .skills-container::-webkit-scrollbar, .projects-container::-webkit-scrollbar {
          display: none;
        }

        .skill-card, .project-card {
          scroll-snap-align: center;
          scroll-snap-stop: always;
          min-width: calc(80vw - 3rem);
          margin-right: 1rem;
          padding: 1.5rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.3);
        }

        @media (min-width: 768px) {
          .skill-card, .project-card {
            min-width: unset;
            margin-right: 0;
            padding: 1.5rem;
          }

          .skills-container, .projects-container {
            padding: 1rem 0;
            overflow: visible;
          }
        }

        .card-content {
          padding: 0.5rem;
        }

        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, #f97316, #fb923c);
          font-weight: bold;
        }

        .gradient-text:hover {
          opacity: 0.9;
        }

        .scroll-fade-left {
          background: linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent);
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 60px;
          pointer-events: none;
          z-index: 1;
        }
        
        .scroll-fade-right {
          background: linear-gradient(to left, rgba(255, 255, 255, 0.3), transparent);
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 60px;
          pointer-events: none;
          z-index: 1;
        }

        .scroll-indicator {
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 2;
        }

        .scroll-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(249, 115, 22, 0.3);
          transition: all 0.3s ease;
        }

        .scroll-dot.active {
          background-color: rgba(249, 115, 22, 1);
          transform: scale(1.2);
        }

        @media (min-width: 768px) {
          .scroll-fade-left, .scroll-fade-right, .scroll-indicator {
            display: none;
          }
        }
        
        /* Custom particles */
        .particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Custom particles implementation */}
      <div className="fixed inset-0 z-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>

      <div className="fixed w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.1)_0%,transparent_50%)] animate-slow-spin"></div>
      </div>

      <div className="relative z-10">
        <header className="relative bg-white/10 backdrop-blur-md text-gray-800 text-center py-8 border-b border-white/20 select-none">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent pointer-events-none"
          >
            Yashwanth Munikuntla
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl mt-2 text-gray-700 pointer-events-none"
          >
            Developer | Designer | Tech Enthusiast
          </motion.p>
        </header>

        <nav ref={navRef} className={`${scrolled ? 'fixed top-0' : 'relative'} left-0 right-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 py-4 px-6 transition-all duration-300`}>
          <div className="max-w-4xl mx-auto flex justify-center md:gap-8 overflow-visible">
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
                className="text-gray-800 hover:text-orange-600 transition-all duration-300 text-lg font-medium relative group cursor-pointer px-3 mx-2"
              >
                {item.text}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.button>
            ))}
          </div>
        </nav>

        <main className={`flex-grow p-6 md:p-12 max-w-6xl mx-auto w-full ${scrolled ? 'mt-[72px]' : 'mt-0'} z-10`}>
          <motion.section
            id="about"
            ref={aboutRef}
            initial="hidden"
            animate={aboutVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 mb-12 shadow-xl border border-white/30"
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
              transition={{ duration: 0.2 }}
            >
              About Me
            </motion.h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hello! I am Yashwanth Munikuntla, a passionate developer and designer
              who loves building user-friendly applications and creative solutions.
              My goal is to combine design thinking and development skills to create
              impactful digital experiences.
            </p>
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
              className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
              transition={{ duration: 0.2 }}
            >
              Skills
            </motion.h2>
            <div className="relative">
              <div className="scroll-fade-left md:hidden"></div>
              <div className="scroll-fade-right md:hidden"></div>
              <div 
                className="skills-container overflow-x-auto md:overflow-visible pb-6"
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
                    { name: "Frontend Development", skills: ["HTML", "CSS", "JavaScript", "React"] },
                    { name: "Backend Development", skills: ["Node.js", "Express", "Python", "Django"] },
                    { name: "Design", skills: ["UI/UX Design", "Figma", "Adobe XD"] },
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

          <motion.section
            id="projects"
            ref={projectsRef}
            initial="hidden"
            animate={projectsVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 mb-12 shadow-xl border border-white/30 transform transition-all duration-300 relative overflow-hidden"
          >
            <motion.h2 
              className="text-3xl gradient-text mb-6"
              transition={{ duration: 0.2 }}
            >
              Projects
            </motion.h2>
            <div className="relative">
              <div className="scroll-fade-left md:hidden"></div>
              <div className="scroll-fade-right md:hidden"></div>
              <div 
                className="projects-container overflow-x-auto md:overflow-visible pb-6"
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollPosition = container.scrollLeft;
                  const cardWidth = container.offsetWidth;
                  const activeIndex = Math.round(scrollPosition / cardWidth);
                  
                  // Update active dot
                  const dots = document.querySelectorAll('.project-dot');
                  dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                      dot.classList.add('active');
                    } else {
                      dot.classList.remove('active');
                    }
                  });
                }}
              >
                <div className="grid grid-flow-col md:grid-flow-row auto-cols-[80vw] md:auto-cols-fr md:grid-cols-2 gap-6 md:gap-8">
                  <motion.div
                    className="project-card bg-white/30 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300"
                    whileHover={{ 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      background: "rgba(255, 255, 255, 0.4)"
                    }}
                  >
                    <img
                      src="/printease.png"
                      alt="PrintEase Preview"
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="p-6">
                      <div className="card-content">
                        <h3 className="text-2xl gradient-text mb-2">
                          PrintEase
                        </h3>
                        <p className="text-gray-700 mb-4">
                          A website to share PDFs with printing shops for streamlined printing.
                        </p>
                        <motion.a
                          whileHover={{ backgroundColor: "#ea580c" }}
                          whileTap={{ scale: 0.95 }}
                          href="https://printease.yashwanth.site/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg transition-all duration-300"
                        >
                          Visit Project
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="project-card bg-white/30 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300"
                    whileHover={{ 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      background: "rgba(255, 255, 255, 0.4)"
                    }}
                  >
                    <img
                      src="/moneymind.png"
                      alt="MoneyMind Preview"
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="p-6">
                      <div className="card-content">
                        <h3 className="text-2xl gradient-text mb-2">
                          MoneyMind
                        </h3>
                        <p className="text-gray-700 mb-4">
                          A website to track your finances, create budgets, savings, etc.
                        </p>
                        <motion.a
                          whileHover={{ backgroundColor: "#ea580c" }}
                          whileTap={{ scale: 0.95 }}
                          href="https://moneymind.yashwanth.site/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg transition-all duration-300"
                        >
                          Visit Project
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="scroll-indicator md:hidden">
                {[0, 1].map((index) => (
                  <div 
                    key={index} 
                    className={`scroll-dot project-dot ${index === 0 ? 'active' : ''}`}
                  />
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
    </div>
  );
};

export default Portfolio;