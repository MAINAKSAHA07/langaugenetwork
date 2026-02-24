import React, { useState, useEffect, useCallback } from 'react';

// ── 25 purchase notifications ──────────────────────────────────────────────
const PURCHASES = [
    { name: 'Priya S.', location: 'Mumbai', course: 'French Mastery Kit', flag: '🇫🇷', time: '2 minutes ago' },
    { name: 'Rahul M.', location: 'Delhi', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '5 minutes ago' },
    { name: 'Ananya K.', location: 'Bangalore', course: 'English Mastery Kit', flag: '🇬🇧', time: '8 minutes ago' },
    { name: 'Vikram T.', location: 'Pune', course: 'French Mastery Kit', flag: '🇫🇷', time: '11 minutes ago' },
    { name: 'Sneha R.', location: 'Chennai', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '14 minutes ago' },
    { name: 'Aditya P.', location: 'Hyderabad', course: 'English Mastery Kit', flag: '🇬🇧', time: '18 minutes ago' },
    { name: 'Meera J.', location: 'Kolkata', course: 'French Mastery Kit', flag: '🇫🇷', time: '22 minutes ago' },
    { name: 'Karthik N.', location: 'Ahmedabad', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '26 minutes ago' },
    { name: 'Deepika S.', location: 'Jaipur', course: 'English Mastery Kit', flag: '🇬🇧', time: '31 minutes ago' },
    { name: 'Arjun L.', location: 'Surat', course: 'French Mastery Kit', flag: '🇫🇷', time: '35 minutes ago' },
    { name: 'Pooja V.', location: 'Lucknow', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '40 minutes ago' },
    { name: 'Rohan G.', location: 'Chandigarh', course: 'English Mastery Kit', flag: '🇬🇧', time: '44 minutes ago' },
    { name: 'Ishaan B.', location: 'Bhopal', course: 'French Mastery Kit', flag: '🇫🇷', time: '48 minutes ago' },
    { name: 'Divya C.', location: 'Indore', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '52 minutes ago' },
    { name: 'Nikhil A.', location: 'Nagpur', course: 'English Mastery Kit', flag: '🇬🇧', time: '57 minutes ago' },
    { name: 'Kavya M.', location: 'Coimbatore', course: 'French Mastery Kit', flag: '🇫🇷', time: '1 hour ago' },
    { name: 'Siddharth R.', location: 'Vadodara', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '1 hour ago' },
    { name: 'Tanvi S.', location: 'Patna', course: 'English Mastery Kit', flag: '🇬🇧', time: '2 hours ago' },
    { name: 'Manish K.', location: 'Agra', course: 'French Mastery Kit', flag: '🇫🇷', time: '2 hours ago' },
    { name: 'Riya D.', location: 'Nashik', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '2 hours ago' },
    { name: 'Amit P.', location: 'Mysore', course: 'English Mastery Kit', flag: '🇬🇧', time: '3 hours ago' },
    { name: 'Shreya N.', location: 'Ranchi', course: 'French Mastery Kit', flag: '🇫🇷', time: '3 hours ago' },
    { name: 'Varun T.', location: 'Ludhiana', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '4 hours ago' },
    { name: 'Nisha G.', location: 'Visakhapatnam', course: 'English Mastery Kit', flag: '🇬🇧', time: '4 hours ago' },
    { name: 'Raj K.', location: 'Kochi', course: 'French Mastery Kit', flag: '🇫🇷', time: '5 hours ago' },
];

const DISPLAY_DURATION = 4500;   // ms toast is fully visible
const CYCLE_INTERVAL = 7000;   // ms between toasts
const INITIAL_DELAY = 6000;   // ms before first toast appears

export default function SocialProofToast() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false); // controls slide-in/out

    const showNext = useCallback(() => {
        // Slide in
        setVisible(true);

        // After display duration, slide out
        const hideTimer = setTimeout(() => {
            setVisible(false);
        }, DISPLAY_DURATION);

        // After slide-out, advance to next
        const nextTimer = setTimeout(() => {
            setIndex(prev => (prev + 1) % PURCHASES.length);
        }, DISPLAY_DURATION + 500);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(nextTimer);
        };
    }, []);

    useEffect(() => {
        // Initial delay before first pop
        const initTimer = setTimeout(() => {
            showNext();
        }, INITIAL_DELAY);

        return () => clearTimeout(initTimer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // Cycle timer kicks off after the first show
        const cycleTimer = setInterval(() => {
            showNext();
        }, CYCLE_INTERVAL);

        return () => clearInterval(cycleTimer);
    }, [showNext]);

    const p = PURCHASES[index];

    return (
        <>
            {/* Inline styles so no external CSS file needed */}
            <style>{`
        .sp-toast {
          position: fixed;
          bottom: 24px;
          left: 20px;
          z-index: 9999;
          max-width: 320px;
          width: calc(100vw - 40px);
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-left: 4px solid #17C3B2;
          transform: translateX(calc(-100% - 30px));
          opacity: 0;
          transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease;
          pointer-events: none;
          user-select: none;
        }
        .sp-toast.sp-visible {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
        }
        .sp-flag {
          font-size: 28px;
          flex-shrink: 0;
          line-height: 1;
        }
        .sp-body {
          flex: 1;
          min-width: 0;
        }
        .sp-name {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sp-course {
          font-size: 12px;
          color: #17C3B2;
          font-weight: 600;
          margin-top: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sp-meta {
          font-size: 11px;
          color: #888;
          margin-top: 3px;
        }
        .sp-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          flex-shrink: 0;
          animation: sp-pulse 1.4s ease-in-out infinite;
        }
        @keyframes sp-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
        @media (max-width: 480px) {
          .sp-toast {
            bottom: 16px;
            left: 12px;
            width: calc(100vw - 24px);
            padding: 12px 14px;
          }
        }
      `}</style>

            <div className={`sp-toast${visible ? ' sp-visible' : ''}`} role="status" aria-live="polite">
                <span className="sp-flag" aria-hidden="true">{p.flag}</span>
                <div className="sp-body">
                    <div className="sp-name">{p.name} from {p.location}</div>
                    <div className="sp-course">just bought {p.course}</div>
                    <div className="sp-meta">🕐 {p.time}</div>
                </div>
                <span className="sp-dot" aria-hidden="true" />
            </div>
        </>
    );
}
