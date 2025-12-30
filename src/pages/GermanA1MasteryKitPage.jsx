import React, { useEffect } from 'react';
import ScrollReveal from '../components/common/ScrollReveal';

const GermanA1MasteryKitPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-sans text-[#333333] bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-[#E8F7F5] to-white py-[100px] px-[20px] md:px-[60px] text-center">
                <div className="max-w-[900px] mx-auto">
                    <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[20px] py-[8px] rounded-[20px] text-[12px] font-[700] tracking-[1px] mb-[24px]">
                        GOETHE-ZERTIFIKAT A1 READY
                    </div>

                    <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-[800] text-[#1a1a2e] leading-[1.1] tracking-[-1px] mb-[20px]">
                        German A1 Mastery Kit
                    </h1>

                    <p className="text-[20px] md:text-[24px] font-[400] text-[#555] leading-[1.5] max-w-[700px] mx-auto mb-[20px]">
                        German A1 Complete Mastery Kit
                    </p>

                    <p className="text-[18px] text-[#666] mb-[40px]">
                        Classwork, Grammar, Writing, Exam Strategy | Goethe-Zertifikat A1 Ready
                    </p>

                    <div className="inline-block bg-white border-2 border-[#17C3B2] px-[32px] py-[16px] rounded-[12px] text-[18px] font-[700] shadow-[0_4px_16px_rgba(23,195,178,0.2)] mb-[32px]">
                        <span className="text-[#1a1a2e]">Complete Kit: ₹699</span>
                    </div>

                    <div>
                        <a
                            href="https://rzp.io/rzp/german-a1-mastery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#17C3B2] text-white py-[18px] px-[48px] rounded-[10px] text-[18px] font-[700] shadow-[0_6px_20px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300"
                        >
                            Get Complete Access Now →
                        </a>
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
                        The problem most German A1 learners face
                    </h2>

                    <div className="max-w-[800px] mx-auto mb-[40px]">
                        <p className="text-[22px] font-[600] text-[#17C3B2] mb-[24px]">
                            German usually does not fail learners. Unstructured learning does.
                        </p>
                        <p className="text-[18px] leading-[1.8] text-[#444] mb-6">
                            Most beginners start German with excitement. Then confusion slowly sets in.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[40px]">
                        {[
                            "Grammar feels heavy and mechanical.",
                            "Word order does not make sense.",
                            "Vocabulary is memorised but sentences do not form naturally.",
                            "Practice feels random and exam readiness remains unclear.",
                            "Am I actually prepared the right way?",
                            "Resources are fragmented and explanations are unclear."
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
                        <p className="text-[24px] font-[700]">This program was created to remove that doubt entirely.</p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        Why this German A1 program was created
                    </h2>

                    <div className="max-w-[800px] mx-auto mb-[40px]">
                        <p className="text-[18px] leading-[1.8] text-[#444] mb-6">
                            At The Language Network, we did not build this program in isolation. We curated it with insights gathered from 200+ German mentors, exam trainers, and active learners.
                        </p>

                        <div className="bg-[#E8F7F5] px-[28px] py-[20px] rounded-[8px] font-[600] text-[#1a1a2e] mb-[24px]">
                            Learners were not struggling because German was difficult.<br />
                            They were struggling because resources were fragmented, explanations were unclear, and exam strategy was missing.
                        </div>

                        <p className="text-[18px] leading-[1.8] text-[#444] mb-6">
                            Most A1 books teach information, but they do not explain:
                        </p>

                        <ul className="space-y-3 mb-[24px]">
                            {[
                                'how to apply grammar in real situations',
                                'how Goethe evaluates answers',
                                'how to practise in the exact exam format',
                                'how to progress from zero to exam-ready without confusion'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[16px] text-[#555]">
                                    <span className="text-[#17C3B2] text-xl">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-white border-2 border-[#17C3B2] p-[24px] rounded-[12px] text-center">
                            <p className="text-[18px] font-[600] text-[#1a1a2e]">
                                This kit was designed to solve those exact gaps.<br />
                                It is not just a book. It is a complete German A1 learning, practice, and exam-prep system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Modules Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[1000px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[16px]">
                        What you get inside this complete resource set
                    </h2>

                    <p className="text-[16px] text-[#666] text-center mb-[48px]">
                        4 comprehensive books designed for complete A1 mastery
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[48px]">
                        {[
                            {
                                number: 1,
                                title: 'Classwork and Vocabulary Book',
                                subtitle: 'Your core learning foundation',
                                features: [
                                    'Clear A1-level grammar explanations',
                                    'Exhaustive vocabulary lists for every A1 topic',
                                    'Everyday sentence structures',
                                    'Step-by-step modules covering basics, family, city, food, media',
                                    'All essential A1 grammar including cases, verbs, word order'
                                ]
                            },
                            {
                                number: 2,
                                title: 'Exercise Book',
                                subtitle: 'Structured Practice',
                                features: [
                                    'Topic-wise exercises aligned with every lesson',
                                    'Grammar drills and sentence-building tasks',
                                    'Vocabulary application exercises',
                                    'Reading-style tasks and guided writing prompts',
                                    'Exercises designed to mirror real Goethe A1 task logic'
                                ]
                            },
                            {
                                number: 3,
                                title: 'Answer Key',
                                subtitle: 'Self-Correction and Accuracy',
                                features: [
                                    'Complete solutions for every exercise',
                                    'Model sentences you can study and reuse',
                                    'Clear correction guidance for independent learners',
                                    'Explanations that show why an answer is correct',
                                    'Confident self-study without constant external support'
                                ]
                            },
                            {
                                number: 4,
                                title: 'Goethe A1 Exam Strategy and Tips',
                                subtitle: 'Converts preparation into certainty',
                                features: [
                                    'Complete breakdown of exam pattern and marking system',
                                    'Skill-wise strategies for Reading, Writing, Listening, Speaking',
                                    'Common mistakes and how to avoid them',
                                    'Exam-focused practice guidance',
                                    'Prepare intelligently and with clarity'
                                ]
                            }
                        ].map((module, idx) => (
                            <ScrollReveal key={module.number} delay={`${(idx % 2) * 150}ms`} className="h-full">
                                <div className="bg-white border-2 border-gray-200 rounded-[16px] p-[32px] hover:border-[#17C3B2] hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="inline-block bg-[#17C3B2] text-white px-[16px] py-[6px] rounded-[20px] text-[12px] font-[700] mb-[16px] w-fit">
                                        BOOK {module.number}
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
                        <p className="text-[20px] font-[700]">Complete German A1 learning, practice, and exam-prep system</p>
                    </div>
                </div>
            </section>

            {/* Who Is This For Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        Who this program is for
                    </h2>

                    <div className="bg-[#F0FAF8] p-[28px] rounded-[12px]">
                        <p className="text-[16px] text-[#666] mb-[20px]">This program is ideal if you are:</p>
                        <ul className="space-y-3">
                            {[
                                'A complete beginner starting German from zero',
                                'Preparing for the Goethe-Zertifikat A1 or Start Deutsch 1',
                                'A student, professional, or migrant needing A1 certification',
                                'A self-learner who wants structured material without live classes',
                                'A teacher or institute looking for ready-made A1 content'
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

            {/* How This Helps Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[48px]">
                        How this program helps you succeed
                    </h2>

                    <div className="space-y-6 mb-[48px]">
                        {[
                            'Clear progression from basics to exam readiness',
                            'Fully aligned with real Goethe A1 exam formats',
                            'Builds accuracy, fluency, and confidence together',
                            'Suitable for self-study, classroom use, and revision',
                            'Saves months of confusion, random resources, and trial and error'
                        ].map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <span className="text-[#17C3B2] text-[28px] flex-shrink-0">✓</span>
                                <p className="text-[20px] text-[#333] font-[500] pt-1">{benefit}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#E8F7F5] p-[32px] rounded-[12px] text-center">
                        <h3 className="text-[24px] font-[700] text-[#1a1a2e] mb-[16px]">Recommended study outcome</h3>
                        <p className="text-[18px] text-[#555] mb-[12px]">With consistent use:</p>
                        <p className="text-[20px] font-[600] text-[#17C3B2] mb-[8px]">Reach A1 readiness in 8 to 12 weeks</p>
                        <p className="text-[16px] text-[#666]">Daily study time required: 30 to 60 minutes</p>
                    </div>
                </div>
            </section>

            {/* Outcomes Section */}
            <section className="bg-gray-50 py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[48px]">
                        By the end, you will
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            'Understand basic German clearly',
                            'Speak without panic',
                            'Write exam-appropriate answers',
                            'Enter the Goethe A1 exam knowing exactly what to expect'
                        ].map((outcome, idx) => (
                            <div key={idx} className="bg-white p-[24px] rounded-[12px] shadow-sm border-l-4 border-[#17C3B2]">
                                <p className="text-[18px] text-[#333] font-[500]">{outcome}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Different Section */}
            <section className="bg-white py-[100px] px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                        Why this program is different
                    </h2>

                    <div className="max-w-[700px] mx-auto text-center mb-[40px]">
                        <p className="text-[20px] text-[#555] mb-[24px]">
                            Most A1 resources only teach content.
                        </p>
                        <p className="text-[22px] font-[600] text-[#17C3B2] mb-[24px]">
                            This program teaches content, application, and exam intelligence together.
                        </p>
                        <p className="text-[18px] text-[#444]">
                            You do not just learn German. You learn how to use German where it truly matters.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white p-[40px] rounded-[12px] text-center">
                        <p className="text-[24px] font-[700] mb-[16px]">What comes next</p>
                        <p className="text-[18px] opacity-95">
                            This is the first level in a structured German mastery roadmap by The Language Network.<br />
                            Further levels including A2, B1, and B2 are already being developed and will be launched soon.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section id="pricing" className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] py-[100px] px-6">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-[42px] md:text-[56px] font-[800] text-white mb-[24px]">
                        Start your German A1 journey with clarity and confidence
                    </h2>

                    <p className="text-[20px] text-white opacity-95 mb-[40px]">
                        If your goal is not just to study German, but to clear Goethe A1 with certainty, this program gives you everything you need in one place.
                    </p>

                    <div className="bg-white rounded-[16px] p-[40px] mb-[32px]">
                        <p className="text-[18px] text-[#666] mb-[16px]">German A1 Complete Kit</p>
                        <p className="text-[56px] font-[800] text-[#1a1a2e] mb-[24px]">₹699</p>

                        <ul className="text-left space-y-3 mb-[32px]">
                            {[
                                '4 comprehensive books (Classwork, Exercise, Answer Key, Exam Strategy)',
                                'Fully aligned with Goethe-Zertifikat A1',
                                'Lifetime access',
                                'Printable and digital formats',
                                'Instant digital download'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-[16px] text-[#333]">
                                    <span className="text-[#17C3B2] text-[20px]">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://rzp.io/rzp/german-a1-mastery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#17C3B2] text-white py-[20px] px-[60px] rounded-[12px] text-[20px] font-[700] shadow-[0_8px_24px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300"
                        >
                            Get Instant Access →
                        </a>

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
        </div>
    );
};

export default GermanA1MasteryKitPage;
