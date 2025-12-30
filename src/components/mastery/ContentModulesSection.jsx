import React, { useRef, useEffect, useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';

const ContentModulesSection = () => {
    const modules = [
        // Group 1
        {
            id: 1,
            title: "Classwork Books",
            subtitle: "(4 Levels: A1, A2, B1, B2)",
            desc: "Structured notes covering grammar, sentence patterns, and communication techniques written in an intuitive, easy-to-follow style.",
            value: "₹5,000",
            icon: "📚"
        },
        {
            id: 2,
            title: "Vocabulary Books",
            subtitle: "(3 Levels: A1, A2, B1)",
            desc: "Thousands of words and expressions organised by theme and level to help you expand your vocabulary naturally.",
            value: "₹5,000",
            icon: "📖"
        },
        {
            id: 3,
            title: "Exercise Books",
            subtitle: "(4 Levels: A1, A2, B1, B2)",
            desc: "Grammar drills, comprehension tasks, and creative activities designed for self-learners and teachers.",
            value: "₹5,000",
            icon: "✍️"
        },
        {
            id: 4,
            title: "Answer Keys",
            subtitle: "(4 Levels: A1, A2, B1, B2)",
            desc: "Detailed solutions for every exercise so you can track progress and learn from every mistake.",
            value: "₹5,000",
            icon: "✓"
        },
        {
            id: 5,
            title: "DELF Exam Preparation Guides",
            subtitle: "(A1 to B2)",
            desc: "Marking criteria explained, sample questions and mock papers, strategies for Listening, Speaking, Reading, and Writing.",
            value: "₹5,000",
            icon: "🎯"
        },
        // Group 2 - after divider
        {
            id: 6,
            title: "Practice Audios",
            subtitle: "(A1 to B2)",
            desc: "Listen-and-repeat exercises that improve pronunciation, accent, and comprehension, so you learn how French truly sounds.",
            value: "₹7,000",
            icon: "🎧"
        },
        {
            id: 7,
            title: "Free French Novels",
            subtitle: "(Including the Harry Potter Series)",
            desc: "Build vocabulary and grammar through stories you love, from beginner-friendly reads to advanced classics.",
            value: "₹6,000",
            icon: "📕"
        },
        {
            id: 8,
            title: "Free French Audiobooks",
            subtitle: "",
            desc: "Perfect for listening while commuting or relaxing, so you absorb natural French daily.",
            value: "₹5,000",
            icon: "🔊"
        },
        {
            id: 9,
            title: "French Songs for Learners",
            subtitle: "",
            desc: "Curated playlists with lyrics to improve rhythm, memory, and natural expression.",
            value: "₹4,000",
            icon: "🎵"
        }
    ];

    // Mobile Scroll Logic
    const triggerRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 768) return; // Skip on desktop
            if (!triggerRef.current || !scrollContainerRef.current) return;

            const top = triggerRef.current.getBoundingClientRect().top;
            const containerHeight = triggerRef.current.offsetHeight;
            const screenHeight = window.innerHeight;
            const scrollWidth = scrollContainerRef.current.scrollWidth;
            const maxTranslate = scrollWidth - window.innerWidth + 40; // 40px padding buffer

            // Logic: 
            // When top > 0: content is at default (0px translate)
            // When top <= 0: we are scrolling INTO the section. 
            // setTranslateX should equal 'top' (because top is negative as we scroll down)

            if (top <= 0 && -top <= maxTranslate) {
                setTranslateX(top);
            } else if (top > 0) {
                setTranslateX(0);
            } else if (-top > maxTranslate) {
                setTranslateX(-maxTranslate);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial setup
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="bg-[#F8F9FA] md:py-[100px] md:px-6">

            {/* DESKTOP VIEW */}
            <div className="hidden md:block max-w-[1100px] mx-auto">
                <h2 className="text-[48px] md:text-[52px] font-[700] text-[#1a1a2e] text-center mb-[60px]">
                    What's inside?
                </h2>

                {/* Divider 1 */}
                <div className="flex items-center gap-4 mb-[40px]">
                    <h3 className="text-[28px] font-[700] text-[#1a1a2e] whitespace-nowrap">Four complete levels (A1-B2)</h3>
                    <div className="h-[2px] bg-[#ddd] w-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-[32px] mb-[60px]">
                    {modules.slice(0, 5).map((mod, index) => (
                        <ScrollReveal key={mod.id} delay={`${index * 100} ms`}>
                            <div className="bg-white rounded-[16px] p-[36px] md:p-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group h-full">
                                <div className="absolute top-0 left-0 bg-[#17C3B2] text-white w-[40px] h-[40px] flex items-center justify-center font-bold text-[18px] rounded-br-[8px] z-10">
                                    {mod.id}
                                </div>
                                <div className="text-[64px] mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">{mod.icon}</div>
                                <h4 className="text-[24px] md:text-[26px] font-[700] text-[#1a1a2e] mb-2">{mod.title}</h4>
                                {mod.subtitle && <p className="text-[15px] text-[#666] mb-4">{mod.subtitle}</p>}
                                <p className="text-[16px] leading-[1.7] text-[#444] mb-6">{mod.desc}</p>
                                <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[16px] py-[6px] rounded-[20px] text-[14px] font-[700]">
                                    Value: {mod.value}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Divider 2 */}
                <div className="flex items-center gap-4 mb-[40px]">
                    <h3 className="text-[28px] font-[700] text-[#1a1a2e] whitespace-nowrap">Immersive audio learning experience</h3>
                    <div className="h-[2px] bg-[#ddd] w-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-[32px]">
                    {modules.slice(5).map((mod, index) => (
                        <ScrollReveal key={mod.id} delay={`${index * 100} ms`}>
                            <div className="bg-white rounded-[16px] p-[36px] md:p-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group h-full">
                                <div className="absolute top-0 left-0 bg-[#17C3B2] text-white w-[40px] h-[40px] flex items-center justify-center font-bold text-[18px] rounded-br-[8px] z-10">
                                    {mod.id}
                                </div>
                                <div className="text-[64px] mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">{mod.icon}</div>
                                <h4 className="text-[24px] md:text-[26px] font-[700] text-[#1a1a2e] mb-2">{mod.title}</h4>
                                {mod.subtitle && <p className="text-[15px] text-[#666] mb-4">{mod.subtitle}</p>}
                                <p className="text-[16px] leading-[1.7] text-[#444] mb-6">{mod.desc}</p>
                                <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[16px] py-[6px] rounded-[20px] text-[14px] font-[700]">
                                    Value: {mod.value}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* MOBILE VIEW (Sticky Horizontal Scroll) */}
            <div className="md:hidden">
                <div ref={triggerRef} className="h-[4200px] relative">
                    <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#F8F9FA]">
                        <h2 className="text-[40px] font-[700] text-[#1a1a2e] text-center mb-8 absolute top-[10vh] left-0 right-0 z-20">
                            What's inside?
                        </h2>

                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 pl-6 pr-6 items-center will-change-transform"
                            style={{ transform: `translateX(${translateX}px)` }}
                        >
                            {/* Section 1 Title Card */}
                            <div className="min-w-[80vw] bg-transparent flex items-center justify-center">
                                <h3 className="text-[32px] font-[800] text-[#1a1a2e] text-center leading-tight">
                                    Four complete levels<br />(A1-B2)
                                </h3>
                            </div>

                            {modules.slice(0, 5).map(mod => (
                                <div key={mod.id} className="min-w-[85vw] bg-white rounded-[16px] p-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute top-0 left-0 bg-[#17C3B2] text-white w-[40px] h-[40px] flex items-center justify-center font-bold text-[18px] rounded-br-[8px]">
                                        {mod.id}
                                    </div>
                                    <div className="text-[56px] mb-4 text-[#17C3B2]">{mod.icon}</div>
                                    <h4 className="text-[24px] font-[700] text-[#1a1a2e] mb-2">{mod.title}</h4>
                                    {mod.subtitle && <p className="text-[14px] text-[#666] mb-4">{mod.subtitle}</p>}
                                    <p className="text-[16px] leading-[1.6] text-[#444] mb-6">{mod.desc}</p>
                                    <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[16px] py-[6px] rounded-[20px] text-[14px] font-[700] self-start">
                                        Value: {mod.value}
                                    </div>
                                </div>
                            ))}

                            {/* Section 2 Title Card */}
                            <div className="min-w-[80vw] bg-transparent flex items-center justify-center">
                                <h3 className="text-[32px] font-[800] text-[#1a1a2e] text-center leading-tight">
                                    Immersive audio<br />learning experience
                                </h3>
                            </div>

                            {modules.slice(5).map(mod => (
                                <div key={mod.id} className="min-w-[85vw] bg-white rounded-[16px] p-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute top-0 left-0 bg-[#17C3B2] text-white w-[40px] h-[40px] flex items-center justify-center font-bold text-[18px] rounded-br-[8px]">
                                        {mod.id}
                                    </div>
                                    <div className="text-[56px] mb-4 text-[#17C3B2]">{mod.icon}</div>
                                    <h4 className="text-[24px] font-[700] text-[#1a1a2e] mb-2">{mod.title}</h4>
                                    {mod.subtitle && <p className="text-[14px] text-[#666] mb-4">{mod.subtitle}</p>}
                                    <p className="text-[16px] leading-[1.6] text-[#444] mb-6">{mod.desc}</p>
                                    <div className="inline-block bg-[#E8F7F5] text-[#17C3B2] px-[16px] py-[6px] rounded-[20px] text-[14px] font-[700] self-start">
                                        Value: {mod.value}
                                    </div>
                                </div>
                            ))}

                            {/* End Buffer */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentModulesSection;
