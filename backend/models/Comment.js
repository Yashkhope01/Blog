import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: [true, 'Comment cannot be empty'],
        maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Index for efficient querying
commentSchema.index({ blog: 1, createdAt: -1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

