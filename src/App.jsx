import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/portfolio';
import Projects from './pages/projects';
import Resume from './pages/resume';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
