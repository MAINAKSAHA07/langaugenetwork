import React, { useState } from 'react';
import Button from '../../components/common/Button';

const CollaboratePage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const steps = [
    {
      id: 1,
      stepNumber: 'Step 1',
      title: 'Connect with us',
      description: 'Share your needs and preferences to help us understand how we can best collaborate.',
      image: '/images/hero/Rectangle 477.png'
    },
    {
      id: 2,
      stepNumber: 'Step 2',
      title: 'Get a tailored Proposal',
      description: 'Receive a customized plan and proposal crafted specifically for your requirements.',
      image: '/images/hero/Rectangle 478.png'
    },
    {
      id: 3,
      stepNumber: 'Step 3',
      title: 'Seal the deal!',
      description: 'Finalize the partnership and start a successful journey together.',
      image: '/images/hero/Rectangle 479.png'
    }
  ];

  const nextStep = () => {
    setCurrentStepIndex((prevIndex) =>
      (prevIndex + 1) % steps.length
    );
  };

  const prevStep = () => {
    setCurrentStepIndex((prevIndex) =>
      prevIndex === 0 ? steps.length - 1 : prevIndex - 1
    );
  };

  const offerings = [
    {
      title: 'Workshops',
      description: 'Immerse yourself in hands-on language learning experiences tailored to your interests and proficiency level, offering practical skills and cultural insights.',
      image: '/images/collaborate/Group 40258.png',
      bgColor: '#E0F2F1',
      textColor: '#000000'
    },
    {
      title: 'Seminars',
      description: 'Participate in expert-led language sessions designed to provide valuable linguistic insights and foster personal growth, igniting inspiration along the way.',
      image: '/images/collaborate/Group 40258-1.png',
      bgColor: '#B2DFDB',
      textColor: '#000000'
    },
    {
      title: 'Webinars',
      description: 'Join interactive online language events that offer convenient learning opportunities accessible from anywhere, allowing you to expand your language skills and cultural knowledge.',
      image: '/images/collaborate/Group 40258-2.png',
      bgColor: '#4DB6AC',
      textColor: '#000000'
    },
    {
      title: 'Summer Camps',
      description: 'Embark on educational adventures at our seasonal language camps, where fun and language learning combine to create unforgettable experiences.',
      image: '/images/collaborate/Group 40258-3.png',
      bgColor: '#1F9F90',
      textColor: '#FFFFFF'
    },
    {
      title: 'Masterclass',
      description: 'Elevate your language skills with exclusive sessions led by language experts, unlocking your full linguistic potential and achieving mastery in your chosen language.',
      image: '/images/collaborate/Group 40258-4.png',
      bgColor: '#00695C', // Darker Teal
      textColor: '#FFFFFF'
    },
    {
      title: 'Sponsorships',
      description: 'Collaborate with us to support impactful language learning initiatives, building meaningful connections and collectively shaping the future of multilingualism.',
      image: '/images/collaborate/Group 40258-5.png',
      bgColor: '#004D40', // Darkest Teal
      textColor: '#FFFFFF'
    }
  ];

  const faqs = [
    {
      question: 'What types of collaboration opportunities does The Language Network offer?',
      answer: 'The Language Network provides a range of collaboration options, including paid workshops, seminars, webinars, summer camps, masterclasses, and sponsorships. Each of these opportunities offers unique ways for individuals and organizations to engage with language learning, cultural exchange, and professional development.'
    },
    {
      question: 'What are the benefits of collaborating with The Language Network?',
      answer: 'Collaborating with us offers access to expert trainers, tailored content, and a wide network of learners. Partners benefit from enhanced visibility, professional development opportunities, and the ability to contribute to the global language learning community.'
    },
    {
      question: 'Can individuals or organizations from any location collaborate with The Language Network?',
      answer: 'Yes, we welcome collaborations from individuals and organizations globally. Our digital-first approach allows us to partner with entities worldwide to deliver high-quality language education.'
    },
    {
      question: 'Are there specific prerequisites for becoming a collaboration partner with The Language Network?',
      answer: 'While specific prerequisites may vary based on the collaboration type, we generally look for partners who share our passion for education and have relevant expertise or resources to contribute to our mission.'
    },
    {
      question: 'How can I get in touch with The Language Network to discuss potential collaboration opportunities further?',
      answer: 'You can reach out to us via the contact form on this page or email us directly. Our partnership team will get back to you to discuss how we can work together.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 z-10">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                Collaborate With Us!
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Discover endless possibilities for your institution or company by collaborating with The Language Network. Our tailored programs and certified instructors empower schools, colleges, and businesses to excel in their fields while expanding language knowledge. From enhancing student curriculum to boosting corporate communication, our collaborative approach ensures success in today's multilingual world. Join us in fostering global connectivity and explore new opportunities through language education.
              </p>
              <Button
                onClick={() => document.getElementById('collaborate-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white text-lg font-medium px-8 py-3 rounded-md transition-transform hover:scale-105"
                style={{ backgroundColor: '#1F9F90' }}
              >
                Apply now
              </Button>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <img
                src="/images/collaborate/Group 1272628373.png"
                alt="Collaborate with The Language Network"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-black mb-16">
            How It Works?
          </h2>

          {/* Mobile Carousel - Single Card */}
          <div className="md:hidden">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="mb-6 flex items-center justify-center w-full">
                <img
                  src={steps[currentStepIndex].image}
                  alt={steps[currentStepIndex].title}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col">
                <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                  {steps[currentStepIndex].stepNumber}
                </div>

                <div className="p-5 text-center flex flex-col min-h-[140px] justify-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {steps[currentStepIndex].title}
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {steps[currentStepIndex].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevStep}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Previous step"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextStep}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Next step"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Grid - All Cards */}
          <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center"
              >
                <div className="mb-6 flex items-center justify-center w-full">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col h-full">
                  <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                    {step.stepNumber}
                  </div>

                  <div className="p-6 flex flex-col items-center flex-grow text-center justify-center min-h-[140px]">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-black mb-16">
            What We Offer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offerings.map((offer, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 text-center flex flex-col items-center h-full transition-transform hover:scale-105"
                style={{ backgroundColor: offer.bgColor, color: offer.textColor }}
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <img src={offer.image} alt={offer.title} className="w-16 h-16 object-contain" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {offer.title}
                </h3>
                <p className={`text-sm leading-relaxed ${offer.textColor === '#FFFFFF' ? 'text-white/90' : 'text-gray-700'}`}>
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 lg:py-20 bg-[#F9F9F9]">
        <div className="container-custom mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-black mb-12">
                FAQs
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    >
                      <span className="font-semibold text-gray-800 pr-8">{faq.question}</span>
                      <span className="text-[#1F9F90] flex-shrink-0">
                        {openFAQ === index ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-2">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  variant="outline"
                  className="border-[#1F9F90] text-[#1F9F90] hover:bg-teal-50 px-6 py-2"
                >
                  Read all FAQs
                </Button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <img
                src="/images/kids/kidsfaq.png"
                alt="FAQs"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collaborate with Us Form Section */}
      <section id="collaborate-form" className="py-16 lg:py-20 bg-white">
        <div className="container-custom mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-black mb-16">
            Collaborate with Us
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-5/12">
              <img
                src="/images/collaborate/image 100.png"
                alt="Collaborate"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full lg:w-7/12 text-left">
              <form className="space-y-4">
                <h3 className="text-gray-700 font-semibold mb-2">Contact Information:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-sm" />
                  <input type="tel" placeholder="Contact No." className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-sm" />
                </div>
                <input type="email" placeholder="Email ID" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-sm" />

                <input type="text" placeholder="Name of the Organization" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-sm" />

                <div className="relative">
                  <select className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-gray-500 text-sm appearance-none">
                    <option value="" disabled selected>Type of Collaboration</option>
                    <option value="school">School Partnership</option>
                    <option value="college">College Partnership</option>
                    <option value="corporate">Corporate Training</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <h3 className="text-gray-700 font-semibold mt-6 mb-2">Collaboration Details:</h3>
                <textarea rows="3" placeholder="Brief Description of Collaboration Goals and Objectives" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-sm resize-none"></textarea>

                <h3 className="text-gray-700 font-semibold mt-6 mb-2">Additional Information:</h3>
                <textarea rows="3" placeholder="Any Specific Requirements or Preferences" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-sm resize-none"></textarea>

                <div className="relative">
                  <select className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50 text-gray-500 text-sm appearance-none">
                    <option value="" disabled selected>How Did You Hear About Us?</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="web">Web Search</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    className="text-white px-8 py-2 rounded-md transition-colors"
                    style={{ backgroundColor: '#1F9F90' }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollaboratePage;
