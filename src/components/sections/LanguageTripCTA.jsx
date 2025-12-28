import React from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

const LanguageTripCTA = () => {
  const benefits = [
    {
      icon: '🌍',
      title: 'Cultural Immersion',
      description: 'Experience authentic language and culture'
    },
    {
      icon: '🎓',
      title: 'Expert Guidance',
      description: 'Learn with professional instructors'
    },
    {
      icon: '✈️',
      title: 'Travel & Learn',
      description: 'Explore new destinations while studying'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Fluency, Culture, Career & Beyond
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
            Join us on exclusive language learning trips around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center bg-white">
              <div className="text-6xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-secondary-navy mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Let's Embark On A Language Trip!
          </h3>
          <p className="text-white opacity-90 mb-6">
            I HAVE AN INTEREST IN (SELECT ONE)
          </p>
          <Button variant="secondary" size="large" icon>
            Explore Language Trips
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LanguageTripCTA;

