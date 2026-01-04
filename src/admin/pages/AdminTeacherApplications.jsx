import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../api/pocketbase';

const AdminTeacherApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadApplications();
  }, []);

  const checkAuth = () => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
    }
  };

  const loadApplications = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('teacher_applications').getList(1, 100, {
        sort: '-created',
      });

      setApplications(records.items);
    } catch (error) {
      console.error('Failed to load teacher applications:', error);
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

  const downloadCV = (application) => {
    if (application.cv) {
      const cvUrl = pb.files.getUrl(application, application.cv);
      window.open(cvUrl, '_blank');
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Teacher Applications</h1>
              <p className="text-gray-600 mt-1">Applications submitted through the careers page</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Applications Grid */}
        <div className="grid grid-cols-1 gap-6">
          {applications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No teacher applications found</p>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{app.fullName}</h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <span>📧</span> {app.email}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <span>📱</span> {app.contactNo}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {app.preferredLanguage && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Preferred Language</p>
                          <p className="text-sm font-medium text-gray-900">{app.preferredLanguage}</p>
                        </div>
                      )}
                      {app.qualification && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Qualification</p>
                          <p className="text-sm font-medium text-gray-900">{app.qualification}</p>
                        </div>
                      )}
                      {app.teachingExperience && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Teaching Experience</p>
                          <p className="text-sm font-medium text-gray-900">{app.teachingExperience} years</p>
                        </div>
                      )}
                      {app.howDidYouHear && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase">How They Found Us</p>
                          <p className="text-sm font-medium text-gray-900">{app.howDidYouHear}</p>
                        </div>
                      )}
                    </div>

                    {/* About Section */}
                    {app.aboutYourself && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 uppercase mb-1">About</p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.aboutYourself}</p>
                      </div>
                    )}

                    {/* CV Download */}
                    {app.cv && (
                      <button
                        onClick={() => downloadCV(app)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F9F90] text-white rounded-lg hover:bg-[#177d70] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download CV
                      </button>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 md:mt-0 md:ml-6 text-right">
                    <p className="text-xs text-gray-500">Applied on</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(app.created)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminTeacherApplications;

