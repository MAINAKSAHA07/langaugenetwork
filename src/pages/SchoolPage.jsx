import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const SchoolPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Language Classes for Schools
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Empower your students with multilingual skills through our specially designed school programs
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
                Why Language Learning for Schools?
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Age-appropriate curriculum designed for K-12 students</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Interactive and engaging learning methods</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Certified trainers experienced in teaching young learners</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible schedules that fit school timetables</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/images/hero/school-learning.png"
                alt="School language learning"
                className="w-full h-auto rounded-2xl shadow-xl"
                onError={(e) => { e.target.src = '/images/hero-image.png'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Languages Offered Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Languages We Offer for Schools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {['French', 'German', 'Spanish', 'English', 'Japanese', 'Korean', 'Mandarin'].map((lang) => (
              <Link
                key={lang}
                to={`/${lang.toLowerCase()}-kids`}
                className="bg-white p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lang}</h3>
                <p className="text-sm" style={{ color: '#1F9F90' }}>Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us today to learn more about our school programs
          </p>
          <Link to="/contact">
            <Button
              size="large"
              className="text-white px-12 py-4 text-lg font-semibold"
              style={{ backgroundColor: '#1F9F90' }}
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SchoolPage;
