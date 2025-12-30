import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pb from '../../../api/pocketbase';

const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    published: false,
    publishedAt: '',
    author: '',
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
      return;
    }

    if (isEditing) {
      loadBlog();
    }
  }, [id]);

  const loadBlog = async () => {
    try {
      const blog = await pb.collection('blogs').getOne(id);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt || '',
        category: blog.category || '',
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
        published: blog.published,
        publishedAt: blog.publishedAt || '',
        author: blog.author || '',
      });

      // Set existing image
      if (blog.featuredImage) {
        setExistingImage(blog.featuredImage);
        const imageUrl = pb.files.getUrl(blog, blog.featuredImage);
        setImagePreview(imageUrl);
      }
    } catch (error) {
      console.error('Failed to load blog:', error);
      alert('Failed to load blog post');
      navigate('/admin/blogs');
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
    setExistingImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      // Prepare form data for file upload
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('published', formData.published);
      formDataToSend.append('publishedAt', formData.published && !formData.publishedAt
        ? new Date().toISOString()
        : formData.publishedAt);

      // Add tags as JSON
      const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
      formDataToSend.append('tags', JSON.stringify(tags));

      // Add image if selected
      if (featuredImage) {
        formDataToSend.append('featuredImage', featuredImage);
      }

      if (isEditing) {
        await pb.collection('blogs').update(id, formDataToSend);
        setSaveStatus('Blog post updated successfully!');
      } else {
        await pb.collection('blogs').create(formDataToSend);
        setSaveStatus('Blog post created successfully!');
      }

      setTimeout(() => {
        navigate('/admin/blogs');
      }, 1500);
    } catch (error) {
      console.error('Failed to save blog:', error);
      setSaveStatus('Error: ' + (error.message || 'Failed to save blog post'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="text-gray-600 hover:text-[#FF6B35] mb-2 flex items-center"
          >
            ← Back to Blogs
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg ${saveStatus.startsWith('Error')
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
            {saveStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              placeholder="Enter blog title..."
            />
          </div>

          {/* Slug */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              placeholder="blog-post-url"
            />
            <p className="text-sm text-gray-500 mt-1">
              URL-friendly version (auto-generated from title)
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              placeholder="Brief description (max 300 chars)"
              maxLength={300}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.excerpt.length}/300 characters
            </p>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            {imagePreview ? (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="featuredImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="featuredImage"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600">Click to upload featured image</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</span>
                </label>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-mono text-sm"
              placeholder="Write your blog content in HTML..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Supports HTML formatting
            </p>
          </div>

          {/* Meta Information */}
          <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                <option value="">Select category...</option>
                <option value="News">News</option>
                <option value="Tips">Tips</option>
                <option value="Success Stories">Success Stories</option>
                <option value="Events">Events</option>
                <option value="Career">Career</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                placeholder="Author name..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                placeholder="French, Learning, Tips..."
              />
            </div>
          </div>

          {/* Publish Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">
                Publish immediately
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formData.published
                ? '✓ This post will be visible to all visitors'
                : '📝 This post will be saved as a draft'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#e55a2b] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Blog Post' : 'Create Blog Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/blogs')}
              className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminBlogEditor;

