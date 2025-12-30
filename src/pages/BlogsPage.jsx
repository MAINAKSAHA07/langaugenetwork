import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import pb from '../api/pocketbase';
import { getPublishedBlogs } from '../api/blogs';

const BlogsPage = () => {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedTag = searchParams.get('tag');

  useEffect(() => {
    loadBlogs();
  }, [selectedTag]);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const result = await getPublishedBlogs();
      if (result.success) {
        let filteredBlogs = result.data;
        
        // Filter by tag if selected
        if (selectedTag) {
          filteredBlogs = filteredBlogs.filter(blog => 
            blog.tags && blog.tags.some(tag => 
              tag.toLowerCase() === selectedTag.toLowerCase()
            )
          );
        }
        
        setBlogs(filteredBlogs);
      }
    } catch (error) {
      console.error('Failed to load blogs:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#1F9F90' }}>
        <div className="container-custom max-w-6xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Blog
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of language learning
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          {/* Language Filter Bar */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-[#1F9F90] rounded-full px-6 py-3 text-white font-medium text-sm md:text-base gap-4 md:gap-6 shadow-md overflow-x-auto whitespace-nowrap max-w-full">
              <Link to="/blogs?tag=french" className="hover:text-white/80 transition-colors">French</Link>
              <span className="w-px h-4 bg-white/40"></span>
              <Link to="/blogs?tag=german" className="hover:text-white/80 transition-colors">German</Link>
              <span className="w-px h-4 bg-white/40"></span>
              <Link to="/blogs?tag=spanish" className="hover:text-white/80 transition-colors">Spanish</Link>
              <span className="w-px h-4 bg-white/40"></span>
              <Link to="/blogs?tag=mandarin" className="hover:text-white/80 transition-colors">Mandarin</Link>
              <span className="w-px h-4 bg-white/40"></span>
              <Link to="/blogs?tag=english" className="hover:text-white/80 transition-colors">English</Link>
              <span className="w-px h-4 bg-white/40"></span>
              <Link to="/blogs?tag=korean" className="hover:text-white/80 transition-colors">Korean</Link>
              <span className="w-px h-4 bg-white/40"></span>
              <Link to="/blogs?tag=japanese" className="hover:text-white/80 transition-colors">Japanese</Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1F9F90]"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {selectedTag 
                  ? `No blog posts found for "${selectedTag}"`
                  : 'No blog posts available yet. Check back soon!'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <article key={blog.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {getImageUrl(blog) ? (
                        <img
                          src={getImageUrl(blog)}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        {blog.category && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#1F9F90' }}>
                            {blog.category}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{formatDate(blog.publishedAt || blog.created)}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 mb-3">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {blog.excerpt || blog.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                      </p>
                      {blog.author && (
                        <p className="text-sm text-gray-500 mb-4">By {blog.author}</p>
                      )}
                      <Link 
                        to={`/blog/${blog.slug}`}
                        className="text-sm font-semibold transition-colors" 
                        style={{ color: '#1F9F90' }}
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-secondary-navy mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest articles and language learning tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none"
            />
            <button
              className="px-8 py-3 text-white rounded-lg font-semibold transition-all hover:brightness-110"
              style={{ backgroundColor: '#1F9F90' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
