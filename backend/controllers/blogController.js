import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
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

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
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

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
    try {
        const { title, description, content, slug, category, tags, published } = req.body;

        // Check if slug exists
        if (slug) {
            const existingBlog = await Blog.findOne({ slug });
            if (existingBlog) {
                return res.status(400).json({
                    success: false,
                    message: 'Slug already exists'
                });
            }
        }

        const blog = await Blog.create({
            title,
            description,
            content,
            slug: slug || title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-'),
            author: req.user._id,
            authorName: req.user.name,
            image: req.file ? `/uploads/${req.file.filename}` : req.body.image || '/typescript.webp',
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

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Check if slug is being changed and if new slug exists
        if (req.body.slug && req.body.slug !== blog.slug) {
            const existingBlog = await Blog.findOne({ slug: req.body.slug });
            if (existingBlog) {
                return res.status(400).json({
                    success: false,
                    message: 'Slug already exists'
                });
            }
        }

        // Update image if new file uploaded
        if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`;
        }

        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
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

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Delete all comments associated with this blog
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

// @desc    Like/Unlike blog
// @route   PUT /api/blogs/:id/like
// @access  Private
export const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Check if blog is already liked
        const isLiked = blog.likes.includes(req.user._id);

        if (isLiked) {
            // Unlike
            blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            // Like
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

// @desc    Get featured/top blogs
// @route   GET /api/blogs/featured
// @access  Public
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

