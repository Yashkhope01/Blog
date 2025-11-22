"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { blogAPI, commentAPI } from "@/lib/api";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPost() {
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost();
    }
  }, [params.slug]);

  useEffect(() => {
    if (blog?._id) {
      fetchComments();
    }
  }, [blog]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getBlogBySlug(params.slug);
      setBlog(response.data);
      setLikesCount(response.data.likes?.length || 0);
      if (user) setIsLiked(response.data.likes?.includes(user._id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      if (!blog?._id) return;
      const response = await commentAPI.getComments(blog._id);
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert("Please login to like this post");
      return;
    }
    try {
      const response = await blogAPI.likeBlog(blog._id);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likes);
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to comment");
      return;
    }
    if (!commentText.trim()) return;
    console.log("Sending comment with blog ID:", blog._id);

    try {
      await commentAPI.createComment({
        blog: blog._id,
        content: commentText,
      });
      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await commentAPI.deleteComment(commentId);
        fetchComments();
      } catch (err) {
        console.error("Error deleting comment:", err);
        alert("Failed to delete comment");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-2xl text-red-500">Blog post not found</div>
        <Link href="/blog">
          <Button>Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Back button */}
      <Link href="/blog" className="inline-block mb-4">
        <Button variant="outline">← Back to Blogs</Button>
      </Link>

      {/* Blog header */}
      <div className="mb-8">
        <img
          src={
            blog.image?.startsWith("/uploads")
              ? `${
                  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
                  "http://localhost:5000"
                }${blog.image}`
              : blog.image || "/typescript.webp"
          }
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {blog.category && (
          <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
            {blog.category}
          </span>
        )}

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
          &quot;{blog.description}&quot;
        </p>

        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <p>By {blog.authorName || blog.author?.name}</p>
          <p>
            {new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>👁️ {blog.views} views</p>
        </div>

        {/* Like button */}
        <Button
          onClick={handleLike}
          variant={isLiked ? "default" : "outline"}
          className="mb-4"
        >
          {isLiked ? "❤️" : "🤍"} {likesCount} Likes
        </Button>
      </div>

      {/* Blog content */}
      <div
        className="prose dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{
          __html: blog.content.replace(/\n/g, "<br/>"),
        }}
      />

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-3xl font-bold mb-6">
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              required
            />
            <Button type="submit" className="mt-2">
              Post Comment
            </Button>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p>
              Please{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                login
              </Link>{" "}
              to comment
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border rounded-lg p-4 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{comment.userName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {(user?._id === comment.user._id || user?.role === "admin") && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-8 space-y-4">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="border-l-2 border-gray-300 dark:border-gray-600 pl-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm">
                            {reply.userName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                        {(user?._id === reply.user._id ||
                          user?.role === "admin") && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteComment(reply._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
