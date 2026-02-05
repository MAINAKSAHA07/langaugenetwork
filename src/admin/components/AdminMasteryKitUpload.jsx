import React, { useState } from 'react';
import { createMasteryKit } from '../../api/masteryKits';
import './AdminMasteryKitUpload.css';

const AdminMasteryKitUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        language: '',
        description: '',
        price: '',
    });
    const [files, setFiles] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const languages = [
        'French',
        'Spanish',
        'German',
        'Japanese',
        'Korean',
        'Mandarin',
        'IELTS',
        'English',
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validation
        if (!formData.title || !formData.language || !formData.price) {
            setError('Please fill in all required fields');
            return;
        }

        if (files.length === 0) {
            setError('Please upload at least one file');
            return;
        }

        if (!thumbnail) {
            setError('Please upload a thumbnail image');
            return;
        }

        try {
            setUploading(true);

            await createMasteryKit(
                {
                    title: formData.title,
                    language: formData.language.toLowerCase(),
                    description: formData.description,
                    price: parseFloat(formData.price),
                },
                files,
                thumbnail
            );

            setSuccess(true);

            // Reset form
            setFormData({
                title: '',
                language: '',
                description: '',
                price: '',
            });
            setFiles([]);
            setThumbnail(null);

            // Reset file inputs
            document.getElementById('files-input').value = '';
            document.getElementById('thumbnail-input').value = '';

            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err.message || 'Failed to upload mastery kit');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="admin-mastery-kit-upload">
            <div className="upload-container">
                <header className="upload-header">
                    <h1>Upload New Mastery Kit</h1>
                    <p>Add course materials to S3 storage</p>
                </header>

                {error && (
                    <div className="alert alert-error">
                        <span className="alert-icon">⚠️</span>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        <span className="alert-icon">✅</span>
                        Mastery kit uploaded successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="upload-form">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h2>Basic Information</h2>

                        <div className="form-group">
                            <label htmlFor="title">Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., French Mastery Kit: Beginner to Advanced"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="language">Language *</label>
                            <select
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a language</option>
                                {languages.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe what's included in this mastery kit..."
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price (₹) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="e.g., 999"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="form-section">
                        <h2>Thumbnail Image</h2>

                        <div className="form-group">
                            <label htmlFor="thumbnail-input">Upload Thumbnail *</label>
                            <input
                                type="file"
                                id="thumbnail-input"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                required
                            />
                            {thumbnail && (
                                <div className="file-preview">
                                    <img
                                        src={URL.createObjectURL(thumbnail)}
                                        alt="Thumbnail preview"
                                        className="thumbnail-preview"
                                    />
                                    <p className="file-name">{thumbnail.name}</p>
                                    <p className="file-size">{formatFileSize(thumbnail.size)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Course Files Upload */}
                    <div className="form-section">
                        <h2>Course Files</h2>

                        <div className="form-group">
                            <label htmlFor="files-input">Upload Files (PDFs, Videos, Audio) *</label>
                            <input
                                type="file"
                                id="files-input"
                                multiple
                                accept=".pdf,.mp4,.mp3,.doc,.docx,.zip"
                                onChange={handleFileChange}
                                required
                            />
                            <p className="help-text">
                                Supported formats: PDF, MP4, MP3, DOC, DOCX, ZIP
                            </p>
                        </div>

                        {files.length > 0 && (
                            <div className="files-list">
                                <h3>Selected Files ({files.length})</h3>
                                {files.map((file, index) => (
                                    <div key={index} className="file-item">
                                        <div className="file-info">
                                            <span className="file-icon">
                                                {file.name.endsWith('.pdf') && '📄'}
                                                {file.name.endsWith('.mp4') && '🎥'}
                                                {file.name.endsWith('.mp3') && '🎵'}
                                                {file.name.endsWith('.zip') && '📦'}
                                                {!file.name.match(/\.(pdf|mp4|mp3|zip)$/) && '📎'}
                                            </span>
                                            <div>
                                                <p className="file-name">{file.name}</p>
                                                <p className="file-size">{formatFileSize(file.size)}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="btn-remove"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Upload Progress */}
                    {uploading && (
                        <div className="upload-progress">
                            <div className="progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                            <p>Uploading to S3... Please wait</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload Mastery Kit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminMasteryKitUpload;
