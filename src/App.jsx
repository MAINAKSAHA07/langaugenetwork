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
import MyMasteryKitsPage from './pages/MyMasteryKitsPage';
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
import AdminMasteryKitAccess from './admin/pages/AdminMasteryKitAccess';

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
          <Route path="/my-mastery-kits" element={<MyMasteryKitsPage />} />

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
          <Route path="/admin/mastery-kit-access" element={<AdminMasteryKitAccess />} />

          {/* Language Pages - New SEO-friendly URLs */}
          {/* Main language pages */}
          <Route path="/online-french-classes" element={<LanguagePageWrapper />} />
          <Route path="/online-german-classes" element={<LanguagePageWrapper />} />
          <Route path="/online-spanish-classes" element={<LanguagePageWrapper />} />
          <Route path="/online-english-classes" element={<LanguagePageWrapper />} />
          <Route path="/online-japanese-classes" element={<LanguagePageWrapper />} />
          <Route path="/online-korean-classes" element={<LanguagePageWrapper />} />
          <Route path="/online-mandarin-classes" element={<LanguagePageWrapper />} />

          {/* Kids pages */}
          <Route path="/online-french-classes-for-kids" element={<LanguagePageWrapper />} />
          <Route path="/online-german-classes-for-kids" element={<LanguagePageWrapper />} />
          <Route path="/online-spanish-classes-for-kids" element={<LanguagePageWrapper />} />
          <Route path="/online-english-classes-for-kids" element={<LanguagePageWrapper />} />
          <Route path="/online-japanese-classes-for-kids" element={<LanguagePageWrapper />} />
          <Route path="/online-korean-classes-for-kids" element={<LanguagePageWrapper />} />
          <Route path="/online-mandarin-classes-for-kids" element={<LanguagePageWrapper />} />

          {/* Adults pages */}
          <Route path="/online-french-classes-for-adults" element={<LanguagePageWrapper />} />
          <Route path="/online-german-classes-for-adults" element={<LanguagePageWrapper />} />
          <Route path="/online-spanish-classes-for-adults" element={<LanguagePageWrapper />} />
          <Route path="/online-english-classes-for-adults" element={<LanguagePageWrapper />} />
          <Route path="/online-japanese-classes-for-adults" element={<LanguagePageWrapper />} />
          <Route path="/online-korean-classes-for-adults" element={<LanguagePageWrapper />} />
          <Route path="/online-mandarin-classes-for-adults" element={<LanguagePageWrapper />} />

          {/* Study abroad pages */}
          <Route path="/online-french-classes-to-study-abroad" element={<LanguagePageWrapper />} />
          <Route path="/online-german-classes-to-study-abroad" element={<LanguagePageWrapper />} />
          <Route path="/online-spanish-classes-to-study-abroad" element={<LanguagePageWrapper />} />
          <Route path="/online-english-classes-to-study-abroad" element={<LanguagePageWrapper />} />
          <Route path="/online-japanese-classes-to-study-abroad" element={<LanguagePageWrapper />} />
          <Route path="/online-korean-classes-to-study-abroad" element={<LanguagePageWrapper />} />
          <Route path="/online-mandarin-classes-to-study-abroad" element={<LanguagePageWrapper />} />

          {/* Level pages - French */}
          <Route path="/french-beginner-level-a1-a2" element={<LanguagePageWrapper />} />
          <Route path="/french-intermediate-level-b1-b2" element={<LanguagePageWrapper />} />
          <Route path="/french-advanced-level-c1-c2" element={<LanguagePageWrapper />} />

          {/* Level pages - German */}
          <Route path="/german-beginner-level-a1-a2" element={<LanguagePageWrapper />} />
          <Route path="/german-for-intermediate-level-b1-b2" element={<LanguagePageWrapper />} />
          <Route path="/german-advanced-level-c1-c2" element={<LanguagePageWrapper />} />

          {/* Level pages - Spanish */}
          <Route path="/spanish-beginner-level-a1-a2" element={<LanguagePageWrapper />} />
          <Route path="/spanish-intermediate-level-b1-b2" element={<LanguagePageWrapper />} />
          <Route path="/spanish-advanced-level-c1-c2" element={<LanguagePageWrapper />} />

          {/* Level pages - Korean */}
          <Route path="/korean-beginner-topik1-level1-2" element={<LanguagePageWrapper />} />
          <Route path="/korean-beginner-topik1-1-2" element={<LanguagePageWrapper />} />
          <Route path="/korean-intermediate-level-topik2-3-4" element={<LanguagePageWrapper />} />
          <Route path="/korean-intermediate-topik2-3-4" element={<LanguagePageWrapper />} />
          <Route path="/korean-advanced-level-topik2-5-6" element={<LanguagePageWrapper />} />
          <Route path="/korean-advanced-topik2-5-6" element={<LanguagePageWrapper />} />

          {/* Level pages - Mandarin */}
          <Route path="/mandarin-beginner-level-hsk1-hsk2" element={<LanguagePageWrapper />} />
          <Route path="/mandarin-beginner-hsk1-hsk2" element={<LanguagePageWrapper />} />
          <Route path="/mandarin-intermediate-level-hsk3-hsk4" element={<LanguagePageWrapper />} />
          <Route path="/mandarin-intermediate-hsk3-hsk4" element={<LanguagePageWrapper />} />
          <Route path="/mandarin-advanced-level-hsk5-hsk6" element={<LanguagePageWrapper />} />
          <Route path="/mandarin-advanced-hsk5-hsk6" element={<LanguagePageWrapper />} />

          {/* Level pages - Japanese */}
          <Route path="/japanese-beginner-n5-level" element={<LanguagePageWrapper />} />
          <Route path="/japanese-beginner-n5" element={<LanguagePageWrapper />} />
          <Route path="/japanese-intermediate-level-n4-n3" element={<LanguagePageWrapper />} />
          <Route path="/japanese-intermediate-n4-n3" element={<LanguagePageWrapper />} />
          <Route path="/japanese-advanced-level-n2-n1" element={<LanguagePageWrapper />} />
          <Route path="/japanese-advanced-n2-n1" element={<LanguagePageWrapper />} />

          {/* Level pages - English */}
          <Route path="/english-beginner-level-a1-a2" element={<LanguagePageWrapper />} />
          <Route path="/english-beginner-a1-a2" element={<LanguagePageWrapper />} />
          <Route path="/english-intermediate-level-b1-b2" element={<LanguagePageWrapper />} />
          <Route path="/english-intermediate-b1-b2" element={<LanguagePageWrapper />} />
          <Route path="/english-advanced-level-c1-c2" element={<LanguagePageWrapper />} />
          <Route path="/english-advanced-c1-c2" element={<LanguagePageWrapper />} />

          {/* Exam pages - French */}
          <Route path="/delf-proficiency-exam" element={<LanguagePageWrapper />} />
          <Route path="/dalf-proficiency-exam" element={<LanguagePageWrapper />} />
          <Route path="/tef-proficiency-exam" element={<LanguagePageWrapper />} />
          <Route path="/delf-preparation-classes" element={<LanguagePageWrapper />} />
          <Route path="/dalf-preparation-classes" element={<LanguagePageWrapper />} />
          <Route path="/tef-preparation-classes" element={<LanguagePageWrapper />} />

          {/* Exam pages - German */}
          <Route path="/goethe-preparation-classes" element={<LanguagePageWrapper />} />

          {/* Exam pages - Spanish */}
          <Route path="/siele-preparation-classes" element={<LanguagePageWrapper />} />

          {/* Exam pages - Korean */}
          <Route path="/topik-preparation-classes" element={<LanguagePageWrapper />} />
          <Route path="/dele-preparation-classes" element={<LanguagePageWrapper />} />

          {/* Exam pages - Mandarin */}
          <Route path="/hsk-preparation-classes" element={<LanguagePageWrapper />} />

          {/* Exam pages - Japanese */}
          <Route path="/jlpt-prepration-classes" element={<LanguagePageWrapper />} />

          {/* Exam pages - English */}
          <Route path="/ielts-preparation-classes" element={<LanguagePageWrapper />} />
          <Route path="/toefl-preparation-classes" element={<LanguagePageWrapper />} />

          {/* Legacy Language Pages - Must be last to avoid conflicts */}
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
