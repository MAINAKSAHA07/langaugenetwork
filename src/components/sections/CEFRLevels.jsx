import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

const CEFRLevels = () => {
  const levels = [
    {
      code: 'A1',
      name: 'Beginner',
      color: 'from-green-400 to-green-600',
      icon: '🌱',
      description: 'Start your journey',
      features: [
        'Basic vocabulary',
        'Simple conversations',
        'Everyday expressions',
        'Foundation building'
      ]
    },
    {
      code: 'A2',
      name: 'Elementary',
      color: 'from-green-500 to-green-700',
      icon: '🌿',
      description: 'Build confidence',
      features: [
        'Routine tasks',
        'Familiar topics',
        'Simple descriptions',
        'Basic grammar'
      ]
    },
    {
      code: 'B1',
      name: 'Intermediate',
      color: 'from-blue-400 to-blue-600',
      icon: '📚',
      description: 'Develop fluency',
      features: [
        'Clear communication',
        'Work situations',
        'Travel conversations',
        'Express opinions'
      ]
    },
    {
      code: 'B2',
      name: 'Upper Intermediate',
      color: 'from-blue-500 to-blue-700',
      icon: '📖',
      description: 'Master complexity',
      features: [
        'Fluent interaction',
        'Technical topics',
        'Detailed arguments',
        'Native understanding'
      ]
    },
    {
      code: 'C1',
      name: 'Advanced',
      color: 'from-purple-400 to-purple-600',
      icon: '🎓',
      description: 'Achieve excellence',
      features: [
        'Flexible language use',
        'Professional fluency',
        'Complex texts',
        'Academic writing'
      ]
    },
    {
      code: 'C2',
      name: 'Proficiency',
      color: 'from-purple-500 to-purple-700',
      icon: '👑',
      description: 'Native-like mastery',
      features: [
        'Perfect comprehension',
        'Spontaneous expression',
        'Subtle meanings',
        'Complete mastery'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-secondary-mint to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold text-secondary-navy mb-3">
            Our courses are aligned with
          </h2>
          <h3 className="text-3xl font-bold text-primary mb-4">
            The CEFR Levels
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Common European Framework of Reference for Languages - 
            The internationally recognized standard for measuring language proficiency
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {levels.map((level, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:scale-105 transition-transform duration-300"
              padding="none"
            >
              <div className={`bg-gradient-to-r ${level.color} text-white p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-3xl font-bold">{level.code}</div>
                    <div className="text-lg font-semibold opacity-90">{level.name}</div>
                  </div>
                  <div className="text-4xl">{level.icon}</div>
                </div>
                <p className="text-sm opacity-90">{level.description}</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-2">
                  {level.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/levels">
            <Button size="large" icon>
              Learn More About Levels
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CEFRLevels;

