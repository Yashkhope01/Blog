import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
    try {
        const { blog, content } = req.body;

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required",
            });
        }

        if (!content?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty",
            });
        }

        // Ensure blog exists
        const blogExists = await Blog.findById(blog);
        if (!blogExists) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // Create comment
        const comment = await Comment.create({
            blog,
            user: req.user._id,
            userName: req.user.username,
            content,
        });

        res.status(201).json({
            success: true,
            data: comment,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET COMMENTS FOR A BLOG
export const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blog: blogId })
            .sort({ createdAt: -1 })
            .populate("user", "username role");

        res.status(200).json({
            success: true,
            data: comments,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE COMMENT
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Only author or admin can update
        if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json({
            success: true,
            data: comment,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Only author or admin can delete
        if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// LIKE COMMENT
export const likeComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        const userId = req.user._id.toString();

        // Toggle like
        const index = comment.likes.indexOf(userId);

        if (index === -1) {
            comment.likes.push(userId);
        } else {
            comment.likes.splice(index, 1);
        }

        await comment.save();

        res.status(200).json({
            success: true,
            isLiked: index === -1,
            likes: comment.likes.length,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
