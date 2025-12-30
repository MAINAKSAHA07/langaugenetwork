import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import pb from '../api/pocketbase';
import { getBlogBySlug } from '../api/blogs';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const loadBlog = async () => {
    setLoading(true);
    try {
      const result = await getBlogBySlug(slug);
      if (result.success) {
        setBlog(result.data);
      } else {
        navigate('/blogs');
      }
    } catch (error) {
      console.error('Failed to load blog:', error);
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (blog) => {
    if (blog.featuredImage) {
      return pb.files.getUrl(blog, blog.featuredImage);
    }
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1F9F90]"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom max-w-4xl">
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-[#1F9F90] hover:text-[#177d70] mb-4"
          >
            ← Back to Blogs
          </Link>
        </div>
      </section>

      {/* Blog Content */}
      <article className="py-12">
        <div className="container-custom max-w-4xl">
          {/* Featured Image */}
          {getImageUrl(blog) && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={getImageUrl(blog)}
                alt={blog.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center gap-4 mb-6">
            {blog.category && (
              <span className="text-sm font-semibold px-4 py-2 rounded-full text-white" style={{ backgroundColor: '#1F9F90' }}>
                {blog.category}
              </span>
            )}
            <span className="text-sm text-gray-500">
              {formatDate(blog.publishedAt || blog.created)}
            </span>
            {blog.author && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-600">By {blog.author}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{
              lineHeight: '1.8',
              color: '#374151'
            }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blogs?tag=${tag.toLowerCase()}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[#1F9F90] hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url);
                  alert('Link copied to clipboard!');
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                📋 Copy Link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
              >
                🐦 Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
              >
                📘 Facebook
              </a>
            </div>
          </div>

          {/* Back to Blogs */}
          <div className="mt-12 text-center">
            <Link
              to="/blogs"
              className="inline-block px-8 py-3 bg-[#1F9F90] text-white rounded-lg font-semibold hover:brightness-110 transition-all"
            >
              ← Back to All Blogs
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;

