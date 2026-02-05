import React, { useState, useEffect } from 'react';
import pb from '../../config/pocketbase';
import '../pages/AdminDashboard.css';

const AdminMasteryKitAccess = () => {
    const [users, setUsers] = useState([]);
    const [masteryKits, setMasteryKits] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedKit, setSelectedKit] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch all users
            const usersData = await pb.collection('users').getFullList({
                sort: '-created',
            });
            setUsers(usersData);

            // Fetch all mastery kits
            const kitsData = await pb.collection('mastery_kits').getFullList({
                sort: '-created',
            });
            setMasteryKits(kitsData);

            // Fetch all purchases
            const purchasesData = await pb.collection('mastery_kit_purchases').getFullList({
                expand: 'user,mastery_kit',
                sort: '-created',
            });
            setPurchases(purchasesData);

        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ type: 'error', text: 'Failed to load data' });
        } finally {
            setLoading(false);
        }
    };

    const grantAccess = async (e) => {
        e.preventDefault();

        if (!selectedUser || !selectedKit) {
            setMessage({ type: 'error', text: 'Please select both user and mastery kit' });
            return;
        }

        try {
            // Check if access already exists
            const existing = await pb.collection('mastery_kit_purchases').getFullList({
                filter: `user="${selectedUser}" && mastery_kit="${selectedKit}"`,
            });

            if (existing.length > 0) {
                setMessage({ type: 'error', text: 'User already has access to this kit' });
                return;
            }

            // Create purchase record
            await pb.collection('mastery_kit_purchases').create({
                user: selectedUser,
                mastery_kit: selectedKit,
                purchase_date: new Date().toISOString(),
                payment_status: 'completed',
                transaction_id: `ADMIN-${Date.now()}`,
            });

            setMessage({ type: 'success', text: 'Access granted successfully!' });
            setSelectedUser('');
            setSelectedKit('');

            // Refresh purchases
            fetchData();

        } catch (error) {
            console.error('Error granting access:', error);
            setMessage({ type: 'error', text: 'Failed to grant access' });
        }
    };

    const revokeAccess = async (purchaseId) => {
        if (!confirm('Are you sure you want to revoke this access?')) {
            return;
        }

        try {
            await pb.collection('mastery_kit_purchases').delete(purchaseId);
            setMessage({ type: 'success', text: 'Access revoked successfully!' });
            fetchData();
        } catch (error) {
            console.error('Error revoking access:', error);
            setMessage({ type: 'error', text: 'Failed to revoke access' });
        }
    };

    if (loading) {
        return <div className="admin-container">Loading...</div>;
    }

    return (
        <div className="admin-container">
            <h1>Mastery Kit Access Management</h1>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Grant Access Form */}
            <div className="admin-card">
                <h2>Grant Access to User</h2>
                <form onSubmit={grantAccess} className="grant-access-form">
                    <div className="form-group">
                        <label htmlFor="user">Select User:</label>
                        <select
                            id="user"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required
                        >
                            <option value="">-- Select User --</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.email} ({user.name || 'No name'})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="kit">Select Mastery Kit:</label>
                        <select
                            id="kit"
                            value={selectedKit}
                            onChange={(e) => setSelectedKit(e.target.value)}
                            required
                        >
                            <option value="">-- Select Mastery Kit --</option>
                            {masteryKits.map((kit) => (
                                <option key={kit.id} value={kit.id}>
                                    {kit.title} - ₹{kit.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn-primary">
                        Grant Access
                    </button>
                </form>
            </div>

            {/* Current Access List */}
            <div className="admin-card">
                <h2>Current Access ({purchases.length})</h2>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Mastery Kit</th>
                                <th>Purchase Date</th>
                                <th>Status</th>
                                <th>Transaction ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        No access granted yet
                                    </td>
                                </tr>
                            ) : (
                                purchases.map((purchase) => (
                                    <tr key={purchase.id}>
                                        <td>
                                            {purchase.expand?.user?.email || 'Unknown'}
                                            <br />
                                            <small>{purchase.expand?.user?.name || ''}</small>
                                        </td>
                                        <td>{purchase.expand?.mastery_kit?.title || 'Unknown'}</td>
                                        <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge ${purchase.payment_status}`}>
                                                {purchase.payment_status}
                                            </span>
                                        </td>
                                        <td><small>{purchase.transaction_id}</small></td>
                                        <td>
                                            <button
                                                onClick={() => revokeAccess(purchase.id)}
                                                className="btn-danger btn-small"
                                            >
                                                Revoke
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Statistics */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number">{users.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Mastery Kits</h3>
                    <p className="stat-number">{masteryKits.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Access Granted</h3>
                    <p className="stat-number">{purchases.length}</p>
                </div>
            </div>

            <style jsx>{`
        .grant-access-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
        }

        .form-group select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .message {
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.completed {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        .btn-small {
          padding: 6px 12px;
          font-size: 12px;
        }

        .btn-danger {
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn-danger:hover {
          background: #c82333;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        .stat-card h3 {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 14px;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
      `}</style>
        </div>
    );
};

export default AdminMasteryKitAccess;
