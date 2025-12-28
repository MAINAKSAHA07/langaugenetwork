import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Header = ({ onDemoClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const languages = [
    { name: 'French', path: '/french' },
    { name: 'German', path: '/german' },
    { name: 'Spanish', path: '/spanish' },
    { name: 'English', path: '/english' },
    { name: 'Japanese', path: '/japanese' },
    { name: 'Korean', path: '/korean' },
    { name: 'Mandarin', path: '/mandarin' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/TLN_logo-01.png"
              alt="The Language Network"
              className="h-12 md:h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Languages Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 text-gray-700 transition-colors font-medium hover:text-[#1F9F90]"
              >
                Languages
                <svg
                  className={`w-4 h-4 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {languageDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {languages.map((lang) => (
                    <Link
                      key={lang.name}
                      to={lang.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-secondary-mint hover:text-primary transition-colors"
                      onClick={() => setLanguageDropdownOpen(false)}
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/school" className="text-gray-700 hover:text-[#1F9F90] transition-colors font-medium">
              School
            </Link>
            <Link to="/college" className="text-gray-700 hover:text-[#1F9F90] transition-colors font-medium">
              College
            </Link>
            <Link to="/study-abroad" className="text-gray-700 hover:text-[#1F9F90] transition-colors font-medium">
              Study Abroad
            </Link>
            <Link to="/corporate-training" className="text-gray-700 hover:text-[#1F9F90] transition-colors font-medium">
              Corporate Training
            </Link>
            <Link to="/work-with-us" className="text-gray-700 hover:text-[#1F9F90] transition-colors font-medium">
              Work with us
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button onClick={onDemoClick} className="text-white hover:brightness-110 transition-all" style={{ backgroundColor: '#1F9F90' }}>
              Get Started
            </Button>
            <Button variant="secondary" className="border-2 bg-white transition-all hover:bg-[#1F9F90] hover:text-white" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
              Already Booked a Class
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-gray-700 font-medium">Languages</span>
                <div className="pl-4 flex flex-col gap-2">
                  {languages.map((lang) => (
                    <Link
                      key={lang.name}
                      to={lang.path}
                      className="text-gray-600 hover:text-[#1F9F90] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/school" className="text-gray-700 hover:text-[#1F9F90] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                School
              </Link>
              <Link to="/college" className="text-gray-700 hover:text-[#1F9F90] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                College
              </Link>
              <Link to="/study-abroad" className="text-gray-700 hover:text-[#1F9F90] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Study Abroad
              </Link>
              <Link to="/corporate-training" className="text-gray-700 hover:text-[#1F9F90] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Corporate Training
              </Link>
              <Link to="/work-with-us" className="text-gray-700 hover:text-[#1F9F90] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Work with us
              </Link>
              <Button onClick={() => { onDemoClick(); setMobileMenuOpen(false); }} className="mt-2 text-white" style={{ backgroundColor: '#1F9F90' }}>
                Get Started
              </Button>
              <Button onClick={() => { onDemoClick(); setMobileMenuOpen(false); }} variant="outline" className="bg-white border-2 hover:bg-[#1F9F90] hover:text-white transition-all" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
                Already Booked a Class
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
