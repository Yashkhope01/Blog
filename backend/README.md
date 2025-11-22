# Blog Backend API

A full-featured backend API for a blog application built with Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication with JWT
- 📝 Full CRUD operations for blog posts
- 💬 Comments system with nested replies
- ❤️ Like functionality for posts and comments
- 📧 Contact form with admin management
- 🖼️ Image upload functionality
- 🔒 Role-based access control (User/Admin)
- 🔍 Search and filter functionality
- 📱 RESTful API design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. Create uploads directory:
```bash
mkdir uploads
```

4. Seed the database (optional):
```bash
node seeder.js
```

This will create an admin user:
- Email: admin@blog.com
- Password: admin123

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `GET /api/auth/users` - Get all users (Admin)

### Blogs
- `GET /api/blogs` - Get all blogs (supports pagination, search, category filter)
- `GET /api/blogs/featured` - Get featured blogs
- `GET /api/blogs/:slug` - Get single blog by slug
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/id/:id` - Update blog (Admin)
- `DELETE /api/blogs/id/:id` - Delete blog (Admin)
- `PUT /api/blogs/id/:id/like` - Like/Unlike blog (Protected)

### Comments
- `GET /api/comments/:blogId` - Get all comments for a blog
- `POST /api/comments` - Create comment (Protected)
- `PUT /api/comments/id/:id` - Update comment (Protected)
- `DELETE /api/comments/id/:id` - Delete comment (Protected)
- `PUT /api/comments/id/:id/like` - Like/Unlike comment (Protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (Admin)
- `GET /api/contact/:id` - Get single contact message (Admin)
- `PUT /api/contact/:id` - Update contact status (Admin)
- `DELETE /api/contact/:id` - Delete contact message (Admin)

## Data Models

### User
- name, email, password, role, avatar, bio

### Blog
- title, slug, description, content, author, authorName, image, category, tags, published, views, likes

### Comment
- blog, user, userName, content, parentComment, likes

### Contact
- name, email, subject, message, status, response

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Role-based authorization
- Input validation
- Helmet for security headers
- CORS configuration
- Rate limiting (can be added)

## File Upload

Images are stored in the `/uploads` directory and can be accessed via `/uploads/:filename`

Supported formats: JPEG, JPG, PNG, GIF, WEBP
Max file size: 5MB

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - JWT expiration time
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## License

MIT

