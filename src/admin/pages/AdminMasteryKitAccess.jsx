import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../../config/pocketbase';

const AdminMasteryKitAccess = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [masteryKits, setMasteryKits] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [grantingAccess, setGrantingAccess] = useState(false);

    // Get unique languages from kits
    const languages = [...new Set(masteryKits.map(kit => kit.language))].sort();

    useEffect(() => {
        checkAuth();
        fetchData();
    }, []);

    const checkAuth = () => {
        if (!pb.authStore.isValid) {
            navigate('/admin/login');
        }
    };

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
                sort: 'language,title',
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

    const grantLanguageAccess = async (e) => {
        e.preventDefault();

        if (!selectedUser || !selectedLanguage) {
            setMessage({ type: 'error', text: 'Please select both user and language' });
            return;
        }

        setGrantingAccess(true);
        setMessage({ type: '', text: '' });

        try {
            // Get all kits for the selected language
            const languageKits = masteryKits.filter(kit => kit.language === selectedLanguage);

            if (languageKits.length === 0) {
                setMessage({ type: 'error', text: 'No kits found for this language' });
                setGrantingAccess(false);
                return;
            }

            // Check existing access
            const existing = await pb.collection('mastery_kit_purchases').getFullList({
                filter: `user="${selectedUser}" && payment_status="completed"`,
            });
            const existingKitIds = new Set(existing.map(p => p.mastery_kit));

            // Grant access to all kits in this language
            let granted = 0;
            for (const kit of languageKits) {
                if (existingKitIds.has(kit.id)) continue;

                await pb.collection('mastery_kit_purchases').create({
                    user: selectedUser,
                    mastery_kit: kit.id,
                    purchase_date: new Date().toISOString(),
                    payment_status: 'completed',
                    transaction_id: `ADMIN-${selectedLanguage.toUpperCase()}-${Date.now()}-${granted}`,
                    amount: kit.price || 0,
                });
                granted++;
            }

            const userName = users.find(u => u.id === selectedUser)?.email || 'User';
            setMessage({
                type: 'success',
                text: granted > 0
                    ? `✅ Granted ${userName} access to ${granted} ${selectedLanguage.toUpperCase()} kit(s)!`
                    : `User already has access to all ${selectedLanguage.toUpperCase()} kits.`,
            });

            setSelectedUser('');
            setSelectedLanguage('');
            fetchData();

        } catch (error) {
            console.error('Error granting access:', error);
            setMessage({ type: 'error', text: 'Failed to grant access' });
        } finally {
            setGrantingAccess(false);
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

    const revokeLanguageAccess = async (userId, language) => {
        if (!confirm(`Are you sure you want to revoke ALL ${language.toUpperCase()} access for this user?`)) {
            return;
        }

        try {
            // Get all kits for this language
            const languageKits = masteryKits.filter(kit => kit.language === language);
            const kitIds = languageKits.map(kit => kit.id);

            // Find and delete all purchases for these kits
            const userPurchases = purchases.filter(
                p => p.user === userId && kitIds.includes(p.mastery_kit)
            );

            for (const purchase of userPurchases) {
                await pb.collection('mastery_kit_purchases').delete(purchase.id);
            }

            setMessage({
                type: 'success',
                text: `Revoked ${language.toUpperCase()} access (${userPurchases.length} kit(s))`
            });
            fetchData();
        } catch (error) {
            console.error('Error revoking language access:', error);
            setMessage({ type: 'error', text: 'Failed to revoke language access' });
        }
    };

    // Group kits by language for display
    const kitsByLanguage = languages.reduce((acc, lang) => {
        acc[lang] = masteryKits.filter(kit => kit.language === lang);
        return acc;
    }, {});

    // Group user access by language
    const getUserAccessByLanguage = (userId) => {
        const userPurchases = purchases.filter(p => p.user === userId);
        const accessByLang = {};

        languages.forEach(lang => {
            const langKits = masteryKits.filter(kit => kit.language === lang);
            const langKitIds = langKits.map(kit => kit.id);
            const hasAccess = userPurchases.filter(p => langKitIds.includes(p.mastery_kit));

            if (hasAccess.length > 0) {
                accessByLang[lang] = {
                    count: hasAccess.length,
                    total: langKits.length,
                    complete: hasAccess.length === langKits.length
                };
            }
        });

        return accessByLang;
    };

    if (loading) {
        return <div className="admin-container">Loading...</div>;
    }

    return (
        <div className="admin-container">
            <h1>Mastery Kit Access Management</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Grant users access to all kits in a specific language (French, English, German, etc.)
            </p>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Available Languages & Kits */}
            <div className="admin-card">
                <h2>Available Languages & Kits</h2>
                <div className="languages-grid">
                    {languages.map(lang => {
                        const kits = kitsByLanguage[lang] || [];
                        const totalFiles = kits.reduce((sum, kit) => sum + (kit.files?.length || 0), 0);
                        const totalValue = kits.reduce((sum, kit) => sum + (kit.price || 0), 0);

                        return (
                            <div key={lang} className="language-card">
                                <div className="language-header">
                                    <h3>
                                        {lang === 'french' && '🇫🇷'}
                                        {lang === 'english' && '🇬🇧'}
                                        {lang === 'german' && '🇩🇪'}
                                        {' '}{lang.toUpperCase()}
                                    </h3>
                                    <span className="kit-count">{kits.length} kits</span>
                                </div>
                                <div className="language-stats">
                                    <div className="stat">
                                        <span className="stat-icon">📁</span>
                                        <span>{totalFiles} files</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-icon">💰</span>
                                        <span>₹{totalValue}</span>
                                    </div>
                                </div>
                                <div className="kit-list">
                                    {kits.map(kit => (
                                        <div key={kit.id} className="kit-item">
                                            <span className="kit-name">{kit.title}</span>
                                            <span className="kit-files">{kit.files?.length || 0} files</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Grant Access Form */}
            <div className="admin-card">
                <h2>Grant Language Access to User</h2>
                <form onSubmit={grantLanguageAccess} className="grant-access-form">
                    <div className="form-row">
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
                            <label htmlFor="language">Select Language:</label>
                            <select
                                id="language"
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                required
                            >
                                <option value="">-- Select Language --</option>
                                {languages.map((lang) => {
                                    const kits = kitsByLanguage[lang] || [];
                                    return (
                                        <option key={lang} value={lang}>
                                            {lang.toUpperCase()} ({kits.length} kits)
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={grantingAccess}
                    >
                        {grantingAccess ? 'Granting Access...' : 'Grant Language Access'}
                    </button>

                    {selectedLanguage && (
                        <div className="info-box">
                            <strong>ℹ️ This will grant access to:</strong>
                            <ul>
                                {(kitsByLanguage[selectedLanguage] || []).map(kit => (
                                    <li key={kit.id}>{kit.title} ({kit.files?.length || 0} files)</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
            </div>

            {/* User Access Overview */}
            <div className="admin-card">
                <h2>User Access Overview ({users.length} users)</h2>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>French Access</th>
                                <th>English Access</th>
                                <th>German Access</th>
                                <th>Total Kits</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                const accessByLang = getUserAccessByLanguage(user.id);
                                const totalAccess = Object.values(accessByLang).reduce((sum, a) => sum + a.count, 0);

                                return (
                                    <tr key={user.id}>
                                        <td>
                                            <strong>{user.email}</strong>
                                            <br />
                                            <small>{user.name || 'No name'}</small>
                                        </td>
                                        <td>
                                            {accessByLang.french ? (
                                                <div className="access-cell">
                                                    <span className={`access-badge ${accessByLang.french.complete ? 'complete' : 'partial'}`}>
                                                        {accessByLang.french.count}/{accessByLang.french.total} kits
                                                    </span>
                                                    <button
                                                        onClick={() => revokeLanguageAccess(user.id, 'french')}
                                                        className="btn-revoke-small"
                                                        title="Revoke all French access"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="no-access">No access</span>
                                            )}
                                        </td>
                                        <td>
                                            {accessByLang.english ? (
                                                <div className="access-cell">
                                                    <span className={`access-badge ${accessByLang.english.complete ? 'complete' : 'partial'}`}>
                                                        {accessByLang.english.count}/{accessByLang.english.total} kits
                                                    </span>
                                                    <button
                                                        onClick={() => revokeLanguageAccess(user.id, 'english')}
                                                        className="btn-revoke-small"
                                                        title="Revoke all English access"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="no-access">No access</span>
                                            )}
                                        </td>
                                        <td>
                                            {accessByLang.german ? (
                                                <div className="access-cell">
                                                    <span className={`access-badge ${accessByLang.german.complete ? 'complete' : 'partial'}`}>
                                                        {accessByLang.german.count}/{accessByLang.german.total} kits
                                                    </span>
                                                    <button
                                                        onClick={() => revokeLanguageAccess(user.id, 'german')}
                                                        className="btn-revoke-small"
                                                        title="Revoke all German access"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="no-access">No access</span>
                                            )}
                                        </td>
                                        <td>
                                            <strong>{totalAccess}</strong> / {masteryKits.length}
                                        </td>
                                        <td>
                                            <small style={{ color: '#666' }}>
                                                Use language columns →
                                            </small>
                                        </td>
                                    </tr>
                                );
                            })}
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
                    <h3>Total Languages</h3>
                    <p className="stat-number">{languages.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Kits</h3>
                    <p className="stat-number">{masteryKits.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Access Grants</h3>
                    <p className="stat-number">{purchases.length}</p>
                </div>
            </div>

            <style jsx>{`
        .grant-access-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
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

        .info-box {
          background: #e3f2fd;
          border: 1px solid #90caf9;
          border-radius: 8px;
          padding: 16px;
          margin-top: 12px;
        }

        .info-box strong {
          display: block;
          margin-bottom: 8px;
          color: #1976d2;
        }

        .info-box ul {
          margin: 8px 0 0 20px;
          color: #555;
        }

        .info-box li {
          margin: 4px 0;
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

        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .language-card {
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .language-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        .language-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e0e0e0;
        }

        .language-header h3 {
          margin: 0;
          font-size: 20px;
          color: #333;
        }

        .kit-count {
          background: #1F9F90;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .language-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #666;
        }

        .stat-icon {
          font-size: 16px;
        }

        .kit-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kit-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: white;
          border-radius: 6px;
          font-size: 13px;
        }

        .kit-name {
          color: #333;
          flex: 1;
        }

        .kit-files {
          color: #666;
          font-size: 12px;
        }

        .access-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .access-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .access-badge.complete {
          background: #d4edda;
          color: #155724;
        }

        .access-badge.partial {
          background: #fff3cd;
          color: #856404;
        }

        .no-access {
          color: #999;
          font-size: 13px;
        }

        .btn-revoke-small {
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 2px 8px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s;
        }

        .btn-revoke-small:hover {
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
