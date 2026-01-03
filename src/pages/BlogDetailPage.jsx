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
    <div className="min-h-screen bg-white">
      {/* Header with Back Link */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-[#1F9F90] hover:text-[#177d70] text-sm font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </section>

      {/* Blog Content */}
      <article className="py-8 lg:py-12">
        <div className="container-custom max-w-4xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Meta Information */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                {blog.category && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full text-white bg-[#1F9F90]">
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
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}

              {/* Featured Image */}
              {getImageUrl(blog) && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(blog)}
                    alt={blog.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div 
                className="blog-content max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Social Share Sidebar */}
            <div className="lg:sticky lg:top-8 h-fit lg:ml-4">
              <div className="flex flex-row lg:flex-col gap-3 justify-center lg:justify-start">
                {/* WhatsApp Share */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>

                {/* Phone/Call Share */}
                <a
                  href={`tel:+918879328962`}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label="Call us"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>

                {/* Instagram Share */}
                <a
                  href={`https://www.instagram.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label="Share on Instagram"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
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
        </div>
      </article>

      {/* Back to Blogs Footer */}
      <div className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container-custom max-w-4xl mx-auto px-4 text-center">
          <Link
            to="/blogs"
            className="inline-block px-8 py-3 bg-[#1F9F90] text-white rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;




