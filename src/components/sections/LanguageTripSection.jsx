import React, { useState } from 'react';
import Button from '../common/Button';

const LanguageTripSection = ({ onRegister, onDemo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const steps = [
    {
      id: 1,
      stepNumber: 'Step 1',
      title: 'Register with us',
      description: 'Complete a short form with your details and language preference to register. Our team will then assist you with online classes, study materials, and more!',
      image: '/images/hero/Rectangle 477.png',
      bgColor: 'bg-[#1F9F90]'
    },
    {
      id: 2,
      stepNumber: 'Step 2',
      title: 'Experience a free demo class',
      description: 'Discover the power of learning with our complimentary demo class at your convenient time!',
      image: '/images/hero/Rectangle 478.png',
      bgColor: 'bg-[#1F9F90]'
    },
    {
      id: 3,
      stepNumber: 'Step 3',
      title: 'Get started',
      description: 'Love our demo, now pick and choose batches according to your flexibility and get started on your learning adventure!',
      image: '/images/hero/Rectangle 479.png',
      bgColor: 'bg-[#1F9F90]'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % steps.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? steps.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Fluency Banner Section */}
      <section style={{ backgroundColor: '#1F9F90' }} className="py-16 lg:py-20">
        <div className="container-custom max-w-5xl text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
            Fluency, Culture, Career & Beyond
          </h2>
          <p className="text-lg lg:text-xl text-white/90">
            From learning a new language to living it!
          </p>
        </div>
      </section>

      {/* Language Trip Steps Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-4">
              Let's Embark On A Language Trip!
            </h2>
            <p className="text-lg text-gray-600">
              Here are the steps
            </p>
          </div>

          {/* Mobile Carousel - Single Card */}
          <div className="md:hidden">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              {/* Illustration */}
              <div className="mb-6 flex items-center justify-center w-full">
                <img
                  src={steps[currentIndex].image}
                  alt={steps[currentIndex].title}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Card with integrated step badge */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col">
                {/* Step Header Badge */}
                <div className={`${steps[currentIndex].bgColor} text-white text-center py-4`}>
                  <h3 className="text-lg font-semibold">
                    {steps[currentIndex].stepNumber}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="p-5 text-center flex flex-col">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {steps[currentIndex].title}
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {steps[currentIndex].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Previous step"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
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
                {/* Illustration */}
                <div className="mb-6 flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Card with integrated step badge */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col h-full">
                  {/* Step Header Badge */}
                  <div className={`${step.bgColor} text-white text-center py-4`}>
                    <h3 className="text-lg font-semibold">
                      {step.stepNumber}
                    </h3>
                  </div>

                  {/* Card Content - Reduced padding and height */}
                  <div className="p-5 text-center flex flex-col min-h-[200px]">
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
    </>
  );
};

export default LanguageTripSection;

