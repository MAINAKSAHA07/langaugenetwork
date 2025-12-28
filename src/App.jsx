import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import FloatingCTA from './components/common/FloatingCTA';
import DemoForm from './components/sections/DemoForm';
import HomePage from './pages/HomePage';
import LanguagePage from './pages/LanguagePage';
import ExamsPage from './pages/ExamsPage';
import LevelsPage from './pages/LevelsPage';

function App() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header onDemoClick={() => setIsDemoFormOpen(true)} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/levels" element={<LevelsPage />} />
            <Route path="/:language" element={<LanguagePage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingCTA />

        <DemoForm
          isOpen={isDemoFormOpen}
          onClose={() => setIsDemoFormOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
