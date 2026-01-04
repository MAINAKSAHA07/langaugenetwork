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
import BlogDetailPage from './pages/BlogDetailPage';
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
import MasteryKitPage from './pages/MasteryKitPage';
import EnglishMasteryKitPage from './pages/EnglishMasteryKitPage';
import GermanA1MasteryKitPage from './pages/GermanA1MasteryKitPage';
// Admin Pages
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminBlogs from './admin/pages/blogs/AdminBlogs';
import AdminBlogEditor from './admin/pages/blogs/AdminBlogEditor';
import AdminBatches from './admin/pages/batches/AdminBatches';
import AdminBatchEditor from './admin/pages/batches/AdminBatchEditor';
import AdminContacts from './admin/pages/AdminContacts';
import AdminDemos from './admin/pages/AdminDemos';
import AdminNewsletters from './admin/pages/AdminNewsletters';
import AdminSchoolEnrollments from './admin/pages/AdminSchoolEnrollments';
import AdminCollegeEnrollments from './admin/pages/AdminCollegeEnrollments';
import AdminEnrollments from './admin/pages/AdminEnrollments';
import AdminOrders from './admin/pages/AdminOrders';
import AdminTeacherApplications from './admin/pages/AdminTeacherApplications';

import ScrollToTop from './components/common/ScrollToTop';

function AppContent() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
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
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
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

          {/* Special Pages */}
          <Route path="/french-mastery-kit" element={<MasteryKitPage />} />
          <Route path="/english-mastery-kit" element={<EnglishMasteryKitPage />} />
          <Route path="/german-a1-mastery-kit" element={<GermanA1MasteryKitPage />} />

          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/blogs/new" element={<AdminBlogEditor />} />
          <Route path="/admin/blogs/edit/:id" element={<AdminBlogEditor />} />
          <Route path="/admin/batches" element={<AdminBatches />} />
          <Route path="/admin/batches/new" element={<AdminBatchEditor />} />
          <Route path="/admin/batches/edit/:id" element={<AdminBatchEditor />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/demos" element={<AdminDemos />} />
          <Route path="/admin/newsletters" element={<AdminNewsletters />} />
          <Route path="/admin/school-enrollments" element={<AdminSchoolEnrollments />} />
          <Route path="/admin/college-enrollments" element={<AdminCollegeEnrollments />} />
          <Route path="/admin/enrollments" element={<AdminEnrollments />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/teacher-applications" element={<AdminTeacherApplications />} />

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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
