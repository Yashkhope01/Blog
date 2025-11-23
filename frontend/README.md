# Full Stack MERN Blog Application

A modern, feature-rich blog application built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js).

![Blog Platform](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 🎨 Frontend Features
- **Modern UI** with Next.js 14 and Tailwind CSS
- **Dark Mode** support
- **Responsive Design** - works on all devices
- **Blog System** with search and category filters
- **User Authentication** - Register and Login
- **Comments System** with nested replies
- **Like Functionality** for posts and comments
- **Admin Dashboard** for content management
- **Contact Form** with backend integration
- **SEO Optimized** with Next.js

### 🔧 Backend Features
- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** for secure access
- **Role-Based Authorization** (User/Admin)
- **Image Upload** with Multer
- **CRUD Operations** for all resources
- **Security** with Helmet, CORS, and bcrypt
- **Input Validation** and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

2. **Set Up Environment Variables**

Create `.env.local` in root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Backend `.env` already exists in `backend/.env`

3. **Start MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

4. **Seed Database** (Creates admin user and sample data)
```bash
cd backend
node seeder.js
cd ..
```

Admin credentials:
- Email: `admin@blog.com`
- Password: `admin123`

5. **Run the Application**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

## 📖 Documentation

For detailed setup instructions, API documentation, and troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 🎯 Usage

### For Users
- Browse blog posts
- Register and login
- Comment on posts
- Like posts and comments
- Contact the admin

### For Admins
- Create, edit, and delete blog posts
- Manage comments
- View and respond to contact messages
- Upload images
- Categorize and tag posts

## 🏗️ Project Structure

```
BLOG/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── blog/              # Blog listing page
│   ├── blogpost/          # Individual blog post pages
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   └── register/          # Register page
├── backend/               # Express.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded images
│   └── server.js         # Server entry point
├── components/           # React components
├── lib/                  # Utility functions and API client
├── public/               # Static assets
└── content/              # Original markdown files (for migration)
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `POST /api/blogs` - Create blog (Admin)
- `PUT /api/blogs/id/:id` - Update blog (Admin)
- `DELETE /api/blogs/id/:id` - Delete blog (Admin)

### Comments
- `GET /api/comments/:blogId` - Get comments
- `POST /api/comments` - Create comment
- `DELETE /api/comments/id/:id` - Delete comment

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (Admin)

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS
- Radix UI

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer

## 📝 Features in Detail

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected routes

### Blog Management
- Rich content support
- Image uploads
- Categories and tags
- Search functionality
- View counts
- Like system

### Comments System
- Nested replies
- User authentication required
- Edit and delete own comments
- Admin moderation

### Admin Dashboard
- Create and edit posts
- Manage content
- View analytics
- Handle contact messages

## 🔒 Security

- JWT authentication
- Password hashing
- CORS configuration
- Helmet security headers
- Input validation
- XSS protection

## 🚢 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Heroku/Railway)
```bash
git push heroku main
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the flexible database
- All open-source contributors

---

**Need Help?** Check out [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions!
