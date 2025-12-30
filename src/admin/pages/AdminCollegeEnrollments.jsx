import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../api/pocketbase';

const AdminCollegeEnrollments = () => {
    const navigate = useNavigate();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

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
        try {
            setLoading(true);
            let filterQuery = '';

            if (filter !== 'all') {
                filterQuery = `status = "${filter}"`;
            }

            const records = await pb.collection('college_enrollments').getList(1, 100, {
                filter: filterQuery,
                sort: '-created',
            });

            setEnrollments(records.items);
        } catch (error) {
            console.error('Failed to load college enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await pb.collection('college_enrollments').update(id, {
                status: newStatus,
            });
            loadEnrollments();
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    const deleteEnrollment = async (id) => {
        if (!confirm('Are you sure you want to delete this college enrollment?')) {
            return;
        }

        try {
            await pb.collection('college_enrollments').delete(id);
            loadEnrollments();
        } catch (error) {
            console.error('Failed to delete enrollment:', error);
            alert('Failed to delete enrollment');
        }
    };

    const filteredEnrollments = enrollments.filter(enrollment =>
        enrollment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                                className="text-gray-600 hover:text-gray-900 mb-2 flex items-center"
                            >
                                ← Back to Dashboard
                            </button>
                            <h1 className="text-3xl font-bold text-gray-900">College Enrollments</h1>
                            <p className="text-gray-600 mt-1">{filteredEnrollments.length} total enrollments</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, email, or college name..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                            >
                                <option value="all">All Enrollments</option>
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="proposal_sent">Proposal Sent</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Enrollments List */}
                <div className="space-y-4">
                    {filteredEnrollments.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <p className="text-gray-500 text-lg">No college enrollments found</p>
                        </div>
                    ) : (
                        filteredEnrollments.map((enrollment) => (
                            <div
                                key={enrollment.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{enrollment.fullName}</h3>
                                        <p className="text-lg text-[#FF6B35] font-semibold mt-1">{enrollment.collegeName}</p>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                                            <span>📧 {enrollment.email}</span>
                                            <span>📱 {enrollment.contactNo}</span>
                                            <span>👤 {enrollment.designation}</span>
                                            <span>🌍 {enrollment.languageInterest}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Submitted: {formatDate(enrollment.created)}
                                        </p>
                                    </div>

                                    {/* Status Badge */}
                                    <div>
                                        <select
                                            value={enrollment.status || 'new'}
                                            onChange={(e) => updateStatus(enrollment.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${enrollment.status === 'closed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : enrollment.status === 'proposal_sent'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : enrollment.status === 'contacted'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="proposal_sent">Proposal Sent</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                </div>

                                {/* College Details */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">College Address:</p>
                                            <p className="text-gray-600">{enrollment.collegeAddress}</p>
                                        </div>
                                        {enrollment.hearAboutUs && (
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">How they heard about us:</p>
                                                <p className="text-gray-600">{enrollment.hearAboutUs}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <a
                                        href={`mailto:${enrollment.email}?subject=Re: Language Training Partnership for ${enrollment.collegeName}`}
                                        className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors text-sm"
                                    >
                                        Reply via Email
                                    </a>
                                    <button
                                        onClick={() => deleteEnrollment(enrollment.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminCollegeEnrollments;
