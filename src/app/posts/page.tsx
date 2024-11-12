"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PostsPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const response = await fetch("/api/posts");
      const data = await response.json();
      setLoading(false)
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    const response = await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message === "Post deleted successfully") {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <>
      {
        loading ?
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div >
          </div> : <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <div>
              <Link href="/editor" className="text-blue-500">
                Create New Post
              </Link>
            </div>
            <ul className="mt-4">
              {posts.map((post) => (
                <li key={post.id} className="border-b py-4">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: post.content,
                    }}
                  />
                  <div className="mt-2">
                    <Link href={`/editor?id=${post.id}`} className="text-blue-500">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="ml-4 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      }
    </>
  );
};

export default PostsPage;
