import React from 'react';

const HeroSection = ({ language = 'French' }) => {
    const content = {
        French: {
            badge: 'THE ULTIMATE FRENCH MASTERY BUNDLE',
            title: 'French A1-B2 Mastery Kit',
            subtitle: 'Your all-in-one roadmap to French fluency, confidence, and DELF success (A1 → B2)',
            image: '/images/french_mastery_hero.png',
            imageAlt: 'French Mastery Kit Bundle',
            valueOriginal: '₹93,500',
            price: '₹999',
            bonusCount: '17'
        },
        English: {
            badge: 'THE COMPLETE ENGLISH CURRICULUM',
            title: 'English Mastery Kit (Volumes 1-4)',
            subtitle: 'Your complete English mastery system for real-world communication (Beginner → Upper-Intermediate)',
            image: '/images/english_mastery_hero.png',
            imageAlt: 'English Mastery Kit Bundle',
            valueOriginal: '₹50,000',
            price: '₹999',
            bonusCount: '45+'
        }
    };

    const data = content[language] || content.French;

    return (
        <section className="bg-gradient-to-b from-[#E8F7F5] to-white py-[100px] px-[20px] md:px-[60px] text-center">
            <div className="max-w-[900px] mx-auto">
                {/* Badge */}
                <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[20px] py-[8px] rounded-[20px] text-[12px] font-[700] tracking-[1px] mb-[24px]">
                    {data.badge}
                </div>

                {/* Headline */}
                <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-[800] text-[#1a1a2e] leading-[1.1] tracking-[-1px] mb-[20px]">
                    {data.title}
                </h1>

                {/* Subheadline */}
                <p className="text-[20px] md:text-[24px] font-[400] text-[#555] leading-[1.5] max-w-[700px] mx-auto mb-[40px]">
                    {data.subtitle}
                </p>

                {/* Hero Visual */}
                <div className="max-w-[600px] mx-auto mb-[40px] rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden bg-white flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-500">
                    <img src={data.image} alt={data.imageAlt} className="w-full h-auto object-cover" />
                </div>

                {/* Value Badge */}
                <div className="inline-block bg-white border-2 border-[#17C3B2] px-[32px] py-[16px] rounded-[12px] text-[18px] font-[700] shadow-[0_4px_16px_rgba(23,195,178,0.2)] mb-[32px]">
                    <span className="line-through text-gray-400 mr-2">Complete Kit Value: {data.valueOriginal}</span>
                    <span className="text-[#1a1a2e]">Today: {data.price}</span>
                </div>

                {/* CTA Button */}
                <div>
                    <a href="#pricing" className="inline-block bg-[#17C3B2] text-white py-[18px] px-[48px] rounded-[10px] text-[18px] font-[700] shadow-[0_6px_20px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300">
                        Get Complete Access Now →
                    </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-[24px] mt-[16px] text-[#666] text-[14px]">
                    <span className="flex items-center gap-2">✓ Instant Digital Access</span>
                    <span className="flex items-center gap-2">✓ {data.bonusCount} Bonus Resources Included</span>
                    <span className="flex items-center gap-2">✓ Self-Study Friendly</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
