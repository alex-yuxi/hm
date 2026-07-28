import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import HomePage from './components/HomePage';
import AssessmentTaking from './components/AssessmentTaking';
import AssessmentResult from './components/AssessmentResult';
import HistoryPage from './components/HistoryPage';
import ComprehensiveAnalysis from './components/ComprehensiveAnalysis';
import { getAssessmentById } from './data/assessments';
import './index.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">🔮</span>
          <span className="logo-text">性格与职业测评</span>
        </Link>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>首页</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)}>测评记录</Link>
          <Link to="/analysis" onClick={() => setMenuOpen(false)}>综合分析</Link>
        </div>
      </div>
    </nav>
  );
}

function AssessmentTakingWrapper() {
  const { id } = useParams();
  const assessment = getAssessmentById(id);
  if (!assessment) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>测评未找到</h2>
          <Link to="/" className="btn-primary">返回首页</Link>
        </div>
      </div>
    );
  }
  return <AssessmentTaking assessment={assessment} />;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment/:id" element={<AssessmentTakingWrapper />} />
            <Route path="/result/:id/:recordId" element={<AssessmentResult />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/analysis" element={<ComprehensiveAnalysis />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>性格与职业测评平台 © 2026 | 连接自我认知与职业发展</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
