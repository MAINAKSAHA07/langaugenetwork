import React, { useState, useEffect } from 'react';

const FloatingBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)] py-[16px] px-[24px] z-[999] animate-slideUp">
            <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                <div className="hidden md:block">
                    <p className="text-[18px] font-[700] text-[#1a1a2e]">French A1-B2 Mastery Kit</p>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <p className="text-[24px] font-[700] text-[#17C3B2]">₹4,999</p>

                    <a href="#pricing" className="bg-[#17C3B2] text-white py-[12px] px-[32px] rounded-[8px] font-[600] text-[16px] hover:bg-[#14A89A] transition-colors">
                        Get Access Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FloatingBar;
