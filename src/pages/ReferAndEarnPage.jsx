import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';

// Sub-components for Cleaner Code

const StepCard = ({ stepNumber, description, illustration }) => (
    <div className="flex flex-col items-center">
        {/* Illustration Area */}
        <div className="mb-6 flex items-center justify-center w-full min-h-[150px]">
            <img
                src={illustration}
                alt={`Step ${stepNumber}`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.target.src = 'https://placehold.co/200?text=Step+Image'; }}
            />
        </div>

        {/* Card Area */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col h-full">
            <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                STEP {stepNumber}
            </div>
            <div className="p-6 flex flex-col items-center flex-grow text-center justify-center min-h-[120px]">
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </div>
);

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
        <button
            onClick={toggleOpen}
            className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 focus:outline-none bg-white hover:bg-gray-50 transition-colors"
        >
            <span>{question}</span>
            <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {isOpen && (
            <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 mt-2 bg-white">
                {answer}
            </div>
        )}
    </div>
);

const ReferAndEarnPage = () => {
    const [openFAQ, setOpenFAQ] = useState(0); // Open the first FAQ by default
    const [currentStep, setCurrentStep] = useState(0);

    const howItWorksSteps = [
        {
            id: 1,
            description: "Start your language journey with The Language Network.",
            image: "/images/hero/Rectangle 477.png"
        },
        {
            id: 2,
            description: "Refer a friend by filling out our form.",
            image: "/images/hero/Rectangle 478.png"
        },
        {
            id: 3,
            description: "Your friend signs up, gets a 10% discount, and you receive ₹1,000/- cashback.",
            image: "/images/referearn/Rectangle 479.png"
        },
        {
            id: 4,
            description: "Refer more friends, earn ₹1,000 each time. It's a win-win situation for both you and your friends!",
            image: "/images/hero/Rectangle 479.png"
        }
    ];

    const faqs = [
        {
            question: "How does the referral program work?",
            answer: "The referral program works by starting your language journey with The Language Network, referring a friend to sign up, and both enjoying rewards: they get a 10% discount, and you receive ₹1,000/- cashback. Plus, keep referring for more earnings—it's a win-win for everyone!"
        },
        {
            question: "When am I eligible to refer a friend?",
            answer: "You are eligible to refer a friend once you have enrolled in a course with The Language Network. Once your enrollment is confirmed, you can start referring friends immediately."
        },
        {
            question: "How can I contact support if I have questions about the referral program?",
            answer: "You can contact our support team via email or phone. Visit our Contact Us page for more details. We are happy to assist you with any queries regarding the referral program."
        },
        {
            question: "Is there a limit to the number of friends I can refer?",
            answer: "No, there is no limit! You can refer as many friends as you like and earn rewards for each successful referral."
        },
        {
            question: "Who can I refer?",
            answer: "You can refer anyone who is not currently an existing student of The Language Network. This includes friends, family, colleagues, or anyone interested in learning a new language."
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Hero Section */}
            {/* ... (Hero remains unchanged) ... */}
            <section className="bg-white py-16 lg:py-24">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="order-2 lg:order-1">
                            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                                Refer And Earn
                            </h1>
                            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6">
                                Sharing is caring but it also helps in saving!
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                                Refer The Language Network to your buddy and get a guaranteed cashback of ₹1,000/-. That's not all! Your friend too gets a 10% discount on their enrollment with us!
                            </p>
                            <Button
                                size="large"
                                className="text-white px-10 py-3 text-lg font-medium rounded-md shadow-lg hover:shadow-xl transition-all"
                                style={{ backgroundColor: '#1F9F90' }}
                            >
                                Refer now
                            </Button>
                        </div>

                        {/* Hero Image */}
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                            <img
                                src="/images/referearn/Refer & Earn jpg 2.png"
                                alt="Refer and Earn"
                                className="w-full max-w-lg h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-center text-black mb-20">
                        How It Works?
                    </h2>

                    {/* Mobile View */}
                    <div className="md:hidden">
                        <div className="flex flex-col items-center max-w-sm mx-auto">
                            {/* Illustration */}
                            <div className="mb-6 flex items-center justify-center w-full min-h-[150px]">
                                <img
                                    src={howItWorksSteps[currentStep].image}
                                    alt={`Step ${howItWorksSteps[currentStep].id}`}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            {/* Card */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col">
                                <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                                    STEP {howItWorksSteps[currentStep].id}
                                </div>
                                <div className="p-6 flex flex-col items-center flex-grow text-center justify-center min-h-[120px]">
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {howItWorksSteps[currentStep].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={() => setCurrentStep((prev) => (prev === 0 ? howItWorksSteps.length - 1 : prev - 1))}
                                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCurrentStep((prev) => (prev + 1) % howItWorksSteps.length)}
                                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorksSteps.map((step) => (
                            <StepCard
                                key={step.id}
                                stepNumber={step.id}
                                illustration={step.image}
                                description={step.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-gray-50 py-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-center text-black mb-16">
                        FAQs
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* FAQ Accordion */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openFAQ === index}
                                    toggleOpen={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                                />
                            ))}
                            <div className="mt-8">
                                <Button variant="outline" className="border-[#1F9F90] text-[#1F9F90] hover:bg-[#1F9F90] hover:text-white transition-colors">
                                    Read all FAQs
                                </Button>
                            </div>
                        </div>

                        {/* FAQ Image */}
                        <div className="hidden lg:block">
                            <img
                                src="/images/kids/kidsfaq.png"
                                alt="FAQ Illustration"
                                className="w-full h-auto object-cover rounded-xl shadow-lg"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Start Your Journey Form Section */}
            <section className="bg-white py-20 pb-32">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-center text-black mb-16">
                        Start Your Journey
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Form Image */}
                        <div className="flex justify-center">
                            <img
                                src="/images/referearn/Frame 811.png"
                                alt="Start Your Journey"
                                className="w-full max-w-md h-auto object-contain"
                            />
                        </div>

                        {/* Form */}
                        <div>
                            <p className="text-gray-700 mb-8">
                                Fill out the form below to become part of our vibrant community.
                            </p>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-700 bg-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Your Student ID"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-700 bg-white"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Contact No."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-700 bg-white"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email ID (Optional)"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-700 bg-white"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Name (To whom you are referring to)"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-700 bg-white"
                                />

                                <div className="pt-2">
                                    <button className="bg-[#1F9F90] text-white px-10 py-3 rounded-md font-medium hover:bg-[#158578] transition-colors shadow-md">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Banner */}
            <div className="bg-[#1F9F90] py-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                    Learn and earn in a new language!
                </h2>
            </div>

            {/* Payment Methods */}
            <PaymentMethodsSection />

        </div>
    );
};

export default ReferAndEarnPage;
