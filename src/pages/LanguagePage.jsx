import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import StatisticsBar from '../components/sections/StatisticsBar';
import FAQSection from '../components/sections/FAQSection';
import DemoForm from '../components/sections/DemoForm';
import { languageData } from '../data/languageData';
import pb from '../api/pocketbase';

const LanguagePage = () => {
  const { language } = useParams();
  const data = languageData[language] || languageData.french;

  // Demo form state
  const [showDemo, setShowDemo] = useState(false);
  const onDemoClick = () => setShowDemo(true);

  // Brochure URL mapping for adults (kids would use different URLs)
  const brochureUrls = {
    french: 'https://drive.google.com/file/d/1cvvxoUFuXQXLRHkxAIVQzmi0KjvbyA74/view?usp=share_link',
    german: 'https://drive.google.com/file/d/1cvvxoUFuXQXLRHkxAIVQzmi0KjvbyA74/view?usp=share_link',
    spanish: 'https://drive.google.com/file/d/1cvvxoUFuXQXLRHkxAIVQzmi0KjvbyA74/view?usp=share_link',
    english: 'https://drive.google.com/file/d/1cvvxoUFuXQXLRHkxAIVQzmi0KjvbyA74/view?usp=share_link',
    japanese: 'https://drive.google.com/file/d/1cvvxoUFuXQXLRHkxAIVQzmi0KjvbyA74/view?usp=share_link',
    korean: 'https://drive.google.com/file/d/1cvvxoUFuXQXLRHkxAIVQzmi0KjvbyA74/view?usp=share_link',
    mandarin: 'https://drive.google.com/file/d/1cvvxoUFuXQXLRHkxAIVQzmi0KjvbyA74/view?usp=share_link',
  };

  // Get brochure URL for current language (adults only for now)
  const brochureUrl = brochureUrls[language] || null;

  // State for mobile carousels
  const [currentClassIndex, setCurrentClassIndex] = useState(0);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  // Newsletter submit handler
  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');
    try {
      await pb.collection('newsletter_subscribers').create({
        email: newsletterEmail,
        active: true
      });
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  // Data Arrays
  const classesData = [
    {
      image: data.kidsImage,
      title: `${data.name} Classes for Kids`,
      description: "Dive into French fun with interactive online classes designed to spark excitement and curiosity in young learners!"
    },
    {
      image: data.adultImage,
      title: `${data.name} Classes for Adults`,
      description: "Embark on a journey to French fluency with dynamic online classes tailored to fit your busy lifestyle and ignite your passion for language learning!"
    },
    {
      image: data.abroadImage,
      title: `${data.name} Classes to Study Abroad`,
      description: "Prepare for your French adventure with immersive online classes that will equip you with the language skills and cultural insights needed to thrive abroad!"
    }
  ];

  const goalsData = [
    {
      image: data.schoolImage,
      title: `${data.name} Classes for School`,
      description: "Spark excitement with our online French classes for kids! Whether it's curriculum-based or as a hobby, we make learning engaging and enjoyable."
    },
    {
      image: data.collegeImage,
      title: `${data.name} Classes for College`,
      description: "Dive into French fluency with our flexible online classes tailored to fit your college schedule. Explore the language, culture, and opportunities that await!"
    },
    {
      image: data.corporateImage,
      title: `${data.name} Classes for Corporate`,
      description: "Elevate your French skills with our customized online classes. Whether you're an individual seeking personal growth or a company fostering a global mindset, we're here to help you thrive!",
      trending: true
    }
  ];

  const levelsData = [
    {
      level: "A1-A2",
      title: "Beginner Classes",
      description: `Start your ${data.name} language journey with our engaging online classes designed for beginners. Learn fundamental grammar, vocabulary, and practical conversation skills at your own pace with our expert instructors' guidance.`
    },
    {
      level: "B1-B2",
      title: "Intermediate Classes",
      description: `Elevate your ${data.name} proficiency with our online intermediate classes. Refine pronunciation, expand vocabulary, and master complex grammar structures to confidently engage in conversations and express yourself fluently.`
    },
    {
      level: "C1-C2",
      title: "Advanced Classes",
      description: `Advance your ${data.name} skills to the highest level with our online advanced classes. Enhance your conversational abilities, master complex grammar, and increase career prospects with fluent proficiency in ${data.name}.`
    }
  ];

  // Helper for Carousel Navigation
  const getNav = (currentIndex, setIndex, length) => ({
    next: () => setIndex((prev) => (prev + 1) % length),
    prev: () => setIndex((prev) => (prev === 0 ? length - 1 : prev - 1)),
  });

  const classNav = getNav(currentClassIndex, setCurrentClassIndex, classesData.length);
  const goalNav = getNav(currentGoalIndex, setCurrentGoalIndex, goalsData.length);
  const examNav = getNav(currentExamIndex, setCurrentExamIndex, data.exams.length);
  const levelNav = getNav(currentLevelIndex, setCurrentLevelIndex, levelsData.length);
  const reasonNav = getNav(currentReasonIndex, setCurrentReasonIndex, data.whyLearn.reasons.length);

  // Reusable Carousel Controls Component
  const CarouselControls = ({ onPrev, onNext }) => (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={onPrev}
        className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="bg-white">
      {/* SECTION 1: HERO SECTION */}
      <section className="bg-white pt-0 pb-2 lg:pb-4">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-start">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 pt-4 lg:pt-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy mb-6 lg:mb-8 leading-tight">
                Online {data.name} Classes
              </h1>
              <p className="text-base lg:text-lg text-gray-700 mb-8 lg:mb-10 leading-loose">
                {data.description}
              </p>
              <Button
                onClick={() => setShowDemo(true)}
                size="large"
                className="text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold hover:scale-100 hover:shadow-none"
                style={{ backgroundColor: '#1F9F90' }}
              >
                Get started
              </Button>
            </div>

            {/* Right Side - Hero Image */}
            <div className="order-1 lg:order-2 relative -mt-12 lg:-mt-8">
              <div className="relative w-full max-w-xl mx-auto">
                <img
                  src={data.heroImage}
                  alt={`${data.name} Learning`}
                  className="w-full h-auto object-contain rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATISTICS BAR */}
      <StatisticsBar />

      {/* SECTION 3: ONLINE LANGUAGE CLASSES (Kids, Adults, Small Batch) */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-10 md:mb-12 lg:mb-16">
            Online {data.name} classes
          </h2>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <ClassCard
              image={classesData[currentClassIndex].image}
              title={classesData[currentClassIndex].title}
              description={classesData[currentClassIndex].description}
              onLearnMore={onDemoClick}
            />
            <CarouselControls onPrev={classNav.prev} onNext={classNav.next} />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {classesData.map((item, index) => (
              <ClassCard
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                onLearnMore={onDemoClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ONLINE CLASSES FOR ANY GOAL */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-10 md:mb-12 lg:mb-16">
            Online {data.name} classes for any goal
          </h2>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <GoalCard
              image={goalsData[currentGoalIndex].image}
              title={goalsData[currentGoalIndex].title}
              description={goalsData[currentGoalIndex].description}
              trending={goalsData[currentGoalIndex].trending}
              onLearnMore={onDemoClick}
            />
            <CarouselControls onPrev={goalNav.prev} onNext={goalNav.next} />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {goalsData.map((item, index) => (
              <GoalCard
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                trending={item.trending}
                onLearnMore={onDemoClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PREPARE FOR LANGUAGE EXAMS */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-10 md:mb-12 lg:mb-16">
            Prepare for {data.name} exams
          </h2>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            {data.exams.length > 0 && (
              <>
                <ExamCard exam={data.exams[currentExamIndex]} onLearnMore={onDemoClick} />
                <CarouselControls onPrev={examNav.prev} onNext={examNav.next} />
              </>
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:flex md:flex-wrap justify-center gap-6 lg:gap-8">
            {data.exams.map((exam, index) => (
              <ExamCard key={index} exam={exam} onLearnMore={onDemoClick} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CLASSES FOR ANY LEVEL */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-10 md:mb-12 lg:mb-16">
            {data.name} Classes for Any Level
          </h2>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <LevelCard
              level={levelsData[currentLevelIndex].level}
              title={levelsData[currentLevelIndex].title}
              description={levelsData[currentLevelIndex].description}
              onBookDemo={onDemoClick}
            />
            <CarouselControls onPrev={levelNav.prev} onNext={levelNav.next} />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {levelsData.map((item, index) => (
              <LevelCard
                key={index}
                level={item.level}
                title={item.title}
                description={item.description}
                onBookDemo={onDemoClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY LEARN LANGUAGE */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-10 md:mb-12 lg:mb-16">
            Why learn {data.name}?
          </h2>

          {/* Mobile Stack */}
          <div className="md:hidden space-y-4 mb-8">
            <ReasonCard
              title={data.whyLearn.reasons[currentReasonIndex].title}
              description={data.whyLearn.reasons[currentReasonIndex].description}
            />
            <CarouselControls onPrev={reasonNav.prev} onNext={reasonNav.next} />
          </div>

          {/* Desktop Layout with Diagram */}
          <div className="hidden md:block max-w-7xl mx-auto">
            {/* 3-Column Layout: Left Cards | Center Diagram | Right Cards */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 mb-8 min-h-[500px]">
              {/* Left Column - 2 Cards Stacked with Stagger */}
              <div className="relative min-h-[500px]">
                <div className="absolute top-0 -ml-16 lg:-ml-24">
                  <div className="w-64 lg:w-72 h-[200px]">
                    <ReasonCard
                      title={data.whyLearn.reasons[0].title}
                      description={data.whyLearn.reasons[0].description}
                    />
                  </div>
                </div>
                <div className="absolute top-[220px] ml-8 lg:ml-12">
                  <div className="w-64 lg:w-72 h-[200px]">
                    <ReasonCard
                      title={data.whyLearn.reasons[1].title}
                      description={data.whyLearn.reasons[1].description}
                    />
                  </div>
                </div>
              </div>

              {/* Center Column - Diagram */}
              <div className="flex justify-center items-center px-4 py-8">
                <div className="w-full max-w-md lg:max-w-lg">
                  <img
                    src="/images/languagepages.png"
                    alt="Why Learn Diagram"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Column - 2 Cards Stacked with Stagger */}
              <div className="relative min-h-[500px]">
                <div className="absolute top-0 -mr-16 lg:-mr-24 right-0">
                  <div className="w-64 lg:w-72 h-[200px]">
                    <ReasonCard
                      title={data.whyLearn.reasons[2].title}
                      description={data.whyLearn.reasons[2].description}
                    />
                  </div>
                </div>
                <div className="absolute top-[220px] mr-8 lg:mr-12 right-0">
                  <div className="w-64 lg:w-72 h-[200px]">
                    <ReasonCard
                      title={data.whyLearn.reasons[3].title}
                      description={data.whyLearn.reasons[3].description}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card - Centered */}
            <div className="max-w-md lg:max-w-lg mx-auto mt-10">
              <ReasonCard
                title={data.whyLearn.reasons[4].title}
                description={data.whyLearn.reasons[4].description}
              />
            </div>
          </div>

          <div className="text-center mt-10 md:mt-12">
            <button
              onClick={onDemoClick}
              className="px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
            >
              Book a free demo
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQs */}
      <FAQSection faqs={data.faqs} />

      {/* SECTION 8: Everything You Need to Know */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-navy text-center mb-12 lg:mb-16 leading-tight">
            Everything you need to know about {data.name}
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary-navy mb-4">
                Why is it important to excel at {data.name} exams?
              </h3>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  Excelling in {data.name} exams holds significant importance beyond simply obtaining good grades.
                  Firstly, proficiency in {data.name} significantly enhances communication skills. {data.name} is
                  spoken in numerous countries around the world{data.name === 'French' ? ' and is one of the official languages of international organizations like the United Nations and the International Red Cross' : ''}.
                  Therefore, mastering {data.name} provides individuals with the ability to communicate effectively
                  with a diverse range of people, opening up opportunities for cultural exchange, collaboration, and friendship.
                </p>
                <p>
                  Moreover, excelling in {data.name} exams fosters a deeper understanding of different cultures.
                  Language and culture are intricately connected, and by learning {data.name}, individuals gain
                  insight into the customs, traditions, and perspectives of {data.name}-speaking communities. This
                  cultural understanding promotes tolerance, empathy, and appreciation for diversity, qualities that
                  are invaluable in today's interconnected world.
                </p>
                <p>
                  Furthermore, proficiency in {data.name} enhances global connectivity. In an increasingly globalized
                  society, the ability to speak multiple languages, including {data.name}, facilitates international
                  cooperation, trade, and diplomacy. Whether in business, politics, or academia, individuals who excel
                  in {data.name} exams have a competitive edge in navigating global networks and building meaningful
                  relationships across borders.
                </p>
                <p>
                  Additionally, mastering a second language like {data.name} has cognitive benefits. Research has shown
                  that learning a new language stimulates brain activity, improves memory retention, and enhances
                  problem-solving skills. These cognitive benefits extend beyond language learning and can positively
                  impact academic performance, career prospects, and overall cognitive function.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA with Greeting */}
      <section className="pt-16 lg:pt-20 pb-0" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8">
            {data.greeting}!
          </h2>
          <p className="text-xl lg:text-2xl text-white mb-8 lg:mb-10 leading-relaxed">
            Ready to begin your {data.name} learning journey?
          </p>
          <Button
            onClick={() => setShowDemo(true)}
            className="px-12 py-4 text-lg font-semibold hover:scale-100 hover:shadow-none"
            size="large"
            style={{ backgroundColor: 'white', color: '#1F9F90' }}
          >
            Get started today
          </Button>
        </div>
      </section>

      {/* SECTION 10: NEWSLETTER */}
      <section className="pt-12 pb-16 lg:pb-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe to our newsletter</h3>
            <p className="text-white/90 mb-8 text-lg">Get language learning tips and updates delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg focus:ring-2 focus:ring-white outline-none text-gray-800"
              />
              <button
                onClick={handleNewsletterSubmit}
                disabled={newsletterStatus === 'loading'}
                className="px-8 py-4 bg-white rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 whitespace-nowrap"
                style={{ color: '#1F9F90' }}
              >
                {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {newsletterStatus === 'success' && (
              <p className="text-white mt-6 text-lg font-medium">✓ Successfully subscribed!</p>
            )}
            {newsletterStatus === 'error' && (
              <p className="text-white mt-6 text-lg font-medium">✗ Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </section>

      {/* Demo Form Modal */}
      <DemoForm
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        brochureUrl={brochureUrl}
      />
    </div >
  );
};

// Component: Class Card
const ClassCard = ({ image, title, description, onLearnMore }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-w-sm mx-auto md:max-w-none flex flex-col">
    <div className="h-48 md:h-52 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-5 md:p-6 flex-grow flex flex-col">
      <h3 className="text-lg md:text-xl font-semibold text-[#0D5C5C] mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      <button
        onClick={onLearnMore}
        className="w-full py-3 rounded-lg font-semibold transition-all duration-300 border-2"
        style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
      >
        Learn more →
      </button>
    </div>
  </div>
);

// Component: Goal Card
const GoalCard = ({ image, title, description, trending, onLearnMore }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl max-w-sm mx-auto md:max-w-none relative flex flex-col">
    {trending && (
      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        TRENDING
      </div>
    )}
    <div className="mb-5 flex justify-center">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4"
        style={{ borderColor: '#1F9F90' }}
      />
    </div>
    <h3 className="text-lg md:text-xl font-semibold text-[#0D5C5C] mb-3">
      {title}
    </h3>
    <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
      {description}
    </p>
    <button
      onClick={onLearnMore}
      className="w-full py-3 rounded-lg font-semibold transition-all duration-300 border-2"
      style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
    >
      Learn more →
    </button>
  </div>
);

// Component: Exam Card
const ExamCard = ({ exam, onLearnMore }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-10 text-center shadow-md transition-all duration-300 hover:shadow-xl min-w-[280px] max-w-[350px] mx-auto">
    <div className="mb-6 flex justify-center">
      <img
        src={exam.logo}
        alt={exam.name}
        className="h-20 md:h-24 w-auto object-contain"
      />
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-secondary-navy mb-4">
      {exam.name}
    </h3>
    <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
      {exam.description}
    </p>
    <button
      onClick={onLearnMore}
      className="px-6 py-2.5 border rounded-lg font-medium transition-all duration-300"
      style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
    >
      Learn more
    </button>
  </div>
);

// Component: Level Card
const LevelCard = ({ level, title, description, onBookDemo }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md max-w-sm mx-auto md:max-w-none border border-gray-200">
    {/* Light Teal Header */}
    <div className="p-8 md:p-10 text-center" style={{ backgroundColor: '#D9F1EE' }}>
      <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1F9F90' }}>
        {level}
      </h3>
      <h4 className="text-xl md:text-2xl font-semibold text-secondary-navy">
        {title}
      </h4>
    </div>

    {/* White Content Area */}
    <div className="p-8 md:p-10 text-center">
      <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
        {description}
      </p>
      <button
        onClick={onBookDemo}
        className="w-full text-white py-3.5 rounded-lg font-semibold transition-all duration-300 border-2"
        style={{ backgroundColor: '#1F9F90', borderColor: '#1F9F90' }}
      >
        Learn more →
      </button>
    </div>
  </div>
);

// Component: Reason Card
const ReasonCard = ({ title, description }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 h-full flex flex-col">
    {/* Light Teal Header */}
    <div className="p-4 md:p-5 text-center min-h-[72px] flex items-center justify-center" style={{ backgroundColor: '#D9F1EE' }}>
      <h4 className="text-base md:text-lg font-semibold text-[#0D5C5C]">
        {title}
      </h4>
    </div>
    {/* White Content */}
    <div className="p-4 md:p-5 text-center flex-1 flex items-center justify-center">
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default LanguagePage;
