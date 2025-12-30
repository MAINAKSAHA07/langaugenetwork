import React, { useState } from 'react';

const ObjectionsSection = () => {
    const objections = [
        {
            q: "I've tried learning French before. I couldn't stay consistent.",
            a: "That wasn't a 'you problem.' That was a structure problem. When learning is scattered, consistency dies. This bundle is built to remove that chaos."
        },
        {
            q: "I'm a self-learner. Will I be able to do this without a teacher?",
            a: "Yes, because you're not just getting material. You're getting: structured classwork notes, exercises, and answer keys to self-correct. This is what makes it self-study friendly."
        },
        {
            q: "I want to speak, not just do grammar.",
            a: "Exactly why this includes: communication techniques inside the notes, practice audios A1–B2, dialogues + phrases + native-sounding shortcuts, immersion through novels, audiobooks, songs."
        },
        {
            q: "DELF feels intimidating.",
            a: "DELF becomes easier when you understand: how marking works, what examiners look for, what to practice and how. That's why the DELF prep guides are included from A1 to B2."
        }
    ];

    // Simple open state logic? Or just open all? Design says "accordion-style or stacked cards". 
    // Stacked cards implies they are all visible.
    // Let's make them collapsible for cleaner UI on mobile, or just open cards. 
    // The prompt says "Accordion-style OR stacked cards". I'll do stacked open cards for better readability.

    return (
        <section className="bg-white py-[100px] px-6">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-[40px] md:text-[44px] font-[700] text-[#1a1a2e] text-center mb-[16px]">
                    Objection & myth handling
                </h2>
                <p className="text-[20px] text-[#666] italic text-center mb-[60px]">(because you're probably thinking this)</p>

                <div className="space-y-[24px]">
                    {objections.map((obj, idx) => (
                        <div key={idx} className="bg-[#F0FAF8] border border-[#ddd] rounded-[12px] p-[32px] md:p-[36px]">
                            <h3 className="text-[22px] md:text-[24px] font-[700] text-[#1a1a2e] mb-[20px] flex items-start gap-3">
                                <span className="text-[#17C3B2]">🤔</span> {obj.q}
                            </h3>
                            <p className="text-[17px] md:text-[18px] leading-[1.7] text-[#333]">
                                {obj.a.includes("'you problem.'") ? (
                                    <>
                                        That wasn't a <span className="bg-white px-2 py-1 rounded font-[600]"> 'you problem.'</span> That was a structure problem. When learning is scattered, consistency dies. This bundle is built to remove that chaos.
                                    </>
                                ) : obj.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ObjectionsSection;
