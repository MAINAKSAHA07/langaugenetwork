import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

const ProblemSection = () => {
    return (
        <section className="bg-[#F8F9FA] py-[100px] px-6">
            <div className="max-w-[1000px] mx-auto">
                {/* Intro */}
                <h2 className="text-[28px] md:text-[32px] font-[600] text-[#1a1a2e] text-center mb-[40px]">
                    There's a moment every French learner knows.
                </h2>

                <div className="max-w-[800px] mx-auto text-[18px] leading-[1.8] text-[#444] mb-[32px]">
                    <p className="text-[20px] font-[600] mb-[20px]">You start strong.</p>
                    <p className="mb-4">
                        You download a few PDFs. You watch a few videos. You even try an app.
                        The excitement is real, and you envision yourself speaking fluently in Paris.
                    </p>
                    <p className="italic text-[#666] mt-[32px]">And then…</p>
                </div>

                {/* Pain Points Card */}
                <ScrollReveal>
                    <div className="bg-white border-l-[4px] border-[#17C3B2] p-[32px] md:p-[40px] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] mb-[40px] max-w-[900px] mx-auto">
                        <ul className="space-y-[16px]">
                            {[
                                "Grammar feels like a maze (être/avoir, passé composé, pronouns… all at once).",
                                "You understand French, but when you speak, your mind goes blank.",
                                "You revise, but you don't know what to revise in the right order.",
                                "You try mock papers, but you're not sure what the examiner actually wants.",
                                "You collect resources… and still feel stuck."
                            ].map((point, index) => (
                                <li key={index} className="flex items-start gap-4 text-[17px] md:text-[18px] text-[#333] leading-relaxed">
                                    <span className="text-[#17C3B2] text-xl">❌</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ScrollReveal>

                {/* Teacher Pain Points */}
                <div className="max-w-[900px] mx-auto">
                    <p className="text-[20px] font-[600] text-[#1a1a2e] mb-[24px] mt-[48px]">
                        And if you're a teacher? It's a different kind of exhaustion:
                    </p>
                    <div className="bg-white border-l-[4px] border-[#FF9F43] p-[32px] md:p-[40px] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                        <ul className="space-y-[16px]">
                            {[
                                "Spending hours creating worksheets from scratch.",
                                "Searching for engaging activities that actually work.",
                                "Trying to find level-appropriate reading materials."
                            ].map((point, index) => (
                                <li key={index} className="flex items-start gap-4 text-[17px] md:text-[18px] text-[#333] leading-relaxed italic">
                                    <span className="text-[#FF9F43] text-xl">⚠️</span>
                                    <span>"{point}"</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProblemSection;
