import React from 'react';

const PartnersSection = () => {
  const alumni = [
    { name: 'Amazon', logo: '📦' },
    { name: 'Deloitte', logo: '💼' },
    { name: 'Infosys', logo: '💻' },
    { name: 'Wipro', logo: '🔷' },
    { name: 'TCS', logo: '🏢' }
  ];

  const educationPartners = [
    { name: 'Alliance Française', logo: '🇫🇷' },
    { name: 'Goethe Institut', logo: '🇩🇪' },
    { name: 'Instituto Cervantes', logo: '🇪🇸' },
    { name: 'British Council', logo: '🇬🇧' },
    { name: 'JLPT', logo: '🇯🇵' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-secondary-mint">
      <div className="container-custom">
        {/* Alumni Network */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-secondary-navy mb-4">
            Our Alumni Network
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Our students work at leading organizations worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {alumni.map((company, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all hover:scale-105 p-6 min-w-[140px] text-center"
              >
                <div className="text-4xl mb-2">{company.logo}</div>
                <p className="font-bold text-gray-800">{company.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Partners */}
        <div>
          <h2 className="text-4xl font-bold text-center text-secondary-navy mb-4">
            Our Educational Partners
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Collaborating with world-renowned language institutions
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {educationPartners.map((partner, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all hover:scale-105 p-6 min-w-[160px] text-center"
              >
                <div className="text-5xl mb-3">{partner.logo}</div>
                <p className="font-bold text-gray-800 text-sm">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-primary text-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold">5000+</div>
              <div className="text-sm opacity-90">Students Trained</div>
            </div>
            <div className="h-12 w-px bg-white opacity-30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Countries Reached</div>
            </div>
            <div className="h-12 w-px bg-white opacity-30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-sm opacity-90">Google Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

