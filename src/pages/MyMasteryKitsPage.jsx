import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserMasteryKits, getMasteryKitContent } from '../api/masteryKits';
import pb from '../config/pocketbase';
import './MyMasteryKitsPage.css';

const MyMasteryKitsPage = () => {
    const location = useLocation();
    const { user, login, register, loading: authLoading } = useAuth();
    const [masteryKits, setMasteryKits] = useState([]);
    const [selectedKit, setSelectedKit] = useState(null);
    const [kitContent, setKitContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFile, setActiveFile] = useState(null); // file currently shown in inline viewer
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
    const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchUserMasteryKits();
        } else {
            // Not logged in, stop loading state for list
            setLoading(false);
        }
    }, [user]);

    // Allow deep-linking into login/register from footer
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const mode = params.get('mode');
        if (mode === 'register') setAuthMode('register');
        if (mode === 'login') setAuthMode('login');
    }, [location.search]);

    const handleAuthInputChange = (e) => {
        const { name, value } = e.target;
        setAuthForm((prev) => ({ ...prev, [name]: value }));
        setAuthError(null);
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError(null);

        if (authMode === 'register') {
            if (!authForm.name?.trim()) {
                setAuthError('Please enter your name.');
                return;
            }
            if (authForm.password.length < 8) {
                setAuthError('Password must be at least 8 characters.');
                return;
            }
        }

        try {
            let res;
            if (authMode === 'login') {
                res = await login(authForm.email, authForm.password);
                if (!res.success) {
                    setAuthError(res.error || 'Login failed. Please check your details.');
                    return;
                }
            } else {
                res = await register(authForm.email, authForm.password, authForm.name?.trim());
                if (!res.success) {
                    setAuthError(res.error || 'Registration failed. Please try again.');
                    return;
                }
            }
            // res.user is the newly authenticated user — pass directly so we
            // don't race against the AuthContext state update
            if (res.user) {
                await fetchUserMasteryKits(res.user);
            }
        } catch (err) {
            console.error('Auth error:', err);
            setAuthError(err?.message || 'Something went wrong. Please try again.');
        }
    };

    /**
     * Grants mastery kit access for any completed Razorpay orders
     * that match the logged-in user's email but haven't been assigned yet.
     * This runs in an authenticated context so all PocketBase rules pass.
     */
    const grantPendingAccess = async (loggedInUser) => {
        try {
            // 1. Find completed mastery-kit orders for this email
            const pendingOrders = await pb.collection('orders').getFullList({
                filter: `customerEmail="${loggedInUser.email}" && courseType="mastery-kit" && status="completed"`,
            });

            if (pendingOrders.length === 0) return;

            // 2. Get all kits this user already has access to
            const existingPurchases = await pb.collection('mastery_kit_purchases').getFullList({
                filter: `user="${loggedInUser.id}"`,
            });
            const alreadyGranted = new Set(existingPurchases.map(p => p.mastery_kit));

            // 3. For each order, find the matching language kits and grant access
            let granted = 0;
            for (const order of pendingOrders) {
                if (!order.language) continue;

                const kits = await pb.collection('mastery_kits').getFullList({
                    filter: `language="${order.language.toLowerCase()}"`,
                });

                for (const kit of kits) {
                    if (alreadyGranted.has(kit.id)) continue;

                    await pb.collection('mastery_kit_purchases').create({
                        user: loggedInUser.id,
                        mastery_kit: kit.id,
                        purchase_date: order.completedAt || new Date().toISOString(),
                        payment_status: 'completed',
                        transaction_id: order.razorpayPaymentId || `ORDER_${order.id}`,
                        amount: order.amount,
                    });

                    alreadyGranted.add(kit.id);
                    granted++;
                }
            }

            if (granted > 0) {
                console.log(`✅ Granted access to ${granted} mastery kit(s)`);
            }
        } catch (err) {
            // Non-fatal — don't block the page from loading
            console.error('grantPendingAccess error:', err);
        }
    };

    const fetchUserMasteryKits = async (loggedInUser) => {
        const targetUser = loggedInUser || user;
        try {
            setLoading(true);
            // First grant any access that hasn't been assigned yet
            await grantPendingAccess(targetUser);
            const kits = await getUserMasteryKits(targetUser.id);
            setMasteryKits(kits);
        } catch (err) {
            setError('Failed to load your mastery kits');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewContent = async (kitId) => {
        try {
            setLoading(true);
            const content = await getMasteryKitContent(user.id, kitId);
            setKitContent(content);
            setSelectedKit(kitId);
            // Default to first file in the kit (if any) for inline viewing
            if (content.files && content.files.length > 0) {
                setActiveFile(content.files[0]);
            }
        } catch (err) {
            setError('Failed to load mastery kit content');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToList = () => {
        setSelectedKit(null);
        setKitContent(null);
        setActiveFile(null);
    };

    if (!user) {
        return (
            <div className="my-mastery-kits-page">
                <div className="auth-required">
                    <h1>Access Your Mastery Kits</h1>
                    <p className="auth-subtitle">
                        Mastery Kit content is protected. Please {authMode === 'login' ? 'log in' : 'create an account'} using
                        the <strong>same email ID</strong> you used to purchase.
                    </p>

                    {/* How to Access Steps */}
                    <div className="access-steps-container">
                        <h3 className="access-steps-title">📚 How to Access Your Kits</h3>
                        <div className="access-steps">
                            <div className="access-step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Purchase a Mastery Kit</h4>
                                    <p>Complete your payment using Razorpay on any mastery kit page</p>
                                </div>
                            </div>
                            <div className="access-step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>{authMode === 'login' ? 'Login to Your Account' : 'Create Your Account'}</h4>
                                    <p>
                                        {authMode === 'login'
                                            ? 'Use the same email you used during purchase to login'
                                            : 'New user? Create your account first with the same email used during purchase, then login'
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="access-step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Access Granted Automatically</h4>
                                    <p>Your kits will appear here instantly after login</p>
                                </div>
                            </div>
                            <div className="access-step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h4>Download & Learn</h4>
                                    <p>Click on any kit to view and download all materials</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="auth-toggle">
                        <button
                            className={authMode === 'login' ? 'auth-tab active' : 'auth-tab'}
                            onClick={() => setAuthMode('login')}
                        >
                            Login
                        </button>
                        <button
                            className={authMode === 'register' ? 'auth-tab active' : 'auth-tab'}
                            onClick={() => setAuthMode('register')}
                        >
                            Create Account
                        </button>
                    </div>

                    <form className="auth-form" onSubmit={handleAuthSubmit}>
                        {authMode === 'register' && (
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={authForm.name}
                                    onChange={handleAuthInputChange}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={authForm.email}
                                onChange={handleAuthInputChange}
                                placeholder="Email used to buy the Mastery Kit"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password {authMode === 'register' && '(min 8 characters)'}</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={authForm.password}
                                onChange={handleAuthInputChange}
                                placeholder={authMode === 'register' ? 'At least 8 characters' : 'Your password'}
                                required
                                minLength={authMode === 'register' ? 8 : undefined}
                            />
                        </div>

                        {authError && (
                            <div className="auth-error" role="alert">
                                {authError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary auth-submit"
                            disabled={authLoading}
                        >
                            {authLoading
                                ? 'Please wait...'
                                : authMode === 'login'
                                    ? 'Login & View My Kits'
                                    : 'Create Account & View My Kits'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading && masteryKits.length === 0) {
        return (
            <div className="my-mastery-kits-page">
                <div className="loading">Loading your mastery kits...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-mastery-kits-page">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="my-mastery-kits-page">
            <div className="container">
                {!selectedKit ? (
                    <>
                        <header className="page-header">
                            <h1>My Mastery Kits</h1>
                            <p>Access your purchased language learning materials</p>
                        </header>

                        {masteryKits.length === 0 ? (
                            <div className="empty-state">
                                <h2>No Mastery Kits Yet</h2>
                                <p>You haven't purchased any mastery kits yet.</p>
                                <a href="/mastery-kits" className="btn-primary">
                                    Browse Mastery Kits
                                </a>
                            </div>
                        ) : (
                            <div className="mastery-kits-grid">
                                {masteryKits.map((kit) => {
                                    // Map language to image
                                    const getKitImage = (language) => {
                                        const languageLower = language?.toLowerCase() || '';
                                        if (languageLower.includes('french')) {
                                            return '/images/masterykit/frenchmasterykit.png';
                                        } else if (languageLower.includes('german')) {
                                            return '/images/masterykit/germanmasterylit.png';
                                        } else if (languageLower.includes('english')) {
                                            return '/images/masterykit/englishmasterykit.png';
                                        }
                                        // Fallback to thumbnail if available
                                        return kit.thumbnail || '/images/masterykit/frenchmasterykit.png';
                                    };

                                    return (
                                        <div key={kit.id} className="mastery-kit-card">
                                            <div className="kit-thumbnail">
                                                <img src={getKitImage(kit.language)} alt={kit.title} />
                                            </div>
                                            <div className="kit-info">
                                                <h3>{kit.title}</h3>
                                                <p className="kit-language">{kit.language}</p>
                                                <p className="kit-description">{kit.description}</p>
                                                <p className="purchase-date">
                                                    Purchased: {new Date(kit.purchaseDate).toLocaleDateString()}
                                                </p>
                                                <button
                                                    className="btn-primary"
                                                    onClick={() => handleViewContent(kit.id)}
                                                >
                                                    Access Content
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="kit-content-viewer">
                        <button className="btn-back" onClick={handleBackToList}>
                            ← Back to My Kits
                        </button>

                        {kitContent && (
                            <>
                                <header className="content-header">
                                    <h1>{kitContent.title}</h1>
                                    <p>{kitContent.description}</p>
                                </header>

                                <div className="content-files">
                                    <h2>Course Materials</h2>
                                    <div className="files-list">
                                        {kitContent.files.map((fileUrl, index) => {
                                            const fileName = fileUrl.split('/').pop().split('?')[0];
                                            const fileExtension = fileName.split('.').pop().toLowerCase();
                                            const isPdf = fileExtension === 'pdf';
                                            const isVideo = fileExtension === 'mp4';
                                            const isAudio = fileExtension === 'mp3';
                                            const isZip = fileExtension === 'zip';

                                            return (
                                                <div
                                                    key={index}
                                                    className={`file-item ${activeFile === fileUrl ? 'file-item-active' : ''}`}
                                                    onClick={() => setActiveFile(fileUrl)}
                                                >
                                                    <div className="file-icon">
                                                        {isPdf && '📄'}
                                                        {isVideo && '🎥'}
                                                        {isAudio && '🎵'}
                                                        {isZip && '🗂️'}
                                                        {!isPdf && !isVideo && !isAudio && !isZip && '📎'}
                                                    </div>
                                                    <div className="file-info">
                                                        <p className="file-name">{fileName}</p>
                                                        <p className="file-type">{fileExtension.toUpperCase()}</p>
                                                    </div>
                                                    <div className="file-actions" onClick={(e) => e.stopPropagation()}>
                                                        {(isPdf || isVideo || isAudio) && (
                                                            <button
                                                                type="button"
                                                                className="btn-secondary"
                                                                onClick={() => setActiveFile(fileUrl)}
                                                            >
                                                                {isPdf ? 'Open' : 'Play'}
                                                            </button>
                                                        )}
                                                        {/* Always allow direct download (PDFs, ZIPs, any file) */}
                                                        <a
                                                            href={fileUrl}
                                                            download
                                                            className="btn-primary"
                                                        >
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Embedded viewer for the currently selected file */}
                                <div className="content-preview">
                                    {activeFile && (() => {
                                        const ext = activeFile.split('.').pop().split('?')[0].toLowerCase();

                                        if (ext === 'pdf') {
                                            return (
                                                <div className="pdf-viewer">
                                                    <h3>PDF Viewer</h3>
                                                    <iframe
                                                        src={activeFile}
                                                        title="PDF Viewer"
                                                        width="100%"
                                                        height="800px"
                                                    />
                                                </div>
                                            );
                                        }

                                        if (ext === 'mp4') {
                                            return (
                                                <div className="video-player">
                                                    <h3>Video Player</h3>
                                                    <video controls width="100%">
                                                        <source src={activeFile} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </div>
                                            );
                                        }

                                        if (ext === 'mp3') {
                                            return (
                                                <div className="audio-player">
                                                    <h3>Audio Player</h3>
                                                    <audio controls>
                                                        <source src={activeFile} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                </div>
                                            );
                                        }

                                        // For ZIP and other formats we only support downloading (no inline preview)
                                        return (
                                            <div className="download-only">
                                                <h3>Download File</h3>
                                                <p>This file type can be downloaded to your device.</p>
                                                <a href={activeFile} download className="btn-primary">
                                                    Download
                                                </a>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyMasteryKitsPage;
