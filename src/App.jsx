import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/portfolio';
import Projects from './pages/projects';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
