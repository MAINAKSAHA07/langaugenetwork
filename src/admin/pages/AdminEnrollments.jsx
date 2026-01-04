import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../api/pocketbase';

const AdminEnrollments = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    checkAuth();
    loadEnrollments();
  }, [filter]);

  const checkAuth = () => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
    }
  };

  const loadEnrollments = async () => {
    setLoading(true);
    try {
      let filterQuery = '';
      if (filter !== 'all') {
        filterQuery = `courseType = "${filter}"`;
      }

      const records = await pb.collection('enrollments').getList(1, 100, {
        sort: '-created',
        filter: filterQuery,
      });

      setEnrollments(records.items);
    } catch (error) {
      console.error('Failed to load enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getCourseTypeBadge = (courseType) => {
    const colors = {
      batch: 'bg-purple-100 text-purple-800',
      'mastery-kit': 'bg-blue-100 text-blue-800',
      demo: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[courseType] || 'bg-gray-100 text-gray-800'}`}>
        {courseType}
      </span>
    );
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
                className="text-gray-600 hover:text-gray-900 mb-2 flex items-center gap-2"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Student Enrollments</h1>
              <p className="text-gray-600 mt-1">Paid enrollments from batches and courses</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({enrollments.length})
            </button>
            <button
              onClick={() => setFilter('batch')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'batch' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Batches
            </button>
            <button
              onClick={() => setFilter('mastery-kit')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'mastery-kit' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mastery Kit
            </button>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {enrollments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No enrollments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrolled Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{enrollment.studentName}</div>
                          <div className="text-sm text-gray-500">{enrollment.studentEmail}</div>
                          <div className="text-sm text-gray-500">{enrollment.studentPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCourseTypeBadge(enrollment.courseType)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{enrollment.courseName || 'N/A'}</div>
                        {enrollment.courseDetails && (
                          <div className="text-xs text-gray-500 mt-1">
                            {JSON.stringify(enrollment.courseDetails).length > 50
                              ? JSON.stringify(enrollment.courseDetails).substring(0, 50) + '...'
                              : JSON.stringify(enrollment.courseDetails)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(enrollment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(enrollment.enrollmentDate || enrollment.created)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminEnrollments;

