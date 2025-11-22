import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import User from './models/User.js';
import Blog from './models/Blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Blog.deleteMany();
        await User.deleteMany();

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin',
            email: 'admin@blog.com',
            password: 'admin123',
            role: 'admin',
            bio: 'Blog Administrator'
        });

        console.log('Admin user created!');
        console.log('Email: admin@blog.com');
        console.log('Password: admin123');

        // Read markdown files from content folder
        const contentDir = path.join(__dirname, '../content');
        
        if (fs.existsSync(contentDir)) {
            const files = fs.readdirSync(contentDir);

            for (const file of files) {
                if (file.endsWith('.md')) {
                    const filePath = path.join(contentDir, file);
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const { data, content } = matter(fileContent);

                    // Create blog post
                    await Blog.create({
                        title: data.title || 'Untitled',
                        slug: data.slug || file.replace('.md', ''),
                        description: data.description || '',
                        content: content,
                        author: adminUser._id,
                        authorName: data.author || adminUser.name,
                        image: data.image || '/typescript.webp',
                        category: data.category || 'Tutorial',
                        tags: data.tags || [],
                        published: true
                    });

                    console.log(`Imported: ${data.title}`);
                }
            }

            console.log('\nData imported successfully!');
        } else {
            console.log('Content directory not found. Creating sample blog posts...');

            // Create sample blog posts
            const samplePosts = [
                {
                    title: 'Getting Started with MERN Stack',
                    slug: 'getting-started-mern-stack',
                    description: 'Learn how to build full-stack applications using MongoDB, Express, React, and Node.js',
                    content: `# Getting Started with MERN Stack

## Introduction

The MERN stack is a powerful combination of technologies for building modern web applications...`,
                    author: adminUser._id,
                    authorName: adminUser.name,
                    category: 'Web Development',
                    tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node.js']
                },
                {
                    title: 'JavaScript Best Practices',
                    slug: 'javascript-best-practices',
                    description: 'Discover the best practices for writing clean and maintainable JavaScript code',
                    content: `# JavaScript Best Practices

## Introduction

Writing clean JavaScript code is essential for maintainability...`,
                    author: adminUser._id,
                    authorName: adminUser.name,
                    category: 'Programming',
                    tags: ['JavaScript', 'Best Practices', 'Clean Code']
                }
            ];

            await Blog.insertMany(samplePosts);
            console.log('Sample blog posts created!');
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await Blog.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

