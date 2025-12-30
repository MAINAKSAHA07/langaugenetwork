import React, { useEffect } from 'react';
import HeroSection from '../components/mastery/HeroSection';
import ProblemSection from '../components/mastery/ProblemSection';
import StorySection from '../components/mastery/StorySection';
import PromiseSection from '../components/mastery/PromiseSection';
import ValueBreakdownSection from '../components/mastery/ValueBreakdownSection';
import ContentModulesSection from '../components/mastery/ContentModulesSection';
import BonusSection from '../components/mastery/BonusSection';
import WhoIsThisForSection from '../components/mastery/WhoIsThisForSection';
import OutcomeSection from '../components/mastery/OutcomeSection';
import ObjectionsSection from '../components/mastery/ObjectionsSection';
import PhilosophySection from '../components/mastery/PhilosophySection';
import FinalCTASection from '../components/mastery/FinalCTASection';
import TermsSection from '../components/mastery/TermsSection';

const MasteryKitPage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans text-[#333333] bg-white">
            <HeroSection />
            <ProblemSection />
            <StorySection />
            <PromiseSection />
            <ValueBreakdownSection />
            <ContentModulesSection />
            <BonusSection />
            <WhoIsThisForSection />
            <OutcomeSection />
            <ObjectionsSection />
            <PhilosophySection />
            <FinalCTASection />
            <TermsSection />
        </div>
    );
};

export default MasteryKitPage;
