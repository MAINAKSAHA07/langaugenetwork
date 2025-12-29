import React from 'react';
import Button from '../components/common/Button';

const PressPage = () => {
  const pressReleases = [
    {
      id: 1,
      title: 'Siddhi Chokhani, Co-founder of The Language Network',
      link: 'https://mumbaiuncensored.com/2024/07/24/the-power-list-top-24-indian-entrepreneurs-defining-the-future/',
      image: '/images/press/441572676_18433858045028273_2268332654618413991_n 1.png',
      isAssociate: true
    },
    {
      id: 3,
      title: 'The Language Network launches its PAN India expansion campaign',
      link: 'https://aninews.in/news/business/business/the-language-network-launches-its-pan-india-expansion-campaign20220802181048/',
      image: '/images/press/ani news 1.png',
      isAssociate: false
    },
    {
      id: 4,
      title: 'The Language Network launches its PAN India expansion campaign',
      link: 'https://www.business-standard.com/content/press-releases-ani/the-language-network-launches-its-pan-india-expansion-campaign-122080300046_1.html',
      image: '/images/press/business standard 1.png',
      isAssociate: false
    },
    {
      id: 5,
      title: 'The Language Network” Edtech startup will help you to learn more languages?',
      link: '', // specific link not provided
      image: '/images/press/techlove 1.png',
      isAssociate: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-[#1a1a1a] text-white overflow-hidden">
        {/* Overlay for better text readability if we had an image, keeping it dark for now */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Background placeholder or gradient if image not available */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black z-[-1]"></div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">
            Press Centre
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Our mission is to help every person to unlock their potential – anytime, anywhere. We are revolutionising how languages are learnt by thousands of people worldwide, providing a superior learning experience.
          </p>
        </div>

        {/* Decorative bottom shape - optional, to match the curve in reference image if possible */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] lg:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Latest Features Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F9F90] border-b-4 border-[#1F9F90] pb-2 inline-block">
              Latest
            </h2>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1F9F90]">
              features
            </h2>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div
                key={release.id}
                className="bg-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col md:flex-row items-center gap-6 group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden border border-gray-100">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1F9F90] transition-colors">
                    {release.title}
                  </h3>
                  <a
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:text-blue-600 break-words line-clamp-2"
                  >
                    {release.link}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressPage;
