import React, { useEffect, useRef, useState } from "react";

const Portfolio = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [aboutVisible, setAboutVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white text-center py-6">
        <h1 className="text-4xl font-bold">Yashwanth Munikuntla</h1>
        <p className="text-lg mt-2">Developer | Designer | Tech Enthusiast</p>
      </header>
      <nav className="bg-gray-800 text-white py-3 text-center sticky top-0 z-10">
        <a href="#about" className="mx-4 hover:underline">About Me</a>
        <a href="#skills" className="mx-4 hover:underline">Skills</a>
        <a href="#projects" className="mx-4 hover:underline">Projects</a>
        <a href="#contact" className="mx-4 hover:underline">Contact</a>
      </nav>
      <div className="w-full p-6 flex flex-col">
        <section
          id="about"
          ref={aboutRef}
          className={`w-full mb-6 bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-1000 ${
            aboutVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">
            About Me
          </h2>
          <p className="mt-2">
            Hello! I am Yashwanth Munikuntla, a passionate developer and designer
            who loves building user-friendly applications and creative solutions.
            My goal is to combine design thinking and development skills to create
            impactful digital experiences.
          </p>
        </section>
        <section
          id="skills"
          ref={skillsRef}
          className={`w-full mb-6 bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-1000 ${
            skillsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">
            Skills
          </h2>
          <ul className="list-disc pl-5 mt-2">
            <li>HTML, CSS, JavaScript</li>
            <li>React, Angular, Vue.js</li>
            <li>Node.js, Express</li>
            <li>Python, Django</li>
            <li>UI/UX Design</li>
          </ul>
        </section>
        <section
          id="projects"
          ref={projectsRef}
          className={`w-full mb-6 bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-1000 ${
            projectsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">
            Projects
          </h2>
          <div className="flex flex-row gap-6 mt-4">
            <div className="w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2">
              <h3 className="text-xl font-bold">Expense Tracker App</h3>
              <p className="mt-2">
                A web app to manage daily expenses and track financial goals.
              </p>
            </div>
            <div className="w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2">
              <h3 className="text-xl font-bold">Portfolio Website</h3>
              <p className="mt-2">A responsive personal portfolio website.</p>
            </div>
            <div className="w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2">
              <h3 className="text-xl font-bold">E-commerce Platform</h3>
              <p className="mt-2">
                An online platform for small businesses to sell products.
              </p>
            </div>
          </div>
        </section>
        <section
          id="contact"
          ref={contactRef}
          className={`w-full mb-6 bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-1000 ${
            contactVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">
            Contact
          </h2>
          <p>If you’d like to collaborate or just say hi, feel free to contact me:</p>
          <p>
            <strong>Email:</strong> yashwanth@example.com
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://linkedin.com/in/yashwanthmunikuntla"
              className="text-blue-400 hover:underline"
            >
              linkedin.com/in/yashwanthmunikuntla
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/yashwanthmunikuntla"
              className="text-blue-400 hover:underline"
            >
              github.com/yashwanthmunikuntla
            </a>
          </p>
        </section>
      </div>
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p>© 2025 Yashwanth Munikuntla | Built with ❤️</p>
      </footer>
    </div>
  );
};

export default Portfolio;