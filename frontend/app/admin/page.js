"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.push('/login');
        }
    }, [loading, isAdmin, router]);

    if (loading) {
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
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
                
                <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Welcome, {user?.name}!</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your blog from here. Create, edit, and delete posts, view contact messages, and more.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Manage Blogs */}
                    <Link href="/admin/blogs">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-xl font-bold mb-2">Manage Blogs</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Create, edit, and delete blog posts
                            </p>
                        </div>
                    </Link>

                    {/* View Contact Messages */}
                    <Link href="/admin/contacts">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
                            <div className="text-4xl mb-4">📧</div>
                            <h3 className="text-xl font-bold mb-2">Contact Messages</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                View and respond to contact form submissions
                            </p>
                        </div>
                    </Link>

                    {/* Create New Blog */}
                    <Link href="/admin/blogs/create">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-500">
                            <div className="text-4xl mb-4">➕</div>
                            <h3 className="text-xl font-bold mb-2">Create New Blog</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Write and publish a new blog post
                            </p>
                        </div>
                    </Link>

                    {/* View All Blogs */}
                    <Link href="/blog">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-500">
                            <div className="text-4xl mb-4">👀</div>
                            <h3 className="text-xl font-bold mb-2">View Public Blog</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                See how your blog looks to visitors
                            </p>
                        </div>
                    </Link>

                    
                    </div>
                </div>
            </div>
        </div>
    );
}

