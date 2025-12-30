import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../api/pocketbase';

const AdminContacts = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        checkAuth();
        loadContacts();
    }, [filter]);

    const checkAuth = () => {
        if (!pb.authStore.isValid) {
            navigate('/admin/login');
        }
    };

    const loadContacts = async () => {
        try {
            setLoading(true);
            let filterQuery = '';

            if (filter !== 'all') {
                filterQuery = `status = "${filter}"`;
            }

            const records = await pb.collection('contact_submissions').getList(1, 100, {
                filter: filterQuery,
                sort: '-created',
            });

            setContacts(records.items);
        } catch (error) {
            console.error('Failed to load contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await pb.collection('contact_submissions').update(id, {
                status: newStatus,
            });
            loadContacts();
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    const deleteContact = async (id) => {
        if (!confirm('Are you sure you want to delete this contact submission?')) {
            return;
        }

        try {
            await pb.collection('contact_submissions').delete(id);
            loadContacts();
        } catch (error) {
            console.error('Failed to delete contact:', error);
            alert('Failed to delete contact');
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
                            <p className="text-gray-600 mt-1">{filteredContacts.length} total submissions</p>
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
                                placeholder="Search by name, email, or message..."
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
                                <option value="all">All Submissions</option>
                                <option value="new">New</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contacts List */}
                <div className="space-y-4">
                    {filteredContacts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <p className="text-gray-500 text-lg">No contact submissions found</p>
                        </div>
                    ) : (
                        filteredContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{contact.fullName}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                            <span>📧 {contact.email}</span>
                                            <span>📱 {contact.mobile}</span>
                                            <span>🌍 {contact.language}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Submitted: {formatDate(contact.created)}
                                        </p>
                                    </div>

                                    {/* Status Badge */}
                                    <div>
                                        <select
                                            value={contact.status || 'new'}
                                            onChange={(e) => updateStatus(contact.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${contact.status === 'replied'
                                                ? 'bg-green-100 text-green-800'
                                                : contact.status === 'read'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="replied">Replied</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <a
                                        href={`mailto:${contact.email}?subject=Re: Your inquiry about ${contact.language}`}
                                        className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors text-sm"
                                    >
                                        Reply via Email
                                    </a>
                                    <button
                                        onClick={() => deleteContact(contact.id)}
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

export default AdminContacts;
