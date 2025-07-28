import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profilePhoto from "../assets/profile.jpeg";

const Portfolio = () => {
  // Refs for section visibility
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null);

  // State for section visibility animations
  const [aboutVisible, setAboutVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Custom particles implementation
  const [particles, setParticles] = useState([]);

  // --- LOGIC FOR PROJECTS CAROUSEL ---
  const projectsContainerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

  const majorProjects = [
    {
      name: "Flavour Fusion",
      description: "Discover and share unique recipes with a vibrant food community.",
      image: "/fusion.png",
      link: "https://fusion.yashwanth.site",
    },
    {
      name: "Kriya",
      description: "Monitor the uptime and response time of your favorite URLs.",
      image: "/kriya.png",
      link: "https://kriya.yashwanth.site",
    },
    {
      name: "InShareX",
      description: "A fast and secure file sharing platform for all your needs.",
      image: "/insharex.png",
      link: "https://insharex.yashwanth.site/",
    },
  ];

  // Effect to calculate drag constraints for the projects carousel
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


  // Effect for particles
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

  // Effect for intersection observer and scroll listeners
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 relative overflow-hidden">
      <style jsx global>{`
  /* Global HTML scroll behavior for sticky headers */
  html {
    scroll-padding-top: 130px; /* Combined height of your sticky header */
  }

  /* Keyframe Animations */
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

  /* Sparkle effect styles */
  .sparkle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,165,0,0) 70%);
    animation: sparkle 3s infinite;
    pointer-events: none;
  }

  /* Floating particle effect styles */
  .floating-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: linear-gradient(to right, rgba(255,165,0,0.4), rgba(255,165,0,0));
    border-radius: 50%;
    animation: float-up 8s infinite linear;
    pointer-events: none;
  }

  /* Subtle background shift animation */
  .animate-subtle-shift {
    animation: subtle-shift 20s linear infinite;
  }

  /* Scrollbar hiding for skills and projects containers (if still needed, as Tailwind usually handles overflow) */
  /* If you are using Tailwind's overflow-x-auto, these might not be strictly necessary */
  .skills-container, .projects-container {
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* For IE/Edge */
    scrollbar-width: none; /* For Firefox */
  }
  .skills-container::-webkit-scrollbar, .projects-container::-webkit-scrollbar {
    display: none; /* For Webkit browsers like Chrome, Safari */
  }

  /* Gradient text style */
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

  /* Scroll fade effects (for mobile scroll indication) */
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

  /* Scroll indicator dots (for mobile scroll indication) */
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

  /* Media query to hide scroll fades and indicators on larger screens */
  @media (min-width: 768px) {
    .scroll-fade-left, .scroll-fade-right, .scroll-indicator {
      display: none;
    }
  }
  
  /* Custom particles (if you have JavaScript injecting these) */
  .particle {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
`}</style>

      {/* Particles and other background elements */}
      <div className="fixed inset-0 z-0">
        {particles.map(p => <div key={p.id} className="particle" style={{...p, left: `${p.x}px`, top: `${p.y}px`, width: `${p.size}px`, height: `${p.size}px`, backgroundColor: p.color, opacity: p.opacity, position: 'fixed', borderRadius: '50%', pointerEvents: 'none'}} />)}
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
            className="backdrop-blur-lg bg-white/20 rounded-2xl py-8 mb-12 shadow-xl border border-white/30 relative"
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

            <div className="relative">
              <div className="scroll-fade-left md:hidden"></div>
              <div className="scroll-fade-right md:hidden"></div>
              <motion.div
                ref={projectsContainerRef}
                drag="x"
                dragConstraints={dragConstraints}
                className="projects-container flex overflow-x-auto gap-6 pb-4 snap-x snap-start scroll-smooth px-8 scroll-px-8"
              >
                {majorProjects.map((project) => (
                  <motion.div
                    key={project.name}
                    className="project-card flex-shrink-0 w-[80vw] md:w-[30vw] md:max-w-[400px] bg-white/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(255,255,255,0.4)",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} preview`}
                      className="w-full h-56 object-cover pointer-events-none"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 gradient-text">
                        {project.name}
                      </h3>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      <motion.a
                        whileHover={{ backgroundColor: "#ea580c" }}
                        whileTap={{ scale: 0.95 }}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg transition-all duration-300"
                      >
                        Visit Project
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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
