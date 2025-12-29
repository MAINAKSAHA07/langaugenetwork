import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Terms & Conditions</h1>
          <p className="text-lg lg:text-xl text-white/90">Last updated: December 28, 2024</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl prose prose-lg">
          <h2 className="text-2xl font-bold text-secondary-navy mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-6">
            By accessing and using The Language Network's services, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">2. Use of Services</h2>
          <p className="text-gray-600 mb-6">
            Our services are provided for educational purposes. You agree to use our platform and services in accordance with all applicable laws and regulations.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">3. User Accounts</h2>
          <p className="text-gray-600 mb-6">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">4. Payment Terms</h2>
          <p className="text-gray-600 mb-6">
            All fees are non-refundable except as required by law or as explicitly stated in our refund policy. Payment is required before the commencement of classes.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">5. Intellectual Property</h2>
          <p className="text-gray-600 mb-6">
            All course materials, content, and resources provided by The Language Network are protected by intellectual property rights and may not be reproduced or distributed without permission.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">6. Cancellation Policy</h2>
          <p className="text-gray-600 mb-6">
            Students may cancel their enrollment subject to our cancellation policy. Please contact our support team for specific details regarding cancellations and refunds.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-600 mb-6">
            The Language Network shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">8. Changes to Terms</h2>
          <p className="text-gray-600 mb-6">
            We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">9. Contact Information</h2>
          <p className="text-gray-600">
            For questions about these Terms & Conditions, please contact us at contact@thelanguagenetwork.co
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
