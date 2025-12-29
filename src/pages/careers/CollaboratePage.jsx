import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const CollaboratePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Collaborate With Us</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Partner with us to create innovative language learning solutions
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-bold text-secondary-navy text-center mb-12">Partnership Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Educational Institutions</h3>
              <p className="text-gray-600 mb-4">Partner with schools, colleges, and universities for language programs</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Corporate Partners</h3>
              <p className="text-gray-600 mb-4">Collaborate on corporate training and employee development programs</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Content Creators</h3>
              <p className="text-gray-600 mb-4">Co-create engaging language learning materials and resources</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-secondary-navy mb-6">Let's Work Together</h2>
          <p className="text-lg text-gray-600 mb-8">Contact us to discuss partnership opportunities</p>
          <Link to="/contact">
            <Button size="large" className="text-white px-12 py-4 text-lg font-semibold" style={{ backgroundColor: '#1F9F90' }}>
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CollaboratePage;
