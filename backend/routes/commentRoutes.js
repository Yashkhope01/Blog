import express from 'express';
import {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    likeComment
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// CREATE COMMENT
router.post("/", protect, createComment);

// GET COMMENTS FOR BLOG (THIS MUST COME AFTER /id ROUTES!!)
router.get("/blog/:blogId", getComments);

// UPDATE / DELETE COMMENT
router.route("/id/:id")
    .put(protect, updateComment)
    .delete(protect, deleteComment);

// LIKE COMMENT
router.put("/id/:id/like", protect, likeComment);

export default router;
