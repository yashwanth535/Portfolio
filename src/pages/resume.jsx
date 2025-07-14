import { useEffect } from 'react';

const Resume = () => {
  useEffect(() => {
    window.location.replace('https://drive.google.com/file/d/11OplB5d-C9eELy0AFoZwJXTSCYuZOsa3/view?usp=sharing');
  }, []);

  return (
    <div>
      <h2>Redirecting to Resume...</h2>
      <p>If you are not redirected, <a href="https://drive.google.com/file/d/11OplB5d-C9eELy0AFoZwJXTSCYuZOsa3/view?usp=sharing" target="_blank" rel="noopener noreferrer">click here</a>.</p>
    </div>
  );
};

export default Resume; 