import React, { useEffect, useState } from 'react';
import ScrollReveal from '../components/common/ScrollReveal';
import MasteryKitEnrollmentModal from '../components/common/MasteryKitEnrollmentModal';

const EnglishMasteryKitPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans text-[#333333] bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-[#E8F7F5] to-white py-[100px] px-[20px] md:px-[60px] text-center">
                <div className="max-w-[900px] mx-auto">
                    <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[20px] py-[8px] rounded-[20px] text-[12px] font-[700] tracking-[1px] mb-[24px]">
                        COMPLETE ENGLISH CURRICULUM
                    </div>

                    <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-[800] text-[#1a1a2e] leading-[1.1] tracking-[-1px] mb-[20px]">
                        English Mastery Kit (Volume 1 to 4)
                    </h1>

                    <p className="text-[20px] md:text-[24px] font-[400] text-[#555] leading-[1.5] max-w-[700px] mx-auto mb-[20px]">
                        A complete English mastery system for real-world communication
                    </p>

                    <p className="text-[18px] text-[#666] mb-[40px]">
                        Beginner to Upper-Intermediate | Volumes 1 to 4
                    </p>

                    <div className="inline-block bg-white border-2 border-[#17C3B2] px-[32px] py-[16px] rounded-[12px] text-[18px] font-[700] shadow-[0_4px_16px_rgba(23,195,178,0.2)] mb-[32px]">
                        <span className="text-[#1a1a2e]">Complete Kit: ₹999</span>
                    </div>

                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-block bg-[#17C3B2] text-white py-[18px] px-[48px] rounded-[10px] text-[18px] font-[700] shadow-[0_6px_20px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300"
                        >
                            Get Complete Access Now →
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-[24px] mt-[16px] text-[#666] text-[14px]">
                        <span className="flex items-center gap-2">✓ Instant Digital Access</span>
                        <span className="flex items-center gap-2">✓ 45+ Bonus Resources</span>
                        <span className="flex items-center gap-2">✓ Self-Study Friendly</span>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        The story behind this kit
                    </h2>

                    <div className="max-w-[800px] mx-auto mb-[40px]">
                        <p className="text-[22px] font-[600] text-[#17C3B2] mb-[24px]">
                            Most people do not fail at English because they are bad at languages.
                        </p>
                        <p className="text-[18px] leading-[1.8] text-[#444] mb-6">
                            They struggle because they were taught English as a subject, not as a life skill.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[40px]">
                        {[
                            "They memorised grammar rules but froze during interviews.",
                            "They knew vocabulary but hesitated in meetings.",
                            "They could pass exams but struggled to write confident emails.",
                            "They understood English but could not think clearly in English.",
                            "They wanted to sound professional but lacked the right phrases.",
                            "They needed English for career growth but had no structured system."
                        ].map((quote, idx) => (
                            <ScrollReveal key={idx} delay={`${(idx % 3) * 100}ms`}>
                                <div className="bg-[#F0FAF8] border border-[#ddd] rounded-[12px] p-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] relative h-full">
                                    <div className="text-[#17C3B2] opacity-30 text-[40px] absolute top-4 left-4 font-serif">"</div>
                                    <p className="text-[16px] italic leading-[1.6] text-[#333] relative z-10 pt-4">{quote}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <p className="text-[18px] text-[#444] text-center max-w-[800px] mx-auto mb-[40px]">
                        At The Language Network, we saw this pattern again and again among students, working professionals, entrepreneurs, and even teachers.
                    </p>

                    <div className="bg-[#E8F7F5] px-[28px] py-[20px] rounded-[8px] font-[600] text-[#1a1a2e] text-center mb-[40px]">
                        So we did not create another English course.<br />
                        We created a complete English mastery system that develops language, clarity, confidence, and professional communication together.
                    </div>

                    <div className="flex flex-wrap justify-center gap-[16px] mb-[48px]">
                        {["English beginners", "Working professionals", "Job seekers", "Entrepreneurs", "Teachers", "Anyone seeking fluency"].map((text, idx) => (
                            <span key={idx} className="bg-white border-2 border-[#17C3B2] rounded-[20px] px-[20px] py-[10px] font-[600] text-[#17C3B2]">
                                {text}
                            </span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white p-[32px] rounded-[12px] text-center shadow-lg">
                        <p className="text-[24px] font-[700]">This is not just a course. It's a complete English mastery system.</p>
                    </div>
                </div>
            </section>

            {/* What You Get Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        What this kit gives you
                    </h2>

                    <p className="text-[18px] text-[#444] text-center max-w-[700px] mx-auto mb-[48px]">
                        You receive a complete English curriculum from Beginner to Upper-Intermediate, supported by a powerful library of professional, mindset, communication, and real-world English resources.
                    </p>

                    <div className="bg-[#E8F7F5] p-[28px] rounded-[12px] mb-[48px]">
                        <p className="text-[18px] font-[700] text-[#1a1a2e] mb-[16px]">Everything is structured so you always know:</p>
                        <ul className="space-y-2">
                            {['what to study', 'how to practice', 'how to correct yourself', 'how to apply English in real life'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-[16px] text-[#333]">
                                    <span className="text-[#17C3B2]">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Content Modules Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[1000px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[16px]">
                        Core English Learning Kit (16 Books)
                    </h2>

                    <p className="text-[16px] text-[#666] text-center mb-[48px]">
                        Each level includes four structured books so learning, practice, and correction stay clear and organised.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[48px]">
                        {[
                            {
                                volume: 1,
                                level: 'Beginner',
                                tagline: 'Build English from the ground up',
                                topics: ['Sentence structure', 'Basic grammar', 'Daily vocabulary', 'Simple communication']
                            },
                            {
                                volume: 2,
                                level: 'Elementary',
                                tagline: 'Move from basic English to functional usage',
                                topics: ['Longer sentences', 'Better clarity', 'Growing confidence']
                            },
                            {
                                volume: 3,
                                level: 'Intermediate',
                                tagline: 'Improve accuracy, expression, and flow',
                                topics: ['Idea formation', 'Natural sentence building']
                            },
                            {
                                volume: 4,
                                level: 'Upper-Intermediate',
                                tagline: 'Refine fluency and professional usage',
                                topics: ['Clear, confident English for career and real-world situations']
                            }
                        ].map((module, idx) => (
                            <ScrollReveal key={module.volume} delay={`${(idx % 2) * 150}ms`} className="h-full">
                                <div className="bg-white border-2 border-gray-200 rounded-[16px] p-[32px] hover:border-[#17C3B2] hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="inline-block bg-[#17C3B2] text-white px-[16px] py-[6px] rounded-[20px] text-[12px] font-[700] mb-[16px]">
                                        VOLUME {module.volume}
                                    </div>

                                    <h3 className="text-[24px] font-[700] text-[#1a1a2e] mb-[8px]">
                                        {module.level}
                                    </h3>

                                    <p className="text-[16px] italic text-[#666] mb-[20px]">
                                        {module.tagline}
                                    </p>

                                    <ul className="space-y-2 mb-[24px] flex-grow">
                                        {module.topics.map((topic, topicIdx) => (
                                            <li key={topicIdx} className="text-[15px] text-[#555]">• {topic}</li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto">
                                        <p className="text-[14px] font-[700] text-[#1a1a2e] mb-[12px]">Includes:</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Classwork Notes', 'Vocabulary Book', 'Exercise Book', 'Answer Key'].map((book, bookIdx) => (
                                                <div key={bookIdx} className="flex items-center gap-2 text-[14px] text-[#333]">
                                                    <span className="text-[#17C3B2]">✓</span>
                                                    {book}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="bg-[#1a1a2e] text-white p-[24px] rounded-[12px] text-center">
                        <p className="text-[20px] font-[700]">Total: 16 structured, printable PDFs</p>
                    </div>
                </div>
            </section>

            {/* Bonus Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[1000px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[16px]">
                        All included English freebies
                    </h2>

                    <p className="text-[16px] italic text-[#666] text-center mb-[48px]">
                        (Worth far more than the price)
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                title: 'Leadership, Influence, and High-Performance Skills',
                                icon: '🎯',
                                items: ['How to negotiate successfully', 'Adapting leadership styles', 'Emotional intelligence development', 'Strategic thinking', 'Networking skills', 'Storytelling mastery', 'Effective presentations', 'Influence and charisma', 'Fast, structured thinking', 'Leadership and team management']
                            },
                            {
                                title: 'Mindset and Thinking',
                                icon: '🧠',
                                items: ['Creative thinking and innovation workbook', 'The science of motivation', 'Confidence-building blueprint', 'Overcoming procrastination', 'The art of clear communication', 'Critical thinking in daily life', 'Developing a growth mindset']
                            },
                            {
                                title: 'Career and Professional Development',
                                icon: '💼',
                                items: ['Productivity systems for busy professionals', 'Time management mastery', 'Personal brand building on LinkedIn', 'Running productive meetings', 'Workplace etiquette and corporate communication', 'Interview excellence framework', 'Professional email and business writing templates', 'Resume and cover letter writing guide']
                            },
                            {
                                title: 'Communication and Soft Skills',
                                icon: '🗣️',
                                items: ['Assertive versus aggressive communication', 'Cross-cultural communication', 'Body language and non-verbal cues', 'Public speaking confidence workbook', 'Persuasive communication techniques', 'Handling difficult conversations', 'Active listening and empathy']
                            },
                            {
                                title: 'Personal Growth and Success Habits',
                                icon: '🌱',
                                items: ['Overcoming fear of failure', 'Mindfulness and focus exercises', 'Stress management toolkit', 'Goal setting and execution planner', 'Decision-making frameworks', 'Morning routines of high performers', 'Habit formation and discipline playbook']
                            },
                            {
                                title: 'Real-World English Application',
                                icon: '🌍',
                                items: ['100 power phrases to sound professional', 'Everyday idioms and expressions for fluency', 'English for entrepreneurs and startups', 'English for customer service and hospitality', 'English for travel and cultural situations', 'English for social media and digital profiles']
                            }
                        ].map((category, idx) => (
                            <ScrollReveal key={idx} delay={`${(idx % 2) * 100}ms`}>
                                <div className="bg-[#F0FAF8] border-l-4 border-[#17C3B2] p-[28px] rounded-[12px]">
                                    <h3 className="text-[22px] font-[700] text-[#1a1a2e] mb-[16px] flex items-center gap-2">
                                        <span className="text-[28px]">{category.icon}</span>
                                        {category.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {category.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="text-[15px] text-[#333] leading-relaxed pl-4">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="bg-white border-2 border-[#17C3B2] p-[24px] rounded-[12px] mt-[48px]">
                        <p className="text-[17px] font-[600] text-[#1a1a2e] italic text-center">
                            These resources are designed to help you use English confidently in real situations, not just understand it.
                        </p>
                    </div>
                </div>
            </section>

            {/* Outcomes Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[48px]">
                        What you will be able to do after this kit
                    </h2>

                    <div className="space-y-6 mb-[48px]">
                        {[
                            'Speak English with confidence and clarity',
                            'Write professional emails and messages',
                            'Participate actively in meetings and discussions',
                            'Handle interviews, presentations, and negotiations',
                            'Think faster and structure your thoughts in English',
                            'Communicate with authority, not hesitation'
                        ].map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <span className="text-[#17C3B2] text-[28px] flex-shrink-0">✓</span>
                                <p className="text-[20px] text-[#333] font-[500] pt-1">{outcome}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-[20px] font-[600] text-[#17C3B2] text-center">
                        This kit builds language, mindset, and confidence together.
                    </p>
                </div>
            </section>

            {/* Final CTA Section */}
            <section id="pricing" className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] py-[100px] px-6">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-[42px] md:text-[56px] font-[800] text-white mb-[24px]">
                        Ready to master English?
                    </h2>

                    <p className="text-[20px] text-white opacity-95 mb-[40px]">
                        Get instant access to the complete English Mastery Kit
                    </p>

                    <div className="bg-white rounded-[16px] p-[40px] mb-[32px]">
                        <p className="text-[18px] text-[#666] mb-[16px]">Complete Kit</p>
                        <p className="text-[56px] font-[800] text-[#1a1a2e] mb-[24px]">₹999</p>

                        <ul className="text-left space-y-3 mb-[32px]">
                            {[
                                '16 full English learning books',
                                'A massive professional and communication bonus library',
                                'Lifetime access',
                                'Printable and digital formats'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-[16px] text-[#333]">
                                    <span className="text-[#17C3B2] text-[20px]">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-block bg-[#17C3B2] text-white py-[20px] px-[60px] rounded-[12px] text-[20px] font-[700] shadow-[0_8px_24px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300"
                        >
                            Get Instant Access →
                        </button>

                        <div className="flex items-center justify-center gap-2 mt-[24px] text-[14px] text-[#888]">
                            <span>🔒</span>
                            <span>Secure payment powered by Razorpay</span>
                        </div>
                    </div>

                    <p className="text-white text-[16px]">
                        ✓ Instant Digital Download  •  ✓ Lifetime Access  •  ✓ Works on all devices
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-white py-[60px] px-6">
                <div className="max-w-[600px] mx-auto text-center">
                    <h3 className="text-[24px] font-[700] text-[#1a1a2e] mb-[24px]">Contact Us</h3>
                    <div className="space-y-3">
                        <a href="mailto:team.language.network@gmail.com" className="flex items-center justify-center gap-2 text-[#17C3B2] hover:underline">
                            <span>✉️</span>
                            <span>team.language.network@gmail.com</span>
                        </a>
                        <a href="tel:+918879328962" className="flex items-center justify-center gap-2 text-[#17C3B2] hover:underline">
                            <span>📞</span>
                            <span>+91 88793 28962</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Enrollment Modal */}
            <MasteryKitEnrollmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default EnglishMasteryKitPage;
