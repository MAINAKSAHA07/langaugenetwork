import React from 'react';

const FinalCTASection = () => {
    return (
        <section id="pricing" className="bg-[#1a1a2e] py-[120px] px-6 text-white text-center">
            <div className="max-w-[800px] mx-auto">
                <p className="text-[28px] md:text-[32px] font-[700] text-[#17C3B2] tracking-[1px] mb-[24px]">
                    Invest once. Speak forever.
                </p>

                <h2 className="text-[36px] md:text-[40px] font-[700] leading-[1.3] mb-[32px]">
                    The Ultimate French Mastery Bundle is not just a course.
                </h2>
                <p className="text-[20px] opacity-90 leading-[1.7] mb-[48px]">
                    It is your complete fluency companion, built to take you from A1 to B2 and beyond, with structure, practice, correction, immersion, and DELF alignment.
                </p>

                {/* What You Get Box */}
                <div className="bg-white text-[#333] rounded-[16px] p-[40px] shadow-2xl mb-[48px] text-left">
                    <h3 className="text-[24px] font-[700] text-[#1a1a2e] text-center mb-[24px]">Buy today to unlock:</h3>
                    <ul className="space-y-[16px] mb-[32px]">
                        {[
                            "all levels (A1–B2)",
                            "practice audios",
                            "novels + audiobooks + songs",
                            "and 17 exclusive freebies worth ₹68,500+ included when you purchase today."
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-[18px] leading-[1.6]">
                                <span className="text-[#17C3B2] font-bold">✓</span> {item}
                            </li>
                        ))}
                    </ul>

                    {/* Price Display */}
                    <div className="text-center mt-[40px] mb-[32px]">
                        <p className="text-[20px] text-gray-500 line-through mb-2">Total Value: ₹1,20,500</p>
                        <p className="text-[18px] text-gray-700 mb-4">Get Everything For:</p>
                        <p className="text-[56px] md:text-[64px] font-[800] text-[#17C3B2]">₹2,799</p> {/* Placeholder Price */}
                    </div>

                    <div className="text-center">
                        <a
                            href="https://rzp.io/rzp/french-a1-to-b2-mastery-kit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white py-[20px] px-[60px] rounded-[12px] text-[20px] font-[700] shadow-[0_8px_32px_rgba(23,195,178,0.5)] hover:scale-105 transition-transform duration-300 w-full md:w-auto"
                        >
                            Get Instant Access Now
                        </a>
                    </div>

                    <div className="flex flex-wrap justify-center gap-[24px] mt-[24px] text-[14px] text-gray-500">
                        <span className="flex items-center gap-2">🔒 Secure Payment</span>
                        <span className="flex items-center gap-2">⚡ Instant Access</span>
                        <span className="flex items-center gap-2">✓ All Bonuses Included</span>
                    </div>
                </div>

                {/* Contact */}
                <div className="border-t border-white/20 pt-[32px] mt-[48px]">
                    <h4 className="text-[20px] font-[700] text-[#17C3B2] mb-[16px]">Contact Us:</h4>
                    <div className="flex flex-col gap-[12px] items-center">
                        <a href="mailto:team.language.network@gmail.com" className="text-[17px] hover:text-[#17C3B2] transition-colors flex items-center gap-2">
                            ✉️ team.language.network@gmail.com
                        </a>
                        <a href="tel:+918879328962" className="text-[17px] hover:text-[#17C3B2] transition-colors flex items-center gap-2">
                            📞 +91 88793 28962
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTASection;
