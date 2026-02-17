import React, { useEffect, useState } from 'react';
import ScrollReveal from '../components/common/ScrollReveal';
import MasteryKitEnrollmentModal from '../components/common/MasteryKitEnrollmentModal';

const GermanA1MasteryKitPage = () => {
    const [showEnrollModal, setShowEnrollModal] = useState(false);

    const kitDetails = {
        title: 'German Mastery Kit - A1 + A2 Complete Bundle',
        language: 'german',
        price: 1499,
        description: 'Complete German learning kit from absolute beginner to confident A2 speaker with classwork, exercises, answer keys, and Goethe exam strategies',
        features: [
            '7 comprehensive books (A1 + A2 levels)',
            'Classwork, Exercises, Answer Keys for both levels',
            'Speaking & Writing Playbook',
            'Goethe A1 & A2 Exam Strategy',
            'Fully aligned with Goethe-Zertifikat A1 & A2',
            'Lifetime access',
            'Instant digital download'
        ]
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans text-[#333333] bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-[#E8F7F5] to-white py-[100px] px-[20px] md:px-[60px] text-center">
                <div className="max-w-[900px] mx-auto">
                    <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[20px] py-[8px] rounded-[20px] text-[12px] font-[700] tracking-[1px] mb-[24px]">
                        GOETHE-ZERTIFIKAT A1 + A2 READY
                    </div>

                    <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-[800] text-[#1a1a2e] leading-[1.1] tracking-[-1px] mb-[20px]">
                        German A1 + A2 Complete Mastery Kit
                    </h1>

                    <p className="text-[20px] md:text-[24px] font-[400] text-[#555] leading-[1.5] max-w-[700px] mx-auto mb-[20px]">
                        Your Structured Path from Absolute Beginner to Confident A2 Speaker
                    </p>

                    <p className="text-[18px] text-[#666] mb-[40px]">
                        Complete A1 + A2 Curriculum | Goethe-Zertifikat Ready | Self-Study Friendly
                    </p>

                    <div className="inline-block bg-white border-2 border-[#17C3B2] px-[32px] py-[16px] rounded-[12px] text-[18px] font-[700] shadow-[0_4px_16px_rgba(23,195,178,0.2)] mb-[32px]">
                        <span className="text-gray-500 line-through text-[14px] mr-2">₹1,698</span>
                        <span className="text-[#1a1a2e]">Complete Bundle: ₹1,499</span>
                        <span className="text-[#17C3B2] text-[14px] ml-2">(Save ₹199)</span>
                    </div>

                    <div>
                        <button
                            onClick={() => setShowEnrollModal(true)}
                            className="inline-block bg-[#17C3B2] text-white py-[18px] px-[48px] rounded-[10px] text-[18px] font-[700] shadow-[0_6px_20px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            Get Complete Access Now →
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-[24px] mt-[16px] text-[#666] text-[14px]">
                        <span className="flex items-center gap-2">✓ Instant Digital Access</span>
                        <span className="flex items-center gap-2">✓ Exam-Aligned Content</span>
                        <span className="flex items-center gap-2">✓ Self-Study Friendly</span>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        You decide to learn German
                    </h2>

                    <div className="max-w-[800px] mx-auto mb-[40px]">
                        <p className="text-[18px] leading-[1.8] text-[#444] mb-6">
                            Maybe it is for the Goethe exam.<br />
                            Maybe it is for studies in Germany.<br />
                            Maybe it is for work, migration, or personal growth.
                        </p>

                        <p className="text-[18px] leading-[1.8] text-[#444] mb-6">
                            You open random YouTube videos.<br />
                            You download scattered PDFs.<br />
                            You try grammar apps.
                        </p>

                        <p className="text-[22px] font-[600] text-[#17C3B2] mb-[24px]">
                            But something feels incomplete.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[40px]">
                        {[
                            "You learn rules, but you cannot speak.",
                            "You understand words, but you cannot form sentences.",
                            "You memorise vocabulary, but you forget it in conversations."
                        ].map((quote, idx) => (
                            <ScrollReveal key={idx} delay={`${(idx % 3) * 100}ms`}>
                                <div className="bg-[#F0FAF8] border border-[#ddd] rounded-[12px] p-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] relative h-full">
                                    <div className="text-[#17C3B2] opacity-30 text-[40px] absolute top-4 left-4 font-serif">"</div>
                                    <p className="text-[16px] italic leading-[1.6] text-[#333] relative z-10 pt-4">{quote}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white p-[32px] rounded-[12px] text-center shadow-lg">
                        <p className="text-[24px] font-[700]">That is exactly why this German A1 + A2 Complete Mastery Kit was created.</p>
                        <p className="text-[18px] mt-4 opacity-95">This is not just a collection of grammar notes. It is a structured language system designed to build your confidence step by step, from zero to A2 level.</p>
                    </div>
                </div>
            </section>

            {/* What This Kit Gives You Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        What This Kit Gives You
                    </h2>

                    <div className="max-w-[800px] mx-auto mb-[40px]">
                        <p className="text-[20px] leading-[1.8] text-[#444] mb-6 font-[600] text-center">
                            You receive a complete beginner-to-elementary German curriculum designed to make you think and communicate in German naturally.
                        </p>

                        <div className="bg-white border-2 border-[#17C3B2] p-[24px] rounded-[12px] text-center mb-[24px]">
                            <p className="text-[18px] font-[600] text-[#1a1a2e]">
                                From introducing yourself to handling appointments, shopping, housing, travel, and basic professional interactions — every topic is covered with clarity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Modules Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[1000px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[16px]">
                        Complete A1 + A2 Resource Set
                    </h2>

                    <p className="text-[16px] text-[#666] text-center mb-[48px]">
                        7 comprehensive books designed for complete A1 to A2 mastery
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[48px]">
                        {[
                            {
                                number: 1,
                                title: 'Classwork and Vocabulary Books (A1 + A2)',
                                subtitle: 'Your core learning foundation',
                                features: [
                                    'Clear explanations for both A1 and A2 grammar',
                                    'Structured grammar progression',
                                    'Topic-based vocabulary for everyday situations',
                                    'Real-life sentence patterns',
                                    'From basics to professional interactions'
                                ]
                            },
                            {
                                number: 2,
                                title: 'Exercise Books (A1 + A2)',
                                subtitle: 'Structured Practice',
                                features: [
                                    'Grammar drills for both levels',
                                    'Sentence building exercises',
                                    'Reading-style tasks',
                                    'Guided writing prompts',
                                    'Exercises mirror Goethe exam logic'
                                ]
                            },
                            {
                                number: 3,
                                title: 'Answer Keys (A1 + A2)',
                                subtitle: 'Self-Correction and Accuracy',
                                features: [
                                    'Complete solutions for every exercise',
                                    'Model sentences you can study and reuse',
                                    'Clear correction guidance',
                                    'Explanations of why answers are correct',
                                    'Confident self-study without external support'
                                ]
                            },
                            {
                                number: 4,
                                title: 'Speaking and Writing Playbook',
                                subtitle: 'Where hesitation disappears',
                                features: [
                                    'Ready-made dialogues and phrase banks',
                                    'Introductions, daily routines, transport',
                                    'Shopping, invitations, services',
                                    'Forms and short messages',
                                    'Memorise and use directly in conversations'
                                ]
                            },
                            {
                                number: 5,
                                title: 'Goethe A1 Exam Strategy',
                                subtitle: 'Converts preparation into certainty',
                                features: [
                                    'Complete breakdown of exam pattern',
                                    'Marking system explained',
                                    'Skill-wise strategies (Reading, Writing, Listening, Speaking)',
                                    'Common mistakes and how to avoid them',
                                    'Prepare with awareness, not anxiety'
                                ]
                            },
                            {
                                number: 6,
                                title: 'Goethe A2 Exam Strategy',
                                subtitle: 'Master the A2 examination',
                                features: [
                                    'A2 exam pattern and structure',
                                    'Listening traps and number tricks',
                                    'Writing scoring logic',
                                    'Speaking performance strategies',
                                    'Reading techniques for short texts'
                                ]
                            }
                        ].map((module, idx) => (
                            <ScrollReveal key={module.number} delay={`${(idx % 2) * 150}ms`} className="h-full">
                                <div className="bg-white border-2 border-gray-200 rounded-[16px] p-[32px] hover:border-[#17C3B2] hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="inline-block bg-[#17C3B2] text-white px-[16px] py-[6px] rounded-[20px] text-[12px] font-[700] mb-[16px] w-fit">
                                        MODULE {module.number}
                                    </div>

                                    <h3 className="text-[24px] font-[700] text-[#1a1a2e] mb-[8px]">
                                        {module.title}
                                    </h3>

                                    <p className="text-[16px] italic text-[#666] mb-[20px]">
                                        {module.subtitle}
                                    </p>

                                    <ul className="space-y-2 flex-grow">
                                        {module.features.map((feature, featureIdx) => (
                                            <li key={featureIdx} className="text-[15px] text-[#555] flex items-start gap-2">
                                                <span className="text-[#17C3B2] mt-1">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="bg-[#1a1a2e] text-white p-[24px] rounded-[12px] text-center">
                        <p className="text-[20px] font-[700]">Complete German A1 + A2 learning, practice, and exam-prep system</p>
                    </div>
                </div>
            </section>

            {/* What Changes Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[48px]">
                        What Changes After You Finish This Kit
                    </h2>

                    <div className="space-y-6 mb-[48px]">
                        {[
                            'You can introduce yourself with confidence',
                            'You can ask and answer questions naturally',
                            'You can write short emails and messages correctly',
                            'You can understand announcements and everyday conversations',
                            'You can walk into the Goethe A1 or A2 exam knowing what to expect'
                        ].map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <span className="text-[#17C3B2] text-[28px] flex-shrink-0">✓</span>
                                <p className="text-[20px] text-[#333] font-[500] pt-1">{benefit}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#E8F7F5] p-[32px] rounded-[12px] text-center">
                        <h3 className="text-[24px] font-[700] text-[#1a1a2e] mb-[16px]">Most importantly</h3>
                        <p className="text-[20px] font-[600] text-[#17C3B2] mb-[8px]">You stop translating in your head.</p>
                        <p className="text-[20px] font-[600] text-[#17C3B2]">You begin thinking in German.</p>
                    </div>
                </div>
            </section>

            {/* Who Is This For Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        Who This Kit Is For
                    </h2>

                    <div className="bg-[#F0FAF8] p-[28px] rounded-[12px]">
                        <ul className="space-y-3">
                            {[
                                'Complete beginners starting from zero',
                                'A1 learners moving to A2',
                                'Goethe A1 or A2 aspirants',
                                'Professionals relocating to German-speaking countries',
                                'Students preparing for study abroad',
                                'Self-learners who want structure, not scattered resources',
                                'Teachers who need ready-made, organised material'
                            ].map((audience, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[16px] text-[#333]">
                                    <span className="text-[#17C3B2]">→</span>
                                    <span>{audience}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-[16px] font-[600] text-[#17C3B2] mt-[20px]">
                            No prior German knowledge is required.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Different Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        Why This Is Different
                    </h2>

                    <div className="max-w-[700px] mx-auto text-center mb-[40px]">
                        <p className="text-[20px] text-[#555] mb-[24px]">
                            Many courses teach grammar.
                        </p>
                        <p className="text-[22px] font-[600] text-[#17C3B2] mb-[24px]">
                            This kit builds structure, fluency, and confidence together.
                        </p>
                        <ul className="text-left space-y-3 mb-[24px]">
                            {[
                                'It moves progressively from A1 foundations to A2 independence',
                                'It balances explanation with application',
                                'It prepares you for real communication, not just textbook exercises'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[18px] text-[#444]">
                                    <span className="text-[#17C3B2] text-xl">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white p-[40px] rounded-[12px] text-center">
                        <p className="text-[24px] font-[700] mb-[16px]">You are not just buying PDFs.</p>
                        <p className="text-[18px] opacity-95">
                            You are investing in a complete German foundation that supports exams, migration, career growth, and real-life communication.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section id="pricing" className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] py-[100px] px-6">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-[42px] md:text-[56px] font-[800] text-white mb-[24px]">
                        Start your German A1 + A2 journey with clarity and confidence
                    </h2>

                    <p className="text-[20px] text-white opacity-95 mb-[40px]">
                        Study consistently. Practice daily. Build confidence step by step. And watch yourself go from "Ich verstehe ein bisschen" to speaking clearly and confidently at A2 level.
                    </p>

                    <div className="bg-white rounded-[16px] p-[40px] mb-[32px]">
                        <p className="text-[18px] text-[#666] mb-[16px]">German A1 + A2 Complete Bundle</p>
                        <div className="mb-[24px]">
                            <span className="text-gray-500 line-through text-[20px] mr-2">₹1,698</span>
                            <span className="text-[56px] font-[800] text-[#1a1a2e]">₹1,499</span>
                            <span className="text-[#17C3B2] text-[18px] ml-2 font-[600]">(Save ₹199)</span>
                        </div>

                        <ul className="text-left space-y-3 mb-[32px]">
                            {[
                                '7 comprehensive books (A1 + A2 Complete)',
                                'Classwork, Exercises, Answer Keys',
                                'Speaking & Writing Playbook',
                                'Goethe A1 & A2 Exam Strategies',
                                'Lifetime access',
                                'Instant digital download'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-[16px] text-[#333]">
                                    <span className="text-[#17C3B2] text-[20px]">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setShowEnrollModal(true)}
                            className="inline-block bg-[#17C3B2] text-white py-[20px] px-[60px] rounded-[12px] text-[20px] font-[700] shadow-[0_8px_24px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300 cursor-pointer"
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
            {showEnrollModal && (
                <MasteryKitEnrollmentModal
                    kitDetails={kitDetails}
                    onClose={() => setShowEnrollModal(false)}
                />
            )}
        </div>
    );
};

export default GermanA1MasteryKitPage;
