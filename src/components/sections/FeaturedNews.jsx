import React from 'react';
import Card from '../common/Card';

const FeaturedNews = () => {
  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left side - Badge */}
          <div className="flex-shrink-0">
            <div className="bg-secondary-mint rounded-2xl p-6 text-center shadow-card">
              <div className="text-4xl mb-2">📰</div>
              <h3 className="text-xl font-bold text-secondary-navy mb-1">
                Featured in
              </h3>
              <p className="text-sm text-gray-600 font-semibold">NEWS</p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1">
            <div className="flex items-start gap-6">
              {/* Image placeholder */}
              <div className="flex-shrink-0 hidden md:block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-2">🎓</div>
                    <p className="text-xs font-semibold">TLN</p>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-secondary-navy mb-3">
                  The Language Network
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Founded in 2020, <span className="font-semibold text-primary">The Language Network</span> has emerged 
                  as a leading online language learning platform, offering comprehensive courses in 7 global languages. 
                  With over 5,000 satisfied learners and a team of internationally certified instructors, TLN provides 
                  personalized learning experiences tailored to individual goals.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our innovative teaching methodology combines interactive sessions, cultural immersion, and exam 
                  preparation to ensure students achieve fluency and confidence. From beginners to advanced learners, 
                  TLN empowers individuals to unlock global opportunities through language mastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;

