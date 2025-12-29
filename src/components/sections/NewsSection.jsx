import React from 'react';

const NewsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left - HT Logo Card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
              <img
                src="/images/news/HT.png"
                alt="Hindustan Times"
                className="w-40 h-auto mb-6"
              />
              <h3 className="text-xl font-bold text-gray-800">
                We have made
              </h3>
              <h2 className="text-5xl font-black text-gray-900 uppercase">
                NEWS
              </h2>
            </div>
          </div>

          {/* Center - Photo */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="bg-gray-800 rounded-3xl shadow-xl p-1 overflow-hidden mb-6">
              <img
                src="/images/news/siddhi.png"
                alt="Siddhi Chokhani, Co-Founder"
                className="rounded-3xl w-full max-w-sm h-auto object-cover"
              />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg" style={{ color: '#1F9F90' }}>Brand Stories</p>
              <p className="text-gray-500 text-sm">Published on Aug 03, 2022 06:58 PM IST</p>
            </div>
          </div>

          {/* Right - News Content with Background */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-center min-h-[300px]">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                The Language Network Launches its PAN India Expansion Campaign
              </h3>
              <p className="text-gray-700 leading-relaxed text-base mb-6">
                The institute has recently launched a new and effective Learning Management System
                to improve aspects like proper planning, implementing, and assessing students' learning
                process. The Language Network has increased its hiring activities and has also set up
                a second workspace.
              </p>

              <div>
                <p className="text-gray-700 text-base">
                  Read our full story{' '}
                  <a
                    href="https://www.hindustantimes.com/brand-stories/the-language-network-launches-its-pan-india-expansion-campaign-101659532840850.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold transition-colors inline-flex items-center gap-1"
                    style={{ color: '#1F9F90' }}
                  >
                    here
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

