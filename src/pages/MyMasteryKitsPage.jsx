import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserMasteryKits, getMasteryKitContent } from '../api/masteryKits';
import './MyMasteryKitsPage.css';

const MyMasteryKitsPage = () => {
    const { user } = useAuth();
    const [masteryKits, setMasteryKits] = useState([]);
    const [selectedKit, setSelectedKit] = useState(null);
    const [kitContent, setKitContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchUserMasteryKits();
        }
    }, [user]);

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
    };

    if (!user) {
        return (
            <div className="my-mastery-kits-page">
                <div className="auth-required">
                    <h2>Please Login</h2>
                    <p>You need to be logged in to view your mastery kits.</p>
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

                                            return (
                                                <div key={index} className="file-item">
                                                    <div className="file-icon">
                                                        {fileExtension === 'pdf' && '📄'}
                                                        {fileExtension === 'mp4' && '🎥'}
                                                        {fileExtension === 'mp3' && '🎵'}
                                                        {!['pdf', 'mp4', 'mp3'].includes(fileExtension) && '📎'}
                                                    </div>
                                                    <div className="file-info">
                                                        <p className="file-name">{fileName}</p>
                                                        <p className="file-type">{fileExtension.toUpperCase()}</p>
                                                    </div>
                                                    <div className="file-actions">
                                                        {fileExtension === 'pdf' && (
                                                            <a
                                                                href={fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn-secondary"
                                                            >
                                                                View
                                                            </a>
                                                        )}
                                                        {(fileExtension === 'mp4' || fileExtension === 'mp3') && (
                                                            <a
                                                                href={fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn-secondary"
                                                            >
                                                                Play
                                                            </a>
                                                        )}
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

                                {/* Embedded viewer for PDFs and videos */}
                                <div className="content-preview">
                                    {kitContent.files.map((fileUrl, index) => {
                                        const fileExtension = fileUrl.split('.').pop().split('?')[0].toLowerCase();

                                        if (fileExtension === 'pdf') {
                                            return (
                                                <div key={index} className="pdf-viewer">
                                                    <h3>PDF Viewer</h3>
                                                    <iframe
                                                        src={fileUrl}
                                                        title={`PDF ${index + 1}`}
                                                        width="100%"
                                                        height="800px"
                                                    />
                                                </div>
                                            );
                                        }

                                        if (fileExtension === 'mp4') {
                                            return (
                                                <div key={index} className="video-player">
                                                    <h3>Video Player</h3>
                                                    <video controls width="100%">
                                                        <source src={fileUrl} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
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
