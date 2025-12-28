import React, { useState, useEffect } from 'react';
import FeatureModal from '../common/FeatureModal';

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      id: 1,
      iconImage: '/images/features/teaching 1.png',
      title: 'Expert Trainers',
      modalImage: '/images/features/_Features_popup.png',
    },
    {
      id: 2,
      iconImage: '/images/features/interactive.png',
      title: 'Interactive Sessions',
      modalImage: '/images/features/_Features_popup-1.png',
    },
    {
      id: 3,
      iconImage: '/images/features/courses.png',
      title: 'Certified Courses',
      modalImage: '/images/features/_Features_popup-3.png',
    },
    {
      id: 4,
      iconImage: '/images/features/1347358 1.png',
      title: 'Holistic Learning',
      modalImage: '/images/features/_Features_popup-4.png',
    },
    {
      id: 5,
      iconImage: '/images/features/material.png',
      title: 'Free Study Material',
      modalImage: '/images/features/_Features_popup-5.png',
    },
    {
      id: 6,
      iconImage: '/images/features/sessions.png',
      title: 'Review Sessions',
      modalImage: '/images/features/_Features_popup-2.png',
    },
    {
      id: 7,
      iconImage: '/images/features/flexible timings.png',
      title: 'Flexible Timings',
      modalImage: '/images/features/_Features_popup-6.png',
    },
    {
      id: 8,
      iconImage: '/images/features/batch.png',
      title: 'Batch Flexibility',
      modalImage: '/images/features/_Features_popup-7.png',
    }
  ];

  const openModal = (feature) => {
    setSelectedFeature(feature);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedFeature(null);
    document.body.style.overflow = 'unset';
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % features.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedFeature) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedFeature]);

  return (
    <>
      <section className="bg-white py-20 lg:py-24">
        <div className="container-custom max-w-6xl">
          {/* Section Header */}
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-16 max-w-4xl mx-auto leading-tight">
            Why you should learn with The Language Network?
          </h2>

          {/* Mobile Carousel - Single Card */}
          <div className="md:hidden">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-lg max-w-sm mx-auto">
              {/* Icon Image */}
              <div className="flex items-center justify-center mb-5">
                <img 
                  src={features[currentIndex].iconImage} 
                  alt={features[currentIndex].title}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#0D5C5C] mb-5 px-2">
                {features[currentIndex].title}
              </h3>

              {/* Learn More Button */}
              <button
                onClick={() => openModal(features[currentIndex])}
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 font-medium rounded-lg hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-98 min-w-[140px]"
                style={{ 
                  borderColor: '#1F9F90', 
                  color: '#1F9F90'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1F9F90'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Learn more
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Previous feature"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Next feature"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Grid - Multiple Cards */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-lg">
                {/* Icon Image */}
                <div className="flex items-center justify-center mb-5">
                  <img 
                    src={feature.iconImage} 
                    alt={feature.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#0D5C5C] mb-5 px-2">
                  {feature.title}
                </h3>

                {/* Learn More Button */}
                <button
                  onClick={() => openModal(feature)}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 font-medium rounded-lg hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-98 min-w-[140px]"
                  style={{ 
                    borderColor: '#1F9F90', 
                    color: '#1F9F90'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1F9F90'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Learn more
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default FeaturesSection;

