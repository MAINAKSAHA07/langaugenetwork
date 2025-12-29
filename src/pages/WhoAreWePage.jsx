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

const FounderCard = ({ image, name, role, description, reverse }) => (
  <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} gap-8 lg:gap-12 items-center mb-16 lg:mb-24`}>
    <div className="w-full lg:w-1/3">
      <img src={image} alt={name} className="w-full h-auto rounded-2xl shadow-lg object-cover" />
    </div>
    <div className="w-full lg:w-2/3 text-left">
      <h3 className="text-3xl font-bold text-black mb-2">{name}</h3>
      {role && <p className="text-gray-500 font-medium mb-4">{role}</p>}
      <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
        {description}
      </p>
    </div>
  </div>
);


const WhoAreWePage = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const principles = [
    { icon: '/images/about us/Group 1272628411.png', title: 'EINHEIT', subtitle: 'UNITY', description: 'We work collaboratively towards a common purpose and goals of providing the best value of investment for the The Language Networkier, focused learning and priority support from our team.' },
    { icon: '/images/about us/Group 1272628411-1.png', title: 'KAIZEN', subtitle: 'IMPROVEMENT', description: 'We embrace change and constantly innovate to help our students, colleagues and ourselves. We strive for constant improvement and adaptability each passing day.' },
    { icon: '/images/about us/Group 1272628411-2.png', title: 'RENXING', subtitle: 'HUMANITY', description: 'We are authentic in our interactions and communicate openly, honestly and respectfully. We act with integrity and fairness.' }, // Assuming -2 is Renxing
    { icon: '/images/about us/Group 1272628411-3.png', title: 'SUPERBIA', subtitle: 'PRIDE', description: 'We deliver the best possible learning experience to our students and take pride in our work with a pinch of arrogance, as they say in the capital ROME.' },
    { icon: '/images/about us/Group 1272628411-4.png', title: 'FRANC', subtitle: 'OPEN', description: 'We care for our students, each other, cultures and communities all across the world understanding that empathy makes us stronger.' }
  ];

  const faqs = [
    { question: "What is The Language Network?", answer: "The Language Network revolutionizes language learning with diverse courses for all levels. Our engaging platform fosters cultural understanding and linguistic proficiency. Join our community of passionate learners and experienced trainers, and discover the power of language to connect people and open new doors." },
    { question: "Which languages does The Language Network teach?", answer: "We offer courses in French, German, Spanish, Korean, Japanese, Mandarin, and English." },
    { question: "Why learn with The Language Network?", answer: "We provide expert certified trainers, interactive sessions, free study materials, and a student-centric approach that ensures effective learning." },
    { question: "What makes The Language Network different from other language training schools?", answer: "Our focus on cultural immersion, personalized attention, small batch sizes, and ISO-certified curriculum sets us apart." },
    { question: "Where will the classes be conducted?", answer: "All classes are conducted online via our interactive platform, allowing you to learn from the comfort of your home." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-black mb-8">Who Are We?</h1>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>Based in Mumbai, India, The Language Network has been meeting the rising demand for foreign language proficiency since 2020. Our ISO-certified courses cover French, German, Spanish, Korean, Japanese, Mandarin, and English, catering to learners of all ages.</p>
                <p>We provide comprehensive preparation for globally recognized exams like TOEFL, IELTS, DELF, DALF, JLPT, and GOETHE, ensuring our students achieve their language goals confidently. Our mission is to make language education accessible and enjoyable for everyone, empowering learners to connect with the world through language.</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img src="/images/TLN_logo_TM.jpg" alt="The Language Network" className="w-full max-w-sm object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="flex justify-center">
              <img src="/images/about us/Group 40254.png" alt="Our Journey" className="w-full max-w-md object-contain" />
            </div>
            <div className="flex items-center justify-center lg:justify-start lg:pl-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-black">Our Journey</h2>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              Our story originates from Siddhi's profound realization while feeling undervalued and underpaid at her job. Motivated by this experience and a vision to empower learners while creating new opportunities, Siddhi, alongside her childhood friends, Pinnac and Shubham, embarked on a transformative mission. Driven by their collective expertise and shared commitment, they recognized an untapped potential in the market and set out to fill the void. Despite lacking formal business training, their bold vision and unwavering determination propelled them forward. From humble beginnings, we've grown into a dynamic community of over 200+ trainers and have enriched the lives of 5000+ students. What began as a single language course has evolved into a comprehensive offering encompassing seven diverse foreign languages. Today, The Language Network stands as a testament to our unwavering dedication to making language learning accessible, engaging, and impactful for all.
            </p>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">Our Principles</h2>
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
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-20">Meet Our Co-Founders</h2>

          <div className="space-y-12">
            <FounderCard
              image="/images/about us/Frame 1272628676.png"
              name="Pinnac Yeddy"
              description="Pinnac Yeddy, the CEO and Marketing Head of The Language Network, brings extensive marketing experience and passion to our team. He leads product development, branding, marketing, and business strategy, driving our vision for growth. Pinnac's approachable demeanor makes him a beloved co-founder, yet his true strength lies in his dedication to making The Language Network the largest language school. Beneath his friendly exterior is a visionary leader, committed to innovation and excellence. His genuine connections with others fuel our mission to empower learners worldwide, ensuring that each step we take aligns with our overarching goals. Pinnac's relentless pursuit of excellence continues to inspire and propel our organization to new heights."
            />
            <FounderCard
              image="/images/about us/Frame 1272628676-1.png"
              name="Siddhi Chokhani"
              description="Siddhi Chokhani, the dynamic Chief of Staff at The Language Network. It was Siddhi's profound expertise in French that served as the catalyst for The Language Network's inception. As a C1 certified French trainer, Siddhi brings a wealth of linguistic knowledge and teaching experience to our team. Her lifelong passion for languages, which began in childhood, extends beyond French to include proficiency in German and Spanish. Responsible for overseeing operations, teacher management, and learning pedagogy, Siddhi ensures the seamless functioning of The Language Network's educational programs. With her bold personality and fearless creative approach to work and teaching, Siddhi inspires both our team and our students to reach new heights in language learning and personal growth."
              reverse={false} // Ref image shows same alignment for both (Image Left, Text Right)? No, Ref 4 shows stacked cards, Image Left Text Right for both.
            />
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
