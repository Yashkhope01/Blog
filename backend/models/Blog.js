import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/typescript.webp'
    },
    category: {
        type: String,
        enum: ['Programming', 'Web Development', 'Mobile', 'AI/ML', 'Tutorial', 'Other'],
        default: 'Other'
    },
    tags: [{
        type: String,
        trim: true
    }],
    published: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Index for search functionality
blogSchema.index({ title: 'text', description: 'text', content: 'text' });

// Virtual for comment count
blogSchema.virtual('commentCount', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'blog',
    count: true
});

// Generate slug from title before saving
blogSchema.pre('save', function(next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '-');
    }
    next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

