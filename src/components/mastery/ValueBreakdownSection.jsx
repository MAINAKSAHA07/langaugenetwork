import React from 'react';

const ValueBreakdownSection = () => {
    return (
        <section className="bg-white py-[100px] px-6">
            <div className="max-w-[1000px] mx-auto text-center">
                <h2 className="text-[40px] md:text-[44px] font-[700] text-[#1a1a2e] mb-[32px]">
                    Why the value is ₹93.5k <br /><span className="text-[0.8em] font-normal text-[#666]">(and why it's priced much lower today)</span>
                </h2>

                <p className="text-[18px] leading-[1.8] max-w-[800px] mx-auto mb-[40px] text-[#444]">
                    Creating a comprehensive ecosystem takes massive resources. Normally, to get this level of material, you'd need to cobble together dozens of separate books and courses.
                </p>

                {/* Alternative Approach Card */}
                <div className="bg-[#F8F9FA] border-l-[4px] border-[#FF9F43] p-[32px] rounded-[12px] mb-[40px] text-left max-w-[800px] mx-auto shadow-sm">
                    <h3 className="text-[20px] font-bold mb-4 text-[#333]">Without this bundle, you'd need:</h3>
                    <ul className="space-y-3">
                        {[
                            "multiple DELF prep books",
                            "separate grammar + vocab + exercise resources",
                            "paid audio resources",
                            "immersion resources (novels, audiobooks, playlists)",
                            "and endless trial-and-error"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[17px] text-[#555]">
                                <span className="text-red-500 font-bold">❌</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Compression Statement */}
                <div className="bg-gradient-to-r from-[#17C3B2] to-[#14A89A] text-white p-[32px] rounded-[12px] shadow-[0_6px_20px_rgba(23,195,178,0.3)]">
                    <p className="text-[22px] font-[700]">
                        This bundle compresses that entire journey into one complete roadmap.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ValueBreakdownSection;
