import React, { useState } from 'react';
import PaymentMethodsSection from '../components/sections/PaymentMethodsSection';
import { submitContactForm } from '../api/forms';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    language: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitContactForm(formData);

    if (result.success) {
      setSuccess(true);
      setFormData({ fullName: '', email: '', mobile: '', language: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert('Submission failed: ' + result.error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Main Content Area with Background */}
      <div className="relative flex-grow flex flex-col justify-center py-20 lg:py-24">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/contact.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-16 tracking-tight drop-shadow-lg">
            Get In Touch!
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">

            {/* Left Column - Contact Info */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-[#1a1a2e] mb-10">Connect with us</h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-5 group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#E8F7F5] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-[#17C3B2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.62l1.97-1.57c.23-.29.35-.63.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.28 3 3.25 3 4.25c0 9.83 8.16 18 18 18 .99 0 1.03-.65 1.03-1.19v-3.69c0-.55-.45-.99-.99-.99z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Contact No.</div>
                    <a href="tel:8369123184" className="text-lg font-bold text-[#333] hover:text-[#17C3B2] transition-colors">
                      8369123184
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#E8F7F5] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-[#17C3B2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Mail</div>
                    <a href="mailto:info@thelanguagenetwork.com" className="text-lg font-bold text-[#333] hover:text-[#17C3B2] transition-colors break-all">
                      info@thelanguagenetwork.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-5 group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#E8F7F5] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-[#17C3B2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Business Hours</div>
                    <div className="text-lg font-bold text-[#333]">10:00 am to 7:00 pm</div>
                  </div>
                </div>

                {/* Support Days */}
                <div className="flex items-start gap-5 group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#E8F7F5] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-[#17C3B2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Support Days</div>
                    <div className="text-lg font-bold text-[#333]">Monday to Saturday</div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-5 group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#E8F7F5] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-[#17C3B2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Opening Hours</div>
                    <div className="text-lg font-bold text-[#333]">10:00 am to 7:00 pm</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setActiveField('fullName')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Full Name"
                    className={`w-full px-5 py-4 border rounded-lg text-base outline-none transition-all placeholder:text-gray-400
                      ${activeField === 'fullName' ? 'border-[#17C3B2] ring-4 ring-[#17C3B2]/10' : 'border-[#ddd]'}
                    `}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Email ID"
                    className={`w-full px-5 py-4 border rounded-lg text-base outline-none transition-all placeholder:text-gray-400
                      ${activeField === 'email' ? 'border-[#17C3B2] ring-4 ring-[#17C3B2]/10' : 'border-[#ddd]'}
                    `}
                  />
                </div>

                {/* Mobile */}
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    onFocus={() => setActiveField('mobile')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Mobile Number"
                    className={`w-full px-5 py-4 border rounded-lg text-base outline-none transition-all placeholder:text-gray-400
                      ${activeField === 'mobile' ? 'border-[#17C3B2] ring-4 ring-[#17C3B2]/10' : 'border-[#ddd]'}
                    `}
                  />
                </div>

                {/* Language Dropdown */}
                <div className="relative">
                  <select
                    name="language"
                    required
                    value={formData.language}
                    onChange={handleChange}
                    onFocus={() => setActiveField('language')}
                    onBlur={() => setActiveField(null)}
                    className={`w-full px-5 py-4 border rounded-lg text-base outline-none transition-all appearance-none cursor-pointer bg-transparent
                      ${activeField === 'language' ? 'border-[#17C3B2] ring-4 ring-[#17C3B2]/10' : 'border-[#ddd]'}
                      ${formData.language ? 'text-gray-900' : 'text-gray-400'}
                    `}
                  >
                    <option value="" disabled>Preferred Language To Learn With Us</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="English">English</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Mandarin">Mandarin</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className={`w-5 h-5 text-[#17C3B2] transition-transform ${activeField === 'language' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Message"
                    className={`w-full px-5 py-4 border rounded-lg text-base outline-none transition-all placeholder:text-gray-400 resize-y min-h-[140px]
                      ${activeField === 'message' ? 'border-[#17C3B2] ring-4 ring-[#17C3B2]/10' : 'border-[#ddd]'}
                    `}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-2 w-full sm:w-auto px-10 py-4 rounded-lg border-2 font-bold text-base transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none select-none
                    ${success
                      ? 'bg-[#2ECC71] border-[#2ECC71] text-white'
                      : 'border-[#17C3B2] text-[#17C3B2] hover:bg-[#17C3B2] hover:text-white'
                    }
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : success ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Sent Successfully!
                    </span>
                  ) : 'Send enquiry'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section - Outside the BG to avoid weird overlay issues, acts as a solid strip at bottom */}
      <PaymentMethodsSection />
    </div>
  );
};

export default ContactPage;
