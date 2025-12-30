import React from 'react';

const OutcomeSection = () => {
    return (
        <section className="bg-[#F8F9FA] py-[100px] px-6">
            <div className="max-w-[900px] mx-auto">
                <h2 className="text-[40px] md:text-[44px] font-[700] text-[#1a1a2e] text-center mb-[32px]">
                    The outcome (what you'll be able to do)
                </h2>
                <p className="text-[20px] text-[#666] text-center mb-[48px]">By following this ecosystem, you'll be able to:</p>

                <div className="space-y-[20px]">
                    {[
                        "speak with more flow and less hesitation",
                        "build sentences automatically (without translating in your head)",
                        "understand exam expectations and score better in DELF",
                        "revise faster because everything is organised level-wise",
                        "learn French not just 'on a table' but through immersion (audio + books + music)"
                    ].map((outcome, idx) => (
                        <div key={idx} className="bg-white border-l-4 border-[#17C3B2] rounded-[8px] p-[24px] shadow-sm flex gap-4 items-center">
                            <span className="text-[#17C3B2] text-[24px] font-bold">✓</span>
                            <span className="text-[18px] text-[#333] leading-[1.6]">{outcome}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OutcomeSection;
