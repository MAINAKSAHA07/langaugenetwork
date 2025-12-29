import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import FloatingCTA from './components/common/FloatingCTA';
import DemoForm from './components/sections/DemoForm';
import HomePage from './pages/HomePage';
import LanguagePageWrapper from './pages/LanguagePageWrapper';
import ExamsPage from './pages/ExamsPage';
import LevelsPage from './pages/LevelsPage';
// Education Pages
import SchoolPage from './pages/SchoolPage';
import CollegePage from './pages/CollegePage';
import StudyAbroadPage from './pages/StudyAbroadPage';
import CorporatePage from './pages/CorporatePage';
import WorkWithUsPage from './pages/WorkWithUsPage';
// About Pages
import WhoAreWePage from './pages/WhoAreWePage';
import ContactPage from './pages/ContactPage';
import BlogsPage from './pages/BlogsPage';
import PressPage from './pages/PressPage';
import FAQPage from './pages/FAQPage';
// Career Pages
import TeachPage from './pages/careers/TeachPage';
import CollaboratePage from './pages/careers/CollaboratePage';
import ContentCreatorsPage from './pages/careers/ContentCreatorsPage';
import ReferAndEarnPage from './pages/ReferAndEarnPage';
// Legal Pages
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SitemapPage from './pages/SitemapPage';

import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header onDemoClick={() => setIsDemoFormOpen(true)} />

        <main className="flex-grow">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/levels" element={<LevelsPage />} />

            {/* Education Pages */}
            <Route path="/school" element={<SchoolPage />} />
            <Route path="/college" element={<CollegePage />} />
            <Route path="/study-abroad" element={<StudyAbroadPage />} />
            <Route path="/corporate-training" element={<CorporatePage />} />
            <Route path="/work-with-us" element={<WorkWithUsPage />} />

            {/* About Pages */}
            <Route path="/who-are-we" element={<WhoAreWePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Career Pages */}
            <Route path="/careers/teach" element={<TeachPage />} />
            <Route path="/careers/collaborate" element={<CollaboratePage />} />
            <Route path="/careers/content-creators" element={<ContentCreatorsPage />} />
            <Route path="/careers/refer" element={<ReferAndEarnPage />} />

            {/* Legal Pages */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />

            {/* Language Pages - Must be last to avoid conflicts */}
            <Route path="/:language" element={<LanguagePageWrapper />} />
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
