import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const usePostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

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

  const getPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/post/posts?slug=${postSlug}`);
      const data = await response.json();

      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      if (data.posts && data.posts.length > 0) {
        const post = data.posts[0];
        const author = await getAuthor(post.userId);
        const postWithAuthor = { ...post, author };

        setPost(postWithAuthor);
        setError(false);
      } else {
        console.log("No posts found");
        setError(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const getRecentPosts = async () => {
    try {
      const response = await fetch("/api/post/posts?limit=4&startIndex=1");
      const data = await response.json();
      if (response.ok) {
        const postsWithAuthors = await Promise.all(
          data.posts.map(async (post) => {
            const author = await getAuthor(post.userId);
            return { ...post, author };
          })
        );
        setRecentPosts(postsWithAuthors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [postSlug]);

  useEffect(() => {
    getRecentPosts();
  }, []);

  return {
    post,
    recentPosts,
    loading,
    error,
  };
};
