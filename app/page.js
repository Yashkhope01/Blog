"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "/components/Navbar";
import Link from "next/link";
import { blogAPI } from "@/lib/api";

export default function Home() {
  const el = useRef(null);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await blogAPI.getFeaturedBlogs();
      setFeaturedBlogs(response.data.slice(0, 3)); // Get top 3
    } catch (err) {
      console.error("Error fetching featured blogs:", err);
    }
  };

  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            <span className="font-semibold">ENGINEERED</span> THOUGHTS{" "}
            <br className="hidden lg:block" />
            <span className="font-semibold underline decoration-primary">
              <span ref={el} />
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Your one-stop space for fast,focused, and purpose-driven ideas
            <br className="hidden lg:block" />
           that ignite curiosity, sharpen your thinking, and push your ambitions forward with intention.
          </p>
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20">
            <form
              action="https://www.creative-tim.com/twcomponents/search"
              className="flex flex-wrap justify-between md:flex-row"
            ></form>
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="/left.png"
            alt="tailwind css components"
            className="w-auto h-auto max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Top Blogs
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Check out our most popular blog posts
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {featuredBlogs.length > 0 ? (
              featuredBlogs.map((blog) => (
                <div key={blog._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                  <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105">
                    <img
                      src={
                        blog.image?.startsWith("/uploads")
                          ? `${
                              process.env.NEXT_PUBLIC_API_URL?.replace(
                                "/api",
                                ""
                              ) || "http://localhost:5000"
                            }${blog.image}`
                          : blog.image || "/typescript.webp"
                      }
                      alt={blog.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="mt-4">
                      {blog.category && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
                          {blog.category}
                        </span>
                      )}
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-3">
                        {blog.description}
                      </p>
                      <Link href={`/blogpost/${blog.slug}`}>
                        <Button className="m-2" variant="outline">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No featured blogs yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <footer className="footer mt-5 py-5 bg-white dark:bg-[#393f4d]">
        <div className="container mx-auto px-2 gap-50">
          <div className="text-center">
            <p className="text-sm flex flex-col md:flex-row gap-6 md:gap-14 justify-center">
              <a
                href="mailto:yashkhope123@gmail.com"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/mail.png" alt="GMail" className="w-20 h-20" />
              </a>

              <a
                href="tel:+91 8975905912"
                className="hover:scale-110 transition-transform duration-300 mt-3"
              >
                <img src="/phone.png" alt="Contact" className="w-16 h-16" />
              </a>

              <a
                href="https://www.instagram.com/your_instagram/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/insta.png" alt="Instagram" className="w-20 h-20" />
              </a>

              <a
                href="https://www.linkedin.com/in/your_linkedin/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/linkedin.png" alt="Linkedin" className="w-20 h-20" />
              </a>

              <a
                href="https://github.com/Yashkhope01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src="/github.png" alt="GitHub" className="w-20 h-20" />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
