import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import FeaturesSection from '../components/sections/FeaturesSection';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';

// --- Local Components ---

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
    <button
      onClick={toggleOpen}
      className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 focus:outline-none bg-white hover:bg-gray-50 transition-colors"
    >
      <span>{question}</span>
      <svg
        className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {isOpen && (
      <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 mt-2 bg-white">
        {answer}
      </div>
    )}
  </div>
);

const PrincipleCard = ({ icon, title, subtitle, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="mb-6">
      <img src={icon} alt={title} className="w-40 h-40 lg:w-48 lg:h-48 object-contain" />
    </div>
    <h3 className="text-xl font-bold text-black uppercase mb-1">{title}</h3>
    <p className="text-sm font-bold text-gray-500 uppercase mb-4">[{subtitle}]</p>
    <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
      {description}
    </p>
  </div>
);

const FounderCard = ({ image, name, role, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-8 lg:mb-24 text-center lg:text-left">
      <div className="w-full lg:w-1/3">
        <img src={image} alt={name} className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-[3/4] lg:aspect-auto" />
      </div>
      <div className="w-full lg:w-2/3">
        <h3 className="text-2xl lg:text-3xl font-bold text-black mb-1">{name}</h3>
        {role && <p className="text-[#1F9F90] font-medium mb-4 text-lg">{role}</p>}
        <div className="text-gray-600 leading-relaxed text-base lg:text-lg">
          <p className="hidden lg:block">{description}</p>
          <div className="lg:hidden flex flex-col items-center">
            {isExpanded && <p className="mb-4 text-left">{description}</p>}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#1F9F90] font-medium mt-2 border border-[#1F9F90] rounded px-6 py-2 text-sm hover:bg-[#1F9F90] hover:text-white transition-colors uppercase tracking-wide"
            >
              {isExpanded ? 'Read Less' : 'Read more'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const WhoAreWePage = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);

  // Carousel States
  const [currentJourneyIndex, setCurrentJourneyIndex] = useState(0);
  const [currentFounderIndex, setCurrentFounderIndex] = useState(0);
  const [currentPrincipleIndex, setCurrentPrincipleIndex] = useState(0);

  const principles = [
    { icon: '/images/about us/Group 1272628411.png', title: 'EINHEIT', subtitle: 'UNITY', description: 'We work collaboratively towards a common purpose and goals of providing the best value of investment for the The Language Networkier, focused learning and priority support from our team.' },
    { icon: '/images/about us/Group 1272628411-1.png', title: 'KAIZEN', subtitle: 'IMPROVEMENT', description: 'We embrace change and constantly innovate to help our students, colleagues and ourselves. We strive for constant improvement and adaptability each passing day.' },
    { icon: '/images/about us/Group 1272628411-2.png', title: 'RENXING', subtitle: 'HUMANITY', description: 'We are authentic in our interactions and communicate openly, honestly and respectfully. We act with integrity and fairness.' },
    { icon: '/images/about us/Group 1272628411-3.png', title: 'SUPERBIA', subtitle: 'PRIDE', description: 'We deliver the best possible learning experience to our students and take pride in our work with a pinch of arrogance, as they say in the capital ROME.' },
    { icon: '/images/about us/Group 1272628411-4.png', title: 'FRANC', subtitle: 'OPEN', description: 'We care for our students, each other, cultures and communities all across the world understanding that empathy makes us stronger.' }
  ];

  const journeyCards = [
    { text: "Revolutionizing Language Learning", corner: "top-left", position: "left-down" },
    { text: "Connecting People & Opportunities", corner: "top-right", position: "right-up" },
    { text: "Passionate Learners & Trainers", corner: "bottom-left", position: "left-down" },
    { text: "Diverse Language Courses", corner: "bottom-right", position: "right-up" }
  ];

  const founders = [
    {
      image: "/images/about us/Frame 1272628676.png",
      name: "Pinnac Yeddy",
      role: "CEO & Marketing Head",
      description: "Pinnac Yeddy, the CEO and Marketing Head of The Language Network, brings extensive marketing experience and passion to our team. He leads product development, branding, marketing, and business strategy, driving our vision for growth. Pinnac's approachable demeanor makes him a beloved co-founder, yet his true strength lies in his dedication to making The Language Network the largest language school. Beneath his friendly exterior is a visionary leader, committed to innovation and excellence. His genuine connections with others fuel our mission to empower learners worldwide, ensuring that each step we take aligns with our overarching goals. Pinnac's relentless pursuit of excellence continues to inspire and propel our organization to new heights."
    },
    {
      image: "/images/about us/Frame 1272628676-1.png",
      name: "Siddhi Chokhani",
      role: "Chief of Staff",
      description: "Siddhi Chokhani, the dynamic Chief of Staff at The Language Network. It was Siddhi's profound expertise in French that served as the catalyst for The Language Network's inception. As a C1 certified French trainer, Siddhi brings a wealth of linguistic knowledge and teaching experience to our team. Her lifelong passion for languages, which began in childhood, extends beyond French to include proficiency in German and Spanish. Responsible for overseeing operations, teacher management, and learning pedagogy, Siddhi ensures the seamless functioning of The Language Network's educational programs. With her bold personality and fearless creative approach to work and teaching, Siddhi inspires both our team and our students to reach new heights in language learning and personal growth."
    }
  ];

  const faqs = [
    { question: "What is The Language Network?", answer: "The Language Network revolutionizes language learning with diverse courses for all levels. Our engaging platform fosters cultural understanding and linguistic proficiency. Join our community of passionate learners and experienced trainers, and discover the power of language to connect people and open new doors." },
    { question: "Which languages does The Language Network teach?", answer: "We offer courses in French, German, Spanish, Korean, Japanese, Mandarin, and English." },
    { question: "Why learn with The Language Network?", answer: "We provide expert certified trainers, interactive sessions, free study materials, and a student-centric approach that ensures effective learning." },
    { question: "What makes The Language Network different from other language training schools?", answer: "Our focus on cultural immersion, personalized attention, small batch sizes, and ISO-certified curriculum sets us apart." },
    { question: "Where will the classes be conducted?", answer: "All classes are conducted online via our interactive platform, allowing you to learn from the comfort of your home." }
  ];

  const heroText1 = "Based in Mumbai, India, The Language Network has been meeting the rising demand for foreign language proficiency since 2020. Our ISO-certified courses cover French, German, Spanish, Korean, Japanese, Mandarin, and English, catering to learners of all ages.";
  const heroText2 = "We provide comprehensive preparation for globally recognized exams like TOEFL, IELTS, DELF, DALF, JLPT, and GOETHE, ensuring our students achieve their language goals confidently. Our mission is to make language education accessible and enjoyable for everyone, empowering learners to connect with the world through language.";

  const journeyText = "Our story originates from Siddhi's profound realization while feeling undervalued and underpaid at her job. Motivated by this experience and a vision to empower learners while creating new opportunities, Siddhi, alongside her childhood friends, Pinnac and Shubham, embarked on a transformative mission. Driven by their collective expertise and shared commitment, they recognized an untapped potential in the market and set out to fill the void. Despite lacking formal business training, their bold vision and unwavering determination propelled them forward. From humble beginnings, we've grown into a dynamic community of over 200+ trainers and have enriched the lives of 5000+ students. What began as a single language course has evolved into a comprehensive offering encompassing seven diverse foreign languages. Today, The Language Network stands as a testament to our unwavering dedication to making language learning accessible, engaging, and impactful for all.";

  // Helper for Corners in Mobile Carousel
  const getCornerClass = (corner) => {
    switch (corner) {
      case 'top-left': return 'top-0 left-0 rounded-br-[100%]';
      case 'top-right': return 'top-0 right-0 rounded-bl-[100%]';
      case 'bottom-left': return 'bottom-0 left-0 rounded-tr-[100%]';
      case 'bottom-right': return 'bottom-0 right-0 rounded-tl-[100%]';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 lg:py-24">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">Who Are We?</h1>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <div className="hidden lg:block space-y-6">
                  <p>{heroText1}</p>
                  <p>{heroText2}</p>
                </div>
                <div className="lg:hidden">
                  <p>{heroText1.substring(0, 150)}...</p>
                  {isHeroExpanded && (
                    <div className="mt-4 space-y-4">
                      <p>{heroText1.substring(150)}</p>
                      <p>{heroText2}</p>
                    </div>
                  )}
                  <button
                    onClick={() => setIsHeroExpanded(!isHeroExpanded)}
                    className="text-[#1F9F90] font-medium mt-2 focus:outline-none"
                  >
                    {isHeroExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end order-last lg:order-none mt-8 lg:mt-0">
              <img src="/images/TLN_logo_TM.jpg" alt="The Language Network" className="w-48 lg:w-full max-w-sm object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Mobile Carousel for Journey Cards */}
            <div className="lg:hidden w-full">
              <div className="bg-[#FAF9F6] p-6 rounded-3xl relative min-h-[220px] flex items-center justify-center text-center overflow-hidden shadow-sm mx-auto max-w-xs">
                <div className={`absolute w-20 h-20 bg-[#0D5C5C] ${getCornerClass(journeyCards[currentJourneyIndex].corner)}`}></div>
                <p className="text-[#0D5C5C] font-bold text-xl relative z-10 w-3/4 leading-snug">"{journeyCards[currentJourneyIndex].text}"</p>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentJourneyIndex(curr => (curr === 0 ? journeyCards.length - 1 : curr - 1))}
                  className="w-10 h-10 rounded-full border border-[#1F9F90] text-[#1F9F90] flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() => setCurrentJourneyIndex(curr => (curr + 1) % journeyCards.length)}
                  className="w-10 h-10 rounded-full border border-[#1F9F90] text-[#1F9F90] flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Desktop Grid for Journey Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-6 mt-24"> {/* Shifted Down */}
                <div className="bg-[#FAF9F6] p-6 rounded-3xl relative min-h-[180px] flex items-center justify-center text-center overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-[#0D5C5C] rounded-br-[100%]"></div>
                  <p className="text-[#0D5C5C] font-bold text-sm lg:text-base relative z-10 w-3/4 leading-snug">"Revolutionizing Language Learning"</p>
                </div>
                <div className="bg-[#FAF9F6] p-6 rounded-3xl relative min-h-[180px] flex items-center justify-center text-center overflow-hidden shadow-sm">
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#0D5C5C] rounded-tr-[100%]"></div>
                  <p className="text-[#0D5C5C] font-bold text-sm lg:text-base relative z-10 w-3/4 leading-snug">"Passionate Learners & Trainers"</p>
                </div>
              </div>
              <div className="flex flex-col gap-6"> {/* Shifted Up */}
                <div className="bg-[#FAF9F6] p-6 rounded-3xl relative min-h-[180px] flex items-center justify-center text-center overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#0D5C5C] rounded-bl-[100%]"></div>
                  <p className="text-[#0D5C5C] font-bold text-sm lg:text-base relative z-10 w-3/4 leading-snug">"Connecting People & Opportunities"</p>
                </div>
                <div className="bg-[#FAF9F6] p-6 rounded-3xl relative min-h-[180px] flex items-center justify-center text-center overflow-hidden shadow-sm">
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#0D5C5C] rounded-tl-[100%]"></div>
                  <p className="text-[#0D5C5C] font-bold text-sm lg:text-base relative z-10 w-3/4 leading-snug">"Diverse Language Courses"</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start lg:pl-10 order-first lg:order-none mb-8 lg:mb-0">
              <h2 className="text-4xl lg:text-6xl font-bold text-black">Our Journey</h2>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed text-justify hidden lg:block">
              {journeyText}
            </p>
            <div className="lg:hidden text-center">
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                {isJourneyExpanded ? journeyText : journeyText.substring(0, 150) + "..."}
              </p>
              <button
                onClick={() => setIsJourneyExpanded(!isJourneyExpanded)}
                className="text-[#1F9F90] font-medium mt-4 focus:outline-none"
              >
                {isJourneyExpanded ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">Our Principles</h2>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <PrincipleCard {...principles[currentPrincipleIndex]} />
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPrincipleIndex(curr => (curr === 0 ? principles.length - 1 : curr - 1))}
                className="w-10 h-10 rounded-full border border-[#1F9F90] text-[#1F9F90] flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setCurrentPrincipleIndex(curr => (curr + 1) % principles.length)}
                className="w-10 h-10 rounded-full border border-[#1F9F90] text-[#1F9F90] flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center mb-12">
              {principles.slice(0, 3).map((p, i) => (
                <PrincipleCard key={i} {...p} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
              {principles.slice(3, 5).map((p, i) => (
                <PrincipleCard key={i + 3} {...p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">Mission and Vision</h2>
          <div className="flex justify-center">
            <img src="/images/about us/Frame 1272629257.png" alt="Mission and Vision" className="w-full max-w-5xl h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Meet Our Co-Founders */}
      <section className="bg-[#FAF9F6] py-16 lg:py-24">
        <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12 lg:mb-20">Meet Our Co-Founders</h2>

          <div className="space-y-12">
            {founders.map((founder, index) => (
              <FounderCard key={index} {...founder} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <FeaturesSection />

      {/* FAQs */}
      <section className="bg-[#FAF9F6] py-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">FAQs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openFAQ === index} toggleOpen={() => setOpenFAQ(openFAQ === index ? -1 : index)} />
              ))}
              <div className="mt-8">
                <Button variant="outline" className="border-[#1F9F90] text-[#1F9F90] hover:bg-[#1F9F90] hover:text-white transition-colors">Read all FAQs</Button>
              </div>
            </div>
            <div className="hidden lg:block items-center justify-center">
              <img src="/images/kids/kidsfaq.png" alt="FAQ Illustration" className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg mx-auto" onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }} />
            </div>
          </div>
        </div>
      </section>

      {/* We're here to help */}
      <section className="bg-white py-20 text-center">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">We're here to help</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Get in touch for any queries or specific needs</p>
          <Link to="/contact">
            <Button size="large" className="text-white px-10 py-3 text-lg font-medium rounded h-12" style={{ backgroundColor: '#1F9F90' }}>
              Contact us
            </Button>
          </Link>
        </div>
      </section>

      {/* Bottom Banner */}
      <div className="bg-[#1F9F90] py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Learning. Simplified.</h2>
      </div>

      <PaymentMethodsSection />
    </div>
  );
};

export default WhoAreWePage;
