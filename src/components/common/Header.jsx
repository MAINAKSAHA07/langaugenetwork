import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const AnnouncementBar = () => (
  <div className="bg-[#2C2C2C] text-white py-3 text-center text-sm font-medium z-50 relative">
    <div className="container-custom flex justify-center items-center gap-2">
      <Link to="/exams" className="text-[#17C3B2] hover:text-[#14A89A] transition-colors">
        DELF/Goethe Exam Schedule
      </Link>
      <span className="text-gray-500">|</span>
      <Link to="/batches" className="text-[#17C3B2] hover:text-[#14A89A] transition-colors">
        Batches Starting Now!
      </Link>
    </div>
  </div>
);

const Header = ({ onDemoClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);

  const languages = [
    { name: 'French', path: '/french' },
    { name: 'German', path: '/german' },
    { name: 'Spanish', path: '/spanish' },
    { name: 'English', path: '/english' },
    { name: 'Japanese', path: '/japanese' },
    { name: 'Korean', path: '/korean' },
    { name: 'Mandarin', path: '/mandarin' },
  ];

  const workOptions = [
    { name: 'Teach with us', path: '/careers/teach' },
    { name: 'Collaborate with us', path: '/careers/collaborate' },
    { name: 'Content Creators', path: '/careers/content-creators' },
    { name: 'Refer & Earn', path: '/careers/refer' },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sticky top-0 z-40 h-[80px]">
        <nav className="container-custom h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center pl-4 lg:pl-10">
            <img
              src="/images/TLN_logo-01.png"
              alt="The Language Network"
              className="h-12 md:h-16 lg:h-[4.5rem] w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#333]">
            {/* Languages Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#17C3B2] transition-colors"
              >
                Languages
                <svg
                  className={`w-3 h-3 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {(languageDropdownOpen || false) && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                  onMouseLeave={() => setLanguageDropdownOpen(false)}
                >
                  {languages.map((lang) => (
                    <Link
                      key={lang.name}
                      to={lang.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#E8F7F5] hover:text-[#17C3B2] transition-colors"
                      onClick={() => setLanguageDropdownOpen(false)}
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/school" className="hover:text-[#17C3B2] hover:scale-105 transition-all">School</Link>
            <Link to="/college" className="hover:text-[#17C3B2] hover:scale-105 transition-all">College</Link>
            <Link to="/study-abroad" className="hover:text-[#17C3B2] hover:scale-105 transition-all">Study Abroad</Link>
            <Link to="/corporate-training" className="hover:text-[#17C3B2] hover:scale-105 transition-all">Corporate Training</Link>

            {/* Work with us Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#17C3B2] transition-colors"
              >
                Work with us
                <svg
                  className={`w-3 h-3 transition-transform ${workDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {(workDropdownOpen || false) && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                  onMouseLeave={() => setWorkDropdownOpen(false)}
                >
                  {workOptions.map((option) => (
                    <Link
                      key={option.name}
                      to={option.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#E8F7F5] hover:text-[#17C3B2] transition-colors"
                      onClick={() => setWorkDropdownOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={onDemoClick}
              className="bg-[#17C3B2] text-white hover:brightness-110 !px-7 !py-3 rounded-md font-semibold text-[15px]"
              style={{ backgroundColor: '#17C3B2' }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t absolute w-full left-0 top-[80px] shadow-lg py-4 px-4 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
            <div className="space-y-4">
              <div>
                <div className="font-medium text-[#17C3B2] mb-2">Languages</div>
                <div className="pl-4 space-y-2 border-l-2 border-gray-100">
                  {languages.map((lang) => (
                    <Link key={lang.name} to={lang.path} onClick={() => setMobileMenuOpen(false)} className="block text-gray-600">
                      {lang.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/school" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-700">School</Link>
              <Link to="/college" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-700">College</Link>
              <Link to="/study-abroad" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-700">Study Abroad</Link>
              <Link to="/corporate-training" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-700">Corporate Training</Link>

              <div>
                <div className="font-medium text-[#17C3B2] mb-2">Work with us</div>
                <div className="pl-4 space-y-2 border-l-2 border-gray-100">
                  {workOptions.map((opt) => (
                    <Link key={opt.name} to={opt.path} onClick={() => setMobileMenuOpen(false)} className="block text-gray-600">
                      {opt.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button onClick={() => { onDemoClick(); setMobileMenuOpen(false); }} className="w-full justify-center bg-[#17C3B2] text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
