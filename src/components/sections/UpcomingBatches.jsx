import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const UpcomingBatches = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const batches = [
    {
      language: 'French',
      flag: '🇫🇷',
      instructor: 'Marie Laurent',
      level: 'Beginner French | A1',
      timing: 'Mon, Wed, Fri | 6:00 PM - 7:30 PM',
      startDate: 'Jan 15, 2025',
      bgColor: 'from-blue-400 to-blue-600',
    },
    {
      language: 'German',
      flag: '🇩🇪',
      instructor: 'Hans Mueller',
      level: 'Intermediate German | B1',
      timing: 'Tue, Thu, Sat | 5:00 PM - 6:30 PM',
      startDate: 'Jan 20, 2025',
      bgColor: 'from-yellow-400 to-orange-500',
    },
    {
      language: 'Spanish',
      flag: '🇪🇸',
      instructor: 'Sofia Rodriguez',
      level: 'Beginner Spanish | A1',
      timing: 'Mon, Wed, Fri | 7:00 PM - 8:30 PM',
      startDate: 'Jan 18, 2025',
      bgColor: 'from-red-400 to-red-600',
    },
    {
      language: 'Japanese',
      flag: '🇯🇵',
      instructor: 'Yuki Tanaka',
      level: 'Beginner Japanese | N5',
      timing: 'Tue, Thu | 6:00 PM - 7:30 PM',
      startDate: 'Jan 22, 2025',
      bgColor: 'from-pink-400 to-red-500',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % batches.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + batches.length) % batches.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
          Upcoming Batches
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {batches.map((batch, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="max-w-sm mx-auto">
                    {/* Flag Header */}
                    <div className={`bg-gradient-to-r ${batch.bgColor} rounded-t-xl p-6 text-center`}>
                      <div className="text-6xl mb-2">{batch.flag}</div>
                      <h3 className="text-white text-2xl font-bold">{batch.language}</h3>
                    </div>

                    {/* Card Content */}
                    <Card className="rounded-t-none" padding="large">
                      {/* Instructor */}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                          👤
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Instructor</p>
                          <p className="font-bold text-lg">{batch.instructor}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        <div>
                          <p className="text-sm text-gray-600">Level</p>
                          <p className="font-semibold text-primary">{batch.level}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Timing</p>
                          <p className="font-semibold">{batch.timing}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Starting From</p>
                          <p className="font-semibold">{batch.startDate}</p>
                        </div>
                      </div>

                      <Button className="w-full" icon>
                        Enroll Now
                      </Button>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {batches.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingBatches;
