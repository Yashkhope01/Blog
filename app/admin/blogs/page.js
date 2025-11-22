"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { blogAPI } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ManageBlogs() {
    const { isAdmin, loading: authLoading } = useAuth();
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            router.push('/login');
        } else if (isAdmin) {
            fetchBlogs();
        }
    }, [authLoading, isAdmin, router]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await blogAPI.getBlogs({ published: 'false' }); // Get all blogs
            setBlogs(response.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await blogAPI.deleteBlog(id);
                fetchBlogs();
            } catch (err) {
                console.error('Error deleting blog:', err);
                alert('Failed to delete blog');
            }
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Manage Blogs</h1>
                    <div className="flex gap-4">
                        <Link href="/admin/blogs/create">
                            <Button>Create New Blog</Button>
                        </Link>
                        <Link href="/admin">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-2xl mb-4">No blogs yet</p>
                        <Link href="/admin/blogs/create">
                            <Button>Create Your First Blog</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {blogs.map((blog) => (
                            <div 
                                key={blog._id} 
                                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-bold">{blog.title}</h2>
                                            {!blog.published && (
                                                <span className="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
                                                    Draft
                                                </span>
                                            )}
                                            {blog.category && (
                                                <span className="px-2 py-1 text-xs bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                                                    {blog.category}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                                            {blog.description}
                                        </p>
                                        <div className="text-sm text-gray-500 dark:text-gray-500 flex gap-4">
                                            <span>Slug: {blog.slug}</span>
                                            <span>👁️ {blog.views} views</span>
                                            <span>❤️ {blog.likes?.length || 0} likes</span>
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Link href={`/blogpost/${blog.slug}`}>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/blogs/edit/${blog._id}`}>
                                            <Button variant="default" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={() => handleDelete(blog._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

