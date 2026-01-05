import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import FeatureModal from '../components/common/FeatureModal';
import UpcomingBatchesSection from '../components/sections/UpcomingBatchesSection';
import { languageData } from '../data/languageData';
import pb from '../api/pocketbase';

const KidsLanguagePage = () => {
  const { language } = useParams();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // New Carousel States
  const [currentWhyLearnIndex, setCurrentWhyLearnIndex] = useState(0);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  // Map language param to batch language value
  const getBatchLanguage = () => {
    const lang = language?.replace('-kids', '') || language;
    const langMap = {
      'french': 'French',
      'german': 'German',
      'spanish': 'Spanish',
      'english': 'English',
      'japanese': 'Japanese',
      'korean': 'Korean',
      'mandarin': 'Mandarin',
    };
    return langMap[lang] || 'French';
  };

  // Helper for Carousel Navigation
  const getNav = (currentIndex, setIndex, length) => ({
    next: () => setIndex((prev) => (prev + 1) % length),
    prev: () => setIndex((prev) => (prev === 0 ? length - 1 : prev - 1)),
  });

  // Reusable Carousel Controls Component
  const CarouselControls = ({ onPrev, onNext }) => (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={onPrev}
        className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  // Newsletter submit handler
  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');
    try {
      await pb.collection('newsletter_subscribers').create({
        email: newsletterEmail,
        active: true
      });
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  // Language-specific data
  const languageData = {
    french: {
      name: 'French',
      greeting: 'Bonjour',
      heroImage: '/images/kids/French.jpg',
      whyLearn: [
        {
          title: 'Global Citizens Cultivation',
          icon: '/images/kids/cultural.png',
          description: 'Learning French at a young age opens doors to understanding different cultures, fostering global awareness and appreciation for diversity from an early age.'
        },
        {
          title: 'Fun and Engagement',
          icon: '/images/kids/communication.png',
          description: 'Our interactive lessons are designed to keep kids engaged and excited about learning through games, songs, stories, and creative activities that make French fun.'
        },
        {
          title: 'Cognitive Advantage',
          icon: '/images/kids/educational.png',
          description: 'Studies show that learning a second language enhances cognitive development, improves problem-solving skills, memory, and academic performance across all subjects.'
        }
      ],
      exams: [
        { name: 'DELF Prim', logo: '/images/exams/delf.png', description: 'DELF certification validates French language proficiency for young learners, helping them achieve academic and personal goals.' },
        { name: 'DELF Junior', logo: '/images/exams/delf.png', description: 'Advanced DELF certification for older children/teens demonstrating higher French language competence.' },
        { name: 'TEF', logo: '/images/exams/tef.png', description: 'TEF assesses French proficiency for kids preparing for international study or future opportunities.' }
      ]
    },
    german: {
      name: 'German',
      greeting: 'Guten Tag',
      heroImage: '/images/kids/German.jpg',
      whyLearn: [
        {
          title: 'Global Citizens Cultivation',
          icon: '/images/kids/cultural.png',
          description: 'Learning German at a young age opens doors to understanding European culture, fostering global awareness and appreciation for diversity from an early age.'
        },
        {
          title: 'Fun and Engagement',
          icon: '/images/kids/communication.png',
          description: 'Our interactive lessons are designed to keep kids engaged and excited about learning through games, songs, stories, and creative activities that make German fun.'
        },
        {
          title: 'Cognitive Advantage',
          icon: '/images/kids/educational.png',
          description: 'Studies show that learning a second language enhances cognitive development, improves problem-solving skills, memory, and academic performance across all subjects.'
        }
      ],
      exams: [
        { name: 'Goethe-Zertifikat A1', logo: '/images/exams/goethe.png', description: 'Goethe certification validates German language proficiency for young learners worldwide.' },
        { name: 'Goethe-Zertifikat A2', logo: '/images/exams/goethe.png', description: 'Advanced Goethe certification for older children/teens demonstrating higher German language competence.' },
        { name: 'TestDaF', logo: '/images/exams/testdaf.png', description: 'TestDaF assesses German proficiency for kids preparing for international study opportunities.' }
      ]
    },
    spanish: {
      name: 'Spanish',
      greeting: 'Hola',
      heroImage: '/images/kids/Spanish.jpg',
      whyLearn: [
        {
          title: 'Global Citizens Cultivation',
          icon: '/images/kids/cultural.png',
          description: 'Learning Spanish at a young age opens doors to understanding Hispanic cultures across continents, fostering global awareness and appreciation for diversity.'
        },
        {
          title: 'Fun and Engagement',
          icon: '/images/kids/communication.png',
          description: 'Our interactive lessons are designed to keep kids engaged and excited about learning through games, songs, stories, and creative activities that make Spanish fun.'
        },
        {
          title: 'Cognitive Advantage',
          icon: '/images/kids/educational.png',
          description: 'Studies show that learning a second language enhances cognitive development, improves problem-solving skills, memory, and academic performance across all subjects.'
        }
      ],
      exams: [
        { name: 'DELE A1', logo: '/images/exams/dele.png', description: 'DELE certification validates Spanish language proficiency for young learners worldwide.' },
        { name: 'DELE A2/B1', logo: '/images/exams/dele.png', description: 'Advanced DELE certification for older children/teens demonstrating higher Spanish language competence.' },
        { name: 'SIELE', logo: '/images/exams/siele.png', description: 'SIELE assesses Spanish proficiency for kids preparing for international study opportunities.' }
      ]
    },
    english: {
      name: 'English',
      greeting: 'Hello',
      heroImage: '/images/kids/English.jpg',
      whyLearn: [
        {
          title: 'Global Citizens Cultivation',
          icon: '/images/kids/cultural.png',
          description: 'Learning English at a young age opens doors to global communication, fostering international awareness and appreciation for diverse English-speaking cultures.'
        },
        {
          title: 'Fun and Engagement',
          icon: '/images/kids/communication.png',
          description: 'Our interactive lessons are designed to keep kids engaged and excited about learning through games, songs, stories, and creative activities that make English fun.'
        },
        {
          title: 'Cognitive Advantage',
          icon: '/images/kids/educational.png',
          description: 'Studies show that learning a second language enhances cognitive development, improves problem-solving skills, memory, and academic performance across all subjects.'
        }
      ],
      exams: [
        { name: 'Cambridge YLE', logo: '/images/exams/cambridge.png', description: 'Cambridge Young Learners certification validates English language proficiency for children.' },
        { name: 'Cambridge KET', logo: '/images/exams/cambridge.png', description: 'Cambridge KET certification for older children/teens demonstrating English language competence.' },
        { name: 'TOEFL Junior', logo: '/images/exams/toefl.png', description: 'TOEFL Junior assesses English proficiency for kids preparing for international study opportunities.' }
      ]
    },
    japanese: {
      name: 'Japanese',
      greeting: 'こんにちは',
      heroImage: '/images/kids/Japan.jpg',
      whyLearn: [
        {
          title: 'Global Citizens Cultivation',
          icon: '/images/kids/cultural.png',
          description: 'Learning Japanese at a young age opens doors to understanding rich Asian culture, fostering global awareness and appreciation for Japanese traditions.'
        },
        {
          title: 'Fun and Engagement',
          icon: '/images/kids/communication.png',
          description: 'Our interactive lessons are designed to keep kids engaged and excited about learning through games, anime, manga references, and creative activities that make Japanese fun.'
        },
        {
          title: 'Cognitive Advantage',
          icon: '/images/kids/educational.png',
          description: 'Studies show that learning a second language enhances cognitive development, improves problem-solving skills, memory, and academic performance across all subjects.'
        }
      ],
      exams: [
        { name: 'JLPT N5', logo: '/images/exams/jlpt.png', description: 'JLPT certification validates Japanese language proficiency for young learners worldwide.' },
        { name: 'JLPT N4', logo: '/images/exams/jlpt.png', description: 'Advanced JLPT certification for older children/teens demonstrating higher Japanese language competence.' },
        { name: 'J.TEST', logo: '/images/exams/jtest.png', description: 'J.TEST assesses Japanese proficiency for kids preparing for international study opportunities.' }
      ]
    },
    korean: {
      name: 'Korean',
      greeting: '안녕하세요',
      heroImage: '/images/kids/Korea.jpg',
      whyLearn: [
        {
          title: 'Global Citizens Cultivation',
          icon: '/images/kids/cultural.png',
          description: 'Learning Korean at a young age opens doors to understanding K-culture, fostering global awareness and appreciation for Korean traditions and modern culture.'
        },
        {
          title: 'Fun and Engagement',
          icon: '/images/kids/communication.png',
          description: 'Our interactive lessons are designed to keep kids engaged and excited about learning through games, K-pop, K-dramas, and creative activities that make Korean fun.'
        },
        {
          title: 'Cognitive Advantage',
          icon: '/images/kids/educational.png',
          description: 'Studies show that learning a second language enhances cognitive development, improves problem-solving skills, memory, and academic performance across all subjects.'
        }
      ],
      exams: [
        { name: 'TOPIK I', logo: '/images/exams/topik.png', description: 'TOPIK certification validates Korean language proficiency for young learners worldwide.' },
        { name: 'TOPIK II', logo: '/images/exams/topik.png', description: 'Advanced TOPIK certification for older children/teens demonstrating higher Korean language competence.' },
        { name: 'KLT', logo: '/images/exams/klt.png', description: 'KLT assesses Korean proficiency for kids preparing for international study opportunities.' }
      ]
    },
    mandarin: {
      name: 'Mandarin',
      greeting: '你好',
      heroImage: '/images/kids/China.jpg',
      whyLearn: [
        {
          title: 'Global Citizens Cultivation',
          icon: '/images/kids/cultural.png',
          description: 'Learning Mandarin at a young age opens doors to understanding Chinese culture, fostering global awareness and appreciation for one of the world\'s oldest civilizations.'
        },
        {
          title: 'Fun and Engagement',
          icon: '/images/kids/communication.png',
          description: 'Our interactive lessons are designed to keep kids engaged and excited about learning through games, songs, stories, and creative activities that make Mandarin fun.'
        },
        {
          title: 'Cognitive Advantage',
          icon: '/images/kids/educational.png',
          description: 'Studies show that learning a second language enhances cognitive development, improves problem-solving skills, memory, and academic performance across all subjects.'
        }
      ],
      exams: [
        { name: 'YCT', logo: '/images/exams/yct.png', description: 'YCT (Youth Chinese Test) validates Mandarin language proficiency for young learners worldwide.' },
        { name: 'HSK', logo: '/images/exams/hsk.png', description: 'HSK certification for older children/teens demonstrating Mandarin language competence.' },
        { name: 'BCT', logo: '/images/exams/bct.png', description: 'BCT assesses Mandarin proficiency for kids preparing for international study opportunities.' }
      ]
    }
  };

  // Clean language parameter (remove -kids suffix if present)
  const cleanLanguage = language?.toLowerCase().replace('-kids', '');
  const data = languageData[cleanLanguage] || languageData.french;
  
  // Get base language for links (always use base language, not -kids version)
  const baseLanguage = cleanLanguage;

  // Levels data
  const levelsData = [
    {
      level: "A1-A2",
      title: "Beginner",
      subtitle: "A1-A2 / Pre A1- Pre A2",
      features: [
        `Kids can introduce themselves and understand simple ${data.name} phrases`,
        `Learn basic ${data.name} vocabulary through games and songs`,
        "Understand and use everyday expressions in fun activities",
        `Build confidence in speaking simple ${data.name} sentences`
      ]
    },
    {
      level: "B1-B2",
      title: "Intermediate",
      subtitle: "B1-B2 / Pre B1- Pre B2",
      features: [
        `Kids can discuss familiar topics and express opinions in ${data.name}`,
        "Participate in conversations about school, hobbies, and interests",
        "Read and understand age-appropriate stories and articles",
        `Write short compositions and creative stories in ${data.name}`
      ]
    },
    {
      level: "C1-C2",
      title: "Advanced",
      subtitle: "C1-C2 / Pre C1- Pre C2",
      features: [
        "Teens can communicate fluently in complex situations",
        "Understand advanced texts and express ideas with precision",
        `Ready for academic studies and professional use of ${data.name}`,
        "Master nuanced communication and cultural understanding"
      ]
    }
  ];

  const whyLearnNav = getNav(currentWhyLearnIndex, setCurrentWhyLearnIndex, data.whyLearn.length);
  const examNav = getNav(currentExamIndex, setCurrentExamIndex, data.exams.length);
  const levelNav = getNav(currentLevelIndex, setCurrentLevelIndex, levelsData.length);

  // Features data for kids
  const features = [
    {
      id: 1,
      iconImage: '/images/features/teaching 1.png',
      title: 'Expert Kid Trainers',
      modalImage: '/images/features/_Features_popup.png',
    },
    {
      id: 2,
      iconImage: '/images/features/interactive.png',
      title: 'Interactive Kid Sessions',
      modalImage: '/images/features/_Features_popup-1.png',
    },
    {
      id: 3,
      iconImage: '/images/features/courses.png',
      title: 'Kid-Certified Courses',
      modalImage: '/images/features/_Features_popup-3.png',
    },
    {
      id: 4,
      iconImage: '/images/features/1347358 1.png',
      title: 'Holistic Kids Learning',
      modalImage: '/images/features/_Features_popup-4.png',
    },
    {
      id: 5,
      iconImage: '/images/features/material.png',
      title: 'Free Kids Study Material',
      modalImage: '/images/features/_Features_popup-5.png',
    },
    {
      id: 6,
      iconImage: '/images/features/sessions.png',
      title: 'Kids Review Sessions',
      modalImage: '/images/features/_Features_popup-2.png',
    },
    {
      id: 7,
      iconImage: '/images/features/flexible timings.png',
      title: 'Flexible Kids Timings',
      modalImage: '/images/features/_Features_popup-6.png',
    },
    {
      id: 8,
      iconImage: '/images/features/batch.png',
      title: 'Kids Batch Flexibility',
      modalImage: '/images/features/_Features_popup-7.png',
    }
  ];

  const openModal = (feature) => {
    setSelectedFeature(feature);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedFeature(null);
    document.body.style.overflow = 'unset';
  };

  const nextSlide = () => {
    setCurrentFeatureIndex((prevIndex) =>
      (prevIndex + 1) % features.length
    );
  };

  const prevSlide = () => {
    setCurrentFeatureIndex((prevIndex) =>
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  // Steps carousel navigation
  const steps = [
    {
      id: 1,
      stepNumber: 'Step 1',
      title: 'Register with us',
      description: 'Sign up easily through our website or contact our team to enroll your child in our language classes program.',
      image: '/images/hero/Rectangle 477.png',
    },
    {
      id: 2,
      stepNumber: 'Step 2',
      title: 'Experience a free demo class',
      description: 'Discover the power of learning with our complimentary demo class at your convenient time!',
      image: '/images/hero/Rectangle 478.png',
    },
    {
      id: 3,
      stepNumber: 'Step 3',
      title: 'Let Classes begin :)',
      description: 'Start attending interactive live sessions where your child will learn through fun activities, games, and engaging content.',
      image: '/images/hero/Rectangle 479.png',
    }
  ];

  const nextStep = () => {
    setCurrentStepIndex((prevIndex) =>
      (prevIndex + 1) % steps.length
    );
  };

  const prevStep = () => {
    setCurrentStepIndex((prevIndex) =>
      prevIndex === 0 ? steps.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedFeature) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedFeature]);

  const faqs = [
    {
      question: 'Why learn with The Language Network?',
      answer: `The Language Network offers specialized ${data.name} courses for kids with certified trainers experienced in teaching children. Our fun, interactive curriculum keeps children engaged while building real language skills through games, songs, and creative activities.`
    },
    {
      question: 'What age groups do you teach?',
      answer: 'We teach children aged 6-17 years old, grouped by age and proficiency level to ensure age-appropriate content and peer interaction.'
    },
    {
      question: 'Will my child get a certificate after completing each level?',
      answer: 'Yes! Your child will receive a completion certificate for each level. We also prepare students for internationally recognized certifications like DELF, DELE, Goethe, JLPT, TOPIK, and HSK depending on the language.'
    },
    {
      question: 'How long are the classes?',
      answer: 'Classes are 45-60 minutes long depending on the age group. Younger children (6-10) have 45-minute sessions, while older children (11-17) have 60-minute sessions to match their attention span and learning capacity.'
    },
    {
      question: 'Can I sit in on my child\'s classes?',
      answer: 'Yes! Parents are welcome to observe classes, especially for younger children. We encourage parental involvement to support your child\'s learning journey.'
    },
    {
      question: 'What if my child misses a class?',
      answer: 'All classes are recorded and available for viewing. We also offer makeup classes when possible. Our flexible batch system allows students to switch batches if needed.'
    },
    {
      question: 'Do you provide study materials?',
      answer: 'Yes! We provide comprehensive digital study materials worth ₹10,000+ absolutely free, including workbooks, flashcards, games, and interactive exercises designed specifically for children.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: HERO SECTION */}
      <section className="bg-gradient-to-br from-white to-gray-50 pt-0 pb-16 lg:pb-20">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="order-2 lg:order-1 pt-8 lg:pt-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-navy mb-6 leading-tight">
                Online {data.name} Classes for Kids
              </h1>
              <p className="text-base lg:text-lg text-gray-600 mb-8 leading-relaxed">
                TLN's {data.name} courses are specially designed for kids, offering a fun and interactive method to language learning. With our programme your little learner will be able to develop fundamental skills in speaking, reading, listening and writing all from the comfort of home. Our experienced teachers use engaging techniques, games, and storytelling to keep children motivated and excited about learning. Whether your child is just starting out or looking to advance their language skills, we provide a supportive and dynamic environment that encourages growth and confidence. Join us today and watch your child thrive!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="large"
                  className="text-white px-8 py-4 text-lg font-semibold shadow-lg"
                  style={{ backgroundColor: '#1F9F90' }}
                >
                  Get started
                </Button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative order-1 lg:order-2 -mt-12 lg:mt-0">
              <img
                src={data.heroImage}
                alt={`${data.name} for Kids`}
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATISTICS BAR */}
      <div className="bg-white pt-0 pb-8 md:pb-12">
        <div className="container-custom">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-200 py-6 md:py-8 px-3 md:px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Manrope'] mb-1 md:mb-2" style={{ color: '#000000' }}>
                  7
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Manrope'] mb-1 md:mb-2" style={{ color: '#000000' }}>
                  5000+
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium">Happy Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Manrope'] mb-1 md:mb-2" style={{ color: '#000000' }}>
                  200+
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium">Alpha Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Manrope'] mb-1 md:mb-2" style={{ color: '#000000' }}>
                  50000+
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium">Hours of Enlightenment</div>
              </div>

              {/* Google Reviews - Special Layout */}
              <div className="text-center flex flex-col items-center justify-center col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold font-['Manrope']" style={{ color: '#000000' }}>4.9</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                        fill="#FFC107"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-700 font-medium">Google Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: WHY KIDS SHOULD LEARN */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Why kids should learn {data.name}?
          </h2>
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video w-full">
                <img src={data.whyLearn[currentWhyLearnIndex].icon} alt={data.whyLearn[currentWhyLearnIndex].title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0D5C5C' }}>
                  {data.whyLearn[currentWhyLearnIndex].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {data.whyLearn[currentWhyLearnIndex].description}
                </p>
              </div>
            </div>
            <CarouselControls onPrev={whyLearnNav.prev} onNext={whyLearnNav.next} />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {data.whyLearn.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video w-full">
                  <img src={item.icon} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0D5C5C' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-4">
              How it works?
            </h2>
            <p className="text-lg text-gray-600">
              Here are the steps
            </p>
          </div>

          {/* Mobile Carousel - Single Card */}
          <div className="md:hidden">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              {/* Illustration */}
              <div className="mb-6 flex items-center justify-center w-full">
                <img
                  src={steps[currentStepIndex].image}
                  alt={steps[currentStepIndex].title}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Card with integrated step badge */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col">
                {/* Step Header Badge */}
                <div className="text-white text-center py-4" style={{ backgroundColor: '#1F9F90' }}>
                  <h3 className="text-lg font-semibold">
                    {steps[currentStepIndex].stepNumber}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="p-5 text-center flex flex-col">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {steps[currentStepIndex].title}
                  </h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {steps[currentStepIndex].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevStep}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Previous step"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextStep}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Next step"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Grid - All Cards */}
          <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center"
              >
                {/* Illustration */}
                <div className="mb-6 flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Card with integrated step badge */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col h-full">
                  {/* Step Header Badge */}
                  <div className="text-white text-center py-4" style={{ backgroundColor: '#1F9F90' }}>
                    <h3 className="text-lg font-semibold">
                      {step.stepNumber}
                    </h3>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 text-center flex flex-col min-h-[200px]">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY LEARN WITH TLN */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-custom max-w-6xl">
          {/* Section Header */}
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-16 max-w-4xl mx-auto leading-tight">
            Why kids should learn with The Language Network?
          </h2>

          {/* Mobile Carousel - Single Card */}
          <div className="md:hidden">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-lg max-w-sm mx-auto">
              {/* Icon Image */}
              <div className="flex items-center justify-center mb-5">
                <img
                  src={features[currentFeatureIndex].iconImage}
                  alt={features[currentFeatureIndex].title}
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#0D5C5C] mb-5 px-2">
                {features[currentFeatureIndex].title}
              </h3>

              {/* Learn More Button */}
              <button
                onClick={() => openModal(features[currentFeatureIndex])}
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-98 min-w-[140px]"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1F9F90'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1F9F90'; }}
              >
                Learn more
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-xl border-2 border-accent text-accent flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                aria-label="Previous feature"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-xl border-2 border-accent text-accent flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                aria-label="Next feature"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Grid - Multiple Cards */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-lg">
                {/* Icon Image */}
                <div className="flex items-center justify-center mb-5">
                  <img
                    src={feature.iconImage}
                    alt={feature.title}
                    className="w-24 h-24 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#0D5C5C] mb-5 px-2">
                  {feature.title}
                </h3>

                {/* Learn More Button */}
                <button
                  onClick={() => openModal(feature)}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-98 min-w-[140px]"
                  style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1F9F90'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1F9F90'; }}
                >
                  Learn more
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: PREPARE FOR EXAMS */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Prepare for {data.name} exams
          </h2>
          {/* Mobile Carousel */}
          <div className="md:hidden">
            {data.exams.length > 0 && (
              <>
                <div className="bg-white rounded-xl border-2 border-gray-200 p-8 text-center hover:border-accent transition-colors duration-300">
                  <div className="h-32 flex items-center justify-center mb-6">
                    <img
                      src={data.exams[currentExamIndex].logo}
                      alt={data.exams[currentExamIndex].name}
                      className="max-h-28 max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="text-4xl font-bold" style="color: #1F9F90">${data.exams[currentExamIndex].name}</div>`;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{data.exams[currentExamIndex].name}</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {data.exams[currentExamIndex].description}
                  </p>
                  <button className="px-6 py-2.5 border-2 rounded-lg font-medium transition-all duration-300" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
                    Learn more
                  </button>
                </div>
                <CarouselControls onPrev={examNav.prev} onNext={examNav.next} />
              </>
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {data.exams.map((exam, index) => (
              <div key={index} className="bg-white rounded-xl border-2 border-gray-200 p-8 text-center hover:border-accent transition-colors duration-300">
                <div className="h-32 flex items-center justify-center mb-6">
                  <img
                    src={exam.logo}
                    alt={exam.name}
                    className="max-h-28 max-w-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="text-4xl font-bold" style="color: #1F9F90">${exam.name}</div>`;
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{exam.name}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {exam.description}
                </p>
                <button className="px-6 py-2.5 border-2 rounded-lg font-medium transition-all duration-300" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
                  Learn more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CLASSES FOR ANY LEVEL */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#E8F7F5' }}>
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            {data.name} Classes for Any Level
          </h2>
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="text-center py-6" style={{ backgroundColor: '#E8F7F5' }}>
                <h3 className="text-2xl font-bold" style={{ color: '#0D5C5C' }}>{levelsData[currentLevelIndex].subtitle}</h3>
                <p className="text-lg font-semibold text-gray-700">{levelsData[currentLevelIndex].title}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {levelsData[currentLevelIndex].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3.5 text-white rounded-lg font-semibold transition-all duration-300 hover:brightness-110" style={{ backgroundColor: '#1F9F90' }}>
                  Book a free demo
                </button>
              </div>
            </div>
            <CarouselControls onPrev={levelNav.prev} onNext={levelNav.next} />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {levelsData.map((level, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="text-center py-6" style={{ backgroundColor: '#E8F7F5' }}>
                  <h3 className="text-2xl font-bold" style={{ color: '#0D5C5C' }}>{level.subtitle}</h3>
                  <p className="text-lg font-semibold text-gray-700">{level.title}</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#1F9F90' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 text-white rounded-lg font-semibold transition-all duration-300 hover:brightness-110" style={{ backgroundColor: '#1F9F90' }}>
                    Book a free demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-12">
            Hear it from the Learners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "My daughter absolutely loves her French classes! The teacher makes it so fun and engaging. She's learning so much and can't wait for each session!",
                author: "Parent of Ananya, Age 9",
                rating: 5
              },
              {
                text: "As a parent, I'm impressed with the structured curriculum and how patient the instructors are with children. My son has gained so much confidence!",
                author: "Parent of Arjun, Age 12",
                rating: 5
              },
              {
                text: "The interactive sessions keep my daughter excited about learning. Her French has improved dramatically in just 3 months! Highly recommended.",
                author: "Parent of Priya, Age 10",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#1F9F90' }}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9.5: Upcoming Batches */}
      <UpcomingBatchesSection
        language={getBatchLanguage()}
        ageGroup="kids"
        title={`Upcoming ${data.name} Batches for Kids`}
      />

      {/* SECTION 10: FAQs */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: FAQ Accordion */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy mb-8">FAQs</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}
                        style={{ color: '#1F9F90' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFAQ === index && (
                      <div className="px-5 pb-5 bg-gray-50">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: FAQ Image */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 h-full flex items-center justify-center">
                <div className="text-center w-full">
                  <img
                    src="/images/kids/kidsfaq.png"
                    alt="FAQ Illustration"
                    className="w-full h-auto object-contain mb-6"
                  />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#0D5C5C' }}>
                    Have Questions?
                  </h3>
                  <p className="text-gray-600">We're here to help!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: EVERYTHING YOU NEED TO KNOW */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-navy text-center mb-8">
            Everything you need to know about {data.name} for kids
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className={`prose prose-lg max-w-none ${!showFullContent ? 'line-clamp-[20]' : ''}`}>
              <p className="text-gray-700 leading-relaxed mb-6">
                Learning {data.name} opens up a world of opportunities for children. At The Language Network, we understand that every child learns differently, which is why our {data.name} courses are specifically designed to cater to young learners aged 6-17.
              </p>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0D5C5C' }}>
                Why Start Young?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Research shows that children have a natural ability to learn languages. Their brains are like sponges, absorbing new sounds, words, and grammatical structures with remarkable ease. By starting {data.name} at a young age, children develop native-like pronunciation and a deeper cultural understanding.
              </p>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0D5C5C' }}>
                Our Teaching Methodology
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We use a communicative approach that emphasizes practical language use through interactive games, songs, storytelling, and creative activities. Our certified trainers are experienced in working with children and create a supportive, engaging environment where kids feel comfortable practicing and making mistakes.
              </p>
              {showFullContent && (
                <>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#0D5C5C' }}>
                    Cognitive Benefits
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Learning {data.name} enhances cognitive development in multiple ways. Studies show that bilingual children demonstrate improved executive function, better problem-solving skills, enhanced memory, and greater creativity. These cognitive benefits extend beyond language learning and positively impact academic performance across all subjects.
                  </p>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#0D5C5C' }}>
                    Cultural Exposure
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Through our {data.name} classes, children gain exposure to rich cultural traditions, customs, and perspectives. This cultural awareness fosters empathy, global citizenship, and appreciation for diversity from an early age.
                  </p>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#0D5C5C' }}>
                    Safe Online Learning
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We prioritize safety in our online classes. All sessions are monitored, and we follow strict protocols to ensure a secure learning environment. Parents are welcome to observe classes and stay involved in their child's learning journey.
                  </p>
                </>
              )}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-lg font-semibold hover:underline transition-colors"
                style={{ color: '#1F9F90' }}
              >
                {showFullContent ? 'Read less' : 'Read more'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: CTA */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Learning made easy. Guaranteed!
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of happy young learners today!
          </p>
        </div>
      </section>

      {/* SECTION 13: ONLINE LANGUAGE LESSONS */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl font-bold text-secondary-navy text-center mb-12">
            Online language lessons and classes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Popular classes for kids</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/french-kids" className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>Online French Classes for Kids</Link></li>
                <li><Link to="/german-kids" className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>Online German Classes for Kids</Link></li>
                <li><Link to="/spanish-kids" className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>Online Spanish Classes for Kids</Link></li>
                <li><Link to="/japanese-kids" className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>Online Japanese Classes for Kids</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4">{data.name} by age group</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to={`/${baseLanguage}?age=6-10`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} for Kids Age 6-10</Link></li>
                <li><Link to={`/${baseLanguage}?age=11-14`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} for Kids Age 11-14</Link></li>
                <li><Link to={`/${baseLanguage}?age=15-17`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} for Teens Age 15-17</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Courses by level</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to={`/${baseLanguage}?level=a1`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} Beginner A1 for Kids</Link></li>
                <li><Link to={`/${baseLanguage}?level=a2`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} Elementary A2 for Kids</Link></li>
                <li><Link to={`/${baseLanguage}?level=b1`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} Intermediate B1 for Kids</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Courses by goal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to={`/${baseLanguage}?goal=travel`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} for Kids Travel</Link></li>
                <li><Link to={`/${baseLanguage}?goal=academic`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} for Academic Goals</Link></li>
                <li><Link to={`/${baseLanguage}?goal=fun`} className="hover:text-accent transition-colors" style={{ color: '#1F9F90' }}>{data.name} for Fun & Engagement</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: NEWSLETTER */}
      <section className="py-12" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Subscribe to our newsletter</h3>
          <p className="text-white/90 mb-6">Get language learning tips and updates delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white outline-none"
            />
            <button
              onClick={handleNewsletterSubmit}
              disabled={newsletterStatus === 'loading'}
              className="px-8 py-3 bg-white rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              style={{ color: '#1F9F90' }}
            >
              {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {newsletterStatus === 'success' && (
            <p className="text-white mt-4">✓ Successfully subscribed!</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="text-white mt-4">✗ Something went wrong. Please try again.</p>
          )}
        </div>
      </section>

      {/* Feature Modal */}
      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default KidsLanguagePage;
