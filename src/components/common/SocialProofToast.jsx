import React, { useState, useEffect, useCallback } from 'react';

// ── 75 purchase notifications ──────────────────────────────────────────────
const PURCHASES = [
    // ── Original 25 ──
    { name: 'Priya S.', location: 'Mumbai', course: 'French Mastery Kit', flag: '🇫🇷', time: '2 min ago' },
    { name: 'Rahul M.', location: 'Delhi', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '5 min ago' },
    { name: 'Ananya K.', location: 'Bangalore', course: 'English Mastery Kit', flag: '🇬🇧', time: '8 min ago' },
    { name: 'Vikram T.', location: 'Pune', course: 'French Mastery Kit', flag: '🇫🇷', time: '11 min ago' },
    { name: 'Sneha R.', location: 'Chennai', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '14 min ago' },
    { name: 'Aditya P.', location: 'Hyderabad', course: 'English Mastery Kit', flag: '🇬🇧', time: '18 min ago' },
    { name: 'Meera J.', location: 'Kolkata', course: 'French Mastery Kit', flag: '🇫🇷', time: '22 min ago' },
    { name: 'Karthik N.', location: 'Ahmedabad', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '26 min ago' },
    { name: 'Deepika S.', location: 'Jaipur', course: 'English Mastery Kit', flag: '🇬🇧', time: '31 min ago' },
    { name: 'Arjun L.', location: 'Surat', course: 'French Mastery Kit', flag: '🇫🇷', time: '35 min ago' },
    { name: 'Pooja V.', location: 'Lucknow', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '40 min ago' },
    { name: 'Rohan G.', location: 'Chandigarh', course: 'English Mastery Kit', flag: '🇬🇧', time: '44 min ago' },
    { name: 'Ishaan B.', location: 'Bhopal', course: 'French Mastery Kit', flag: '🇫🇷', time: '48 min ago' },
    { name: 'Divya C.', location: 'Indore', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '52 min ago' },
    { name: 'Nikhil A.', location: 'Nagpur', course: 'English Mastery Kit', flag: '🇬🇧', time: '57 min ago' },
    { name: 'Kavya M.', location: 'Coimbatore', course: 'French Mastery Kit', flag: '🇫🇷', time: '1 hr ago' },
    { name: 'Siddharth R.', location: 'Vadodara', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '1 hr ago' },
    { name: 'Tanvi S.', location: 'Patna', course: 'English Mastery Kit', flag: '🇬🇧', time: '2 hrs ago' },
    { name: 'Manish K.', location: 'Agra', course: 'French Mastery Kit', flag: '🇫🇷', time: '2 hrs ago' },
    { name: 'Riya D.', location: 'Nashik', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '2 hrs ago' },
    { name: 'Amit P.', location: 'Mysore', course: 'English Mastery Kit', flag: '🇬🇧', time: '3 hrs ago' },
    { name: 'Shreya N.', location: 'Ranchi', course: 'French Mastery Kit', flag: '🇫🇷', time: '3 hrs ago' },
    { name: 'Varun T.', location: 'Ludhiana', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '4 hrs ago' },
    { name: 'Nisha G.', location: 'Visakhapatnam', course: 'English Mastery Kit', flag: '🇬🇧', time: '4 hrs ago' },
    { name: 'Raj K.', location: 'Kochi', course: 'French Mastery Kit', flag: '🇫🇷', time: '5 hrs ago' },

    // ── New 50 ──
    { name: 'Anjali B.', location: 'Thane', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: 'just now' },
    { name: 'Sandeep M.', location: 'Navi Mumbai', course: 'French Mastery Kit', flag: '🇫🇷', time: '1 min ago' },
    { name: 'Lakshmi V.', location: 'Vijayawada', course: 'English Mastery Kit', flag: '🇬🇧', time: '3 min ago' },
    { name: 'Harish R.', location: 'Madurai', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '7 min ago' },
    { name: 'Swati D.', location: 'Rajkot', course: 'French Mastery Kit', flag: '🇫🇷', time: '9 min ago' },
    { name: 'Praveen A.', location: 'Meerut', course: 'English Mastery Kit', flag: '🇬🇧', time: '13 min ago' },
    { name: 'Sunita L.', location: 'Jodhpur', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '16 min ago' },
    { name: 'Gaurav C.', location: 'Raipur', course: 'French Mastery Kit', flag: '🇫🇷', time: '20 min ago' },
    { name: 'Pallavi T.', location: 'Gwalior', course: 'English Mastery Kit', flag: '🇬🇧', time: '24 min ago' },
    { name: 'Suresh N.', location: 'Jabalpur', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '28 min ago' },
    { name: 'Rekha S.', location: 'Amritsar', course: 'French Mastery Kit', flag: '🇫🇷', time: '33 min ago' },
    { name: 'Dinesh P.', location: 'Faridabad', course: 'English Mastery Kit', flag: '🇬🇧', time: '37 min ago' },
    { name: 'Geeta M.', location: 'Ghaziabad', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '42 min ago' },
    { name: 'Rohit K.', location: 'Aurangabad', course: 'French Mastery Kit', flag: '🇫🇷', time: '46 min ago' },
    { name: 'Shilpa B.', location: 'Solapur', course: 'English Mastery Kit', flag: '🇬🇧', time: '51 min ago' },
    { name: 'Ajay V.', location: 'Tiruchirappalli', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '55 min ago' },
    { name: 'Preeti J.', location: 'Hubli', course: 'French Mastery Kit', flag: '🇫🇷', time: '1 hr 5 min ago' },
    { name: 'Vivek R.', location: 'Bareilly', course: 'English Mastery Kit', flag: '🇬🇧', time: '1 hr 12 min ago' },
    { name: 'Mamta G.', location: 'Moradabad', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '1 hr 20 min ago' },
    { name: 'Pavan T.', location: 'Mysuru', course: 'French Mastery Kit', flag: '🇫🇷', time: '1 hr 35 min ago' },
    { name: 'Shweta A.', location: 'Jalandhar', course: 'English Mastery Kit', flag: '🇬🇧', time: '1 hr 50 min ago' },
    { name: 'Ravi C.', location: 'Dhanbad', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '2 hrs 10 min ago' },
    { name: 'Meenakshi S.', location: 'Bhilai', course: 'French Mastery Kit', flag: '🇫🇷', time: '2 hrs 25 min ago' },
    { name: 'Tarun M.', location: 'Warangal', course: 'English Mastery Kit', flag: '🇬🇧', time: '2 hrs 40 min ago' },
    { name: 'Bharati P.', location: 'Salem', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '3 hrs 5 min ago' },
    { name: 'Lokesh N.', location: 'Aligarh', course: 'French Mastery Kit', flag: '🇫🇷', time: '3 hrs 30 min ago' },
    { name: 'Archana K.', location: 'Guntur', course: 'English Mastery Kit', flag: '🇬🇧', time: '3 hrs 55 min ago' },
    { name: 'Naresh T.', location: 'Bikaner', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '4 hrs 20 min ago' },
    { name: 'Sudha V.', location: 'Nellore', course: 'French Mastery Kit', flag: '🇫🇷', time: '4 hrs 45 min ago' },
    { name: 'Kiran B.', location: 'Mangaluru', course: 'English Mastery Kit', flag: '🇬🇧', time: '5 hrs 10 min ago' },
    { name: 'Ramesh D.', location: 'Tirupati', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '5 hrs 40 min ago' },
    { name: 'Yamini J.', location: 'Kolhapur', course: 'French Mastery Kit', flag: '🇫🇷', time: '6 hrs ago' },
    { name: 'Girish A.', location: 'Thrissur', course: 'English Mastery Kit', flag: '🇬🇧', time: '6 hrs 30 min ago' },
    { name: 'Vandana R.', location: 'Ajmer', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '7 hrs ago' },
    { name: 'Sameer K.', location: 'Jamshedpur', course: 'French Mastery Kit', flag: '🇫🇷', time: '7 hrs 45 min ago' },
    { name: 'Usha M.', location: 'Loni', course: 'English Mastery Kit', flag: '🇬🇧', time: '8 hrs ago' },
    { name: 'Prakash T.', location: 'Cuttack', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '9 hrs ago' },
    { name: 'Jyoti C.', location: 'Bhubaneswar', course: 'French Mastery Kit', flag: '🇫🇷', time: '10 hrs ago' },
    { name: 'Manoj S.', location: 'Dehradun', course: 'English Mastery Kit', flag: '🇬🇧', time: '11 hrs ago' },
    { name: 'Hemalatha P.', location: 'Erode', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '12 hrs ago' },
    { name: 'Ashok N.', location: 'Shimla', course: 'French Mastery Kit', flag: '🇫🇷', time: '13 hrs ago' },
    { name: 'Bharath K.', location: 'Pondicherry', course: 'English Mastery Kit', flag: '🇬🇧', time: 'yesterday' },
    { name: 'Suman V.', location: 'Shillong', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: 'yesterday' },
    { name: 'Chandra B.', location: 'Guwahati', course: 'French Mastery Kit', flag: '🇫🇷', time: 'yesterday' },
    { name: 'Revathi D.', location: 'Imphal', course: 'English Mastery Kit', flag: '🇬🇧', time: 'yesterday' },
    { name: 'Abhijit M.', location: 'Itanagar', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '2 days ago' },
    { name: 'Padma T.', location: 'Gangtok', course: 'French Mastery Kit', flag: '🇫🇷', time: '2 days ago' },
    { name: 'Sunil A.', location: 'Kohima', course: 'English Mastery Kit', flag: '🇬🇧', time: '2 days ago' },
    { name: 'Lalitha R.', location: 'Aizawl', course: 'German A1+A2 Bundle', flag: '🇩🇪', time: '3 days ago' },
    { name: 'Vijay S.', location: 'Panaji', course: 'French Mastery Kit', flag: '🇫🇷', time: '3 days ago' },
];

const DISPLAY_DURATION = 5000;  // ms toast is fully visible
const CYCLE_INTERVAL = 8000;  // ms between toasts
const INITIAL_DELAY = 5000;  // ms before first toast

export default function SocialProofToast() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    const showNext = useCallback((nextIndex) => {
        setIndex(nextIndex);
        setVisible(true);
        const hideTimer = setTimeout(() => setVisible(false), DISPLAY_DURATION);
        const shiftTimer = setTimeout(() => { }, DISPLAY_DURATION + 600);
        return () => { clearTimeout(hideTimer); clearTimeout(shiftTimer); };
    }, []);

    useEffect(() => {
        let currentIndex = 0;

        const initTimer = setTimeout(() => {
            showNext(currentIndex);

            const interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % PURCHASES.length;
                setVisible(false);
                setTimeout(() => showNext(currentIndex), 600);
            }, CYCLE_INTERVAL);

            return () => clearInterval(interval);
        }, INITIAL_DELAY);

        return () => clearTimeout(initTimer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const p = PURCHASES[index];

    return (
        <>
            <style>{`
        .sp-toast {
          position: fixed;
          bottom: 28px;
          left: 22px;
          z-index: 9999;
          max-width: 360px;
          width: calc(100vw - 44px);
          background: #ffffff;
          border-radius: 16px;
          box-shadow:
            0 12px 40px rgba(0,0,0,0.13),
            0 3px 10px rgba(0,0,0,0.07),
            0 0 0 1px rgba(23,195,178,0.12);
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 18px;
          border-left: 5px solid #17C3B2;
          transform: translateX(calc(-100% - 36px));
          opacity: 0;
          transition:
            transform 0.50s cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity   0.35s ease;
          pointer-events: none;
          user-select: none;
        }
        .sp-toast.sp-visible {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Flag circle */
        .sp-flag-wrap {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8F7F5 0%, #d0f0ec 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 24px;
          box-shadow: 0 2px 8px rgba(23,195,178,0.18);
        }

        .sp-body {
          flex: 1;
          min-width: 0;
        }
        .sp-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #17C3B2;
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        .sp-name {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }
        .sp-course {
          font-size: 13px;
          color: #444;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sp-course strong {
          color: #1a1a2e;
          font-weight: 600;
        }
        .sp-time {
          font-size: 11px;
          color: #999;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .sp-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .sp-dot {
          width: 9px;
          height: 9px;
          background: #22c55e;
          border-radius: 50%;
          animation: sp-pulse 1.6s ease-in-out infinite;
        }
        .sp-badge {
          font-size: 10px;
          background: #fef3c7;
          color: #92400e;
          border-radius: 20px;
          padding: 2px 7px;
          font-weight: 700;
          white-space: nowrap;
        }

        @keyframes sp-pulse {
          0%, 100% { transform: scale(1);   opacity: 1;   box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { transform: scale(1.4); opacity: 0.7; box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        @media (max-width: 480px) {
          .sp-toast {
            bottom: 18px;
            left: 12px;
            width: calc(100vw - 24px);
            padding: 13px 14px;
            gap: 12px;
          }
          .sp-flag-wrap { width: 40px; height: 40px; font-size: 20px; }
          .sp-name      { font-size: 13px; }
          .sp-course    { font-size: 12px; }
        }
      `}</style>

            <div
                className={`sp-toast${visible ? ' sp-visible' : ''}`}
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                <div className="sp-flag-wrap" aria-hidden="true">{p.flag}</div>

                <div className="sp-body">
                    <div className="sp-label">Recent Purchase</div>
                    <div className="sp-name">{p.name} · {p.location}</div>
                    <div className="sp-course">just enrolled in <strong>{p.course}</strong></div>
                    <div className="sp-time">🕐 {p.time}</div>
                </div>

                <div className="sp-right">
                    <span className="sp-dot" aria-hidden="true" />
                    <span className="sp-badge">✓ Verified</span>
                </div>
            </div>
        </>
    );
}
