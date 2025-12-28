import React, { useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import StatisticsBar from '../components/sections/StatisticsBar';
import NewsSection from '../components/sections/NewsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import LanguageCoursesSection from '../components/sections/LanguageCoursesSection';
import UpcomingBatchesSection from '../components/sections/UpcomingBatchesSection';
import CEFRLevelsSection from '../components/sections/CEFRLevelsSection';
import InternationalExamsSection from '../components/sections/InternationalExamsSection';
import LanguageTripSection from '../components/sections/LanguageTripSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AlumniNetworkSection from '../components/sections/AlumniNetworkSection';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';
import DemoForm from '../components/sections/DemoForm';

const HomePage = () => {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

  return (
    <div>
      <HeroSection onCreateAccount={() => setIsDemoFormOpen(true)} />
      <StatisticsBar />
      <NewsSection />
      <FeaturesSection />
      <LanguageCoursesSection />
      <UpcomingBatchesSection />
      <CEFRLevelsSection onEnquire={() => setIsDemoFormOpen(true)} />
      <InternationalExamsSection />
      <LanguageTripSection 
        onRegister={() => setIsDemoFormOpen(true)}
        onDemo={() => setIsDemoFormOpen(true)}
      />
      <TestimonialsSection />
      <AlumniNetworkSection />
      <PaymentMethodsSection />

      <DemoForm
        isOpen={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
      />
    </div>
  );
};

export default HomePage;
