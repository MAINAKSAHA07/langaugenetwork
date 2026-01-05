import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pb from '../../../api/pocketbase';

const AdminBatchEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    language: '',
    level: '',
    mode: 'Online',
    ageGroup: 'adults', // New field: adults or kids
    startDate: '',
    endDate: '',
    schedule: '',
    capacity: 15,
    enrolled: 0,
    price: 0,
    instructor: '',
    status: 'upcoming',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
      return;
    }

    if (isEditing) {
      loadBatch();
    }
  }, [id]);

  const loadBatch = async () => {
    try {
      const batch = await pb.collection('batches').getOne(id);
      setFormData({
        language: batch.language,
        level: batch.level,
        mode: batch.mode,
        ageGroup: batch.ageGroup || 'adults',
        startDate: batch.startDate,
        endDate: batch.endDate,
        schedule: batch.schedule,
        capacity: batch.capacity,
        enrolled: batch.enrolled,
        price: batch.price,
        instructor: batch.instructor || '',
        status: batch.status,
        description: batch.description || '',
      });
    } catch (error) {
      console.error('Failed to load batch:', error);
      alert('Failed to load batch');
      navigate('/admin/batches');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      // Prepare data with correct types - ensure numbers are never NaN or undefined
      const capacity = parseInt(formData.capacity, 10);
      const enrolled = parseInt(formData.enrolled, 10);
      const price = parseFloat(formData.price);

      // Validate that numbers are valid
      if (isNaN(capacity) || capacity < 1) {
        setSaveStatus('Error: Capacity must be a valid number (minimum 1)');
        setLoading(false);
        return;
      }
      if (isNaN(enrolled) || enrolled < 0) {
        setSaveStatus('Error: Enrolled must be a valid number (minimum 0)');
        setLoading(false);
        return;
      }
      if (isNaN(price) || price < 0) {
        setSaveStatus('Error: Price must be a valid number (minimum 0)');
        setLoading(false);
        return;
      }

      // Dates from HTML date inputs are already in YYYY-MM-DD format
      // PocketBase accepts this format for date fields
      const batchData = {
        language: formData.language.trim(),
        level: formData.level.trim(),
        mode: formData.mode.trim(),
        ageGroup: formData.ageGroup, // Add ageGroup field
        startDate: formData.startDate,
        endDate: formData.endDate,
        schedule: formData.schedule.trim(),
        capacity: capacity,
        enrolled: enrolled,
        price: price,
        status: formData.status,
      };

      console.log('Submitting batch data:', JSON.stringify(batchData, null, 2));

      // Only include optional fields if they have values
      if (formData.instructor && formData.instructor.trim()) {
        batchData.instructor = formData.instructor.trim();
      }
      if (formData.description && formData.description.trim()) {
        batchData.description = formData.description.trim();
      }

      // Validate required fields
      if (!batchData.language || !batchData.level || !batchData.startDate || !batchData.endDate || !batchData.schedule) {
        setSaveStatus('Error: Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Validate dates
      const startDateObj = new Date(batchData.startDate);
      const endDateObj = new Date(batchData.endDate);
      if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        setSaveStatus('Error: Please enter valid dates');
        setLoading(false);
        return;
      }
      if (endDateObj < startDateObj) {
        setSaveStatus('Error: End date must be after start date');
        setLoading(false);
        return;
      }

      // Validate numbers
      if (batchData.capacity < 1 || batchData.capacity > 100) {
        setSaveStatus('Error: Capacity must be between 1 and 100');
        setLoading(false);
        return;
      }
      if (batchData.enrolled < 0) {
        setSaveStatus('Error: Enrolled count cannot be negative');
        setLoading(false);
        return;
      }
      if (batchData.price < 0) {
        setSaveStatus('Error: Price cannot be negative');
        setLoading(false);
        return;
      }

      if (isEditing) {
        await pb.collection('batches').update(id, batchData);
        setSaveStatus('Batch updated successfully!');
      } else {
        await pb.collection('batches').create(batchData);
        setSaveStatus('Batch created successfully!');
      }

      setTimeout(() => {
        navigate('/admin/batches');
      }, 1500);
    } catch (error) {
      console.error('Failed to save batch:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      console.error('Error response:', error.response);
      console.error('Error data:', error.data);
      
      // Extract detailed error message
      let errorMessage = 'Failed to save batch';
      let detailedErrors = [];
      
      // Check error.data first (PocketBase structure)
      if (error.data) {
        if (error.data.data) {
          // Field-specific validation errors
          const fieldErrors = error.data.data;
          detailedErrors = Object.entries(fieldErrors).map(([field, err]) => {
            if (typeof err === 'object' && err.message) {
              return `${field}: ${err.message}`;
            } else if (typeof err === 'object' && err.code) {
              return `${field}: ${err.code}`;
            } else {
              return `${field}: ${JSON.stringify(err)}`;
            }
          });
          
          if (detailedErrors.length > 0) {
            errorMessage = `Validation Errors:\n${detailedErrors.join('\n')}`;
          } else if (error.data.message) {
            errorMessage = error.data.message;
          }
        } else if (error.data.message) {
          errorMessage = error.data.message;
        }
      }
      
      // Fallback to error.response
      if (!detailedErrors.length && error.response) {
        const responseData = error.response;
        if (responseData.data) {
          const data = responseData.data;
          if (data.data) {
            const fieldErrors = Object.entries(data.data)
              .map(([field, err]) => `${field}: ${err.message || JSON.stringify(err)}`)
              .join(', ');
            errorMessage = `Validation Error: ${fieldErrors}`;
          } else if (data.message) {
            errorMessage = data.message;
          }
        }
      }
      
      // Final fallback
      if (errorMessage === 'Failed to save batch' && error.message) {
        errorMessage = error.message;
      }
      
      // Show in alert for debugging
      alert(`Error Details:\n${errorMessage}\n\nCheck console for full details.`);
      setSaveStatus(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/admin/batches')}
            className="text-gray-600 hover:text-[#FF6B35] mb-2 flex items-center"
          >
            ← Back to Batches
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Batch' : 'Create New Batch'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg ${saveStatus.startsWith('Error')
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
            {saveStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language *
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="">Select language...</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Spanish">Spanish</option>
                  <option value="English">English</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level *
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="">Select level...</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="A1+A2">A1+A2</option>
                  <option value="B1+B2">B1+B2</option>
                  <option value="A1-B2">A1-B2</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode *
                </label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group *
                </label>
                <select
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="adults">Adults</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule *
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  required
                  placeholder="e.g., Mon/Wed/Fri 6:00-7:30 PM"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Instructor name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>
            </div>
          </div>

          {/* Enrollment & Pricing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Enrollment & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity *
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 15 : parseInt(e.target.value, 10);
                    setFormData({ ...formData, capacity: isNaN(val) ? 15 : val });
                  }}
                  required
                  min="1"
                  max="30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enrolled
                </label>
                <input
                  type="number"
                  value={formData.enrolled}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                    setFormData({ ...formData, enrolled: isNaN(val) ? 0 : val });
                  }}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                    setFormData({ ...formData, price: isNaN(val) ? 0 : val });
                  }}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              placeholder="Brief description of the batch..."
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#e55a2b] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Batch' : 'Create Batch'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/batches')}
              className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminBatchEditor;

