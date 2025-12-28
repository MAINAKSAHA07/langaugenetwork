import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LanguageCoursesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const languages = [
    {
      id: 1,
      name: 'ENGLISH',
      slug: 'english',
      image: '/images/languages/english.png',
      color: '#4A90E2'
    },
    {
      id: 2,
      name: 'FRENCH',
      slug: 'french',
      image: '/images/languages/french.png',
      color: '#9B9B9B'
    },
    {
      id: 3,
      name: 'SPANISH',
      slug: 'spanish',
      image: '/images/languages/spanish.png',
      color: '#D0021B'
    },
    {
      id: 4,
      name: 'GERMAN',
      slug: 'german',
      image: '/images/languages/german.png',
      color: '#F5A623'
    },
    {
      id: 5,
      name: 'MANDARIN',
      slug: 'mandarin',
      image: '/images/languages/mandarin.png',
      color: '#D4A574'
    },
    {
      id: 6,
      name: 'JAPANESE',
      slug: 'japanese',
      image: '/images/languages/japanese.png',
      color: '#E89BA7'
    },
    {
      id: 7,
      name: 'KOREAN',
      slug: 'korean',
      image: '/images/languages/korean.png',
      color: '#7ED321'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % languages.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? languages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-custom max-w-6xl">
        {/* Section Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-12 lg:mb-16">
          Courses We Offer
        </h2>

        {/* Mobile Carousel - Single Badge */}
        <div className="md:hidden">
          <Link
            to={`/${languages[currentIndex].slug}`}
            className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:-translate-y-2 max-w-xs mx-auto"
          >
            {/* Circular Badge */}
            <div className="w-32 h-32 rounded-full bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center mb-4 overflow-hidden transition-all duration-300 group-hover:shadow-xl" style={{ borderColor: 'rgba(31, 159, 144, 0.3)' }}>
              <img
                src={languages[currentIndex].image}
                alt={languages[currentIndex].name}
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Language Name */}
            <h3 className="text-sm font-semibold text-gray-800 tracking-wide">
              {languages[currentIndex].name}
            </h3>
          </Link>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              aria-label="Previous language"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              aria-label="Next language"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Grid - All Badges */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-6 lg:gap-8">
          {languages.map((language) => (
            <Link
              key={language.id}
              to={`/${language.slug}`}
              className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Circular Badge */}
              <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center mb-4 overflow-hidden transition-all duration-300 group-hover:shadow-xl" style={{ borderColor: 'rgba(31, 159, 144, 0.3)' }}>
                <img
                  src={language.image}
                  alt={language.name}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                />
              </div>

              {/* Language Name */}
              <h3 className="text-sm lg:text-base font-semibold text-gray-800 tracking-wide">
                {language.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageCoursesSection;

