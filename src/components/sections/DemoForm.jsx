import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

const DemoForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
  });

  const languages = [
    'French',
    'German',
    'Spanish',
    'English',
    'Japanese',
    'Korean',
    'Mandarin',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demo form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      language: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      {/* Header with colorful background */}
      <div className="bg-gradient-to-r from-pink-400 via-primary to-purple-400 -mx-6 -mt-6 mb-6 py-8 px-6 rounded-t-2xl">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-white font-bold text-xl">TLN</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white text-center">
          Book Your Free Demo Class
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <Input
          label="Email ID"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Language To Learn <span className="text-red-500">*</span>
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full mt-6" size="large" icon style={{ backgroundColor: '#1F9F90' }}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default DemoForm;
