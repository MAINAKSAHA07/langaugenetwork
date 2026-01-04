import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../api/pocketbase';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');

  useEffect(() => {
    checkAuth();
    loadOrders();
  }, [filter, languageFilter]);

  const checkAuth = () => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      let filterParts = [];
      if (filter !== 'all') {
        filterParts.push(`status = "${filter}"`);
      }
      if (languageFilter !== 'all') {
        filterParts.push(`language = "${languageFilter}"`);
      }

      const filterQuery = filterParts.length > 0 ? filterParts.join(' && ') : '';

      const records = await pb.collection('orders').getList(1, 100, {
        sort: languageFilter === 'all' ? 'language,-created' : '-created', // Sort by language first, then date
        filter: filterQuery,
      });

      // If no language filter, sort by language then date
      if (languageFilter === 'all') {
        records.items.sort((a, b) => {
          const langA = (a.language || '').toLowerCase();
          const langB = (b.language || '').toLowerCase();
          if (langA !== langB) {
            return langA.localeCompare(langB);
          }
          return new Date(b.created) - new Date(a.created);
        });
      }

      setOrders(records.items);
    } catch (error) {
      console.error('Failed to load orders:', error);
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
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const calculateTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + (order.amount || 0), 0);
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
              <h1 className="text-3xl font-bold text-gray-900">Orders & Payments</h1>
              <p className="text-gray-600 mt-1">All payment transactions</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Revenue (Completed)</p>
              <p className="text-3xl font-bold text-green-600">₹{calculateTotalRevenue().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'all' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('failed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'failed' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Failed
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Language</label>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
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

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Language
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          <div className="text-sm text-gray-500">{order.customerPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {order.language || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-gray-900">₹{order.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{order.currency || 'INR'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.courseType || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-500 font-mono">
                          {order.razorpayPaymentId ? (
                            <div>
                              <div>Payment: {order.razorpayPaymentId.substring(0, 20)}...</div>
                              {order.razorpayOrderId && (
                                <div className="mt-1">Order: {order.razorpayOrderId.substring(0, 20)}...</div>
                              )}
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{formatDate(order.completedAt || order.created)}</div>
                        {order.status === 'completed' && order.completedAt && (
                          <div className="text-xs text-green-600">Completed</div>
                        )}
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

export default AdminOrders;

