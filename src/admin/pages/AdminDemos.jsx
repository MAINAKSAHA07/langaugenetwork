import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../api/pocketbase';

const AdminDemos = () => {
    const navigate = useNavigate();
    const [demos, setDemos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        checkAuth();
        loadDemos();
    }, [filter]);

    const checkAuth = () => {
        if (!pb.authStore.isValid) {
            navigate('/admin/login');
        }
    };

    const loadDemos = async () => {
        try {
            setLoading(true);
            let filterQuery = '';

            if (filter !== 'all') {
                filterQuery = `status = "${filter}"`;
            }

            const records = await pb.collection('demo_registrations').getList(1, 100, {
                filter: filterQuery,
                sort: '-created',
            });

            setDemos(records.items);
        } catch (error) {
            console.error('Failed to load demos:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await pb.collection('demo_registrations').update(id, {
                status: newStatus,
            });
            loadDemos();
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    const deleteDemo = async (id) => {
        if (!confirm('Are you sure you want to delete this demo registration?')) {
            return;
        }

        try {
            await pb.collection('demo_registrations').delete(id);
            loadDemos();
        } catch (error) {
            console.error('Failed to delete demo:', error);
            alert('Failed to delete demo');
        }
    };

    const filteredDemos = demos.filter(demo =>
        demo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demo.language.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <h1 className="text-3xl font-bold text-gray-900">Demo Registrations</h1>
                            <p className="text-gray-600 mt-1">{filteredDemos.length} total registrations</p>
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
                                placeholder="Search by name, email, or language..."
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
                                <option value="all">All Registrations</option>
                                <option value="pending">Pending</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Demos List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDemos.length === 0 ? (
                        <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
                            <p className="text-gray-500 text-lg">No demo registrations found</p>
                        </div>
                    ) : (
                        filteredDemos.map((demo) => (
                            <div
                                key={demo.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{demo.name}</h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>📧 {demo.email}</p>
                                        <p>📱 {demo.phone}</p>
                                        <p className="text-[#FF6B35] font-semibold">🌍 {demo.language}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Registered: {formatDate(demo.created)}
                                    </p>
                                </div>

                                {/* Notes */}
                                {demo.notes && (
                                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-gray-700">{demo.notes}</p>
                                    </div>
                                )}

                                {/* Status */}
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={demo.status || 'pending'}
                                        onChange={(e) => updateStatus(demo.id, e.target.value)}
                                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium ${demo.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : demo.status === 'scheduled'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : demo.status === 'cancelled'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="scheduled">Scheduled</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <a
                                        href={`mailto:${demo.email}?subject=Your Demo Class for ${demo.language}`}
                                        className="flex-1 px-3 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors text-sm text-center"
                                    >
                                        Email
                                    </a>
                                    <button
                                        onClick={() => deleteDemo(demo.id)}
                                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
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

export default AdminDemos;
