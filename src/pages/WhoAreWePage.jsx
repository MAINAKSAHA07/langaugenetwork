import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const WhoAreWePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Who Are We
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted partner in language learning excellence
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The Language Network was founded with a simple yet powerful vision: to make quality language education accessible to everyone, everywhere. We believe that language learning is not just about mastering grammar and vocabulary—it's about opening doors to new cultures, opportunities, and perspectives.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Over the years, we have grown into a leading online language learning platform, serving thousands of students across the globe. Our team of certified instructors brings years of experience and a passion for teaching that transforms every class into an engaging learning journey.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are ISO certified and accredited by UKASL, ensuring the highest standards in language education.
              </p>
            </div>
            <div>
              <img
                src="/images/hero/about-us.png"
                alt="About The Language Network"
                className="w-full h-auto rounded-2xl shadow-xl"
                onError={(e) => { e.target.src = '/images/hero-image.png'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-secondary-navy mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower individuals and organizations with multilingual skills through innovative, personalized, and high-quality language education that goes beyond textbooks to create real-world fluency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-secondary-navy mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the world's most trusted and preferred online language learning platform, bridging cultures and creating global citizens who can communicate confidently in multiple languages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest quality in everything we do
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Student-Centric</h3>
              <p className="text-gray-600">
                Our students' success is our success
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuous improvement in teaching methodologies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Our Certifications
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="text-center">
              <img src="/images/ISO.png" alt="ISO Certified" className="h-24 w-auto mx-auto mb-4" />
              <p className="text-gray-600">ISO Certified</p>
            </div>
            <div className="text-center">
              <img src="/images/UKASL.png" alt="UKASL Accredited" className="h-24 w-auto mx-auto mb-4" />
              <p className="text-gray-600">UKASL Accredited</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-6">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students learning languages with The Language Network
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

export default WhoAreWePage;
