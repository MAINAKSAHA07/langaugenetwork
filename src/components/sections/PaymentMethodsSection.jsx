import React from 'react';
import './PaymentMethodsSection.css';

const PaymentMethodsSection = () => {
  const paymentMethods = [
    { id: 1, name: 'Amazon Pay', image: '/images/payment/Group.png' },
    { id: 2, name: 'BHIM UPI', image: '/images/payment/icons8-bhim-upi-100 1.png' },
    { id: 4, name: 'Paytm', image: '/images/payment/Group 40216.png' },
    { id: 5, name: 'Google Pay', image: '/images/payment/upi-ar21 1.png' },
    { id: 6, name: 'Razorpay', image: '/images/payment/razorpay 1.png' }
  ];

  return (
    <section className="bg-gray-900 py-4 overflow-hidden">
      <div className="relative">
        {/* Scrolling Container */}
        <div className="payment-scroll-container">
          {/* First set of payment methods */}
          {paymentMethods.map((method) => (
            <div 
              key={`first-${method.id}`}
              className="flex-shrink-0 flex items-center justify-center px-6 lg:px-8"
            >
              <img
                src={method.image}
                alt={method.name}
                className="h-5 lg:h-6 w-auto object-contain filter brightness-0 invert"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {paymentMethods.map((method) => (
            <div 
              key={`second-${method.id}`}
              className="flex-shrink-0 flex items-center justify-center px-6 lg:px-8"
            >
              <img
                src={method.image}
                alt={method.name}
                className="h-5 lg:h-6 w-auto object-contain filter brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;

