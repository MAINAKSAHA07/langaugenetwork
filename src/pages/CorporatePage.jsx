import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import NewsSection from '../components/sections/NewsSection';
import InternationalExamsSection from '../components/sections/InternationalExamsSection';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

// --- Reused/Local Components ---

const ChoiceCard = ({ image, title, description }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
        <div className="h-48 flex items-center justify-center p-6 bg-white">
            <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="bg-[#1F9F90] py-3 px-4">
            <h3 className="text-white text-center font-semibold text-lg">{title}</h3>
        </div>
        <div className="p-6 flex-grow bg-white">
            <p className="text-gray-600 text-sm leading-relaxed text-center">{description}</p>
        </div>
    </div>
);

const PlanCard = ({ title, description, features, duration }) => (
    <div className="border border-[#1F9F90] rounded-xl overflow-hidden flex flex-col h-full bg-white">
        <div className="bg-[#1F9F90] text-white text-center py-4">
            <h3 className="text-xl font-bold">{title}</h3>
            {duration && (
                <div className="mt-2 text-sm font-medium opacity-90">{duration}</div>
            )}
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <div className="border border-[#1F9F90] rounded-lg p-3 mb-6 text-center">
                <span className="text-[#1F9F90] font-bold">{duration}</span>
            </div>
            <p className="text-gray-700 text-sm font-medium mb-6 text-center leading-relaxed">
                {description}
            </p>
            <ul className="space-y-4 mb-8 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 min-w-[16px] w-4 h-4 rounded-full bg-[#1F9F90] flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-gray-600 text-xs sm:text-sm leading-snug">{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="text-center mt-auto">
                <Button variant="outline" className="border-[#1F9F90] text-[#1F9F90] hover:bg-[#1F9F90] hover:text-white transition-colors px-6">
                    Learn more
                </Button>
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

const FactCheckCard = ({ icon, text }) => (
    <div className="bg-white border-2 border-[#1F9F90] rounded-xl p-6 flex flex-col items-center text-center h-[250px] justify-center mx-4">
        <div className="mb-4">
            <img src={icon} alt="Fact Check" className="w-16 h-16 object-contain" />
        </div>
        <p className="text-gray-800 font-medium text-sm leading-relaxed">
            {text}
        </p>
    </div>
);

const StepCard = ({ stepNumber, description, illustration }) => (
    <div className="flex flex-col items-center">
        <div className="mb-6 flex items-center justify-center w-full min-h-[150px]">
            <img src={illustration} alt={`Step ${stepNumber}`} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col h-full">
            <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                STEP {stepNumber}
            </div>
            <div className="p-6 flex flex-col items-center flex-grow text-center justify-center min-h-[120px]">
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);

const CorporatePage = () => {
    // --- States ---
    const [currentStep, setCurrentStep] = useState(0); // How It Works
    const [currentFactIndex, setCurrentFactIndex] = useState(0); // Fact Check
    const [currentAlumniIndex, setCurrentAlumniIndex] = useState(0); // Alumni Carousel
    const [openFAQ, setOpenFAQ] = useState(0);

    // --- Data ---
    const howItWorksSteps = [
        { id: 1, description: "Connect with us to share your needs and preferences", image: "/images/hero/Rectangle 477.png" },
        { id: 2, description: "Get a tailored proposal crafted just for you.", image: "/images/hero/Rectangle 478.png" },
        { id: 3, description: "Seal the deal!", image: "/images/hero/Rectangle 479.png" }
    ];

    const facts = [
        { id: 1, text: "Multilingual individuals have a competitive edge in the job market", icon: "/images/coporate/bar-chart 1.png" },
        { id: 2, text: "Demand for bilingual workers more than doubled in the US between 2010 and 2015", icon: "/images/coporate/bar-graph 1.png" },
        { id: 3, text: "89% believe multilingual workers add value to companies.", icon: "/images/coporate/pie-chart (1) 1.png" },
        { id: 4, text: "89% Language learners report improved self-confidence.", icon: "/images/coporate/pie-chart (2) 1.png" },
        { id: 5, text: "Bilingual employees earn 5-20% more on average than monolinguals.", icon: "/images/coporate/graphic-chart 1.png" },
        { id: 6, text: "Bilinguals outperform monolinguals by 12.5% in easy math tasks.", icon: "/images/coporate/bar-chart 1.png" }
    ];

    const alumniCompanies = [
        { id: 1, name: 'Amazon', image: '/images/alumni/amazon 1.png' },
        { id: 2, name: 'Deloitte', image: '/images/alumni/deloitte 1.png' },
        { id: 3, name: 'Siemens', image: '/images/alumni/siemens 1.png' },
        { id: 4, name: 'M Moser Associates', image: '/images/alumni/M-Moser-Associates 1.png' },
        { id: 5, name: 'SIES', image: '/images/alumni/sies_logo 1.png' }
    ];

    const faqs = [
        { question: "What is corporate language training?", answer: "Corporate language training is a targeted educational initiative implemented by companies to enhance the language skills of their employees in a professional context. The goal is to equip employees with the linguistic abilities necessary to excel in their roles, foster clearer internal and external communication, and contribute to the overall success of the business." },
        { question: "Why is corporate language training important?", answer: "It enhances communication, boosts employee confidence, facilitates global expansion, and fosters a more inclusive workplace culture." },
        { question: "How are corporate language training programs structured?", answer: "Programs are tailored to the organization's needs, offering flexible delivery formats including online, in-person, or hybrid classes, with customized curriculum." },
        { question: "What are the delivery options for corporate language training?", answer: "We offer virtual instructor-led training, on-site classes, and self-paced e-learning modules to suit diverse schedules and learning preferences." },
        { question: "Why corporate training with The Language Network?", answer: "We provide expert trainers, customized content, progress tracking, and measurable results to ensure your team achieves their language learning goals effectively." }
    ];

    // --- Handlers ---
    const getVisibleFacts = () => {
        const visibleInfo = [];
        const count = 3;
        for (let i = 0; i < count; i++) {
            visibleInfo.push(facts[(currentFactIndex + i) % facts.length]);
        }
        return visibleInfo;
    };

    const nextFact = () => setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    const prevFact = () => setCurrentFactIndex((prev) => (prev - 1 + facts.length) % facts.length);

    const nextAlumni = () => setCurrentAlumniIndex((prev) => (prev + 1) % alumniCompanies.length);
    const prevAlumni = () => setCurrentAlumniIndex((prev) => (prev === 0 ? alumniCompanies.length - 1 : prev - 1));

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Hero Section */}
            <section className="py-12 lg:py-20 bg-white">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h1 className="text-5xl lg:text-[64px] font-bold text-black leading-tight mb-6">
                                Foreign Languages <br /> For Professionals
                            </h1>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl">
                                Elevate your college's profile with language learning programs tailored to today's global demands. By integrating languages into your curriculum, you equip students with vital skills for success in the international arena. Our courses not only enhance linguistic abilities but also promote cultural awareness and open doors to study abroad opportunities. Join us in shaping a multilingual learning environment that prepares students to thrive in a connected world.
                            </p>
                            <Button size="large" className="text-white px-8 py-3 text-lg font-medium rounded-md shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: '#1F9F90' }}>
                                Book a meeting
                            </Button>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                            <img src="/images/coporate/Corporate Training jpg 1.png" alt="Corporate Training" className="w-full max-w-lg h-auto object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Alumni Logos Section (Standard) */}
            <section className="bg-white py-10">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary-navy text-center mb-8 lg:mb-10 leading-tight">
                        Our Alumni Network
                    </h2>
                    {/* Mobile View */}
                    <div className="md:hidden">
                        <div className="flex items-center justify-center h-20">
                            <img src={alumniCompanies[currentAlumniIndex].image} alt={alumniCompanies[currentAlumniIndex].name} className="h-8 w-auto object-contain" />
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button onClick={prevAlumni} className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all hover:shadow-lg" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={nextAlumni} className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all hover:shadow-lg" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                    {/* Desktop View */}
                    <div className="hidden md:flex flex-wrap items-center justify-center gap-6 lg:gap-10 xl:gap-12">
                        {alumniCompanies.map((company) => (
                            <div key={company.id} className="flex items-center justify-center">
                                <img src={company.image} alt={company.name} className="h-6 lg:h-7 xl:h-8 w-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <NewsSection />

            {/* International Proficiency Exams */}
            <InternationalExamsSection />

            {/* Educational Partners (Separated) */}
            <section className="bg-white py-12">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary-navy text-center mb-8 lg:mb-10 leading-tight">
                        Our Educational Partners
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <img src="/images/alumni/edupatner.png" alt="Educational Partners" className="w-full h-auto object-contain" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">
                        Why Choose Us ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        <ChoiceCard image="/images/College/tailored.png" title="Tailored Curriculum" description="Our language programs are customized to meet the specific needs and goals of working professionals, ensuring relevance and effectiveness in language acquisition." />
                        <ChoiceCard image="/images/College/experienced.png" title="Experienced Educators" description="Our team of skilled language educators delivers engaging lessons tailored to corporate-level learners, catering to diverse learning styles and abilities." />
                        <ChoiceCard image="/images/College/flexible.png" title="Flexible Deliveries" description="We offer flexible options, including offline and online classes, to accommodate working professionals' scheduling preferences and logistical constraints seamlessly." />
                        <ChoiceCard image="/images/College/support.png" title="Comprehensive Support" description="From curriculum development to ongoing assistance, we provide you and your company with comprehensive support to integrate language learning into your corporate framework effortlessly." />
                        <ChoiceCard image="/images/College/global.png" title="Enhanced Global Competency" description="Our programs equip working professionals with the linguistic skills and cultural competence needed to thrive in an interconnected world, preparing them to become global citizens and master communicators." />
                        <ChoiceCard image="/images/College/cost.png" title="Cost Effective" description="Our programs offer top-quality education at affordable rates, maximizing company resources for professional learning." />
                    </div>
                </div>
            </section>

            {/* Fact Check Section (Carousel) */}
            <section className="bg-white py-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">
                        Fact Check!
                    </h2>

                    <div className="relative px-12">
                        {/* Nav Buttons */}
                        <button onClick={prevFact} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 z-10">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={nextFact} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 z-10">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Desktop View (3 items) */}
                        <div className="hidden md:grid grid-cols-3 gap-6">
                            {getVisibleFacts().map((fact, idx) => (
                                <FactCheckCard key={idx} icon={fact.icon} text={fact.text} />
                            ))}
                        </div>

                        {/* Mobile View (1 item) */}
                        <div className="md:hidden">
                            <FactCheckCard icon={facts[currentFactIndex].icon} text={facts[currentFactIndex].text} />
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white py-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-20">
                        How It Works?
                    </h2>
                    {/* Mobile View */}
                    <div className="md:hidden">
                        <div className="flex flex-col items-center max-w-sm mx-auto">
                            <div className="mb-6 flex items-center justify-center w-full min-h-[150px]">
                                <img src={howItWorksSteps[currentStep].image} alt={`Step ${howItWorksSteps[currentStep].id}`} className="max-h-full max-w-full object-contain" />
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full flex flex-col">
                                <div className="bg-[#1F9F90] text-white text-center py-4 font-bold text-lg uppercase">
                                    STEP {howItWorksSteps[currentStep].id}
                                </div>
                                <div className="p-6 flex flex-col items-center flex-grow text-center justify-center min-h-[120px]">
                                    <p className="text-gray-600 text-lg leading-relaxed">{howItWorksSteps[currentStep].description}</p>
                                </div>
                            </div>
                        </div>
                        {/* Nav Buttons */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button onClick={() => setCurrentStep((prev) => (prev === 0 ? howItWorksSteps.length - 1 : prev - 1))} className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all hover:shadow-lg" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={() => setCurrentStep((prev) => (prev + 1) % howItWorksSteps.length)} className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all hover:shadow-lg" style={{ borderColor: '#1F9F90', color: '#1F9F90' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:grid grid-cols-3 gap-8">
                        {howItWorksSteps.map((step) => (
                            <StepCard key={step.id} stepNumber={step.id} description={step.description} illustration={step.image} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 3 Plans */}
            <section className="bg-white py-20 mb-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-20">3 Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PlanCard
                            title="Preparatory"
                            duration="Duration - 50 Classes"
                            description="Build a strong foundation with our A1 level course aimed to make you proficient at the basics of the language"
                            features={["Develop basic reading skills to comprehend simple texts and messages.", "Learn to write basic sentences and short paragraphs to express simple ideas.", "Introduce oneself, ask simple questions and talk about hobbies and preferences.", "Enhance listening skills to understand common phrases and simple conversations.", "Gain awareness of basic cultural norms and customs relevant to social interactions.", "Develop basic comprehension skills to understand straightforward spoken and written language.", "Access free study material worth ₹2,000/-"]}
                        />
                        <PlanCard
                            title="Prime"
                            duration="Duration - 100 Classes"
                            description="Advance your language proficiency with our A1-A2 level course and excel in corporate communication."
                            features={["Expand reading proficiency to comprehend a wider range of texts and messages.", "Develop writing skills to compose more complex sentences and short compositions.", "Can discuss various topics, express opinions and handle routine tasks confidently.", "Strengthen listening skills to understand more complex conversations and instructions.", "Increase awareness of cultural nuances for effective communication in various contexts.", "Enhance comprehension skills to understand detailed information in spoken and written formats.", "Access free study material worth ₹5,000/-"]}
                        />
                        <PlanCard
                            title="Proficient"
                            duration="Duration - 260 Classes"
                            description="Conquer your communication skills with our A1-B2 level course for superior proficiency in diverse corporate contexts."
                            features={["Master reading comprehension skills to understand complex tests and academic materials.", "Acquire advance writing skills to produce reports, essays and formal documents with clarity and coherence.", "Achieve fluency and confidence in expressing opinions, negotiating and delivering presentations.", "Attain proficiency in understanding native speakers and complex discussions in various contexts.", "Develop cultural competence to navigate diverse cultural settings and understand nuances in communication.", "Demonstrate high-level comprehension skills to grasp intricate details and abstract concepts in both spoken and written language.", "Access free study material worth ₹10,000/-"]}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialsSection />

            {/* FAQs */}
            <section className="bg-gray-50 py-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">FAQs</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openFAQ === index} toggleOpen={() => setOpenFAQ(openFAQ === index ? -1 : index)} />
                            ))}
                            <div className="mt-8">
                                <Button variant="outline" className="border-[#1F9F90] text-[#1F9F90] hover:bg-[#1F9F90] hover:text-white transition-colors">Read all FAQs</Button>
                            </div>
                        </div>
                        <div className="hidden lg:block items-center justify-center">
                            <img src="/images/kids/kidsfaq.png" alt="FAQ Illustration" className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg mx-auto" onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Start Your Journey form */}
            <section className="bg-white py-20">
                <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-16">Start Your Journey</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <img src="/images/College/journey.png" alt="Start Your Journey" className="w-full max-w-lg h-auto object-contain" />
                        </div>
                        <div>
                            <p className="text-gray-600 mb-8">Fill out the form below to become part of our vibrant community.</p>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Your Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                                    <input type="text" placeholder="Official Contact No." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Your Designation" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                                    <input type="email" placeholder="Official Email ID" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                                </div>
                                <input type="text" placeholder="Company's Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90]" />
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] text-gray-500">
                                    <option>Language You're Looking to Introduce</option>
                                    <option>French</option><option>German</option><option>Spanish</option>
                                </select>
                                <button className="bg-[#1F9F90] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#14A89A] transition-colors">Send enquiry</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Banner */}
            <div className="bg-[#1F9F90] py-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white">Elevating education, effortlessly!</h2>
            </div>

            <PaymentMethodsSection />
        </div>
    );
};

export default CorporatePage;
