import React from 'react';

const EnglishHeroSection = () => {
    return (
        <section className="bg-gradient-to-b from-[#E8F7F5] to-white py-[100px] px-[20px] md:px-[60px] text-center">
            <div className="max-w-[900px] mx-auto">
                {/* Badge */}
                <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[20px] py-[8px] rounded-[20px] text-[12px] font-[700] tracking-[1px] mb-[24px]">
                    COMPLETE ENGLISH CURRICULUM
                </div>

                {/* Headline */}
                <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-[800] text-[#1a1a2e] leading-[1.1] tracking-[-1px] mb-[20px]">
                    English Mastery Kit (Volume 1 to 4)
                </h1>

                {/* Subheadline */}
                <p className="text-[20px] md:text-[24px] font-[400] text-[#555] leading-[1.5] max-w-[700px] mx-auto mb-[40px]">
                    A complete English mastery system for real-world communication
                </p>

                {/* Level Range */}
                <p className="text-[18px] text-[#666] mb-[40px]">
                    Beginner to Upper-Intermediate | Volumes 1 to 4
                </p>

                {/* Value Badge */}
                <div className="inline-block bg-white border-2 border-[#17C3B2] px-[32px] py-[16px] rounded-[12px] text-[18px] font-[700] shadow-[0_4px_16px_rgba(23,195,178,0.2)] mb-[32px]">
                    <span className="text-[#1a1a2e]">Complete Kit: ₹999</span>
                </div>

                {/* CTA Button */}
                <div>
                    <a
                        href="https://pages.razorpay.com/pl_PbVQJlxqVbGZGr/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#17C3B2] text-white py-[18px] px-[48px] rounded-[10px] text-[18px] font-[700] shadow-[0_6px_20px_rgba(23,195,178,0.4)] hover:scale-105 transition-transform duration-300"
                    >
                        Get Complete Access Now →
                    </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-[24px] mt-[16px] text-[#666] text-[14px]">
                    <span className="flex items-center gap-2">✓ Instant Digital Access</span>
                    <span className="flex items-center gap-2">✓ 45+ Bonus Resources Included</span>
                    <span className="flex items-center gap-2">✓ Self-Study Friendly</span>
                </div>
            </div>
        </section>
    );
};

export default EnglishHeroSection;
