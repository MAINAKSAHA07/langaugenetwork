import React, { useRef, useState } from 'react';
import Button from '../../components/common/Button';
import StatisticsBar from '../../components/sections/StatisticsBar';
import pb from '../../api/pocketbase';

const TeachPage = () => {
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    contactNo: '',
    email: '',
    preferredLanguage: '',
    qualification: '',
    teachingExperience: '',
    aboutYourself: '',
    howDidYouHear: '',
    cv: null
  });
  
  const [cvFileName, setCvFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or DOC file only');
      e.target.value = '';
      return;
    }

    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      e.target.value = '';
      return;
    }

    setError('');
    setFormData(prev => ({
      ...prev,
      cv: file
    }));
    setCvFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.contactNo) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (!formData.cv) {
        setError('Please attach your CV');
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('contactNo', formData.contactNo);
      data.append('email', formData.email);
      data.append('preferredLanguage', formData.preferredLanguage);
      data.append('qualification', formData.qualification);
      data.append('teachingExperience', formData.teachingExperience);
      data.append('aboutYourself', formData.aboutYourself);
      data.append('howDidYouHear', formData.howDidYouHear);
      data.append('cv', formData.cv);

      // Submit to PocketBase
      await pb.collection('teacher_applications').create(data);

      // Success
      setSuccess(true);
      setFormData({
        fullName: '',
        contactNo: '',
        email: '',
        preferredLanguage: '',
        qualification: '',
        teachingExperience: '',
        aboutYourself: '',
        howDidYouHear: '',
        cv: null
      });
      setCvFileName('');
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
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
              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-center font-medium">
                    ✓ Application submitted successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-center">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                  />
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    placeholder="Contact No. *"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID *"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                <input
                  type="text"
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  placeholder="Preferred Language to teach"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="Qualification"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                <input
                  type="text"
                  name="teachingExperience"
                  value={formData.teachingExperience}
                  onChange={handleInputChange}
                  placeholder="Teaching Experience (In Years)"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700"
                />

                {/* File Upload for CV */}
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 cursor-pointer flex items-center justify-between group hover:border-teal-500 transition-colors"
                  >
                    <span className={cvFileName ? 'text-gray-700' : 'text-gray-500'}>
                      {cvFileName || 'Attach CV * (PDF/DOC, max 10MB)'}
                    </span>
                    <svg className="w-5 h-5 text-teal-600 group-hover:text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </label>
                  {cvFileName && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, cv: null }));
                        setCvFileName('');
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <textarea
                  rows="4"
                  name="aboutYourself"
                  value={formData.aboutYourself}
                  onChange={handleInputChange}
                  placeholder="Tell us something about yourself"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700 resize-none"
                ></textarea>

                <div className="relative">
                  <select
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-gray-700 appearance-none"
                  >
                    <option value="">How did you hear about us</option>
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
                    type="submit"
                    disabled={loading}
                    className="text-white text-lg font-medium px-12 py-3 rounded-md transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ backgroundColor: '#1F9F90' }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Submit'}
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
