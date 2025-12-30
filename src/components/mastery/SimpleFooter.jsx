import React from 'react';
import { Link } from 'react-router-dom';

const SimpleFooter = () => {
    return (
        <footer className="bg-[#1a1a2e] py-[40px] text-white text-center">
            <div className="flex justify-center mb-[20px]">
                {/* Logo */}
                <div className="w-[140px] h-[50px] bg-white/10 flex items-center justify-center rounded text-sm">
                    {/* Placeholder for white logo */}
                    TLN Logo
                </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4 text-[14px] opacity-70 mb-[24px]">
                <Link to="/who-are-we" className="hover:text-white hover:underline">About</Link>
                <span>|</span>
                <Link to="/blogs" className="hover:text-white hover:underline">Blog</Link>
                <span>|</span>
                <Link to="/contact" className="hover:text-white hover:underline">Contact</Link>
                <span>|</span>
                <Link to="/privacy" className="hover:text-white hover:underline">Privacy Policy</Link>
            </div>

            <div className="flex justify-center gap-[16px] mb-[24px]">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">fb</div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">ig</div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">li</div>
            </div>

            <p className="text-[13px] opacity-60">
                © 2024 The Language Network. All Rights Reserved.
            </p>
        </footer>
    );
};

export default SimpleFooter;
