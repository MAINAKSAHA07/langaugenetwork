import React, { useState } from 'react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // All testimonial images
  const allTestimonials = [
    { id: 1, image: '/images/testimonials/12.png' },
    { id: 2, image: '/images/testimonials/13.png' },
    { id: 3, image: '/images/testimonials/14.png' },
    { id: 4, image: '/images/testimonials/Amrutha Vajjha.jpeg' },
    { id: 5, image: '/images/testimonials/Iqra Bano.png' },
    { id: 6, image: '/images/testimonials/Manali Phatak.png' },
    { id: 7, image: '/images/testimonials/Nishigandha Bamane.png' }
  ];

  // Get current set of 3 consecutive testimonials (slides one at a time)
  const getCurrentTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % allTestimonials.length;
      result.push(allTestimonials[index]);
    }
    return result;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % allTestimonials.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? allTestimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonials = getCurrentTestimonials();

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="container-custom max-w-7xl">
        {/* Section Title */}
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-navy text-center mb-12 lg:mb-16 leading-tight">
          Hear it from the Learners
        </h2>

        {/* Mobile Carousel - Single Testimonial */}
        <div className="md:hidden mb-10">
          <div 
            className="bg-white rounded-2xl border-2 overflow-hidden max-w-sm mx-auto"
            style={{ borderColor: '#1F9F90' }}
          >
            <img
              src={allTestimonials[currentIndex].image}
              alt={`Testimonial ${allTestimonials[currentIndex].id}`}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Desktop Grid - 2-3 Testimonials */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 transition-all duration-500">
          {currentTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl border-2 overflow-hidden"
              style={{ borderColor: '#1F9F90' }}
            >
              <img
                src={testimonial.image}
                alt={`Testimonial ${testimonial.id}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
            style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
            aria-label="Previous testimonials"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
            style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
            aria-label="Next testimonials"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

