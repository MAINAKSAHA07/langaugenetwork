import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const LevelsPage = () => {
    const levels = [
        {
            level: 'Beginner',
            code: 'A1-A2',
            color: 'from-green-400 to-green-600',
            icon: '🌱',
            description: 'Start your language learning journey from scratch',
            duration: '3-6 months',
            skills: [
                'Basic vocabulary and grammar',
                'Simple everyday conversations',
                'Reading and writing fundamentals',
                'Introduction to culture',
                'Common phrases and expressions',
                'Basic pronunciation'
            ],
            canDo: [
                'Introduce yourself and others',
                'Ask and answer simple questions',
                'Understand basic instructions',
                'Write simple messages',
                'Order food and shop',
                'Describe your surroundings'
            ]
        },
        {
            level: 'Intermediate',
            code: 'B1-B2',
            color: 'from-blue-400 to-blue-600',
            icon: '📚',
            description: 'Build fluency and confidence in communication',
            duration: '6-12 months',
            skills: [
                'Advanced grammar structures',
                'Fluent conversation skills',
                'Complex reading comprehension',
                'Professional writing',
                'Cultural understanding',
                'Idiomatic expressions'
            ],
            canDo: [
                'Discuss abstract topics',
                'Express opinions clearly',
                'Understand native speakers',
                'Write detailed texts',
                'Handle work situations',
                'Engage in debates'
            ]
        },
        {
            level: 'Advanced',
            code: 'C1-C2',
            color: 'from-purple-400 to-purple-600',
            icon: '🎓',
            description: 'Achieve near-native proficiency',
            duration: '12+ months',
            skills: [
                'Native-level fluency',
                'Professional communication',
                'Advanced literature',
                'Academic writing',
                'Subtle nuances',
                'Complete cultural immersion'
            ],
            canDo: [
                'Understand everything heard',
                'Express yourself spontaneously',
                'Use language flexibly',
                'Write complex documents',
                'Teach the language',
                'Work professionally'
            ]
        }
    ];

    const cefrLevels = [
        {
            level: 'A1',
            name: 'Breakthrough',
            description: 'Can understand and use familiar everyday expressions',
            color: 'bg-green-100 text-green-800'
        },
        {
            level: 'A2',
            name: 'Waystage',
            description: 'Can communicate in simple routine tasks',
            color: 'bg-green-200 text-green-900'
        },
        {
            level: 'B1',
            name: 'Threshold',
            description: 'Can deal with most situations while traveling',
            color: 'bg-blue-100 text-blue-800'
        },
        {
            level: 'B2',
            name: 'Vantage',
            description: 'Can interact with native speakers with fluency',
            color: 'bg-blue-200 text-blue-900'
        },
        {
            level: 'C1',
            name: 'Proficiency',
            description: 'Can use language flexibly for social and professional purposes',
            color: 'bg-purple-100 text-purple-800'
        },
        {
            level: 'C2',
            name: 'Mastery',
            description: 'Can understand virtually everything with ease',
            color: 'bg-purple-200 text-purple-900'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
                <div className="container-custom">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">
                            Language Learning Levels
                        </h1>
                        <p className="text-xl mb-6 opacity-90 max-w-3xl mx-auto">
                            Understanding the Common European Framework of Reference (CEFR) for Languages
                        </p>
                        <p className="text-lg opacity-80 max-w-2xl mx-auto">
                            Choose the right level for your language learning journey
                        </p>
                    </div>
                </div>
            </section>

            {/* CEFR Overview */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-secondary-navy mb-4">
                        CEFR Framework
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                        The Common European Framework of Reference for Languages (CEFR) is an international standard
                        for describing language ability across six levels.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cefrLevels.map((level, index) => (
                            <Card key={index} className={`${level.color} border-2`}>
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl font-bold">{level.level}</div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                                        <p className="text-sm">{level.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Levels */}
            <section className="py-16 bg-secondary-mint">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
                        Our Course Levels
                    </h2>

                    <div className="space-y-12">
                        {levels.map((level, index) => (
                            <Card key={index} className="overflow-hidden">
                                <div className={`bg-gradient-to-r ${level.color} text-white p-8 -m-6 mb-6`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-6xl">{level.icon}</div>
                                        <div>
                                            <h3 className="text-4xl font-bold">{level.level}</h3>
                                            <p className="text-xl opacity-90">{level.code}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg opacity-90">{level.description}</p>
                                    <div className="mt-4 inline-block bg-white bg-opacity-20 px-4 py-2 rounded-full">
                                        <span className="font-semibold">Duration: {level.duration}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xl font-bold text-secondary-navy mb-4">
                                            What You'll Learn
                                        </h4>
                                        <ul className="space-y-2">
                                            {level.skills.map((skill, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-primary mt-1">✓</span>
                                                    <span className="text-gray-700">{skill}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold text-secondary-navy mb-4">
                                            What You Can Do
                                        </h4>
                                        <ul className="space-y-2">
                                            {level.canDo.map((ability, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-primary mt-1">✓</span>
                                                    <span className="text-gray-700">{ability}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-4">
                                    <Button className="flex-1" icon>
                                        Enroll in {level.level} Course
                                    </Button>
                                    <Button variant="secondary" className="flex-1">
                                        Take Level Test
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Choose */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
                        How to Choose Your Level
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center">
                            <div className="text-5xl mb-4">📝</div>
                            <h3 className="text-xl font-bold mb-3">Take a Placement Test</h3>
                            <p className="text-gray-600 mb-4">
                                Complete our free online assessment to determine your current level
                            </p>
                            <Button className="w-full" icon>
                                Start Test
                            </Button>
                        </Card>

                        <Card className="text-center">
                            <div className="text-5xl mb-4">👨‍🏫</div>
                            <h3 className="text-xl font-bold mb-3">Consult an Expert</h3>
                            <p className="text-gray-600 mb-4">
                                Schedule a free consultation with our language experts
                            </p>
                            <Button className="w-full" icon>
                                Book Consultation
                            </Button>
                        </Card>

                        <Card className="text-center">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold mb-3">Try a Demo Class</h3>
                            <p className="text-gray-600 mb-4">
                                Experience our teaching methodology with a free trial class
                            </p>
                            <Button className="w-full" icon>
                                Book Demo
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Languages Available */}
            <section className="py-16 bg-secondary-mint">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-secondary-navy mb-4">
                        Available Languages
                    </h2>
                    <p className="text-center text-gray-600 mb-12">
                        All levels available for the following languages
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {[
                            { name: 'French', path: '/french', flag: '🇫🇷' },
                            { name: 'German', path: '/german', flag: '🇩🇪' },
                            { name: 'Spanish', path: '/spanish', flag: '🇪🇸' },
                            { name: 'English', path: '/english', flag: '🇬🇧' },
                            { name: 'Japanese', path: '/japanese', flag: '🇯🇵' },
                            { name: 'Korean', path: '/korean', flag: '🇰🇷' },
                            { name: 'Mandarin', path: '/mandarin', flag: '🇨🇳' }
                        ].map((lang, index) => (
                            <Link
                                key={index}
                                to={lang.path}
                                className="bg-white rounded-lg p-6 text-center hover:shadow-card-hover transition-all hover:scale-105"
                            >
                                <div className="text-4xl mb-2">{lang.flag}</div>
                                <div className="font-semibold text-secondary-navy">{lang.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
                        Choose your level and begin your language learning journey today
                    </p>
                    <Button variant="secondary" size="large" icon>
                        Enroll Now
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default LevelsPage;
