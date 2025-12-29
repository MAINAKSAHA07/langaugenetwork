import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const WorkWithUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Work With Us
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Join our team of passionate educators and language enthusiasts
          </p>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Career Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/careers/teach" className="bg-gray-50 p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Teach With Us</h3>
              <p className="text-gray-600 mb-4">
                Join our team as a language instructor and inspire students worldwide
              </p>
              <span className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Learn More →
              </span>
            </Link>

            <Link to="/careers/collaborate" className="bg-gray-50 p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Collaborate With Us</h3>
              <p className="text-gray-600 mb-4">
                Partner with us on educational projects and language programs
              </p>
              <span className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Learn More →
              </span>
            </Link>

            <Link to="/careers/content-creators" className="bg-gray-50 p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Content Creators</h3>
              <p className="text-gray-600 mb-4">
                Create engaging language learning content and materials
              </p>
              <span className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Learn More →
              </span>
            </Link>

            <Link to="/careers/refer" className="bg-gray-50 p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Refer & Earn</h3>
              <p className="text-gray-600 mb-4">
                Refer students and earn rewards through our referral program
              </p>
              <span className="text-sm font-semibold" style={{ color: '#1F9F90' }}>
                Learn More →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Why Join The Language Network?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Professional Growth</h3>
              <p className="text-gray-600">
                Continuous training and development opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Supportive Environment</h3>
              <p className="text-gray-600">
                Collaborative culture with passionate educators
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Flexible Schedule</h3>
              <p className="text-gray-600">
                Work at your own pace with flexible timings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our career opportunities and become part of our growing community
          </p>
          <Link to="/contact">
            <Button
              size="large"
              className="text-white px-12 py-4 text-lg font-semibold"
              style={{ backgroundColor: '#1F9F90' }}
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkWithUsPage;
