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
  <div className="flex flex-col gap-6 mt-4">
    <div className="flex flex-col md:flex-row md:gap-6">
      <div
        className="w-full mb-4 md:mb-0 md:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
        onClick={() => window.open("https://printease.yashwanth.site/", "_blank")}
      >
        <h3 className="text-xl font-bold flex justify-between items-center">
          PrintEase
          <a
            href="https://printease.yashwanth.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Visit
          </a>
        </h3>
        <p className="mt-2">
          A website to share PDFs with printing shops for streamlined printing.
        </p>
        <div className="mt-4">
          <img
            src="/printease.png"
            alt="PrintEase Preview"
            className="w-full h-64 rounded-md object-cover"
          />
        </div>
      </div>
      <div
        className="w-full mb-4 md:mb-0 md:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
        onClick={() => window.open("https://moneymind.yashwanth.site/", "_blank")}
      >
        <h3 className="text-xl font-bold flex justify-between items-center">
          MoneyMind
          <a
            href="https://moneymind.yashwanth.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Visit
          </a>
        </h3>
        <p className="mt-2">
          A website to track your finances, create budgets, savings, etc.
        </p>
        <div className="mt-4">
          <img
            src="/moneymind.png"
            alt="MoneyMind Preview"
            className="w-full h-64 rounded-md object-cover"
          />
        </div>
      </div>
      <div
        className="w-full mb-4 md:mb-0 md:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
        onClick={() => window.open("https://skywatch.yashwanth.site/", "_blank")}
      >
        <h3 className="text-xl font-bold flex justify-between items-center">
          SkyWatch
          <a
            href="https://skywatch.yashwanth.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Visit
          </a>
        </h3>
        <p className="mt-2">A website for real-time weather reporting.</p>
        <div className="mt-4">
          <img
            src="/skywatch.png"
            alt="SkyWatch Preview"
            className="w-full h-64 rounded-md object-cover"
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row md:gap-6">
      <div
        className="w-full mb-4 md:mb-0 md:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
        onClick={() =>
          window.open("https://dispensarymanagement.yashwanth.site/", "_blank")
        }
      >
        <h3 className="text-xl font-bold flex justify-between items-center">
          Dispensary Management
          <a
            href="https://dispensarymanagement.yashwanth.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Visit
          </a>
        </h3>
        <p className="mt-2">
          A system designed to manage inventory, patient records, and sales
          within a dispensary, streamlining operations and ensuring compliance.
        </p>
        <div className="mt-4">
          <img
            src="/dispensary.png"
            alt="Dispensary Management Preview"
            className="w-full h-64 rounded-md object-cover"
          />
        </div>
      </div>
      <div
        className="w-full mb-4 md:mb-0 md:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
        onClick={() => window.open("https://dummy-tictactoe.com", "_blank")}
      >
        <h3 className="text-xl font-bold flex justify-between items-center">
          TicTacToe
          <a
            href="https://dummy-tictactoe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Visit
          </a>
        </h3>
        <p className="mt-2">
          An online TicTacToe game using WebSockets, allowing users to create
          rooms and play against each other.
        </p>
        <div className="mt-4">
          <iframe
            src="https://dummy-tictactoe.com"
            className="w-full h-64 rounded-md"
            title="TicTacToe Preview"
          ></iframe>
        </div>
      </div>
      <div className="md:w-1/3"></div>
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
              href="https://github.com/yashwanth535"
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