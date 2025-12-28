import React from 'react';

const StatisticsBar = () => {
  const stats = [
    { value: '7', label: 'Languages' },
    { value: '5000+', label: 'Happy Learners' },
    { value: '200+', label: 'Alpha Mentors' },
    { value: '50000+', label: 'Hours of Enlightenment' },
  ];

  const StarIcon = () => (
    <svg 
      className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" 
      fill="#FFC107" 
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="bg-white pt-0 pb-8 md:pb-12">
      <div className="container-custom">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-200 py-6 md:py-8 px-3 md:px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
            
            {/* Google Reviews - Special Layout */}
            <div className="text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">4.9</span>
                <div className="flex gap-0.5">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium">Google Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;
