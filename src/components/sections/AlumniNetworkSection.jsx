import React, { useState } from 'react';

const AlumniNetworkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const alumniCompanies = [
    { id: 1, name: 'Amazon', image: '/images/alumni/amazon 1.png' },
    { id: 2, name: 'Deloitte', image: '/images/alumni/deloitte 1.png' },
    { id: 3, name: 'Siemens', image: '/images/alumni/siemens 1.png' },
    { id: 4, name: 'M Moser Associates', image: '/images/alumni/M-Moser-Associates 1.png' },
    { id: 5, name: 'SIES', image: '/images/alumni/sies_logo 1.png' }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % alumniCompanies.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? alumniCompanies.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-custom max-w-7xl">
        {/* Alumni Network Section */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary-navy text-center mb-8 lg:mb-10 leading-tight">
            Our Alumni Network
          </h2>

          {/* Mobile Carousel - Single Logo */}
          <div className="md:hidden">
            <div className="flex items-center justify-center h-20">
              <img
                src={alumniCompanies[currentIndex].image}
                alt={alumniCompanies[currentIndex].name}
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Previous company"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Next company"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Grid - All Logos */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-6 lg:gap-10 xl:gap-12">
            {alumniCompanies.map((company) => (
              <div 
                key={company.id}
                className="flex items-center justify-center"
              >
                <img
                  src={company.image}
                  alt={company.name}
                  className="h-6 lg:h-7 xl:h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Educational Partners Section */}
        <div>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary-navy text-center mb-8 lg:mb-10 leading-tight">
            Our Educational Partners
          </h2>

          {/* Educational Partners Image */}
          <div className="max-w-4xl mx-auto">
            <img
              src="/images/alumni/edupatner.png"
              alt="Educational Partners"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlumniNetworkSection;

