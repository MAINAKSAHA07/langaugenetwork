import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-lg lg:text-xl text-white/90">Last updated: December 28, 2024</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl prose prose-lg">
          <h2 className="text-2xl font-bold text-secondary-navy mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-6">
            We collect information that you provide directly to us, including name, email address, phone number, and payment information when you register for our courses.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-6">
            We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and events.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 mb-6">
            We do not share your personal information with third parties except as described in this policy or with your consent. We may share information with service providers who perform services on our behalf.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">4. Data Security</h2>
          <p className="text-gray-600 mb-6">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">5. Cookies and Tracking</h2>
          <p className="text-gray-600 mb-6">
            We use cookies and similar tracking technologies to collect information about your browsing activities and to provide personalized content and advertising.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">6. Your Rights</h2>
          <p className="text-gray-600 mb-6">
            You have the right to access, update, or delete your personal information. You may also object to or restrict certain processing of your information.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">7. Children's Privacy</h2>
          <p className="text-gray-600 mb-6">
            Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13 without parental consent.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">8. Changes to Privacy Policy</h2>
          <p className="text-gray-600 mb-6">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-bold text-secondary-navy mb-4">9. Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this Privacy Policy, please contact us at contact@thelanguagenetwork.co
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
