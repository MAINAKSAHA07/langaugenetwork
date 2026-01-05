import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

const BonusSection = () => {
    const bonuses = [
        { title: "65+ Verb Conjugations Guide", value: "₹3,500" },
        { title: "600+ Useful French Adjectives", value: "₹3,500" },
        { title: "12,000+ French Phrases", value: "₹6,000" },
        { title: "100+ French Tongue Twisters", value: "₹3,500" },
        { title: "20+ Must-Read Books for DELF Prep", value: "₹4,000" },
        { title: "25+ French Movies List", value: "₹3,500" },
        { title: "25+ French Series List", value: "₹4,000" },
        { title: "30+ Common Learning Mistakes", value: "₹3,500" },
        { title: "25+ French Podcasts", value: "₹3,500" },
        { title: "30+ Novels for Beginners", value: "₹3,500" },
        { title: "65+ Everyday Dialogues", value: "₹4,500" },
        { title: "DELF Day Checklist", value: "₹3,500" },
        { title: "25 Fun and Interactive Games to Teach French", value: "₹4,000" },
        { title: "20 Quickest Ways to Sound Native", value: "₹3,500" },
        { title: "How to Monetize Your Language Skills", value: "₹5,000" },
        { title: "All the Vocabulary You Need (A1–C2)", value: "₹6,000" },
        { title: "1000 Must-Know French Idioms", value: "₹5,000" }
    ];

    return (
        <section className="bg-gradient-to-br from-[#17C3B2] to-[#14A89A] py-[100px] px-6 text-white">
            <div className="max-w-[1100px] mx-auto">
                <div className="text-center mb-[60px]">
                    <div className="inline-block bg-white text-[#17C3B2] px-[20px] py-[8px] rounded-[20px] text-[13px] font-[700] mb-[20px]">
                        🎁 EXCLUSIVE BONUSES
                    </div>
                    <h2 className="text-[46px] md:text-[50px] font-[800] mb-[16px]">
                        17 Exclusive freebies included today
                    </h2>
                    <p className="text-[28px] font-[700] opacity-90">
                        (Total bonus value: ₹68,500)
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mb-[60px]">
                    {bonuses.map((bonus, idx) => (
                        <ScrollReveal key={idx} delay={`${(idx % 3) * 100}ms`}>
                            <div className="bg-white rounded-[12px] p-[28px] text-[#1a1a2e] shadow-lg hover:scale-[1.03] transition-transform duration-300 relative group h-full">
                                <div className="absolute top-[28px] left-[24px] bg-[#17C3B2] text-white w-[32px] h-[32px] rounded-[6px] flex items-center justify-center font-bold text-[14px]">
                                    {idx + 1}
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-[18px] font-[700] leading-[1.3] mb-[12px]">{bonus.title}</h3>
                                    <p className="text-[#17C3B2] font-[700] text-[16px]">{bonus.value}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Total Value Summary Box */}
                <div className="bg-white/10 backdrop-blur-sm border-[3px] border-white rounded-[16px] p-[32px] text-center max-w-[800px] mx-auto shadow-2xl">
                    <p className="text-[20px] text-white/80 line-through mb-2">Core Kit Value: ₹25,000</p>
                    <div className="text-[32px] font-[700] text-[#E8F7F5] my-2">+</div>
                    <p className="text-[20px] text-white/80 line-through mb-4">17 Bonus Resources: ₹68,500</p>
                    <div className="text-[32px] font-[700] text-[#E8F7F5] my-2">=</div>
                    <p className="text-[36px] font-[800] text-white mb-[16px]">Total Value: ₹93,500</p>

                    <p className="text-[18px] text-white/90 mb-2">Get Everything Today For:</p>
                    <p className="text-[48px] font-[800] text-white mb-[24px]">₹2,799</p>

                    <a href="#pricing" className="inline-block bg-[#1a1a2e] text-white py-[18px] px-[48px] rounded-[10px] text-[18px] font-[700] shadow-xl hover:scale-105 transition-transform">
                        Claim Your Bonuses Now →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BonusSection;
