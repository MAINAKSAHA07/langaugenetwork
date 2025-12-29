import React, { useRef } from 'react';
import Button from '../../components/common/Button';
import StatisticsBar from '../../components/sections/StatisticsBar';

const TeachPage = () => {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-4 pb-12 lg:pt-8 lg:pb-20 relative overflow-hidden">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
                Teach With Us!
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Become a Teacher with The Language Network! Share your expertise and passion while reaping the rewards of spreading knowledge. Join our team of 200+ expert trainers and make a difference from the comfort of your home. Empower others, expand your horizons, and embark on a fulfilling journey with The Language Network!
              </p>
              <Button
                onClick={scrollToForm}
                className="text-white text-lg font-medium px-8 py-3 rounded-md transition-transform hover:scale-105"
                style={{ backgroundColor: '#1F9F90' }}
              >
                Apply now
              </Button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative">
              {/* Background Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-teal-100 rounded-full blur-3xl -z-10 opacity-50"></div>
              <img
                src="/images/teach/image 76.png"
                alt="Teach with us"
                className="w-3/4 mx-auto h-auto object-contain relative z-10"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-8">
            <StatisticsBar />
          </div>
        </div>
      </section>

      {/* Why Teach With Us Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-black mb-16">
            Why You Should Teach With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-teal-50/50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow border border-teal-100/50">
              <div className="h-32 flex items-center justify-center mb-6">
                <img src="/images/teach/professional-development 1.png" alt="Professional Development" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 h-14 flex items-center justify-center">
                Professional Development Opportunities
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Engage in continuous learning and growth through workshops, seminars, and training sessions designed to enhance your teaching skills and expand your expertise in language education.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-teal-50/50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow border border-teal-100/50">
              <div className="h-32 flex items-center justify-center mb-6">
                <img src="/images/teach/flexibility 1.png" alt="Flexibility" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 h-14 flex items-center justify-center">
                Flexibility
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enjoy the freedom to set your own schedule and teaching hours for a better work-life balance. Teach online from anywhere, providing flexibility and convenience in your teaching journey.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-teal-50/50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow border border-teal-100/50">
              <div className="h-32 flex items-center justify-center mb-6">
                <img src="/images/teach/podium 1.png" alt="Competitive Compensation" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 h-14 flex items-center justify-center">
                Competitive Compensation
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive competitive compensation packages and benefits that recognize your contributions and ensure your efforts are valued and rewarded appropriately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-black mb-16">
            Apply if you have these skills
          </h2>
          <div className="flex items-center justify-center gap-8">
            <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 flex-shrink-0 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow max-w-5xl">
              {/* Skill 1 */}
              <div className="bg-[#DDF3F0] rounded-2xl p-8 text-center h-full">
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <img src="/images/teach/image 58.png" alt="Qualification" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Qualification</h3>
                <p className="text-gray-500 text-sm leading-relaxed px-4">
                  Join our team if you are<br />certified at advanced levels
                </p>
              </div>

              {/* Skill 2 */}
              <div className="bg-[#DDF3F0] rounded-2xl p-8 text-center h-full">
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <img src="/images/teach/image 61.png" alt="Presentation Skills" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Presentation Skills</h3>
                <p className="text-gray-500 text-sm leading-relaxed px-4">
                  Join our team if you are<br />certified at advanced levels
                </p>
              </div>

              {/* Skill 3 */}
              <div className="bg-[#DDF3F0] rounded-2xl p-8 text-center h-full">
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <img src="/images/teach/image 63.png" alt="Teaching Skills" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Teaching Skills</h3>
                <p className="text-gray-500 text-sm leading-relaxed px-4">
                  Join our team if you are<br />certified at advanced levels
                </p>
              </div>
            </div>

            <button className="w-12 h-12 rounded-full border border-[#17C3B2] flex items-center justify-center text-[#17C3B2] hover:bg-[#E0F2F1] flex-shrink-0 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-black mb-16">
            How It Works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="rounded-xl border border-[#1F9F90] overflow-hidden flex flex-col h-full">
              <div className="p-8 pb-4 flex justify-center items-center bg-white">
                <img src="/images/teach/24-hour 1.png" alt="Teach anytime" className="w-20 h-20 object-contain" />
              </div>
              <div className="bg-[#1F9F90] py-3 px-4 text-center">
                <h3 className="text-white font-bold text-lg">Teach anytime, anywhere</h3>
              </div>
              <div className="p-6 text-center bg-white flex-grow">
                <p className="text-gray-600 text-sm">
                  Empower your teaching journey by delivering lessons remotely from any location.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-[#1F9F90] overflow-hidden flex flex-col h-full">
              <div className="p-8 pb-4 flex justify-center items-center bg-white">
                <img src="/images/teach/directions 1.png" alt="Choose batch" className="w-20 h-20 object-contain" />
              </div>
              <div className="bg-[#1F9F90] py-3 px-4 text-center">
                <h3 className="text-white font-bold text-lg leading-tight">Choose a batch according to your flexibility</h3>
              </div>
              <div className="p-6 text-center bg-white flex-grow">
                <p className="text-gray-600 text-sm">
                  Select from flexible scheduling options tailored to your availability and commitments.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-[#1F9F90] overflow-hidden flex flex-col h-full">
              <div className="p-8 pb-4 flex justify-center items-center bg-white">
                <img src="/images/teach/professional (1) 1.png" alt="Elevate expertise" className="w-20 h-20 object-contain" />
              </div>
              <div className="bg-[#1F9F90] py-3 px-4 text-center">
                <h3 className="text-white font-bold text-lg">Elevate your teaching expertise</h3>
              </div>
              <div className="p-6 text-center bg-white flex-grow">
                <p className="text-gray-600 text-sm">
                  Expand your skills, knowledge,career prospects as you become part of our dynamic team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start Your Journey Form Section */}
      <section ref={formRef} className="py-16 bg-white mb-12">
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-black mb-6">
            Start Your Journey
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Fill out the form below to become part of our vibrant community.
          </p>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left Illustration */}
            <div className="w-full lg:w-5/12">
              <img
                src="/images/teach/Group 40262.png"
                alt="Start your journey"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-7/12">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                  />
                  <input
                    type="tel"
                    placeholder="Contact No."
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email ID"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                <input
                  type="text"
                  placeholder="Prefered Language to teach"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                <input
                  type="text"
                  placeholder="Qualification"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                <input
                  type="text"
                  placeholder="Teaching Experience (In Years)"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    placeholder="Attach CV"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-teal-600 cursor-pointer"
                  />
                  {/* Using text input as placeholder for file input styling from design */}
                </div>

                <textarea
                  rows="4"
                  placeholder="Tell us something about yourself"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700 resize-none"
                ></textarea>

                <div className="relative">
                  <select className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-500 appearance-none">
                    <option value="" disabled selected>How did you hear about us</option>
                    <option value="website">Website</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">Linkedin</option>
                    <option value="facebook">Facebook</option>
                    <option value="medium">Medium</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other (Please Specify)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    className="text-white text-lg font-medium px-12 py-3 rounded-md transition-transform hover:scale-105"
                    style={{ backgroundColor: '#1F9F90' }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeachPage;
