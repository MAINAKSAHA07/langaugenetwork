import React, { useState } from 'react';
import Card from '../common/Card';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      course: 'French B2',
      image: '👩',
      rating: 5,
      text: 'The Language Network transformed my French learning journey. The instructors are incredibly patient and knowledgeable. I passed my DELF B2 exam with flying colors thanks to their excellent preparation program!',
      location: 'Mumbai, India'
    },
    {
      name: 'Rahul Mehta',
      course: 'German A2',
      image: '👨',
      rating: 5,
      text: 'Outstanding experience! The small batch sizes and interactive sessions made learning German enjoyable. The flexible timings perfectly fit my work schedule. Highly recommended for working professionals.',
      location: 'Bangalore, India'
    },
    {
      name: 'Ananya Reddy',
      course: 'Spanish B1',
      image: '👩',
      rating: 5,
      text: 'I love how TLN focuses on practical communication skills. The cultural insights and real-world examples made Spanish come alive. The free study materials and review sessions are a huge bonus!',
      location: 'Hyderabad, India'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-secondary-mint">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-navy mb-4">
            Hear it from the Learners
          </h2>
          <p className="text-gray-600">
            Real stories from our successful language learners
          </p>
        </div>

        {/* Testimonials Grid for desktop */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-3xl shadow-lg">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-secondary-navy">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-primary font-semibold">
                    {testimonial.course}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-secondary-yellow text-xl">★</span>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed flex-grow">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>

        {/* Testimonials Carousel for mobile */}
        <div className="lg:hidden relative">
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-3xl shadow-lg">
                {testimonials[currentIndex].image}
              </div>
              <div>
                <h4 className="font-bold text-lg text-secondary-navy">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-primary font-semibold">
                  {testimonials[currentIndex].course}
                </p>
                <p className="text-xs text-gray-500">{testimonials[currentIndex].location}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="text-secondary-yellow text-xl">★</span>
                ))}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            >
              ←
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

