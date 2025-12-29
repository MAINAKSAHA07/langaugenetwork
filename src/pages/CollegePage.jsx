import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import NewsSection from '../components/sections/NewsSection';
import InternationalExamsSection from '../components/sections/InternationalExamsSection';
import AlumniNetworkSection from '../components/sections/AlumniNetworkSection';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';

// Sub-components defined first to avoid ReferenceError

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#fcfcfc] rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full max-w-sm border border-gray-100">
    <div className="mb-6">
      <img src={icon} alt={title} className="w-16 h-16 object-contain" />
    </div>
    <h3 className="text-xl font-bold text-[#1F9F90] mb-4">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const ChoiceCard = ({ image, title, description }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
    {/* Illustration Area */}
    <div className="h-48 flex items-center justify-center p-6 bg-white">
      <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
    </div>
    {/* Header */}
    <div className="bg-[#1F9F90] py-3 px-4">
      <h3 className="text-white text-center font-semibold text-lg">{title}</h3>
    </div>
    {/* Content */}
    <div className="p-6 flex-grow bg-white">
      <p className="text-gray-600 text-sm leading-relaxed text-center">{description}</p>
    </div>
  </div>
);

const PlanCard = ({ title, description, features }) => (
  <div className="border border-[#1F9F90] rounded-xl overflow-hidden flex flex-col h-full bg-white">
    <div className="bg-[#1F9F90] text-white text-center py-4">
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <p className="text-gray-700 text-sm font-medium mb-6 text-center leading-relaxed">
        {description}
      </p>
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 min-w-[16px] w-4 h-4 rounded-full bg-[#1F9F90] flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-600 text-xs sm:text-sm leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-center mt-auto">
        <Button variant="outline" className="border-[#1F9F90] text-[#1F9F90] hover:bg-[#1F9F90] hover:text-white transition-colors px-6">
          Learn more
        </Button>
      </div>
    </div>
  </div>
);

const CollegeFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why is it important for colleges to introduce a foreign language?",
      answer: "Introducing foreign language programs in college curriculum offers countless advantages. It fosters cognitive development, cultural awareness, and communication skills."
    },
    {
      question: "What languages does The Language Network offer for colleges?",
      answer: "We offer a wide range of languages including French, German, Spanish, Japanese, Korean, and Mandarin, tailored to meet the specific needs of your institution."
    },
    {
      question: "How does The Language Network assist college students in learning languages?",
      answer: "We provide structured courses, expert native trainers, interactive learning materials, and continuous assessment to ensure effective language acquisition."
    },
    {
      question: "Will college students receive a certificate upon completion of each level?",
      answer: "Yes, students receive a certificate of completion for each level they successfully finish, which adds value to their academic and professional profiles."
    },
    {
      question: "Are the language learning material aligned with educational standards?",
      answer: "Absolutely. Our curriculum is aligned with international standards such as CEFR, ensuring that students achieve globally recognized proficiency levels."
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">
          FAQs
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <svg className={`w-5 h-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 mt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-8">
              <Button variant="outline" className="border-[#1F9F90] text-[#1F9F90] hover:bg-[#1F9F90] hover:text-white transition-colors">
                Read all FAQs
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Updated FAQ Image */}
            <img
              src="/images/kids/kidsfaq.png"
              alt="FAQ Illustration"
              className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg"
              onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const CollegePage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const howItWorksSteps = [
    {
      id: 1,
      description: "Connect with us to share your needs and preferences",
      image: "/images/hero/Rectangle 477.png"
    },
    {
      id: 2,
      description: "Get a tailored proposal crafted just for you.",
      image: "/images/hero/Rectangle 478.png"
    },
    {
      id: 3,
      description: "Seal the deal!",
      image: "/images/hero/Rectangle 479.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-50/50 to-teal-50/50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl lg:text-[64px] font-bold text-black leading-tight mb-6">
                Foreign Languages <br />
                For Colleges
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl">
                Elevate your college's profile with language learning programs
                tailored to today's global demands. By integrating languages
                into your curriculum, you equip students with vital skills for
                success in the international arena. Our courses not only
                enhance linguistic abilities but also promote cultural awareness
                and open doors to study abroad opportunities. Join us in
                shaping a multilingual learning environment that prepares
                students to thrive in a connected world.
              </p>
              <Button
                size="large"
                className="text-white px-8 py-3 text-lg font-medium rounded-md shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#1F9F90' }}
              >
                Book a meeting
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              {/* Main Hero Image */}
              <img
                src="/images/College/College  png 1.png"
                alt="Student with global flags"
                className="w-full max-w-lg h-auto object-contain relative z-10"
              />
              {/* Background Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#1F9F90]/10 blur-[100px] rounded-full -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Colleges Should Include Foreign Languages */}
      <section className="bg-white py-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-black text-center mb-16 px-4">
            Why Colleges Should Include Foreign <br className="hidden md:block" />
            Languages in their Curriculum?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-8">
            {/* Row 1 */}
            <FeatureCard
              icon="/images/College/businessman 1.png"
              title="Employability"
              description="In today's global market, fluency in a foreign language enhances your job prospects and opens doors to international opportunities."
            />
            <FeatureCard
              icon="/images/College/memory 1.png"
              title="Memory Boost"
              description="Learning a new language enhances memory retention and cognitive function, potentially delaying cognitive decline later in life."
            />
            <FeatureCard
              icon="/images/College/creative 1.png"
              title="Creativity"
              description="Language learning stimulates creativity, expanding your cognitive horizons and inspiring innovative thinking."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-8">
            {/* Row 2 */}
            <FeatureCard
              icon="/images/College/to-do-list 1.png"
              title="Multi-tasking Skills"
              description="Bilingual individuals often demonstrate strong multi-tasking capabilities, seamlessly switching between languages and tasks."
            />
            <FeatureCard
              icon="/images/College/picture 1.png"
              title="Heightened Perception"
              description="Speaking multiple languages enhances awareness and perception, allowing you to navigate diverse environments with ease."
            />
            <FeatureCard
              icon="/images/College/united 2.png"
              title="Cultural Understanding"
              description="Language study offers insights into different cultures, fostering adaptability and broadening your knowledge base."
            />
          </div>

          {/* Row 3 - Centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-[calc(33.333%-1.5rem)] min-w-[320px]">
              <FeatureCard
                icon="/images/College/networking 1.png"
                title="Networking"
                description="Language classes bring together diverse individuals, fostering connections and exposing you to new perspectives beyond your field of study."
              />
            </div>
          </div>

        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <ChoiceCard
              image="/images/College/tailored.png"
              title="Tailored Curriculum"
              description="Our language programs are customized to meet the specific needs and goals of colleges, ensuring relevance and effectiveness in language acquisition."
            />
            <ChoiceCard
              image="/images/College/experienced.png"
              title="Experienced Educators"
              description="Our team of skilled language educators delivers engaging lessons tailored to college-level learners, catering to diverse learning styles and abilities."
            />
            <ChoiceCard
              image="/images/College/flexible.png"
              title="Flexible Deliveries"
              description="We offer flexible options, including offline and online classes, to accommodate colleges scheduling preferences and logistical constraints seamlessly."
            />
            <ChoiceCard
              image="/images/College/support.png"
              title="Comprehensive Support"
              description="From curriculum development to ongoing assistance, we provide colleges with comprehensive support to integrate language learning into their educational framework effortlessly."
            />
            <ChoiceCard
              image="/images/College/global.png"
              title="Enhanced Global Competency"
              description="Our programs equip college students with linguistic skills and cultural competence needed to thrive in an interconnected world, preparing them to become global citizens and future leaders."
            />
            <ChoiceCard
              image="/images/College/cost.png"
              title="Cost Effective"
              description="Our programs offer top-quality education at affordable rates, maximizing college resources for student learning."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-20">
            How It Works?
          </h2>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              {/* Illustration */}
              <div className="mb-6 flex items-center justify-center w-full min-h-[150px]">
                <img
                  src={howItWorksSteps[currentStep].image}
                  alt={`Step ${howItWorksSteps[currentStep].id}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Card */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col">
                <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                  STEP {howItWorksSteps[currentStep].id}
                </div>
                <div className="p-6 flex flex-col items-center flex-grow text-center justify-center min-h-[120px]">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {howItWorksSteps[currentStep].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentStep((prev) => (prev === 0 ? howItWorksSteps.length - 1 : prev - 1))}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentStep((prev) => (prev + 1) % howItWorksSteps.length)}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {howItWorksSteps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                {/* Illustration */}
                <div className="mb-6 flex items-center justify-center w-full min-h-[150px]">
                  <img
                    src={step.image}
                    alt={`Step ${step.id}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {/* Card */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col h-full">
                  <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                    STEP {step.id}
                  </div>
                  <div className="p-6 flex flex-col items-center flex-grow text-center justify-center min-h-[120px]">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Plans Section */}
      <section className="bg-white py-20 mb-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-20">
            3 Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PlanCard
              title="Starter"
              description="Dive into the essentials in just 10 days with our intensive workshop, covering everything from basics to practical communication."
              features={[
                "Learn greetings, self-introductions, and polite expressions.",
                "Build vocabulary on colours, numbers, days, and months.",
                "Engaging role-plays, games, and discussions for experiential learning.",
                "Improve spoken communication through guided exercises and audio files.",
                "Explore cultural aspects for better understanding and communication.",
                "Assess participant progress and offer feedback for improvement."
              ]}
            />

            <PlanCard
              title="Scholar"
              description="In just 36 classes, acquire essential A1 level language skills with our comprehensive course, covering vocabulary, grammar, and communication."
              features={[
                "Scholar's 36-class program ensures adept handling of daily tasks at A1 level.",
                "Students proficiently express needs and engage in simple interactions.",
                "A1 learners grasp common expressions and essential phrases.",
                "Students confidentially engage in basic conversations.",
                "Engaging sessions and games enhance learning and curiosity.",
                "Includes tracking and free study materials for improvement."
              ]}
            />

            <PlanCard
              title="Stellar"
              description="3-year program covering A1 to B1 levels, integrating seamlessly into your curriculum."
              features={[
                "Stellar's 3-year program, spanning A1 to B1 levels, offers interactive learning with games, activities, and presentations.",
                "Students understand and create text, handle travel scenarios, and articulate experiences and aspirations.",
                "Students will deliver clear directives, grasp instructions, and communicate effectively.",
                "Progressing to B1 level opens career prospects and equips learners for advancement.",
                "Stellar instills confidence in verbal expression and proficiency in communication.",
                "The program tracks progress, provides study materials, ensuring continual enhancement"
              ]}
            />
          </div>
        </div>
      </section>

      {/* International Exams Section */}
      <InternationalExamsSection />

      {/* Alumni Network Section */}
      <AlumniNetworkSection />

      {/* FAQ Section */}
      <CollegeFAQSection />

      {/* Start Your Journey Section */}
      <section className="bg-white py-20">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">
            Start Your Journey
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              {/* Updated Start Journey Image */}
              <img
                src="/images/College/journey.png"
                alt="Start Your Journey"
                className="w-full max-w-lg h-auto object-contain"
              />
            </div>
            <div>
              <p className="text-gray-600 mb-8">Fill out the form below to become part of our vibrant community.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                  <input type="text" placeholder="Official Contact No." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Designation" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                  <input type="email" placeholder="Official Email ID" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                </div>
                <input type="text" placeholder="College's Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                <input type="text" placeholder="College's Address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-500">
                  <option>Language You're Looking to Introduce</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Spanish</option>
                </select>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-500">
                  <option>How Did You Hear About Us?</option>
                  <option>Social Media</option>
                  <option>Referral</option>
                  <option>Search Engine</option>
                </select>
                <button className="bg-[#1F9F90] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#14A89A] transition-colors">
                  Send enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <div className="bg-[#1F9F90] py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Elevating education, effortlessly!
        </h2>
      </div>

      {/* Payment Methods Section */}
      <PaymentMethodsSection />

    </div>
  );
};

export default CollegePage;
