import React from 'react';
import Button from '../common/Button';

const HeroSection = ({ onCreateAccount }) => {
  return (
    <section className="bg-white pt-16 lg:pt-20 pb-6 lg:pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-navy mb-6 leading-tight">
              Your Gateway to{' '}
              <span className="text-secondary-navy block">Language Excellence</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              Learn more than just a language!
            </p>
            <Button
              onClick={onCreateAccount}
              size="large"
              className="text-white px-10 py-4 text-lg font-semibold hover:scale-100 hover:shadow-none"
              style={{ backgroundColor: '#1F9F90' }}
            >
              Get started
            </Button>
          </div>

          {/* Right Side - Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full max-w-xl mx-auto">
              {/* Main hero image */}
              <img
                src="/images/hero-image.png"
                alt="Language Learning - Woman with language flags"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
