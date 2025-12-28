import React from 'react';

const StatisticsBar = () => {
  const stats = [
    { value: '7', label: 'Languages' },
    { value: '5000+', label: 'Happy Learners' },
    { value: '200+', label: 'Alpha Mentors' },
    { value: '50000+', label: 'Hours of Enlightenment' },
    { value: '4.9 ⭐⭐⭐⭐⭐', label: 'Google Reviews' },
  ];

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;
