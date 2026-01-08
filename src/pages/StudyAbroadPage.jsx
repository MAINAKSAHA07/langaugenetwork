import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const StudyAbroadPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Language Preparation for Study Abroad
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Ace your language proficiency exams and prepare for your international education journey
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
                Why Choose Us for Study Abroad Preparation?
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Expert guidance for international language exams (DELF, DELE, TestDaF, JLPT, TOPIK, HSK)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>CEFR-aligned curriculum to meet university requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Mock tests and practice materials for exam preparation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Guidance on documentation and language requirements</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/images/hero/study-abroad.png"
                alt="Study abroad preparation"
                className="w-full h-auto rounded-2xl shadow-xl"
                onError={(e) => { e.target.src = '/images/hero-image.png'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Popular Study Destinations & Languages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">France</h3>
              <p className="text-gray-600 mb-4">Learn French for studying in France's prestigious universities</p>
              <Link to="/online-french-classes-to-study-abroad" className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Explore French Courses →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Germany</h3>
              <p className="text-gray-600 mb-4">Master German for German universities and career opportunities</p>
              <Link to="/online-german-classes-to-study-abroad" className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Explore German Courses →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Spain & Latin America</h3>
              <p className="text-gray-600 mb-4">Learn Spanish for studying in Spain or Latin American countries</p>
              <Link to="/online-spanish-classes-to-study-abroad" className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Explore Spanish Courses →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Japan</h3>
              <p className="text-gray-600 mb-4">Prepare for JLPT and study in Japanese universities</p>
              <Link to="/online-japanese-classes-to-study-abroad" className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Explore Japanese Courses →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">South Korea</h3>
              <p className="text-gray-600 mb-4">Master Korean for TOPIK and Korean university admission</p>
              <Link to="/online-korean-classes-to-study-abroad" className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Explore Korean Courses →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">China</h3>
              <p className="text-gray-600 mb-4">Learn Mandarin for Chinese universities and HSK exams</p>
              <Link to="/online-mandarin-classes-to-study-abroad" className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Explore Mandarin Courses →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
            Start Your Study Abroad Journey Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get in touch to learn more about our study abroad preparation programs
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

export default StudyAbroadPage;
