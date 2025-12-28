import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const ExamsPage = () => {
    const exams = [
        {
            name: 'DELF/DALF',
            language: 'French',
            levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            description: 'Official French language proficiency certification recognized worldwide',
            color: 'from-blue-400 to-blue-600',
            icon: '🇫🇷',
            features: [
                'Internationally recognized certification',
                'Valid for lifetime',
                'Required for French universities',
                'Professional credential'
            ]
        },
        {
            name: 'TEF',
            language: 'French',
            levels: ['All Levels'],
            description: 'Test d\'Évaluation de Français for immigration and academic purposes',
            color: 'from-blue-500 to-indigo-600',
            icon: '🇫🇷',
            features: [
                'Required for Canadian immigration',
                'Computer-based testing',
                'Quick results',
                'Multiple test dates'
            ]
        },
        {
            name: 'Goethe-Zertifikat',
            language: 'German',
            levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            description: 'Official German language certificate from Goethe-Institut',
            color: 'from-yellow-400 to-orange-500',
            icon: '🇩🇪',
            features: [
                'Globally recognized',
                'University admission requirement',
                'Professional qualification',
                'Permanent validity'
            ]
        },
        {
            name: 'DELE',
            language: 'Spanish',
            levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            description: 'Diplomas de Español como Lengua Extranjera',
            color: 'from-red-400 to-red-600',
            icon: '🇪🇸',
            features: [
                'Official Spanish certification',
                'Recognized by Instituto Cervantes',
                'No expiration date',
                'Academic and professional use'
            ]
        },
        {
            name: 'JLPT',
            language: 'Japanese',
            levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
            description: 'Japanese Language Proficiency Test',
            color: 'from-pink-400 to-red-500',
            icon: '🇯🇵',
            features: [
                'Most recognized Japanese test',
                'Required for Japanese universities',
                'Employment opportunities',
                'Held twice yearly'
            ]
        },
        {
            name: 'TOPIK',
            language: 'Korean',
            levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6'],
            description: 'Test of Proficiency in Korean',
            color: 'from-blue-400 to-blue-600',
            icon: '🇰🇷',
            features: [
                'Official Korean proficiency test',
                'University admission requirement',
                'Visa application support',
                'Career advancement'
            ]
        },
        {
            name: 'HSK',
            language: 'Mandarin',
            levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'],
            description: 'Hanyu Shuiping Kaoshi - Chinese Proficiency Test',
            color: 'from-red-500 to-yellow-500',
            icon: '🇨🇳',
            features: [
                'Official Chinese proficiency test',
                'Required for Chinese universities',
                'International recognition',
                'Multiple levels available'
            ]
        },
        {
            name: 'IELTS/TOEFL',
            language: 'English',
            levels: ['All Levels'],
            description: 'International English Language Testing System',
            color: 'from-blue-300 to-blue-500',
            icon: '🇬🇧',
            features: [
                'Required for international study',
                'Immigration purposes',
                'Professional registration',
                'Widely accepted globally'
            ]
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
                <div className="container-custom">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">
                            Language Proficiency Exams
                        </h1>
                        <p className="text-xl mb-6 opacity-90 max-w-3xl mx-auto">
                            Prepare for internationally recognized language certification exams with expert guidance and comprehensive study materials
                        </p>
                        <Button variant="secondary" size="large" icon>
                            Book Free Consultation
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why Take Exams Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
                        Why Take Language Proficiency Exams?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="text-center">
                            <div className="text-5xl mb-4">🎓</div>
                            <h3 className="text-xl font-bold mb-2">University Admission</h3>
                            <p className="text-gray-600">
                                Required for admission to universities worldwide
                            </p>
                        </Card>

                        <Card className="text-center">
                            <div className="text-5xl mb-4">💼</div>
                            <h3 className="text-xl font-bold mb-2">Career Growth</h3>
                            <p className="text-gray-600">
                                Enhance your professional credentials and opportunities
                            </p>
                        </Card>

                        <Card className="text-center">
                            <div className="text-5xl mb-4">✈️</div>
                            <h3 className="text-xl font-bold mb-2">Immigration</h3>
                            <p className="text-gray-600">
                                Meet language requirements for visa applications
                            </p>
                        </Card>

                        <Card className="text-center">
                            <div className="text-5xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold mb-2">Certification</h3>
                            <p className="text-gray-600">
                                Prove your language proficiency with official credentials
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Exams Grid */}
            <section className="py-16 bg-secondary-mint">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
                        Available Exams
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {exams.map((exam, index) => (
                            <Card key={index} className="hover:shadow-card-hover transition-all">
                                <div className={`bg-gradient-to-r ${exam.color} text-white p-6 rounded-t-card -m-6 mb-6`}>
                                    <div className="text-5xl mb-3">{exam.icon}</div>
                                    <h3 className="text-2xl font-bold mb-2">{exam.name}</h3>
                                    <p className="text-sm opacity-90">{exam.language}</p>
                                </div>

                                <p className="text-gray-700 mb-4">{exam.description}</p>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-secondary-navy mb-2">Levels Available:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exam.levels.map((level, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-secondary-mint px-3 py-1 rounded-full text-sm font-medium text-primary"
                                            >
                                                {level}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-secondary-navy mb-2">Key Features:</h4>
                                    <ul className="space-y-1">
                                        {exam.features.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-gray-600">
                                                • {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button className="w-full" icon>
                                    Start Preparation
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preparation Process */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-secondary-navy mb-12">
                        Our Exam Preparation Process
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-2">Assessment</h3>
                            <p className="text-gray-600">
                                Evaluate your current level and identify areas for improvement
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-2">Study Plan</h3>
                            <p className="text-gray-600">
                                Customized preparation plan based on your target exam and timeline
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-2">Practice</h3>
                            <p className="text-gray-600">
                                Mock tests and practice materials to build confidence
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                4
                            </div>
                            <h3 className="text-xl font-bold mb-2">Success</h3>
                            <p className="text-gray-600">
                                Achieve your target score with expert guidance and support
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Start Your Exam Preparation?
                    </h2>
                    <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
                        Join thousands of successful students who achieved their target scores with our expert guidance
                    </p>
                    <Button variant="secondary" size="large" icon>
                        Book Free Demo Class
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default ExamsPage;
