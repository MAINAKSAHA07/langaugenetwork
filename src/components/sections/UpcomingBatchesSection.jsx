import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import pb from '../../api/pocketbase';
import BatchEnrollmentModal from '../common/BatchEnrollmentModal';

const UpcomingBatchesSection = ({ language, ageGroup, title }) => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [highlightedBatchId, setHighlightedBatchId] = useState(null);
  const sectionRef = useRef(null);
  const batchRefs = useRef({});
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Default title if not provided
  const sectionTitle = title || 'Upcoming Batches';

  const handleEnrollClick = (batch) => {
    setSelectedBatch(batch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBatch(null);
  };

  // Handle share link generation and copying
  const handleShareBatch = async (batch) => {
    try {
      // Generate the share link
      const baseUrl = window.location.origin;
      let shareUrl;
      
      if (language) {
        // For language-specific pages
        const langPath = language.toLowerCase();
        shareUrl = `${baseUrl}/${langPath}?batchId=${batch.id}`;
      } else {
        // For homepage
        shareUrl = `${baseUrl}/?batchId=${batch.id}`;
      }
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      
      // Show toast notification
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      setToastMessage('Failed to copy link');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  // Fetch batches from PocketBase
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        
        // Build filter query
        let filterParts = ['status = "upcoming"'];
        
        if (language) {
          filterParts.push(`language = "${language}"`);
        }
        
        const filterQuery = filterParts.join(' && ');
        
        // Fetch batches, sorted by start date
        const records = await pb.collection('batches').getList(1, 50, {
          filter: filterQuery,
          sort: 'startDate',
        });

        // Filter by ageGroup client-side for backward compatibility
        // If ageGroup is "adults", include batches without ageGroup (for backward compatibility)
        // If ageGroup is "kids", only show kids batches
        let filteredBatches = records.items;
        if (ageGroup) {
          if (ageGroup === 'adults') {
            // Show adults batches OR batches without ageGroup (backward compatibility)
            filteredBatches = records.items.filter(batch => 
              !batch.ageGroup || batch.ageGroup === 'adults' || batch.ageGroup === ''
            );
          } else if (ageGroup === 'kids') {
            // Only show kids batches
            filteredBatches = records.items.filter(batch => batch.ageGroup === 'kids');
          }
        }

        setBatches(filteredBatches);
        setError(null);
      } catch (err) {
        console.error('Error fetching batches:', err);
        setError('Failed to load batches');
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [language, ageGroup]);

  // Handle batchId query parameter to scroll to and highlight specific batch
  useEffect(() => {
    const batchId = searchParams.get('batchId');
    
    if (batchId && batches.length > 0) {
      // Find the batch index
      const batchIndex = batches.findIndex(b => b.id === batchId);
      
      if (batchIndex !== -1) {
        // Set highlighted batch
        setHighlightedBatchId(batchId);
        
        // Scroll to the section
        setTimeout(() => {
          if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 500);
        
        // Set current index to show the batch in view
        if (batches.length > 3) {
          // For desktop, calculate which set of 3 batches contains this one
          const setIndex = Math.floor(batchIndex / 3) * 3;
          setCurrentIndex(setIndex % batches.length);
        } else {
          setCurrentIndex(batchIndex);
        }
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
          setHighlightedBatchId(null);
          // Clean up URL without reloading
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete('batchId');
          const newUrl = `${location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
          window.history.replaceState({}, '', newUrl);
        }, 3000);
      }
    }
  }, [searchParams, batches, location.pathname]);

  // Language flag colors mapping
  const getFlagColors = (language) => {
    const flagColors = {
      'French': ['#002395', '#FFFFFF', '#ED2939'],
      'German': ['#000000', '#DD0000', '#FFCE00'],
      'Spanish': ['#AA151B', '#F1BF00', '#AA151B'],
      'English': ['#012169', '#FFFFFF', '#C8102E'],
      'Japanese': ['#FFFFFF', '#BC002D', '#FFFFFF'],
      'Korean': ['#FFFFFF', '#C60C30', '#003478'],
      'Mandarin': ['#DE2910', '#FFDE00', '#DE2910'],
    };
    return flagColors[language] || ['#6B7280', '#9CA3AF', '#6B7280'];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate available seats
  const getAvailableSeats = (batch) => {
    return batch.capacity - batch.enrolled;
  };

  // Get current set of 3 consecutive batches for desktop carousel
  const getCurrentBatches = () => {
    if (batches.length <= 3) {
      return batches;
    }
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % batches.length;
      result.push(batches[index]);
    }
    return result;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % batches.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? batches.length - 1 : prevIndex - 1
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-12">
            {sectionTitle}
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1F9F90]"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-12">
            {sectionTitle}
          </h2>
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#1F9F90] text-white rounded-lg hover:brightness-90"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No batches state
  if (batches.length === 0) {
    return (
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-12">
            {sectionTitle}
          </h2>
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No upcoming batches available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon for new batches!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 lg:py-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-[#1F9F90] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideDown">
          {toastMessage}
        </div>
      )}
      
      <div className="container-custom max-w-7xl">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-navy text-center mb-6 md:mb-8 lg:mb-12">
          {sectionTitle}
        </h2>

        {/* Mobile Carousel - Single Batch */}
        <div className="md:hidden">
          {batches.length > 0 && (
            <>
              <div 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl max-w-sm mx-auto ${
                  highlightedBatchId === batches[currentIndex].id ? 'ring-4 ring-[#1F9F90] ring-offset-2' : ''
                }`}
              >
                {/* Flag Background */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {getFlagColors(batches[currentIndex].language).map((color, index) => (
                      <div
                        key={index}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  {/* Language Name Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                      {batches[currentIndex].language}
                    </h3>
                  </div>
                </div>

                {/* Batch Details */}
                <div className="p-5">
                  <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Batch Starts</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatDate(batches[currentIndex].startDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Available Seats</span>
                      <span className="font-bold text-xl text-gray-900">
                        {getAvailableSeats(batches[currentIndex])}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-600">Schedule</span>
                      <span className="text-xs font-semibold text-gray-900 text-right">
                        {batches[currentIndex].schedule}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Level</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {batches[currentIndex].level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mode</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {batches[currentIndex].mode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price</span>
                      <span className="text-lg font-bold text-[#1F9F90]">
                        ₹{batches[currentIndex].price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEnrollClick(batches[currentIndex])}
                      className="flex-1 text-white py-2.5 font-semibold hover:brightness-90 transition-all duration-300 text-sm"
                      style={{ backgroundColor: '#1F9F90' }}
                    >
                      Enroll now
                    </Button>
                    <button
                      onClick={() => handleShareBatch(batches[currentIndex])}
                      className="px-3 py-2.5 border-2 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                      style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                      aria-label="Share batch link"
                      title="Share batch link"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              {batches.length > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={prevSlide}
                    className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                    aria-label="Previous batch"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <span className="text-gray-600">
                    {currentIndex + 1} / {batches.length}
                  </span>

                  <button
                    onClick={nextSlide}
                    className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                    aria-label="Next batch"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Desktop Grid - 3 Batches with Carousel */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 transition-all duration-500">
            {getCurrentBatches().map((batch) => (
              <div
                key={batch.id}
                ref={(el) => (batchRefs.current[batch.id] = el)}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  highlightedBatchId === batch.id ? 'ring-4 ring-[#1F9F90] ring-offset-2' : ''
                }`}
              >
                {/* Flag Background */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {getFlagColors(batch.language).map((color, index) => (
                      <div
                        key={index}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  {/* Language Name Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-5xl font-bold text-white drop-shadow-lg">
                      {batch.language}
                    </h3>
                  </div>
                </div>

                {/* Batch Details */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Batch Starts</span>
                      <span className="font-semibold text-gray-900">
                        {formatDate(batch.startDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Seats</span>
                      <span className="font-bold text-2xl text-gray-900">
                        {getAvailableSeats(batch)}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600">Schedule</span>
                      <span className="font-semibold text-gray-900 text-right text-sm">
                        {batch.schedule}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Level</span>
                      <span className="font-semibold text-gray-900">{batch.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mode</span>
                      <span className="font-semibold text-gray-900">{batch.mode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price</span>
                      <span className="text-xl font-bold text-[#1F9F90]">
                        ₹{batch.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEnrollClick(batch)}
                      className="flex-1 text-white py-3 font-semibold hover:brightness-90 transition-all duration-300"
                      size="large"
                      style={{ backgroundColor: '#1F9F90' }}
                    >
                      Enroll now
                    </Button>
                    <button
                      onClick={() => handleShareBatch(batch)}
                      className="px-4 py-3 border-2 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                      style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                      aria-label="Share batch link"
                      title="Share batch link"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons for Desktop */}
          {batches.length > 3 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Previous batches"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#1F9F90', color: '#1F9F90' }}
                aria-label="Next batches"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enrollment Modal */}
      <BatchEnrollmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        batch={selectedBatch}
      />
    </section>
  );
};

export default UpcomingBatchesSection;
