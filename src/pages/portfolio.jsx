import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profilePhoto from "../assets/profile.jpeg";

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

  const projectsContainerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  const majorProjects = [
    // {
    //   name: "TeamSync",
    //   description: "A real-time team collaboration platform for seamless project management.",
    //   image: "/teamsync.png",
    //   link: "https://teamsync.yashwanth.site/",
    //   type: "major",
    //   hidden: true
    // },
    // PrintEase (keep data, do not show)
    {
      name: "PrintEase",
      description: "A website to share PDFs with printing shops for streamlined printing.",
      image: "/printease.png",
      link: "https://printease.yashwanth.site/",
      type: "major",
      hidden: true
    },
    // Kriya (url pinger, show, update name, link, image)
    {
      name: "Kriya",
      description: "Monitor the uptime and response time of your favorite URLs.",
      image: "/kriya.png",
      link: "https://kriya.yashwanth.site",
      type: "major"
    },
    // InShareX (show, update image if needed)
    {
      name: "InShareX",
      description: "A fast and secure file sharing platform for all your needs.",
      image: "/insharex.png",
      link: "https://insharex.yashwanth.site/",
      type: "major"
    },
    // Flavour Fusion (show, update link and image)
    {
      name: "Flavour Fusion",
      description: "Discover and share unique recipes with a vibrant food community.",
      image: "/fusion.png",
      link: "https://fusion.yashwanth.site",
      type: "major"
    },
    // MoneyMind (show as minor)
    {
      name: "MoneyMind",
      description: "A website to track your finances, create budgets, savings, etc.",
      image: "/moneymind.png",
      link: "https://moneymind.yashwanth.site/",
      type: "minor"
    },
    // SkyWatch (show as minor)
    {
      name: "SkyWatch",
      description: "A weather monitoring and alert system for your local area.",
      image: "/skywatch.png",
      link: "https://skywatch.yashwanth.site/",
      type: "minor"
    },
    {
      name: "Dispensary Management System",
      description: "Streamlines patient records, medicine inventory, and appointment tracking for efficient dispensary operations.",
      image: "/dispensary.png",
      link: "https://dispensarymanagement.yashwanth.site/",
      type: "minor"
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
              className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
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
  className=" py-8 mb-12 border-white/30 relative"
>
  <div className="flex items-center mb-6 relative px-8">
    <button
      onClick={() => navigate("/projects")}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold absolute right-6 top-0"
    >
      Projects
    </button>
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
          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange-500 border-4 border-white rounded-full z-10" />

          {/* Content Card */}
          <div
            className={`w-full md:w-1/2 p-6 rounded-lg shadow-md bg-white/40 backdrop-blur-md ${
              index % 2 === 0 ? "ml-10" : "mr-2"
            }`}
          >
            <h3 className="text-2xl font-bold text-orange-600 mb-2">
              {project.name}
            </h3>
            <p className="text-gray-800">{project.description}</p>
          </div>
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
    </div>
    </>
  );
};


export default Portfolio;
