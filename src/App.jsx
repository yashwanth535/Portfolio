import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/portfolio';
import Projects from './pages/projects';
import Resume from './pages/resume';
import ResumePage from './pages/resumePage'
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/r" element={<Resume />} />
        <Route path="/resume" element={<ResumePage/>} />

      </Routes>
    </Router>
  );
}


export default App;
