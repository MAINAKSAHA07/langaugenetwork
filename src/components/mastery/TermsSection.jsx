import React, { useState } from 'react';

const TermsSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="bg-[#F8F9FA] py-[60px] px-6">
            <div className="max-w-[900px] mx-auto">
                {/* Header */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-white border border-[#ddd] rounded-[8px] p-[20px] md:p-[24px] cursor-pointer flex justify-between items-center select-none"
                >
                    <h3 className="text-[20px] font-[700] text-[#1a1a2e]">Terms & Conditions</h3>
                    <div className={`transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}>▼</div>
                </div>

                {/* Content */}
                {isOpen && (
                    <div className="bg-white border border-t-0 border-[#ddd] p-[32px] rounded-b-[8px] text-[15px] leading-[1.8] text-[#444] animate-fadeIn">
                        <p className="mb-4">Please read these Terms & Conditions carefully before purchasing the French Mastery Kit.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">1. Digital Product Disclaimer</h4>
                        <p className="mb-4">
                            This is a fully digital product. No physical books will be shipped. Access is provided through your
                            secure TLN account under the <strong>My Mastery Kits</strong> page once your payment is confirmed
                            (you will also receive a confirmation email with next steps).
                        </p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">2. No Refunds Policy</h4>
                        <p className="mb-4">Due to the immediate digital nature of this product, all sales are final. We do not offer refunds once access has been granted.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">3. Personal Use License</h4>
                        <p className="mb-4">The content is for your personal use only. Sharing, reselling, or distributing the materials (PDFs, audios, etc.) is strictly prohibited and subject to legal action.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">4. Prohibited Uses</h4>
                        <p className="mb-4">You may not use the content for commercial purposes, including teaching without a license, unless explicitly stated otherwise.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">5. Educational Purpose Disclaimer</h4>
                        <p className="mb-4">These materials are for educational purposes. We do not guarantee specific exam results (DELF/DALF) as individual effort varies.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">6. Content Update Rights</h4>
                        <p className="mb-4">The Language Network reserves the right to update or modify the content of the kit at any time to improve quality.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">7. Technical Requirements</h4>
                        <p className="mb-4">You need a device with internet access and a PDF reader/audio player to access the materials.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">8. Liability Limitations</h4>
                        <p className="mb-4">We are not liable for any technical issues arising from your device or internet connection.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">9. Agreement Confirmation</h4>
                        <p className="mb-4">By completing the purchase, you confirm that you have read and agreed to these terms.</p>

                        <h4 className="font-bold text-[#1a1a2e] mt-4 mb-2">10. Data Data Sharing Notice</h4>
                        <p className="mb-4">Your data is processed securely for order fulfillment and will not be sold to third parties.</p>

                        <p className="mt-6 text-sm text-gray-500">Last Updated: 2024</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TermsSection;
