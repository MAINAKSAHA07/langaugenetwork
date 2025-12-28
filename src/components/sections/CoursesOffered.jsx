import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const CoursesOffered = () => {
  const courses = [
    { name: 'French', icon: '🇫🇷', path: '/french', color: 'bg-blue-100' },
    { name: 'German', icon: '🇩🇪', path: '/german', color: 'bg-yellow-100' },
    { name: 'Spanish', icon: '🇪🇸', path: '/spanish', color: 'bg-red-100' },
    { name: 'English', icon: '🇬🇧', path: '/english', color: 'bg-blue-50' },
    { name: 'Japanese', icon: '🇯🇵', path: '/japanese', color: 'bg-red-50' },
    { name: 'Korean', icon: '🇰🇷', path: '/korean', color: 'bg-blue-50' },
    { name: 'Mandarin', icon: '🇨🇳', path: '/mandarin', color: 'bg-red-50' },
  ];

  return (
    <section className="py-16 bg-secondary-mint">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
          Courses We Offer
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {courses.map((course, index) => (
            <Link key={index} to={course.path}>
              <Card className={`text-center ${course.color} border-2 border-transparent hover:border-primary transition-all`}>
                <div className="text-6xl mb-3">{course.icon}</div>
                <h3 className="text-lg font-bold text-secondary-navy">{course.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesOffered;
