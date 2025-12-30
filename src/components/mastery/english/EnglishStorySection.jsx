import React from 'react';
import ScrollReveal from '../../common/ScrollReveal';

const EnglishStorySection = () => {
    return (
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

                {/* Problems Grid */}
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

                {/* Insight */}
                <p className="text-[18px] text-[#444] text-center max-w-[800px] mx-auto mb-[40px]">
                    At The Language Network, we saw this pattern again and again among students, working professionals, entrepreneurs, and even teachers.
                </p>

                {/* Solution */}
                <div className="bg-[#E8F7F5] px-[28px] py-[20px] rounded-[8px] font-[600] text-[#1a1a2e] text-center mb-[40px]">
                    So we did not create another English course.<br />
                    We created a complete English mastery system that develops language, clarity, confidence, and professional communication together.
                </div>

                {/* Audience Pills */}
                <div className="flex flex-wrap justify-center gap-[16px] mb-[48px]">
                    {["English beginners", "Working professionals", "Job seekers", "Entrepreneurs", "Teachers", "Anyone seeking fluency"].map((text, idx) => (
                        <span key={idx} className="bg-white border-2 border-[#17C3B2] rounded-[20px] px-[20px] py-[10px] font-[600] text-[#17C3B2]">
                            {text}
                        </span>
                    ))}
                </div>

                {/* Closing Emphasis */}
                <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white p-[32px] rounded-[12px] text-center shadow-lg">
                    <p className="text-[24px] font-[700]">This is not just a course. It's a complete English mastery system.</p>
                </div>
            </div>
        </section>
    );
};

export default EnglishStorySection;
