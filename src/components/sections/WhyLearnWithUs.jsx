import React from 'react';
import Card from '../common/Card';

const WhyLearnWithUs = () => {
  const features = [
    {
      title: 'Free Demo',
      description: 'Experience our teaching methodology with a complimentary demo class',
      icon: '🎯',
    },
    {
      title: 'Interactive Sessions',
      description: 'Engaging and dynamic classes that keep you motivated',
      icon: '💬',
    },
    {
      title: 'Review Sessions',
      description: 'Regular revision classes to reinforce your learning',
      icon: '📚',
    },
    {
      title: 'Batch Flexibility',
      description: 'Switch between batches based on your schedule',
      icon: '🔄',
    },
    {
      title: 'Flexible Timings',
      description: 'Classes that fit your busy lifestyle',
      icon: '⏰',
    },
    {
      title: 'Certified Courses',
      description: 'Internationally recognized certifications',
      icon: '🏆',
    },
    {
      title: 'Free Study Material',
      description: 'Comprehensive learning resources at no extra cost',
      icon: '📖',
    },
    {
      title: 'Expert Trainers',
      description: 'Learn from internationally certified instructors',
      icon: '👨‍🏫',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center text-secondary-navy mb-4">
          Why should you learn with The Language Network?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We provide a comprehensive learning experience with the best resources and support
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-secondary-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearnWithUs;
