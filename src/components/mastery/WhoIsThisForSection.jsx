import React from 'react';

const WhoIsThisForSection = () => {
    return (
        <section className="bg-white py-[100px] px-6">
            <div className="max-w-[1100px] mx-auto">
                <h2 className="text-[40px] md:text-[44px] font-[700] text-[#1a1a2e] text-center mb-[60px]">
                    Who this bundle is for <br /><span className="text-[0.6em] font-normal text-[#666]">(and how it transforms each person)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                    {/* Learner Column */}
                    <div className="bg-gradient-to-b from-[#F0FAF8] to-white border-2 border-[#17C3B2] rounded-[16px] p-[40px] shadow-sm">
                        <div className="bg-[#17C3B2] text-white px-[24px] py-[10px] rounded-[20px] text-[14px] font-[700] inline-block mb-[32px]">
                            IF YOU'RE A LEARNER...
                        </div>

                        <h3 className="text-[20px] font-[700] text-[#1a1a2e] mb-[16px]">You go from:</h3>
                        <div className="bg-white p-[20px] rounded-[8px] border-l-4 border-red-500 mb-[16px] shadow-sm flex gap-3 text-[#555] text-[17px]">
                            <span>❌</span> I don't know what to study next
                        </div>

                        <div className="text-center text-[24px] font-[700] text-[#17C3B2] my-4">to</div>

                        <div className="bg-white p-[20px] rounded-[8px] border-l-4 border-[#2ECC71] mb-[32px] shadow-sm flex gap-3 text-[#333] font-[600] text-[17px]">
                            <span>😊</span> I know exactly what to do daily/weekly and I can track progress.
                        </div>

                        <h3 className="text-[20px] font-[700] text-[#1a1a2e] mb-[20px]">You gain:</h3>
                        <ul className="space-y-3">
                            {["structured fluency from A1 to B2", "speaking confidence", "DELF clarity", "immersion habits through audio + stories + songs"].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-[16px] text-[#333]">
                                    <span className="text-[#17C3B2] font-bold">✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Teacher Column */}
                    <div className="bg-gradient-to-b from-[#FFF4E6] to-white border-2 border-[#FF9F43] rounded-[16px] p-[40px] shadow-sm">
                        <div className="bg-[#FF9F43] text-white px-[24px] py-[10px] rounded-[20px] text-[14px] font-[700] inline-block mb-[32px]">
                            IF YOU'RE A TEACHER...
                        </div>

                        <h3 className="text-[20px] font-[700] text-[#1a1a2e] mb-[16px]">You go from:</h3>
                        <div className="bg-white p-[20px] rounded-[8px] border-l-4 border-red-500 mb-[16px] shadow-sm flex gap-3 text-[#555] text-[17px]">
                            <span>❌</span> I'm building lessons from scratch every day
                        </div>

                        <div className="text-center text-[24px] font-[700] text-[#FF9F43] my-4">to</div>

                        <div className="bg-white p-[20px] rounded-[8px] border-l-4 border-[#2ECC71] mb-[32px] shadow-sm flex gap-3 text-[#333] font-[600] text-[17px]">
                            <span>😊</span> I have premium ready-made material and activities that look professional and teach results.
                        </div>

                        <h3 className="text-[20px] font-[700] text-[#1a1a2e] mb-[20px]">You gain:</h3>
                        <ul className="space-y-3">
                            {["structured notes", "vocabulary banks", "exercises + answer keys", "games, dialogues, and classroom-ready resources", "plus a monetization freebie to help you grow your teaching income"].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-[16px] text-[#333]">
                                    <span className="text-[#FF9F43] font-bold">✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoIsThisForSection;
