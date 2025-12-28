import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import StatisticsBar from '../components/sections/StatisticsBar';

const LanguagePage = () => {
  const { language } = useParams();
  const languageName = language ? language.charAt(0).toUpperCase() + language.slice(1) : 'Language';

  const languageData = {
    french: {
      flag: '🇫🇷',
      color: 'from-blue-400 to-blue-600',
      image: '/images/languages/French Landing Page.jpg'
    },
    german: {
      flag: '🇩🇪',
      color: 'from-yellow-400 to-orange-500',
      image: '/images/languages/German Landing Page.jpg'
    },
    spanish: {
      flag: '🇪🇸',
      color: 'from-red-400 to-red-600',
      image: '/images/languages/Spain Landing Page.jpg'
    },
    english: {
      flag: '🇬🇧',
      color: 'from-blue-300 to-blue-500',
      image: '/images/languages/English Landing Page.jpg'
    },
    japanese: {
      flag: '🇯🇵',
      color: 'from-pink-400 to-red-500',
      image: '/images/languages/Japan Landing Page.jpg'
    },
    korean: {
      flag: '🇰🇷',
      color: 'from-blue-400 to-blue-600',
      image: '/images/languages/Korea Landing Page.jpg'
    },
    mandarin: {
      flag: '🇨🇳',
      color: 'from-red-500 to-yellow-500',
      image: '/images/languages/China Landing Page.jpg'
    },
  };

  const data = languageData[language] || { flag: '🌍', color: 'from-primary to-primary-dark', image: null };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white pt-0 pb-2 lg:pb-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 pt-4 lg:pt-12">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-navy mb-8 leading-tight">
                Online {languageName} Classes
              </h1>
              <p className="text-base lg:text-lg text-gray-700 mb-10 leading-loose">
                Step into the world of our <strong>online {languageName} classes!</strong> Whether you're starting from scratch or polishing your already impressive {languageName} skills, our tailored and interactive courses are crafted just for you. Bid farewell to traditional classroom setups and embrace personalised instruction, flexible scheduling, and immersive learning experiences with our top-notch online {languageName} courses. With our team of expert trainers by your side, you'll smoothly navigate the ins and outs of {languageName} grammar, expand your vocabulary, engage in lively conversations, and dive deep into the rich culture. Prepare to dive headfirst into the elegance of the {languageName} language and experience the thrill of mastering {languageName} at your own pace with our 1:1 or Group Online {languageName} Classes.
              </p>
              <Button
                size="large"
                className="text-white px-10 py-4 text-lg font-semibold"
                style={{ backgroundColor: '#1F9F90' }}
              >
                Get started
              </Button>
            </div>

            {/* Right Side - Hero Image */}
            <div className="order-1 lg:order-2 relative -mt-4 lg:-mt-8">
              <div className="relative w-full max-w-xl mx-auto">
                {data.image ? (
                  <img
                    src={data.image}
                    alt={`${languageName} Learning`}
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                ) : (
                  <div className="text-9xl text-center">{data.flag}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatisticsBar />

      {/* Classes Types Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
            {languageName} Classes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden p-0">
              {data.image && (
                <img
                  src={`/images/kids/${language === 'mandarin' ? 'China' : language === 'japanese' ? 'Japan' : language === 'korean' ? 'Korea' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'}.jpg`}
                  alt={`${languageName} Classes for Kids`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="text-4xl mb-4">👶</div>
                <h3 className="text-xl font-bold mb-2">{languageName} Classes for Kids</h3>
                <p className="text-gray-600 mb-4">
                  Fun and engaging classes designed specifically for children aged 8-14
                </p>
                <Button className="w-full" icon>Learn More</Button>
              </div>
            </Card>

            <Card className="overflow-hidden p-0">
              {data.image && (
                <img
                  src={`/images/adults/Adult ${language === 'mandarin' ? 'China' : language === 'japanese' ? 'Japan' : language === 'korean' ? 'Korea' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'}.jpg`}
                  alt={`${languageName} Classes for Adults`}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="text-4xl mb-4">👨‍💼</div>
                <h3 className="text-xl font-bold mb-2">{languageName} Classes for Adults</h3>
                <p className="text-gray-600 mb-4">
                  Professional courses tailored for working professionals and adults
                </p>
                <Button className="w-full" icon>Learn More</Button>
              </div>
            </Card>

            <Card>
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Small Batch Classes</h3>
              <p className="text-gray-600 mb-4">
                Learn in small groups with personalized attention from instructors
              </p>
              <Button className="w-full" icon>Learn More</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="py-16 bg-secondary-mint">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
            Why Learn {languageName}?
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {['Better Education', 'Career Growth', 'Travel Opportunities', 'Cultural Understanding', 'Academic Benefits', 'Personal Development'].map((reason, index) => (
                <div key={index} className="text-white rounded-full px-6 py-4 text-center font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105" style={{ backgroundColor: '#1F9F90' }}>
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
            {languageName} Classes by Level
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden p-0">
              {data.image && (
                <img
                  src={`/images/levels/${language === 'mandarin' ? 'Mandarin' : language === 'japanese' ? 'Japanese' : language === 'korean' ? 'Korean ' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'}/Beginner level ${language === 'mandarin' ? 'Mandarin' : language === 'japanese' ? 'Japanese' : language === 'korean' ? 'Korean' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'}.jpg`}
                  alt="Beginner Level"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 bg-secondary-mint">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1F9F90' }}>Beginner (A1-A2)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Basic grammar and vocabulary</li>
                  <li>• Simple conversation skills</li>
                  <li>• Reading and writing basics</li>
                  <li>• Cultural introduction</li>
                </ul>
                <Button className="w-full mt-6" icon>Enroll Now</Button>
              </div>
            </Card>

            <Card className="overflow-hidden p-0">
              {data.image && (
                <img
                  src={`/images/levels/${language === 'mandarin' ? 'Mandarin' : language === 'japanese' ? 'Japanese' : language === 'korean' ? 'Korean ' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'}/${language === 'mandarin' ? 'Mandarin' : language === 'japanese' ? 'Japanese' : language === 'korean' ? 'Korean' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'} Level B1-B2.jpg`}
                  alt="Intermediate Level"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 bg-secondary-mint">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1F9F90' }}>Intermediate (B1-B2)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Advanced grammar structures</li>
                  <li>• Fluent conversations</li>
                  <li>• Complex reading and writing</li>
                  <li>• Business communication</li>
                </ul>
                <Button className="w-full mt-6" icon>Enroll Now</Button>
              </div>
            </Card>

            <Card className="overflow-hidden p-0">
              {data.image && (
                <img
                  src={`/images/levels/${language === 'mandarin' ? 'Mandarin' : language === 'japanese' ? 'Japanese' : language === 'korean' ? 'Korean ' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'}/${language === 'mandarin' ? 'Mandarin' : language === 'japanese' ? 'Japanese' : language === 'korean' ? 'Korean' : language === 'spanish' ? 'Spanish' : language === 'german' ? 'German' : language === 'english' ? 'English' : 'French'} Level C1-C2.jpg`}
                  alt="Advanced Level"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 bg-secondary-mint">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1F9F90' }}>Advanced (C1-C2)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Native-level proficiency</li>
                  <li>• Professional fluency</li>
                  <li>• Advanced literature</li>
                  <li>• Exam preparation</li>
                </ul>
                <Button className="w-full mt-6" icon>Enroll Now</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LanguagePage;
