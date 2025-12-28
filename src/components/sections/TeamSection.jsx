import React from 'react';
import Card from '../common/Card';

const TeamSection = () => {
  const team = [
    {
      name: 'Asha Gupta',
      role: 'French Language Expert',
      image: '👩‍🏫',
      certification: 'DELF/DALF Certified',
      experience: '10+ years',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Michael Fischer',
      role: 'German Language Expert',
      image: '👨‍🏫',
      certification: 'Goethe Institut Certified',
      experience: '12+ years',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      name: 'Deepak Choudhary',
      role: 'Spanish Language Expert',
      image: '👨‍🏫',
      certification: 'DELE Certified',
      experience: '8+ years',
      gradient: 'from-red-400 to-red-600'
    },
    {
      name: 'Kanika',
      role: 'English Language Expert',
      image: '👩‍🏫',
      certification: 'IELTS/TOEFL Certified',
      experience: '15+ years',
      gradient: 'from-blue-300 to-blue-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-navy mb-4">
            Inspiring. Dedicated. Knowledgeable
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Meet our team of internationally certified language instructors who bring passion, 
            expertise, and years of teaching experience to help you achieve your language goals.
          </p>
          <p className="text-primary font-semibold">
            MEET THE TEAM OF CERTIFIED AND EXPERIENCED LANGUAGE INSTRUCTORS
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="text-center overflow-hidden hover:scale-105 transition-transform duration-300"
              padding="none"
            >
              <div className={`bg-gradient-to-br ${member.gradient} py-12`}>
                <div className="text-8xl mb-4">
                  {member.image}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-3">
                  {member.role}
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-primary">✓</span>
                    {member.certification}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-primary">✓</span>
                    {member.experience}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-secondary-mint rounded-2xl px-8 py-6 shadow-card">
            <p className="text-lg text-gray-700 mb-2">
              Our instructors are passionate about language education and committed to your success
            </p>
            <p className="text-sm text-gray-600">
              With combined experience of over 100+ years in language training
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

