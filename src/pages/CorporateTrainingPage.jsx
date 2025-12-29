import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const CorporateTrainingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Corporate Language Training
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Empower your workforce with multilingual skills for global business success
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
                Why Corporate Language Training?
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Customized programs aligned with your business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Industry-specific vocabulary and scenarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible scheduling for working professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Progress tracking and detailed reporting</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/images/hero/corporate-training.png"
                alt="Corporate language training"
                className="w-full h-auto rounded-2xl shadow-xl"
                onError={(e) => { e.target.src = '/images/hero-image.png'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Our Corporate Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Group Training</h3>
              <p className="text-gray-600">Structured batch programs for teams with similar learning objectives</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">One-on-One Coaching</h3>
              <p className="text-gray-600">Personalized training for executives and key personnel</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Online & In-Person</h3>
              <p className="text-gray-600">Flexible delivery modes to suit your organization's preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Languages We Offer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {['French', 'German', 'Spanish', 'English', 'Japanese', 'Korean', 'Mandarin'].map((lang) => (
              <Link
                key={lang}
                to={`/${lang.toLowerCase()}`}
                className="bg-gray-50 p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lang}</h3>
                <p className="text-sm" style={{ color: '#1F9F90' }}>Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
            Ready to Upskill Your Team?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us for a customized corporate training proposal
          </p>
          <Link to="/contact">
            <Button
              size="large"
              className="text-white px-12 py-4 text-lg font-semibold"
              style={{ backgroundColor: '#1F9F90' }}
            >
              Get a Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CorporateTrainingPage;
