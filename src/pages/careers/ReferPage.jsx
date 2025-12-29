import React from 'react';
import Button from '../../components/common/Button';

const ReferPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Refer & Earn</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Share the gift of language learning and earn rewards
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-bold text-secondary-navy text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl" style={{ backgroundColor: '#1F9F90' }}>
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Refer a Friend</h3>
              <p className="text-gray-600">Share your unique referral code with friends and family</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl" style={{ backgroundColor: '#1F9F90' }}>
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">They Enroll</h3>
              <p className="text-gray-600">Your friend enrolls in any language course using your code</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl" style={{ backgroundColor: '#1F9F90' }}>
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Earn Rewards</h3>
              <p className="text-gray-600">Receive exciting rewards and benefits for every successful referral</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-secondary-navy text-center mb-8">Program Benefits</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Earn rewards for every successful referral</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">No limit on number of referrals</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Your friend gets a discount on enrollment</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Easy tracking of your referrals and rewards</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-secondary-navy mb-6">Start Referring Today</h2>
          <p className="text-lg text-gray-600 mb-8">Contact us to get your unique referral code</p>
          <Button size="large" className="text-white px-12 py-4 text-lg font-semibold" style={{ backgroundColor: '#1F9F90' }}>
            Get Your Referral Code
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ReferPage;
