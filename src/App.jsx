import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/portfolio';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
