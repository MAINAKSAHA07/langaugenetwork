import React, { useState } from 'react';
import Button from '../common/Button';

const CEFRLevelsSection = ({ onEnquire }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const levels = [
    {
      id: 1,
      level: 'A1',
      name: 'Beginner',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-gray-800',
      skills: [
        'Understands everyday expressions and basic phrases',
        'Can introduce oneself and ask simple questions',
        'Participates in basic conversations about hobbies or preferences'
      ]
    },
    {
      id: 2,
      level: 'A2',
      name: 'Elementary',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-200',
      textColor: 'text-gray-800',
      skills: [
        'Understands common expressions in relevant areas',
        'Communicates in routine tasks like ordering food or asking for directions',
        'Engages in everyday activities such as shopping or making reservations'
      ]
    },
    {
      id: 3,
      level: 'B1',
      name: 'Intermediate',
      bgColor: 'bg-teal-200',
      borderColor: 'border-teal-300',
      textColor: 'text-gray-800',
      skills: [
        'Grasps main points of clear, familiar topics',
        'Handles most situations while traveling or living in a foreign country',
        'Participates in discussions, expresses opinions, and follows basic news articles'
      ]
    },
    {
      id: 4,
      level: 'B2',
      name: 'Upper intermediate',
      bgColor: 'bg-teal-300',
      borderColor: 'border-teal-400',
      textColor: 'text-gray-800',
      skills: [
        'Understands complex texts on concrete and abstract topics',
        'Interacts fluently with native speakers, engaging in debates and discussing world events',
        'Reads articles, expresses opinions, and engages in debates on various subjects'
      ]
    },
    {
      id: 5,
      level: 'C1',
      name: 'Advanced',
      bgColor: 'bg-teal-600',
      borderColor: 'border-teal-700',
      textColor: 'text-white',
      skills: [
        'Understands a wide range of demanding texts and implicit meanings',
        'Expresses ideas fluently and participates in complex discussions',
        'Analyzes and critiques articles, understands nuanced arguments'
      ]
    },
    {
      id: 6,
      level: 'C2',
      name: 'Master level',
      bgColor: 'bg-teal-700',
      borderColor: 'border-teal-800',
      textColor: 'text-white',
      skills: [
        'Understands virtually everything heard or read',
        'Summarizes information and presents coherent arguments',
        'Engages in high-level discussions, delivers presentations, and comprehends complex materials'
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % levels.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? levels.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="container-custom max-w-7xl">
        {/* Top Section - Image and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Left - Image with Icon Overlay */}
          <div className="relative">
            <img
              src="/images/hero/cefr-teacher.png"
              alt="CEFR aligned courses"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
            {/* Graduation Cap Icon Overlay */}
            <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#1F9F90' }}>
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-navy mb-6 leading-tight">
              Our courses are aligned with The CEFR Levels
            </h2>
            <p className="text-gray-600 text-base lg:text-lg mb-5 leading-relaxed">
              Common European Framework of Reference for Languages (CEFR) is an internationally recognized standard that describes your learning progress in more detail. The framework helps you to explain your level from Beginner (A1) to Advanced (C2).
            </p>
            <p className="text-gray-600 text-base lg:text-lg mb-8 leading-relaxed">
              All languages we offer are aligned with the CEFR levels, so once you know your level, we can suggest the best classes to get your progress going immediately.
            </p>
            <div>
              <Button
                onClick={onEnquire}
                className="text-white px-10 py-3.5 text-lg font-semibold"
                style={{ backgroundColor: '#1F9F90' }}
                size="large"
              >
                Enquire now
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Carousel - Single Card */}
        <div className="md:hidden mb-8">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md max-w-sm mx-auto">
            {/* Level Header - Colored Section */}
            <div className={`${levels[currentIndex].bgColor} text-center py-4 px-5`}>
              <h3 className={`text-2xl font-bold mb-1 ${levels[currentIndex].textColor}`}>
                {levels[currentIndex].level}
              </h3>
              <p className={`text-base font-semibold ${levels[currentIndex].textColor}`}>
                {levels[currentIndex].name}
              </p>
            </div>

            {/* Skills List - White Background Section */}
            <div className="bg-white p-5">
              <ul className="space-y-2.5">
                {levels[currentIndex].skills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
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
                    <span className="text-xs text-gray-700">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              aria-label="Previous level"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              aria-label="Next level"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Grid - All Cards */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md"
            >
              {/* Level Header - Colored Section */}
              <div className={`${level.bgColor} text-center py-4 px-5`}>
                <h3 className={`text-2xl font-bold mb-1 ${level.textColor}`}>
                  {level.level}
                </h3>
                <p className={`text-base font-semibold ${level.textColor}`}>
                  {level.name}
                </p>
              </div>

              {/* Skills List - White Background Section */}
              <div className="bg-white p-5">
                <ul className="space-y-2.5">
                  {level.skills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
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
                      <span className="text-xs text-gray-700">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <Button
            onClick={onEnquire}
            className="text-white px-12 py-4 text-lg font-semibold"
            style={{ backgroundColor: '#1F9F90' }}
            size="large"
          >
            Get started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CEFRLevelsSection;

