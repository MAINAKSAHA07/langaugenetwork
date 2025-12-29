import React from 'react';
import Button from '../components/common/Button';

const PressPage = () => {
  const pressReleases = [
    {
      id: 1,
      title: 'The Language Network Achieves ISO Certification',
      date: 'November 2024',
      excerpt: 'We are proud to announce that The Language Network has been awarded ISO certification, reaffirming our commitment to quality education...'
    },
    {
      id: 2,
      title: 'New Partnership with UKASL',
      date: 'October 2024',
      excerpt: 'The Language Network partners with UKASL to enhance language learning standards and provide accredited certifications...'
    },
    {
      id: 3,
      title: 'Expanding Language Offerings',
      date: 'September 2024',
      excerpt: 'We are excited to introduce new language courses including Korean, Japanese, and Mandarin to our growing catalog...'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Press & Media
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Latest news and updates from The Language Network
          </p>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-secondary-navy mb-12">Press Releases</h2>
          <div className="space-y-8">
            {pressReleases.map((release) => (
              <article key={release.id} className="border-b border-gray-200 pb-8 last:border-0">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white" style={{ backgroundColor: '#1F9F90' }}>
                    {release.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {release.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {release.excerpt}
                </p>
                <button className="text-sm font-semibold transition-colors" style={{ color: '#1F9F90' }}>
                  Read Full Release →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-secondary-navy text-center mb-8">Media Kit</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <p className="text-gray-600 mb-6 text-center">
              Download our media kit for logos, brand guidelines, and company information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="text-white px-8 py-3 font-semibold"
                style={{ backgroundColor: '#1F9F90' }}
              >
                Download Media Kit
              </Button>
              <Button
                className="border-2 px-8 py-3 font-semibold bg-white transition-all"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
              >
                Download Logos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-secondary-navy mb-6">Media Inquiries</h2>
          <p className="text-gray-600 mb-8">
            For press inquiries, interviews, or more information, please contact our media team
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 font-semibold">Email:</p>
              <a href="mailto:press@thelanguagenetwork.co" className="transition-colors" style={{ color: '#1F9F90' }}>
                press@thelanguagenetwork.co
              </a>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Phone:</p>
              <a href="tel:+1234567890" className="transition-colors" style={{ color: '#1F9F90' }}>
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressPage;
