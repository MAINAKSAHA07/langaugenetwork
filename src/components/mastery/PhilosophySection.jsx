import React from 'react';

const PhilosophySection = () => {
    return (
        <section className="bg-gradient-to-br from-[#17C3B2] to-[#14A89A] py-[100px] px-6 text-white">
            <div className="max-w-[900px] mx-auto text-center">
                <h2 className="text-[38px] md:text-[42px] font-[700] mb-[32px]">
                    Why I created the freebies and the kit this way?
                </h2>

                <p className="text-[26px] md:text-[28px] font-[700] mb-[16px]">Because people don't fail due to lack of effort.</p>
                <p className="text-[26px] md:text-[28px] font-[700] mb-[48px] opacity-90">They fail because they miss support systems.</p>

                <p className="text-[22px] font-[600] mb-[32px]">The freebies are not random 'bonus candy.'</p>

                <div className="bg-white text-[#333] rounded-[12px] p-[40px] shadow-2xl text-left mb-[48px]">
                    <ul className="space-y-[20px]">
                        {[
                            { p: "learners struggle with speaking", s: "dialogues, phrases, tongue twisters, sound-native tips" },
                            { p: "learners struggle with exam anxiety", s: "DELF day checklist + book lists + mock prep support" },
                            { p: "learners struggle with immersion", s: "podcasts, movies, series, novels, songs" },
                            { p: "teachers struggle with classroom engagement", s: "interactive games + ready-made resources" },
                            { p: "many learners want outcomes + opportunities", s: "monetization guide" }
                        ].map((item, idx) => (
                            <li key={idx} className="text-[17px] md:text-[18px] leading-[1.8] flex gap-3">
                                <span className="text-[#17C3B2] font-bold mt-1">➜</span>
                                <span>{item.p} <span className="font-bold">→ {item.s}</span></span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-[#1a1a2e]/30 border-2 border-white rounded-[12px] p-[32px]">
                    <p className="text-[24px] font-[600] leading-[1.5]">
                        It's designed so your learning doesn't feel like a lonely road. It feels like a guided journey.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
