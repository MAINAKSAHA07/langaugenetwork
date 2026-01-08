import React from 'react';
import { Link } from 'react-router-dom';

const SitemapPage = () => {
  const siteStructure = [
    {
      category: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Who Are We', path: '/who-are-we' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Press', path: '/press' }
      ]
    },
    {
      category: 'Languages',
      links: [
        { name: 'French Classes', path: '/online-french-classes' },
        { name: 'German Classes', path: '/online-german-classes' },
        { name: 'Spanish Classes', path: '/online-spanish-classes' },
        { name: 'English Classes', path: '/online-english-classes' },
        { name: 'Japanese Classes', path: '/online-japanese-classes' },
        { name: 'Korean Classes', path: '/online-korean-classes' },
        { name: 'Mandarin Classes', path: '/online-mandarin-classes' }
      ]
    },
    {
      category: 'Programs',
      links: [
        { name: 'School Programs', path: '/school' },
        { name: 'College Programs', path: '/college' },
        { name: 'Study Abroad', path: '/study-abroad' },
        { name: 'Corporate Training', path: '/corporate-training' }
      ]
    },
    {
      category: 'Resources',
      links: [
        { name: 'CEFR Levels', path: '/levels' },
        { name: 'International Exams', path: '/exams' }
      ]
    },
    {
      category: 'Careers',
      links: [
        { name: 'Work With Us', path: '/work-with-us' },
        { name: 'Teach With Us', path: '/careers/teach' },
        { name: 'Collaborate', path: '/careers/collaborate' },
        { name: 'Content Creators', path: '/careers/content-creators' },
        { name: 'Refer & Earn', path: '/careers/refer' }
      ]
    },
    {
      category: 'Legal',
      links: [
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Sitemap</h1>
          <p className="text-lg lg:text-xl text-white/90">Navigate through all pages of The Language Network</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteStructure.map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold text-secondary-navy mb-4 pb-2 border-b-2" style={{ borderColor: '#1F9F90' }}>
                  {section.category}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-gray-700 hover:text-accent transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;
