"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { contactAPI } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ManageContacts() {
    const { isAdmin, loading: authLoading } = useAuth();
    const router = useRouter();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            router.push('/login');
        } else if (isAdmin) {
            fetchContacts();
        }
    }, [authLoading, isAdmin, router, filter]);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const params = filter ? { status: filter } : {};
            const response = await contactAPI.getContacts(params);
            setContacts(response.data);
        } catch (err) {
            console.error('Error fetching contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await contactAPI.deleteContact(id);
                fetchContacts();
                if (selectedContact?._id === id) {
                    setSelectedContact(null);
                }
            } catch (err) {
                console.error('Error deleting contact:', err);
                alert('Failed to delete message');
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await contactAPI.updateContact(id, { status: newStatus });
            fetchContacts();
            if (selectedContact?._id === id) {
                setSelectedContact({ ...selectedContact, status: newStatus });
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
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
                    <h1 className="text-4xl font-bold">Contact Messages</h1>
                    <Link href="/admin">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>

                {/* Filter buttons */}
                <div className="mb-6 flex gap-4">
                    <Button 
                        variant={filter === '' ? 'default' : 'outline'}
                        onClick={() => setFilter('')}
                    >
                        All
                    </Button>
                    <Button 
                        variant={filter === 'unread' ? 'default' : 'outline'}
                        onClick={() => setFilter('unread')}
                    >
                        Unread
                    </Button>
                    <Button 
                        variant={filter === 'read' ? 'default' : 'outline'}
                        onClick={() => setFilter('read')}
                    >
                        Read
                    </Button>
                    <Button 
                        variant={filter === 'replied' ? 'default' : 'outline'}
                        onClick={() => setFilter('replied')}
                    >
                        Replied
                    </Button>
                </div>

                {contacts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-2xl">No contact messages</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Messages List */}
                        <div className="space-y-4">
                            {contacts.map((contact) => (
                                <div 
                                    key={contact._id} 
                                    className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${
                                        selectedContact?._id === contact._id 
                                            ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500' 
                                            : 'bg-white dark:bg-gray-800 border dark:border-gray-700 hover:shadow-lg'
                                    }`}
                                    onClick={() => setSelectedContact(contact)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold">{contact.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded ${
                                            contact.status === 'unread' ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                            contact.status === 'read' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                            'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        }`}>
                                            {contact.status}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-sm mb-1">{contact.subject}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {contact.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(contact.createdAt).toLocaleDateString('en-GB', { 
                                            day: '2-digit', 
                                            month: 'long', 
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Message Detail */}
                        <div className="sticky top-4">
                            {selectedContact ? (
                                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700">
                                    <h2 className="text-2xl font-bold mb-4">Message Details</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">From:</label>
                                            <p className="font-semibold">{selectedContact.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedContact.email}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Subject:</label>
                                            <p className="font-semibold">{selectedContact.subject}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Message:</label>
                                            <p className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 rounded">
                                                {selectedContact.message}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Received:</label>
                                            <p className="text-sm">
                                                {new Date(selectedContact.createdAt).toLocaleDateString('en-GB', { 
                                                    day: '2-digit', 
                                                    month: 'long', 
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-500 block mb-2">
                                                Status:
                                            </label>
                                            <select
                                                value={selectedContact.status}
                                                onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                                            >
                                                <option value="unread">Unread</option>
                                                <option value="read">Read</option>
                                                <option value="replied">Replied</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <a 
                                                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                                                className="flex-1"
                                            >
                                                <Button className="w-full">
                                                    Reply via Email
                                                </Button>
                                            </a>
                                            <Button 
                                                variant="destructive"
                                                onClick={() => handleDelete(selectedContact._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 text-center">
                                    <p className="text-gray-500">Select a message to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

