import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../../api/pocketbase';

const AdminBatches = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');

  useEffect(() => {
    checkAuth();
    loadBatches();
  }, [filterStatus, filterLanguage]);

  const checkAuth = () => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
    }
  };

  const loadBatches = async () => {
    try {
      let filters = [];
      if (filterStatus !== 'all') {
        filters.push(`status = "${filterStatus}"`);
      }
      if (filterLanguage !== 'all') {
        filters.push(`language = "${filterLanguage}"`);
      }

      const records = await pb.collection('batches').getList(1, 50, {
        sort: '-startDate',
        filter: filters.length > 0 ? filters.join(' && ') : '',
      });

      setBatches(records.items);
    } catch (error) {
      console.error('Failed to load batches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this batch?')) return;

    try {
      await pb.collection('batches').delete(id);
      setBatches(batches.filter(batch => batch.id !== id));
    } catch (error) {
      console.error('Failed to delete batch:', error);
      alert('Failed to delete batch');
    }
  };

  const filteredBatches = batches.filter(batch =>
    batch.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF6B35]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-[#FF6B35] mb-2 flex items-center"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
            </div>
            <button
              onClick={() => navigate('/admin/batches/new')}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors font-semibold"
            >
              ➕ New Batch
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Batches
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by language, level, or instructor..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Language
              </label>
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                <option value="all">All Languages</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
                <option value="English">English</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Mandarin">Mandarin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Batches List */}
        {filteredBatches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No batches found</p>
            <button
              onClick={() => navigate('/admin/batches/new')}
              className="mt-4 px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors"
            >
              Create Your First Batch
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBatches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {batch.language} - {batch.level}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {batch.mode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">📅 Schedule:</span>
                    <span>{batch.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">📆 Duration:</span>
                    <span>
                      {new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  {batch.instructor && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">👨‍🏫 Instructor:</span>
                      <span>{batch.instructor}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">👥 Enrollment:</span>
                    <span>{batch.enrolled}/{batch.capacity} students</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                      <div
                        className="bg-[#FF6B35] h-2 rounded-full"
                        style={{ width: `${(batch.enrolled / batch.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">💰 Price:</span>
                    <span className="text-lg font-bold text-[#FF6B35]">₹{batch.price.toLocaleString()}</span>
                  </div>
                </div>

                {batch.description && (
                  <p className="text-gray-600 text-sm mb-4 border-t pt-4">
                    {batch.description}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => navigate(`/admin/batches/edit/${batch.id}`)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(batch.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBatches;

