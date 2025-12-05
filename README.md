#  How to Run Your Blog - Step by Step

##  IMPORTANT: MongoDB Setup Required

Your blog needs MongoDB to store data. Choose ONE option:

### **Option 1: MongoDB Atlas (Cloud) - EASIEST** 

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a FREE account
3. Create a new cluster (choose FREE tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Open `backend/.env` file
7. Replace the `MONGODB_URI` line with your connection string:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/blog
   ```

### **Option 2: Install MongoDB Locally**

1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. MongoDB will run automatically on `mongodb://localhost:27017/blog`

---

##  Step 1: Create Environment File

Create a file named `.env.local` in the root folder (where package.json is) with this content:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

##  Step 2: Run Your Blog

### **SUPER EASY METHOD** (Using Batch Files):

I've created two batch files for you. **Double-click them**:

#### 1️ First, run `start-backend.bat`
   - This will seed the database and start the backend server
   - A window will open showing backend logs
   - **Keep this window OPEN**
   - Backend runs at: http://localhost:5000

#### 2️ Then, run `start-frontend.bat`
   - This will start the frontend server
   - A window will open showing frontend logs
   - **Keep this window OPEN**
   - Frontend runs at: http://localhost:3000

**That's it! Open your browser to http://localhost:3000**

---

##  MANUAL METHOD (Using Command Line):

### **Terminal 1 - Start Backend:**

```powershell
cd "C:\Users\Yash Khope\OneDrive\Desktop\BLOG"
cd backend
node seeder.js
npm run dev
```

### **Terminal 2 - Start Frontend:**

Open a NEW terminal and run:

```powershell
cd "C:\Users\Yash Khope\OneDrive\Desktop\BLOG"
npm run dev
```

---

##  Access Your Blog

Once both servers are running:

- **Homepage**: http://localhost:3000
- **Blog Page**: http://localhost:3000/blog
- **Admin Login**: http://localhost:3000/login
- **Backend API**: http://localhost:5000/api/health

---

##  Admin Account (Created Automatically)

When you run `node seeder.js`, an admin account is created:

- **Email**: `admin@blog.com`
- **Password**: `admin123`

Use these credentials to login and access the admin panel!

---

##  What You Should See

### When Backend Starts:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

### When Frontend Starts:
```
- Local: http://localhost:3000
- Ready in X.Xs
```

---

##  Troubleshooting

### "MongoDB connection failed"
- Make sure you set up MongoDB (see top of this file)
- Check your `MONGODB_URI` in `backend/.env`
- For Atlas: Make sure you whitelisted your IP address

### "Port 3000 already in use"
- Another app is using port 3000
- Close other apps or change the port

### "Cannot find module"
- Run: `npm install` in the root folder
- Run: `npm install` in the backend folder

### Backend won't start
- Check if MongoDB is accessible
- Make sure all dependencies are installed
- Check `backend/.env` file exists

---

## 🎨 What to Do Next

1. **Login as Admin**:
   - Go to http://localhost:3000/login
   - Email: `admin@blog.com`
   - Password: `admin123`

2. **Create Your First Blog**:
   - Click "Admin" in the navbar
   - Click "Create New Blog"
   - Write your blog post
   - Click "Create Blog"

3. **Explore Features**:
   - Browse blogs
   - Leave comments (requires login)
   - Like posts
   - View admin dashboard

---

## 🛑 To Stop the Servers

- Press `Ctrl + C` in each terminal window
- Or just close the terminal windows

---

**Happy Blogging! 🎉**
