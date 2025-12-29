import React, { useState } from 'react';
import Button from '../common/Button';

const UpcomingBatchesSection = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [currentIndex, setCurrentIndex] = useState(0);

  const months = ['January', 'February', 'March'];

  const batches = {
    January: [
      {
        id: 1,
        trainerName: 'Prerana Chidananda',
        trainerRole: 'German Trainer',
        language: 'German',
        flagColors: ['#000000', '#DD0000', '#FFCE00'],
        batchStartDate: 'August 21, 2024',
        seats: 7,
        timing: 'MON-FRI 8:00 PM - 9:00 PM | 1 hr',
        certification: 'Beginners German | A1',
        trainerImage: '/images/trainers/prerana.jpg'
      },
      {
        id: 2,
        trainerName: 'Bhavya Gaba',
        trainerRole: 'Spanish Trainer',
        language: 'Spanish',
        flagColors: ['#AA151B', '#F1BF00', '#AA151B'],
        batchStartDate: 'August 17, 2024',
        seats: 7,
        timing: 'MON-FRI 10:00 PM - 12:00 PM | 2 hr',
        certification: 'Beginners Spanish | A1',
        trainerImage: '/images/trainers/bhavya.jpg'
      },
      {
        id: 3,
        trainerName: 'Aneesh Kumar',
        trainerRole: 'French Trainer',
        language: 'French',
        flagColors: ['#002395', '#FFFFFF', '#ED2939'],
        batchStartDate: 'August 12, 2024',
        seats: 2,
        timing: 'MON-FRI 8:00 PM - 9:00 PM | 1 hr',
        certification: 'Beginners French | A1',
        trainerImage: '/images/trainers/aneesh.jpg'
      }
    ],
    February: [
      {
        id: 4,
        trainerName: 'Prerana Chidananda',
        trainerRole: 'German Trainer',
        language: 'German',
        flagColors: ['#000000', '#DD0000', '#FFCE00'],
        batchStartDate: 'February 15, 2024',
        seats: 5,
        timing: 'MON-FRI 7:00 PM - 8:00 PM | 1 hr',
        certification: 'Beginners German | A1',
        trainerImage: '/images/trainers/prerana.jpg'
      }
    ],
    March: [
      {
        id: 5,
        trainerName: 'Bhavya Gaba',
        trainerRole: 'Spanish Trainer',
        language: 'Spanish',
        flagColors: ['#AA151B', '#F1BF00', '#AA151B'],
        batchStartDate: 'March 10, 2024',
        seats: 8,
        timing: 'MON-FRI 9:00 AM - 10:00 AM | 1 hr',
        certification: 'Beginners Spanish | A1',
        trainerImage: '/images/trainers/bhavya.jpg'
      }
    ]
  };

  const currentBatches = batches[selectedMonth] || [];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % currentBatches.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentBatches.length - 1 : prevIndex - 1
    );
  };

  // Reset currentIndex when month changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [selectedMonth]);

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="container-custom max-w-7xl">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-6 md:mb-8 lg:mb-12">
          Upcoming Batches
        </h2>

        {/* Month Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-5 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base ${selectedMonth === month
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              style={selectedMonth === month ? { backgroundColor: '#1F9F90' } : {}}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Mobile Carousel - Single Batch */}
        <div className="md:hidden">
          {currentBatches.length > 0 && (
            <>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl max-w-sm mx-auto">
                {/* Trainer Photo with Flag Background */}
                <div className="relative h-56 overflow-hidden">
                  {/* Flag Background */}
                  <div className="absolute inset-0 flex">
                    {currentBatches[currentIndex].flagColors.map((color, index) => (
                      <div
                        key={index}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  {/* Trainer Image Placeholder */}
                  <div className="absolute inset-0 flex items-end justify-center pb-0">
                    <div className="w-40 h-56 bg-gray-200/50 rounded-t-full" />
                  </div>
                </div>

                {/* Batch Details */}
                <div className="p-5">
                  {/* Trainer Info */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {currentBatches[currentIndex].trainerName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{currentBatches[currentIndex].trainerRole}</p>

                  {/* Batch Info */}
                  <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Batch Starts</span>
                      <span className="text-sm font-semibold text-gray-900">{currentBatches[currentIndex].batchStartDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Number of seats</span>
                      <span className="font-bold text-xl text-gray-900">{currentBatches[currentIndex].seats}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">Timing</span>
                      <span className="text-xs font-semibold text-gray-900 text-right">
                        {currentBatches[currentIndex].timing}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Certification</span>
                      <span className="text-sm font-semibold text-gray-900">{currentBatches[currentIndex].certification}</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <Button
                    className="w-full text-white py-2.5 font-semibold hover:brightness-90 transition-all duration-300 text-sm"
                    style={{ backgroundColor: '#1F9F90' }}
                  >
                    Enroll now
                  </Button>
                </div>
              </div>

              {/* Navigation Buttons */}
              {currentBatches.length > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={prevSlide}
                    className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                    aria-label="Previous batch"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                    aria-label="Next batch"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Desktop Grid - All Batches */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Trainer Photo with Flag Background */}
              <div className="relative h-64 overflow-hidden">
                {/* Flag Background */}
                <div className="absolute inset-0 flex">
                  {batch.flagColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                {/* Trainer Image Placeholder */}
                <div className="absolute inset-0 flex items-end justify-center pb-0">
                  <div className="w-48 h-64 bg-gray-200/50 rounded-t-full" />
                </div>
              </div>

              {/* Batch Details */}
              <div className="p-6">
                {/* Trainer Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {batch.trainerName}
                </h3>
                <p className="text-gray-600 mb-4">{batch.trainerRole}</p>

                {/* Batch Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Batch Starts</span>
                    <span className="font-semibold text-gray-900">{batch.batchStartDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Number of seats</span>
                    <span className="font-bold text-2xl text-gray-900">{batch.seats}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">Timing</span>
                    <span className="font-semibold text-gray-900 text-right text-sm">
                      {batch.timing}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Certification</span>
                    <span className="font-semibold text-gray-900">{batch.certification}</span>
                  </div>
                </div>

                {/* Enroll Button */}
                <Button
                  className="w-full text-white py-3 font-semibold hover:brightness-90 transition-all duration-300"
                  size="large"
                  style={{ backgroundColor: '#1F9F90' }}
                >
                  Enroll now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingBatchesSection;

