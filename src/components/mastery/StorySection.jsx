import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

const StorySection = () => {
    return (
        <section className="bg-white py-[100px] px-6">
            <div className="max-w-[900px] mx-auto">
                <h2 className="text-[42px] md:text-[48px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                    Why I created this bundle?
                </h2>

                <div className="max-w-[800px] mx-auto mb-[40px]">
                    <p className="text-[22px] font-[600] text-[#17C3B2] mb-[24px]">
                        I built this after doing what most people don't.
                    </p>
                    <p className="text-[18px] leading-[1.8] text-[#444] mb-6">
                        I realized that most students fail not because they lack ability, but because they lack a system.
                        They have pieces of the puzzle, but no picture reference.
                    </p>
                    <div className="inline-block bg-[#E8F7F5] px-[28px] py-[20px] rounded-[8px] font-[600] text-[#1a1a2e]">
                        I spoke to 200+ mentors and active learners...
                    </div>
                </div>

                {/* Quotes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[40px]">
                    {[
                        "I don't have a roadmap.",
                        "I have resources but no structure.",
                        "I can't speak confidently.",
                        "I want DELF, but I don't know how to prepare properly.",
                        "I'm a teacher, but I need ready-made material that's actually high quality.",
                        "I'm a self-learner; I need guidance, not random content."
                    ].map((quote, idx) => (
                        <ScrollReveal key={idx} delay={`${(idx % 3) * 100}ms`}>
                            <div className="bg-[#F0FAF8] border border-[#ddd] rounded-[12px] p-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] relative h-full">
                                <div className="text-[#17C3B2] opacity-30 text-[40px] absolute top-4 left-4 font-serif">“</div>
                                <p className="text-[16px] italic leading-[1.6] text-[#333] relative z-10 pt-4">{quote}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Timeline Text */}
                <p className="text-[18px] text-[#444] text-center max-w-[800px] mx-auto mb-[40px]">
                    So I spent around <span className="font-bold">1 full year</span> curating, structuring, writing, and assembling a complete French mastery ecosystem...
                </p>

                {/* Audience Pills */}
                <div className="flex flex-wrap justify-center gap-[16px] mb-[48px]">
                    {["DELF aspirants", "self-learners", "teachers", "anyone seeking fluency"].map((text, idx) => (
                        <span key={idx} className="bg-white border-2 border-[#17C3B2] rounded-[20px] px-[20px] py-[10px] font-[600] text-[#17C3B2]">
                            {text}
                        </span>
                    ))}
                </div>

                {/* Closing Emphasis */}
                <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white p-[32px] rounded-[12px] text-center shadow-lg">
                    <p className="text-[24px] font-[700]">This is not just a course. It's a complete French universe.</p>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
