import React, { useState } from 'react';

const InternationalExamsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const exams = [
    { id: 1, name: 'TEF', image: '/images/exams/Group 40.png', alt: 'TEF - Test d\'Évaluation de Français' },
    { id: 2, name: 'DALF', image: '/images/exams/Group 41.png', alt: 'DALF' },
    { id: 3, name: 'GOETHE', image: '/images/exams/Group 42.png', alt: 'Goethe Institut' },
    { id: 4, name: 'TOPIK', image: '/images/exams/Group 43.png', alt: 'TOPIK Korean Proficiency Test' },
    { id: 5, name: 'SIELE', image: '/images/exams/Group 44.png', alt: 'SIELE Spanish' },
    { id: 6, name: 'IELTS', image: '/images/exams/Group 127.png', alt: 'IELTS' },
    { id: 7, name: 'HSK', image: '/images/exams/Group 128.png', alt: 'HSK Chinese Proficiency Test' },
    { id: 8, name: 'JLPT', image: '/images/exams/Group 129.png', alt: 'JLPT Japanese Language Proficiency Test' },
    { id: 9, name: 'GOETHE_INST', image: '/images/exams/Group 130.png', alt: 'Goethe Institut' }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % exams.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? exams.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-custom max-w-7xl">
        {/* Section Title */}
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-navy text-center mb-12 lg:mb-16 leading-tight">
          We prepare You For International Proficiency Exams
        </h2>

        {/* Mobile Carousel - Single Logo */}
        <div className="md:hidden">
          <div className="flex items-center justify-center transition-all duration-300 hover:scale-110 h-32">
            <img
              src={exams[currentIndex].image}
              alt={exams[currentIndex].alt}
              className="h-24 w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              aria-label="Previous exam"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              aria-label="Next exam"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop - All Logos in Single Row */}
        <div className="hidden md:block overflow-x-auto">
          <div className="flex justify-center items-center gap-8 lg:gap-12 min-w-max px-4">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0"
              >
                <img
                  src={exam.image}
                  alt={exam.alt}
                  className="h-16 lg:h-20 xl:h-24 w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalExamsSection;

