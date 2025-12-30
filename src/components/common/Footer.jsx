import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 py-8 md:py-12 relative">
      <div className="container-custom max-w-7xl px-4">
        {/* Logo and Certifications */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-10">
          <Link to="/" className="flex items-center">
            <img
              src="/images/TLN_logo-01.png"
              alt="The Language Network"
              className="h-12 md:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <img
              src="/images/ISO.png"
              alt="ISO Certified"
              className="h-8 md:h-10 lg:h-12 w-auto object-contain"
            />
            <img
              src="/images/UKASL.png"
              alt="UKASL Certified"
              className="h-8 md:h-10 lg:h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-8 md:mb-10">
          {/* About Us */}
          <div>
            <h4 className="font-bold text-black text-sm mb-3">About Us</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/who-are-we" className="hover:text-accent transition-colors">Who Are We</Link></li>
              <li><Link to="/blogs" className="hover:text-accent transition-colors">Blogs</Link></li>
              <li><Link to="/press" className="hover:text-accent transition-colors">Press</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Languages for Kids */}
          <div>
            <h4 className="font-bold text-black text-sm mb-3">Languages for Kids</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/french?age=kids" className="hover:text-accent transition-colors">Online French Classes for Kids</Link></li>
              <li><Link to="/german?age=kids" className="hover:text-accent transition-colors">Online German Classes for Kids</Link></li>
              <li><Link to="/spanish?age=kids" className="hover:text-accent transition-colors">Online Spanish Classes for Kids</Link></li>
              <li><Link to="/korean?age=kids" className="hover:text-accent transition-colors">Online Korean Classes for Kids</Link></li>
              <li><Link to="/japanese?age=kids" className="hover:text-accent transition-colors">Online Japanese Classes for Kids</Link></li>
              <li><Link to="/mandarin?age=kids" className="hover:text-accent transition-colors">Online Mandarin Classes for Kids</Link></li>
              <li><Link to="/english?age=kids" className="hover:text-accent transition-colors">Online English Classes for Kids</Link></li>
            </ul>
          </div>

          {/* Languages for Adults */}
          <div>
            <h4 className="font-bold text-black text-sm mb-3">Languages for Adults</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/french" className="hover:text-accent transition-colors">Online French Classes for Adults</Link></li>
              <li><Link to="/german" className="hover:text-accent transition-colors">Online German Classes for Adults</Link></li>
              <li><Link to="/spanish" className="hover:text-accent transition-colors">Online Spanish Classes for Adults</Link></li>
              <li><Link to="/korean" className="hover:text-accent transition-colors">Online Korean Classes for Adults</Link></li>
              <li><Link to="/japanese" className="hover:text-accent transition-colors">Online Japanese Classes for Adults</Link></li>
              <li><Link to="/mandarin" className="hover:text-accent transition-colors">Online Mandarin Classes for Adults</Link></li>
              <li><Link to="/english" className="hover:text-accent transition-colors">Online English Classes for Adults</Link></li>
            </ul>
          </div>

          {/* Mastery Kit */}
          <div>
            <h4 className="font-bold text-black text-sm mb-3">Mastery Kit</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/french-mastery-kit" className="hover:text-accent transition-colors">French Mastery Kit (A1-B2)</Link></li>
              <li><Link to="/english-mastery-kit" className="hover:text-accent transition-colors">English Mastery Kit (Vol 1-4)</Link></li>
              <li><Link to="/german-a1-mastery-kit" className="hover:text-accent transition-colors">German A1 Mastery Kit</Link></li>
            </ul>
          </div>

          {/* Study Abroad */}
          <div>
            <h4 className="font-bold text-black text-sm mb-3">Study Abroad</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/study-abroad" className="hover:text-accent transition-colors">Study Abroad Programs</Link></li>
              <li><Link to="/french" className="hover:text-accent transition-colors">French for Study Abroad</Link></li>
              <li><Link to="/german" className="hover:text-accent transition-colors">German for Study Abroad</Link></li>
              <li><Link to="/spanish" className="hover:text-accent transition-colors">Spanish for Study Abroad</Link></li>
              <li><Link to="/korean" className="hover:text-accent transition-colors">Korean for Study Abroad</Link></li>
              <li><Link to="/japanese" className="hover:text-accent transition-colors">Japanese for Study Abroad</Link></li>
              <li><Link to="/mandarin" className="hover:text-accent transition-colors">Mandarin for Study Abroad</Link></li>
            </ul>
          </div>

          {/* Careers + Languages We Offer */}
          <div>
            <h4 className="font-bold text-black text-sm mb-3">Careers</h4>
            <ul className="space-y-1.5 text-sm mb-6">
              <li><Link to="/careers/teach" className="hover:text-accent transition-colors">Teach With Us</Link></li>
              <li><Link to="/careers/collaborate" className="hover:text-accent transition-colors">Collaborate With Us</Link></li>
              <li><Link to="/careers/content-creators" className="hover:text-accent transition-colors">Content Creators</Link></li>
              <li><Link to="/careers/refer" className="hover:text-accent transition-colors">Refer & Earn</Link></li>
            </ul>

            <h4 className="font-bold text-black text-sm mb-3">Languages we offer</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/french" className="hover:text-accent transition-colors">Online French Classes</Link></li>
              <li><Link to="/german" className="hover:text-accent transition-colors">Online German Classes</Link></li>
              <li><Link to="/spanish" className="hover:text-accent transition-colors">Online Spanish Classes</Link></li>
              <li><Link to="/korean" className="hover:text-accent transition-colors">Online Korean Classes</Link></li>
              <li><Link to="/japanese" className="hover:text-accent transition-colors">Online Japanese Classes</Link></li>
              <li><Link to="/mandarin" className="hover:text-accent transition-colors">Online Mandarin Classes</Link></li>
              <li><Link to="/english" className="hover:text-accent transition-colors">Online English Classes</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Us Button */}
        <div className="mb-6 text-center md:text-left">
          <Link
            to="/contact"
            className="inline-block text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition-all text-sm md:text-base"
            style={{ backgroundColor: '#1F9F90' }}
          >
            Contact us
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-4 md:pt-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs md:text-sm text-center">
              Copyright © {new Date().getFullYear()} The Language Network - All Right Reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <Link to="/terms" className="text-xs md:text-sm text-accent hover:underline transition-all">Terms & Conditions</Link>
              <Link to="/privacy" className="text-xs md:text-sm text-accent hover:underline transition-all">Privacy Policy</Link>
              <Link to="/sitemap" className="text-xs md:text-sm text-accent hover:underline transition-all">Sitemap</Link>
              <Link to="/admin/login" className="text-xs md:text-sm text-gray-400 hover:text-accent transition-all" title="Admin Access">·</Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/thelanguagenetwork/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
              <a href="mailto:contact@thelanguagenetwork.co" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white transition-all" style={{ backgroundColor: '#1F9F90' }}>
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
