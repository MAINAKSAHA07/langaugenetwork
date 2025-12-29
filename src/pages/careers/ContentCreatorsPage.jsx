import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const ContentCreatorsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Content Creators</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Create engaging language learning content and inspire learners worldwide
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-bold text-secondary-navy mb-8">What We're Looking For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Course Material Developers</h3>
              <p className="text-gray-600">Create comprehensive curriculum and learning materials aligned with CEFR standards</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Video Content Creators</h3>
              <p className="text-gray-600">Produce engaging video lessons and educational content</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Interactive Exercise Designers</h3>
              <p className="text-gray-600">Design interactive activities, quizzes, and practice exercises</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cultural Content Specialists</h3>
              <p className="text-gray-600">Create authentic cultural content and real-world scenarios</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-secondary-navy mb-6">Join Our Creative Team</h2>
          <p className="text-lg text-gray-600 mb-8">Apply now to start creating impactful learning experiences</p>
          <Link to="/contact">
            <Button size="large" className="text-white px-12 py-4 text-lg font-semibold" style={{ backgroundColor: '#1F9F90' }}>
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ContentCreatorsPage;
