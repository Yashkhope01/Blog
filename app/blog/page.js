"use client";

import React, { useState, useEffect } from 'react';  
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { blogAPI } from '@/lib/api';


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, category]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;
      
      const response = await blogAPI.getBlogs(params);
      setBlogs(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-2xl">Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-2xl text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Main heading for the blog section */}
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile">Mobile</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center text-2xl py-12">No blogs found</div>
      ) : (
        /* Grid layout for blog posts */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="rounded-lg shadow-md overflow-hidden dark:border-2 hover:shadow-xl transition-shadow">
              {/* Blog post image */}
              <img 
                src={blog.image?.startsWith('/uploads') 
                  ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${blog.image}`
                  : blog.image || '/typescript.webp'
                } 
                alt={blog.title} 
                className="w-full h-64 object-cover" 
              />
              
              {/* Blog post content */}
              <div className="p-4">
                {/* Category badge */}
                {blog.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
                    {blog.category}
                  </span>
                )}
                
                {/* Blog post title */}
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                
                {/* Blog post description */}
                <p className="mb-4 line-clamp-3">{blog.description}</p>
                
                {/* Blog post author and date */}
                <div className="text-sm mb-4 flex items-center justify-between">
                  <span>By {blog.authorName || blog.author?.name}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>

                {/* Views and likes */}
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex gap-4">
                  <span>👁️ {blog.views || 0} views</span>
                  <span>❤️ {blog.likes?.length || 0} likes</span>
                </div>
                
                {/* Link to the full blog post */}
                <Link href={`/blogpost/${blog.slug}`} className={buttonVariants({ variant: "outline" })}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Blog;