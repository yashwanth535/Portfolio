import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaExternalLinkAlt, FaArrowLeft, FaHome } from "react-icons/fa";
import resumeId from './resumeId'
const Resume = () => {
  const [particles, setParticles] = useState([]);
  
  // Google Drive URLs
  const resumeUrl = `https://drive.google.com/file/d/${resumeId}`;
  const resumeViewUrl = `https://drive.google.com/file/d/${resumeId}/view?usp=sharing`;
  const resumeEmbedUrl = `https://drive.google.com/file/d/${resumeId}/preview`;
  const resumeDownloadUrl = `https://drive.google.com/uc?export=download&id=${resumeId}`;


  React.useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.4 + 0.2,
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 relative overflow-hidden">
      
      {/* Animated Background Particles */}
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
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md text-gray-800 border-b border-white/20 select-none">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.button
                onClick={() => window.history.back()}
                className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowLeft className="text-lg" />
              </motion.button>
              
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                My Resume
              </h1>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="mt-4 md:mt-0 flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHome /> Home
              </motion.button>
              
              <motion.a
                href={resumeDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download
              </motion.a>
              
              <motion.a
                href={resumeViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-gray-800 rounded-lg hover:bg-white/30 transition-colors duration-300 font-medium backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt /> View in Drive
              </motion.a>
            </motion.div>
          </div>
        </header>

        {/* Resume Container */}
        <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/20 rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
          >
            
            {/* Resume Embed */}
            <div className="relative w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
              <motion.iframe
                src={resumeEmbedUrl}
                width="100%"
                height="100%"
                className="border-0 rounded-xl"
                title="Yashwanth Munikuntla Resume"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onLoad={() => {
                  console.log("Resume loaded successfully");
                }}
                onError={() => {
                  console.error("Error loading resume");
                }}
              />
              
              {/* Loading Overlay */}
              <motion.div
                className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                style={{ pointerEvents: 'none' }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-700 font-medium">Loading Resume...</p>
                </div>
              </motion.div>
            </div>

            {/* Footer Info */}
            <motion.div
              className="p-6 bg-white/10 backdrop-blur-sm border-t border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Yashwanth Munikuntla</h3>
                  <p className="text-gray-600">Full Stack Developer</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Last Updated: January 2025</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Current Version</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional Actions */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-gray-600 mb-4">
              Having trouble viewing the resume? Try the direct download or view it in Google Drive.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Print Page
              </motion.button>
              
              <motion.button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Yashwanth Munikuntla - Resume',
                      url: resumeViewUrl
                    });
                  } else {
                    navigator.clipboard.writeText(resumeViewUrl);
                    alert('Resume link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share Resume
              </motion.button>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="backdrop-blur-md bg-white/10 text-gray-800 text-center py-4 border-t border-white/20">
          <p>© 2025 Yashwanth Munikuntla - Full Stack Developer</p>
        </footer>
      </div>
    </div>
  );
};

export default Resume;