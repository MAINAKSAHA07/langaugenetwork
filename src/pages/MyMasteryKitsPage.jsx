import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserMasteryKits, getMasteryKitContent } from '../api/masteryKits';
import './MyMasteryKitsPage.css';

const MyMasteryKitsPage = () => {
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

    const handleAuthInputChange = (e) => {
        const { name, value } = e.target;
        setAuthForm((prev) => ({ ...prev, [name]: value }));
        setAuthError(null);
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError(null);

        try {
            if (authMode === 'login') {
                const res = await login(authForm.email, authForm.password);
                if (!res.success) {
                    setAuthError(res.error || 'Login failed. Please check your details.');
                }
            } else {
                if (!authForm.name) {
                    setAuthError('Please enter your name.');
                    return;
                }
                const res = await register(authForm.email, authForm.password, authForm.name);
                if (!res.success) {
                    setAuthError(res.error || 'Registration failed. Please try again.');
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
            setAuthError('Something went wrong. Please try again.');
        }
    };

    const fetchUserMasteryKits = async () => {
        try {
            setLoading(true);
            const kits = await getUserMasteryKits(user.id);
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
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={authForm.password}
                                onChange={handleAuthInputChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {authError && <div className="auth-error">{authError}</div>}

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
                                {masteryKits.map((kit) => (
                                    <div key={kit.id} className="mastery-kit-card">
                                        <div className="kit-thumbnail">
                                            <img src={kit.thumbnail} alt={kit.title} />
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
                                ))}
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
