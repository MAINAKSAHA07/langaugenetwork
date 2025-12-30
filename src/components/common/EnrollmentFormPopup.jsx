import React from 'react';

const EnrollmentFormPopup = ({ isOpen, onClose, formData, handleChange, handleSubmit, loading, institutionType = 'school' }) => {
    if (!isOpen) return null;

    const institutionLabel = institutionType === 'school' ? 'School' : 'College';
    const institutionNameField = institutionType === 'school' ? 'schoolName' : 'collegeName';
    const institutionAddressField = institutionType === 'school' ? 'schoolAddress' : 'collegeAddress';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-[#1F9F90] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-bold">Start Your Journey</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    <p className="text-gray-600 mb-6">Fill out the form below to become part of our vibrant community.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Your Full Name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20"
                                required
                            />
                            <input
                                type="text"
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                placeholder="Official Contact No."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Your Designation"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Official Email ID"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20"
                                required
                            />
                        </div>

                        <input
                            type="text"
                            name={institutionNameField}
                            value={formData[institutionNameField]}
                            onChange={handleChange}
                            placeholder={`${institutionLabel}'s Name`}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20"
                            required
                        />

                        <input
                            type="text"
                            name={institutionAddressField}
                            value={formData[institutionAddressField]}
                            onChange={handleChange}
                            placeholder={`${institutionLabel}'s Address`}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20"
                            required
                        />

                        <select
                            name="languageInterest"
                            value={formData.languageInterest}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20 text-gray-500"
                            required
                        >
                            <option value="">Language You're Looking to Introduce</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Spanish">Spanish</option>
                            <option value="English">English</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Korean">Korean</option>
                            <option value="Mandarin">Mandarin</option>
                        </select>

                        <select
                            name="hearAboutUs"
                            value={formData.hearAboutUs}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F9F90] focus:ring-2 focus:ring-[#1F9F90]/20 text-gray-500"
                        >
                            <option value="">How Did You Hear About Us?</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Referral">Referral</option>
                            <option value="Search Engine">Search Engine</option>
                            <option value="Other">Other</option>
                        </select>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-[#1F9F90] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#14A89A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send enquiry'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentFormPopup;
