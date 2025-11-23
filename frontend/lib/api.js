const API_URL = process.env.NEXT_PUBLIC_API_URL ;

// Helper function to get auth token
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
};

// Auth API
export const authAPI = {
    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    login: async (credentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return handleResponse(response);
    },

    getMe: async () => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    updateProfile: async (userData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },
};

// Blog API
export const blogAPI = {
    getBlogs: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_URL}/blogs?${queryString}`);
        return handleResponse(response);
    },

    getFeaturedBlogs: async () => {
        const response = await fetch(`${API_URL}/blogs/featured`);
        return handleResponse(response);
    },

    getBlogBySlug: async (slug) => {
        const response = await fetch(`${API_URL}/blogs/${slug}`);
        return handleResponse(response);
    },

    createBlog: async (formData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // FormData for file upload
        });
        return handleResponse(response);
    },

    updateBlog: async (id, formData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/blogs/id/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        return handleResponse(response);
    },

    deleteBlog: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/blogs/id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    likeBlog: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/blogs/id/${id}/like`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },
};

// Comment API

export const commentAPI = {
    getComments: async (blogId) => {
    const response = await fetch(`${API_URL}/comments/blog/${blogId}`);
        return handleResponse(response);
    },

    createComment: async (commentData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                blog: commentData.blog,
                content: commentData.content
                
            }),
        });
        return handleResponse(response);
    },

    updateComment: async (id, content) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/comments/id/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        });
        return handleResponse(response);
    },

    deleteComment: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/comments/id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    likeComment: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/comments/id/${id}/like`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },
};

// Contact API
export const contactAPI = {
    submitContact: async (contactData) => {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });
        return handleResponse(response);
    },

    getContacts: async (params = {}) => {
        const token = getAuthToken();
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_URL}/contact?${queryString}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    updateContact: async (id, data) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/contact/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    deleteContact: async (id) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },
};

