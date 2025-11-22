import express from 'express';
import {
    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    getFeaturedBlogs
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, admin, upload.single('image'), createBlog);

router.get('/featured', getFeaturedBlogs);

router.route('/:slug')
    .get(getBlogBySlug);

router.route('/id/:id')
    .put(protect, admin, upload.single('image'), updateBlog)
    .delete(protect, admin, deleteBlog);

router.put('/id/:id/like', protect, likeBlog);

export default router;

