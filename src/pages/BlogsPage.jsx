import React from 'react';
import { Link } from 'react-router-dom';

const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: 'Top 10 Tips for Learning a New Language',
      excerpt: 'Discover the most effective strategies to accelerate your language learning journey...',
      date: 'December 15, 2024',
      category: 'Learning Tips',
      image: '/images/blog/blog-1.jpg'
    },
    {
      id: 2,
      title: 'Why Learning French Can Boost Your Career',
      excerpt: 'Explore how mastering French can open up international career opportunities...',
      date: 'December 10, 2024',
      category: 'Career',
      image: '/images/blog/blog-2.jpg'
    },
    {
      id: 3,
      title: 'Understanding CEFR Levels: A Complete Guide',
      excerpt: 'Learn everything you need to know about the Common European Framework of Reference...',
      date: 'December 5, 2024',
      category: 'Education',
      image: '/images/blog/blog-3.jpg'
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg></div>';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#1F9F90' }}>
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-500">{blog.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {blog.excerpt}
                  </p>
                  <button className="text-sm font-semibold transition-colors" style={{ color: '#1F9F90' }}>
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">More articles coming soon! Stay tuned for language learning tips and insights.</p>
          </div>
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
