import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../api/pocketbase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    contacts: 0,
    demos: 0,
    blogs: 0,
    batches: 0,
    adultBatches: 0,
    kidsBatches: 0,
    newsletters: 0,
    schoolEnrollments: 0,
    collegeEnrollments: 0,
    enrollments: 0,
    orders: 0,
    teacherApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = () => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      const promises = [
        pb.collection('contact_submissions').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('demo_registrations').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('blogs').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('batches').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('batches').getList(1, 1, { filter: 'ageGroup = "adults"' }).catch(() => ({ totalItems: 0 })),
        pb.collection('batches').getList(1, 1, { filter: 'ageGroup = "kids"' }).catch(() => ({ totalItems: 0 })),
        pb.collection('newsletter_subscribers').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('school_enrollments').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('college_enrollments').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('enrollments').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('orders').getList(1, 1).catch(() => ({ totalItems: 0 })),
        pb.collection('teacher_applications').getList(1, 1).catch(() => ({ totalItems: 0 })),
      ];

      const [contacts, demos, blogs, batches, adultBatches, kidsBatches, newsletters, schoolEnrollments, collegeEnrollments, enrollments, orders, teacherApplications] = await Promise.all(promises);

      setStats({
        contacts: contacts.totalItems,
        demos: demos.totalItems,
        blogs: blogs.totalItems,
        batches: batches.totalItems,
        adultBatches: adultBatches.totalItems,
        kidsBatches: kidsBatches.totalItems,
        newsletters: newsletters.totalItems,
        schoolEnrollments: schoolEnrollments.totalItems,
        collegeEnrollments: collegeEnrollments.totalItems,
        enrollments: enrollments.totalItems,
        orders: orders.totalItems,
        teacherApplications: teacherApplications.totalItems,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    navigate('/admin/login');
  };

  const StatCard = ({ title, value, icon, link }) => (
    <div
      onClick={() => navigate(link)}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#FF6B35]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className="text-4xl font-bold text-[#FF6B35]">{value}</p>
        </div>
        <div className="text-5xl">{icon}</div>
      </div>
    </div>
  );

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">The Language Network</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Contact Submissions"
            value={stats.contacts}
            icon="📧"
            link="/admin/contacts"
          />
          <StatCard
            title="Demo Registrations"
            value={stats.demos}
            icon="📝"
            link="/admin/demos"
          />
          <StatCard
            title="Blog Posts"
            value={stats.blogs}
            icon="📰"
            link="/admin/blogs"
          />
          <StatCard
            title="All Batches"
            value={stats.batches}
            icon="👥"
            link="/admin/batches"
          />
          <StatCard
            title="Adult Batches"
            value={stats.adultBatches}
            icon="👤"
            link="/admin/batches"
          />
          <StatCard
            title="Kids Batches"
            value={stats.kidsBatches}
            icon="👶"
            link="/admin/batches"
          />
          <StatCard
            title="Newsletter Subscribers"
            value={stats.newsletters}
            icon="✉️"
            link="/admin/newsletters"
          />
          <StatCard
            title="School Enrollments"
            value={stats.schoolEnrollments}
            icon="🏫"
            link="/admin/school-enrollments"
          />
          <StatCard
            title="College Enrollments"
            value={stats.collegeEnrollments}
            icon="🎓"
            link="/admin/college-enrollments"
          />
          <StatCard
            title="Student Enrollments"
            value={stats.enrollments}
            icon="🎯"
            link="/admin/enrollments"
          />
          <StatCard
            title="Orders & Payments"
            value={stats.orders}
            icon="💳"
            link="/admin/orders"
          />
          <StatCard
            title="Teacher Applications"
            value={stats.teacherApplications}
            icon="👨‍🏫"
            link="/admin/teacher-applications"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/blogs/new')}
              className="px-6 py-4 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors font-semibold"
            >
              ➕ New Blog Post
            </button>
            <button
              onClick={() => navigate('/admin/batches/new')}
              className="px-6 py-4 bg-[#2D3748] text-white rounded-lg hover:bg-[#1a202c] transition-colors font-semibold"
            >
              ➕ New Batch
            </button>
            <button
              onClick={() => navigate('/admin/contacts')}
              className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              📋 View Contacts
            </button>
            <button
              onClick={() => window.open('http://127.0.0.1:8098/_/', '_blank')}
              className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              🗄️ PocketBase Admin
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Management Sections</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/contacts')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Contact Submissions</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/demos')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Demo Registrations</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/blogs')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Blog Management</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/batches')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Batch Management</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/newsletters')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Newsletter Subscribers</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/school-enrollments')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">School Enrollments</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/college-enrollments')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">College Enrollments</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/enrollments')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Student Enrollments (Paid)</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/orders')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Orders & Payments</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
            <button
              onClick={() => navigate('/admin/teacher-applications')}
              className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Teacher Applications</span>
              <span className="text-[#FF6B35]">→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

