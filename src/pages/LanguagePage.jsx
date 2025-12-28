import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import StatisticsBar from '../components/sections/StatisticsBar';
import FAQSection from '../components/sections/FAQSection';
import { languageData } from '../data/languageData';

const LanguagePage = () => {
  const { language } = useParams();
  const data = languageData[language] || languageData.french;
  const [onDemoClick] = useState(() => () => { });

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
                onClick={onDemoClick}
                size="large"
                className="text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold"
                style={{ backgroundColor: '#1F9F90' }}
              >
                Get started
              </Button>
            </div>

            {/* Right Side - Hero Image */}
            <div className="order-1 lg:order-2 relative -mt-4 lg:-mt-8">
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
              image={data.kidsImage}
              title={`${data.name} Class for kids`}
              description="Engaging language programs designed specifically for young learners, making education fun and interactive through age-appropriate content and activities."
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <ClassCard
              image={data.kidsImage}
              title={`${data.name} Class for kids`}
              description="Engaging language programs designed specifically for young learners, making education fun and interactive through age-appropriate content and activities."
            />
            <ClassCard
              image={data.adultImage}
              title={`${data.name} Class for adults`}
              description="Comprehensive language courses for adult learners focusing on practical communication skills, professional vocabulary, and cultural understanding."
            />
            <ClassCard
              image={data.adultImage}
              title={`Regular ${data.name} in Small Batch`}
              description="Intimate class sizes ensuring personalized attention, better interaction with instructors, and faster progress in your language learning journey."
            />
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
              image={data.adultImage}
              title={`Learn ${data.name} for Travel`}
              description="Master essential phrases and conversation skills for traveling, ordering food, asking directions, and connecting with locals during your adventures abroad."
              trending={true}
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <GoalCard
              image={data.adultImage}
              title={`Learn ${data.name} for Travel`}
              description="Master essential phrases and conversation skills for traveling, ordering food, asking directions, and connecting with locals during your adventures abroad."
              trending={true}
            />
            <GoalCard
              image={data.adultImage}
              title={`Prepare for ${data.name} Exams`}
              description="Structured preparation for official language proficiency exams with targeted practice, test strategies, and comprehensive skill development."
            />
            <GoalCard
              image={data.adultImage}
              title={`Learn ${data.name} for Career`}
              description="Advance your professional prospects with business language skills, industry-specific vocabulary, and communication techniques for global workplace success."
            />
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
            {data.exams[0] && (
              <ExamCard exam={data.exams[0]} />
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:flex md:flex-wrap justify-center gap-6 lg:gap-8">
            {data.exams.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
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
              level="A1-A2"
              title="Pre A1- Pre A2"
              language={data.name}
              points={[
                `A1 A2 level students can engage in basic conversations, introduce themselves, and understand simple phrases`,
                `Introduce yourself to the basics of ${data.name} with foundational vocabulary and grammar`,
                `Grasp essential phrases necessary for everyday needs and interactions`,
                `Comprehend and use common expressions in simple social settings`
              ]}
              onBookDemo={onDemoClick}
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <LevelCard
              level="A1-A2"
              title="Pre A1- Pre A2"
              language={data.name}
              points={[
                `A1 A2 level students can engage in basic conversations, introduce themselves, and understand simple phrases`,
                `Introduce yourself to the basics of ${data.name} with foundational vocabulary and grammar`,
                `Grasp essential phrases necessary for everyday needs and interactions`,
                `Comprehend and use common expressions in simple social settings`
              ]}
              onBookDemo={onDemoClick}
            />
            <LevelCard
              level="B1-B2"
              title="Pre B1- Pre B2"
              language={data.name}
              points={[
                `B1 B2 level students can comprehend complex sentences and identify the main ideas in texts`,
                `Express yourself clearly on wide range of topics related to personal interests and work`,
                `Engage in conversations with native speakers fluently and spontaneously`,
                `Produce detailed text on wide range of subjects with clear organization`
              ]}
              onBookDemo={onDemoClick}
            />
            <LevelCard
              level="C1-C2"
              title="Pre C1- Pre C2"
              language={data.name}
              points={[
                `C1 C2 level students can understand complex texts and express ideas fluently and spontaneously`,
                `Comprehend virtually everything heard or read with ease and precision`,
                `Express yourself spontaneously with high degree of grammatical accuracy`,
                `Use ${data.name} flexibly and effectively for all purposes, academic and professional`
              ]}
              onBookDemo={onDemoClick}
            />
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
            {data.whyLearn.reasons.map((reason, index) => (
              <ReasonCard
                key={index}
                title={reason.title}
                description={reason.description}
              />
            ))}
          </div>

          {/* Desktop Layout with Diagram */}
          <div className="hidden md:block max-w-7xl mx-auto">
            {/* 3-Column Layout: Left Cards | Center Diagram | Right Cards */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center mb-8">
              {/* Left Column - 2 Cards Stacked */}
              <div className="space-y-6">
                <ReasonCard
                  title={data.whyLearn.reasons[0].title}
                  description={data.whyLearn.reasons[0].description}
                />
                <ReasonCard
                  title={data.whyLearn.reasons[1].title}
                  description={data.whyLearn.reasons[1].description}
                />
              </div>

              {/* Center Column - Diagram */}
              <div className="flex justify-center">
                <div className="w-full max-w-md lg:max-w-lg">
                  <img
                    src="/images/languagepages.png"
                    alt="Why Learn Diagram"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Column - 2 Cards Stacked */}
              <div className="space-y-6">
                <ReasonCard
                  title={data.whyLearn.reasons[2].title}
                  description={data.whyLearn.reasons[2].description}
                />
                <ReasonCard
                  title={data.whyLearn.reasons[3].title}
                  description={data.whyLearn.reasons[3].description}
                />
              </div>
            </div>

            {/* Bottom Card - Centered */}
            <div className="max-w-2xl mx-auto mt-10">
              <ReasonCard
                title={data.whyLearn.reasons[4].title}
                description={data.whyLearn.reasons[4].description}
              />
            </div>
          </div>

          <div className="text-center mt-10 md:mt-12">
            <button
              onClick={onDemoClick}
              className="px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 hover:text-white"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1F9F90'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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

          <div className="text-center mt-12">
            <a
              href="#more"
              className="inline-block text-lg font-semibold hover:underline transition-all duration-300"
              style={{ color: '#1F9F90' }}
            >
              Read more
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA with Greeting */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8">
            {data.greeting}!
          </h2>
          <p className="text-xl lg:text-2xl text-white mb-8 lg:mb-10 leading-relaxed">
            Ready to begin your {data.name} learning journey?
          </p>
          <Button
            onClick={onDemoClick}
            className="bg-white text-[#1F9F90] hover:bg-gray-100 px-12 py-4 text-lg font-semibold"
            size="large"
          >
            Get started today
          </Button>
        </div>
      </section>
    </div>
  );
};

// Component: Class Card
const ClassCard = ({ image, title, description }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-w-sm mx-auto md:max-w-none">
    <div className="h-48 md:h-52 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-5 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-[#0D5C5C] mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

// Component: Goal Card
const GoalCard = ({ image, title, description, trending }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl max-w-sm mx-auto md:max-w-none relative">
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
    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

// Component: Exam Card
const ExamCard = ({ exam }) => (
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
      className="px-6 py-2.5 border rounded-lg font-medium transition-all duration-300 hover:text-white"
      style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#1F9F90'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
    >
      Learn more
    </button>
  </div>
);

// Component: Level Card
const LevelCard = ({ level, title, language, points, onBookDemo }) => (
  <div className="bg-[#F0FAF8] rounded-xl p-6 md:p-8 shadow-sm max-w-sm mx-auto md:max-w-none">
    <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1F9F90' }}>
      {level}
    </h3>
    <h4 className="text-lg md:text-xl font-semibold text-[#0D5C5C] mb-5">
      {title}
    </h4>
    <ul className="space-y-3 mb-6">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: '#1F9F90' }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onBookDemo}
      className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:brightness-110"
      style={{ backgroundColor: '#1F9F90' }}
    >
      Book a free demo
    </button>
  </div>
);

// Component: Reason Card
const ReasonCard = ({ title, description }) => (
  <div className="bg-[#F0FAF8] rounded-xl p-5 md:p-6 text-center shadow-sm">
    <h4 className="text-base md:text-lg font-semibold text-[#0D5C5C] mb-2">
      {title}
    </h4>
    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

export default LanguagePage;
