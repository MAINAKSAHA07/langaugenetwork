import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What languages do you offer?',
          answer: 'We offer courses in French, German, Spanish, English, Japanese, Korean, and Mandarin. All our courses are aligned with CEFR levels from A1 (Beginner) to C2 (Master level).'
        },
        {
          question: 'Are your classes online or in-person?',
          answer: 'All our classes are conducted online, giving you the flexibility to learn from anywhere in the world at your convenience.'
        },
        {
          question: 'How long does it take to complete a level?',
          answer: 'The duration depends on the level and your chosen schedule. Typically, each CEFR level takes 60-80 hours of instruction, which can be completed in 3-6 months depending on class frequency.'
        }
      ]
    },
    {
      category: 'Enrollment',
      questions: [
        {
          question: 'How do I enroll in a course?',
          answer: 'You can enroll by booking a free demo class through our website. After the demo, our team will guide you through the enrollment process and help you choose the right batch.'
        },
        {
          question: 'Can I get a free trial class?',
          answer: 'Yes! We offer a complimentary demo class so you can experience our teaching methodology and interact with our trainers before enrolling.'
        },
        {
          question: 'What are the payment options?',
          answer: 'We accept various payment methods including credit/debit cards, bank transfers, and online payment platforms. Our team will provide detailed payment information during enrollment.'
        }
      ]
    },
    {
      category: 'Classes & Schedule',
      questions: [
        {
          question: 'What are the class timings?',
          answer: 'We offer flexible batch timings to accommodate different schedules, including morning, afternoon, evening, and weekend batches. You can choose the timing that works best for you.'
        },
        {
          question: 'What if I miss a class?',
          answer: 'We provide class recordings for all sessions, so you can catch up on any missed classes. Additionally, our instructors are available for doubt-clearing sessions.'
        },
        {
          question: 'How many students are in each batch?',
          answer: 'We maintain small batch sizes (typically 6-12 students) to ensure personalized attention and maximum interaction with the instructor.'
        }
      ]
    },
    {
      category: 'Certifications',
      questions: [
        {
          question: 'Will I receive a certificate after completing the course?',
          answer: 'Yes, you will receive a course completion certificate from The Language Network. Additionally, we prepare students for international certification exams like DELF, DELE, TestDaF, JLPT, TOPIK, and HSK.'
        },
        {
          question: 'Are your certifications recognized internationally?',
          answer: 'The Language Network is ISO certified and accredited by UKASL. We prepare students for internationally recognized language proficiency exams.'
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Find answers to common questions about our language courses
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-4xl">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-secondary-navy mb-6 pb-3 border-b-2" style={{ borderColor: '#1F9F90' }}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={qIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-semibold text-gray-800 pr-4">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          style={{ color: '#1F9F90' }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 bg-gray-50">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-secondary-navy mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Can't find the answer you're looking for? Reach out to our support team
          </p>
          <Link to="/contact">
            <button
              className="px-12 py-4 text-white rounded-lg font-semibold text-lg transition-all hover:brightness-110"
              style={{ backgroundColor: '#1F9F90' }}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
