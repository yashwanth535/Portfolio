import { useEffect } from 'react';

const Resume = () => {
  useEffect(() => {
    window.location.replace('https://drive.google.com/file/d/14Tv3skj79ok-pCidI6N9zM3Uo_CaED8C/view?usp=sharing');
  }, []);

  return (
    <div>
      <h2>Redirecting to Resume...</h2>
      <p>If you are not redirected, <a href="https://drive.google.com/file/d/14Tv3skj79ok-pCidI6N9zM3Uo_CaED8C/view?usp=sharing" target="_blank" rel="noopener noreferrer">click here</a>.</p>
    </div>
  );
};

export default Resume; 