import React, { useState } from 'react';
import { createRazorpayOrder, initiateRazorpayPayment } from '../../api/razorpay';

const MasteryKitEnrollmentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const MASTERY_KIT_PRICE = 999;
  const MASTERY_KIT_NAME = 'English Mastery Kit (Volume 1-4)';

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Phone validation (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError('Please enter a valid 10-digit phone number');
        setLoading(false);
        return;
      }

      // Step 1: Create order in database
      const orderResult = await createRazorpayOrder({
        batchId: '',
        courseType: 'mastery-kit',
        amount: MASTERY_KIT_PRICE,
        currency: 'INR',
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        batchDetails: {
          courseName: MASTERY_KIT_NAME,
          type: 'mastery-kit',
          volumes: '1-4',
          includes: '16 books + 45+ bonus resources',
        },
      });

      if (!orderResult.success) {
        setError('Failed to create order: ' + orderResult.error);
        setLoading(false);
        return;
      }

      // Step 2: Initiate Razorpay payment
      await initiateRazorpayPayment({
        orderId: orderResult.order.id,
        amount: orderResult.order.amount,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        description: MASTERY_KIT_NAME,
        onSuccess: (response) => {
          // Payment successful
          alert('🎉 Payment successful! You will receive access details via email shortly.');
          console.log('Payment response:', response);
          
          // Reset form
          setFormData({ name: '', email: '', phone: '' });
          onClose();
          
          // Optionally redirect to success/download page
          // window.location.href = '/mastery-kit-success';
        },
        onFailure: (error) => {
          // Payment failed
          setError('Payment failed or was cancelled. Please try again.');
          console.error('Payment error:', error);
        },
      });
    } catch (error) {
      console.error('Purchase error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Purchase Mastery Kit</h2>
              <p className="text-white/90 text-sm">
                English Mastery Kit (Vol 1-4)
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Product:</span>
              <span className="font-semibold text-gray-900 text-right">{MASTERY_KIT_NAME}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Includes:</span>
              <span className="font-semibold text-gray-900 text-right">16 Books + 45+ Bonuses</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Access:</span>
              <span className="font-semibold text-gray-900">Lifetime</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-gray-700 font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-[#17C3B2]">₹{MASTERY_KIT_PRICE}</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Purchase Form */}
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17C3B2] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17C3B2] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                maxLength="10"
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17C3B2] focus:border-transparent"
                placeholder="10-digit mobile number"
              />
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Secure Payment via Razorpay</p>
                  <p className="text-blue-600">You'll be redirected to a secure payment page. After payment, you'll receive instant access via email.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#17C3B2] text-white font-semibold rounded-lg hover:bg-[#14A89A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MasteryKitEnrollmentModal;

