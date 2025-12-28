import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const ExamsCTA = () => {
  const exams = [
    { name: 'DELF', icon: '🇫🇷', color: 'bg-blue-100' },
    { name: 'DALF', icon: '🇫🇷', color: 'bg-blue-200' },
    { name: 'TEF', icon: '🇫🇷', color: 'bg-blue-100' },
    { name: 'Goethe', icon: '🇩🇪', color: 'bg-yellow-100' },
    { name: 'DELE', icon: '🇪🇸', color: 'bg-red-100' },
    { name: 'JLPT', icon: '🇯🇵', color: 'bg-pink-100' },
    { name: 'TOPIK', icon: '🇰🇷', color: 'bg-blue-50' },
    { name: 'HSK', icon: '🇨🇳', color: 'bg-red-50' },
    { name: 'IELTS', icon: '🇬🇧', color: 'bg-blue-50' },
    { name: 'TOEFL', icon: '🇺🇸', color: 'bg-blue-50' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-navy mb-4">
            We prepare you for International Proficiency Exams
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get expert guidance and comprehensive preparation for globally recognized language certification exams
          </p>
        </div>

        {/* Exams logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          {exams.map((exam, index) => (
            <div 
              key={index}
              className={`${exam.color} rounded-xl px-6 py-4 shadow-card hover:shadow-card-hover transition-all hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{exam.icon}</span>
                <span className="font-bold text-lg text-gray-800">{exam.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/exams">
            <Button size="large" icon>
              Explore All Exams
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExamsCTA;

