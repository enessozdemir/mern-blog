import { useState, useEffect } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAuthor = async (userId) => {
    try {
      const response = await fetch(`/api/user/author/${userId}`);
      if (!response.ok) {
        console.log("Author not found");
      }
      return await response.json();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/post/posts");
      const data = await response.json();

      if (response.ok) {
        const postsWithAuthors = await Promise.all(
          data.posts.map(async (post) => {
            const author = await getAuthor(post.userId);
            return { ...post, author };
          })
        );
        setPosts(postsWithAuthors);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPostsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/post/posts?${category === "" ? "" : `category=${category}`}`
      );
      const data = await response.json();

      if (response.ok) {
        const postsWithAuthors = await Promise.all(
          data.posts.map(async (post) => {
            const author = await getAuthor(post.userId);
            return { ...post, author };
          })
        );
        setPosts(postsWithAuthors);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    getPosts,
    getPostsByCategory,
  };
};
