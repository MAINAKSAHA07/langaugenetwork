import React, { useState } from 'react';

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="container-custom max-w-4xl">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-navy text-center mb-12 lg:mb-16 leading-tight">
          FAQs
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors duration-300"
              >
                <h3 className="text-lg lg:text-xl font-semibold text-secondary-navy pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 flex-shrink-0 text-accent transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#faqs"
            className="inline-block text-lg font-semibold text-accent hover:underline transition-all duration-300"
          >
            Read all FAQs
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

