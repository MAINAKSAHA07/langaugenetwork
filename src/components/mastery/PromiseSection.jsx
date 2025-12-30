import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

const PromiseSection = () => {
    const steps = [
        {
            title: "You stop feeling lost",
            description: "Because you finally have level-wise structure (A1, A2, B1, B2) with progressive learning."
        },
        {
            title: "You start speaking with clarity",
            description: "Not 'perfect French', but confident, natural French. You know what to say, how to build sentences, and how to sound more French daily."
        },
        {
            title: "Your DELF preparation becomes predictable",
            description: "You stop guessing. You understand: what the exam expects, how marking works, how to structure answers, how to practice Listening, Speaking, Reading, Writing strategically."
        },
        {
            title: "Your learning becomes immersive",
            description: "French stops being a 'subject'. It becomes something you live: through audios, novels, audiobooks, and songs."
        },
        {
            title: "Your outcome becomes inevitable",
            description: "Whether your goal is DELF, moving abroad, studying, teaching, or personal growth, this bundle takes you from 'trying' to 'progressing'."
        }
    ];

    return (
        <section className="bg-gradient-to-b from-[#E8F7F5] to-white py-[100px] px-6">
            <div className="max-w-[1100px] mx-auto">
                <h2 className="text-[40px] md:text-[44px] font-[700] text-[#1a1a2e] text-center mb-[24px]">
                    The promise: what happens when you follow this bundle
                </h2>
                <p className="text-[20px] text-[#666] text-center mb-[60px]">
                    Imagine this sequence:
                </p>

                {/* Steps Container */}
                <div className="relative">
                    {/* Vertical connecting line (visual only, simplified for ease) */}
                    <div className="absolute left-[30px] md:left-[50%] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#17C3B2] opacity-30 hidden md:block"></div>

                    {steps.map((step, index) => (
                        <ScrollReveal key={index} delay={`${index * 150} ms`}>
                            <div className="relative z-10 bg-white rounded-[16px] p-[40px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] mb-[32px] max-w-[800px] mx-auto transition-transform hover:-translate-y-1">
                                {/* Step Badge */}
                                <div className="absolute -top-6 -left-4 md:-left-8 bg-[#17C3B2] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center text-[24px] font-[700] border-4 border-white shadow-[0_4px_12px_rgba(23,195,178,0.3)]">
                                    {index + 1}
                                </div>

                                <div className="pl-6 md:pl-8">
                                    <h3 className="text-[26px] md:text-[28px] font-[700] text-[#1a1a2e] mb-[16px]">
                                        {step.title}
                                    </h3>
                                    <p className="text-[17px] md:text-[18px] leading-[1.7] text-[#444]">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromiseSection;
