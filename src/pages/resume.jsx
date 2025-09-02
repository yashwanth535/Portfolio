import { useEffect } from 'react';
import resumeId from "./resumeId";

const Resume = () => {
  const url = `https://drive.google.com/file/d/${resumeId}`;

  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div>
      <h2>Redirecting to Resume...</h2>
      <p>
        If you are not redirected, <a href={url}>click here</a>.
      </p>
    </div>
  );
};

export default Resume;
