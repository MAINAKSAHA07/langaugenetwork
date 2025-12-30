import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StickyHeader = () => {
    // Scroll animation for CTA button
    const [showCTA, setShowCTA] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowCTA(true);
            } else {
                setShowCTA(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white h-[75px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between px-6 md:px-12 transition-all duration-300">
            {/* Left: Logo */}
            <div className="w-[150px]">
                <Link to="/">
                    <img src="/images/TLN_logo-01.png" alt="The Language Network" className="w-[150px] h-auto object-contain" />
                </Link>
            </div>

            {/* Center: Breadcrumb (Optional) */}
            <div className="hidden md:block text-[#888888] text-[13px]">
                <Link to="/" className="hover:text-[#17C3B2]">Home</Link> &gt; Mastery Kit
            </div>

            {/* Right: Sticky CTA */}
            <div className={`transform transition-all duration-500 ${showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <a href="#pricing" className="bg-[#17C3B2] text-white py-[12px] px-[32px] rounded-[8px] font-[600] shadow-[0_4px_12px_rgba(23,195,178,0.3)] hover:scale-105 transition-transform duration-300 block">
                    Get Instant Access
                </a>
            </div>
        </header>
    );
};

export default StickyHeader;
