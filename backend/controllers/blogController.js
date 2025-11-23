import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Helper: upload file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_images" },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

// ========================== GET ALL BLOGS ==========================
export const getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = req.query.published === 'false' ? {} : { published: true };

        // Search functionality
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        // Category filter
        if (req.query.category) {
            query.category = req.query.category;
        }

        const blogs = await Blog.find(query)
            .populate('author', 'name email avatar')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const total = await Blog.countDocuments(query);

        res.json({
            success: true,
            count: blogs.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ========================== GET BLOG BY SLUG ==========================
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'name email avatar bio');

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Increment views
        blog.views += 1;
        await blog.save();

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ========================== CREATE BLOG ==========================
export const createBlog = async (req, res) => {
    try {
        const { title, description, content, slug, category, tags, published } = req.body;

        // Check if slug already exists
        if (slug) {
            const existingBlog = await Blog.findOne({ slug });
            if (existingBlog) {
                return res.status(400).json({
                    success: false,
                    message: 'Slug already exists'
                });
            }
        }

        // Handle Image Upload (Cloudinary)
        let imageUrl = req.body.image || "/typescript.webp";

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const blog = await Blog.create({
    title,
    description,
    content,
    slug: slug || title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-'),
    author: req.user._id,
    authorName: req.user.username || req.user.name || req.user.email,  
    image: imageUrl,
    category,
    tags,
    published
});

        res.status(201).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ========================== UPDATE BLOG ==========================
export const updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Slug validation
        if (req.body.slug && req.body.slug !== blog.slug) {
            const existingBlog = await Blog.findOne({ slug: req.body.slug });
            if (existingBlog) {
                return res.status(400).json({
                    success: false,
                    message: 'Slug already exists'
                });
            }
        }

        // If new image uploaded
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            req.body.image = result.secure_url;
        }

        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ========================== DELETE BLOG ==========================
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Delete associated comments
        await Comment.deleteMany({ blog: blog._id });

        await blog.deleteOne();

        res.json({
            success: true,
            message: 'Blog and associated comments deleted'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ========================== LIKE BLOG ==========================
export const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        const isLiked = blog.likes.includes(req.user._id);

        if (isLiked) {
            blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            blog.likes.push(req.user._id);
        }

        await blog.save();

        res.json({
            success: true,
            data: {
                likes: blog.likes.length,
                isLiked: !isLiked
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ========================== FEATURED BLOGS ==========================
export const getFeaturedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true })
            .sort({ views: -1, likes: -1 })
            .limit(6)
            .populate('author', 'name avatar');

        res.json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
