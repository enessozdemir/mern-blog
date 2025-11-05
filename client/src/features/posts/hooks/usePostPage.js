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
      // default: fetch recent posts when no specific post is available
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

  // When post is loaded, fetch related posts using category
  useEffect(() => {
    if (!post) {
      getRecentPosts();
      return;
    }

    const getRelatedPosts = async () => {
      try {
        // Try to fetch posts by same category and then filter out current post
        const category = post.category;
        const response = await fetch(
          `/api/post/posts?category=${encodeURIComponent(category)}&limit=6&startIndex=0`
        );
        const data = await response.json();
        if (response.ok && data.posts) {
          const filtered = data.posts
            .filter((p) => p._id !== post._id)
            .slice(0, 4);

          const postsWithAuthors = await Promise.all(
            filtered.map(async (p) => {
              const author = await getAuthor(p.userId);
              return { ...p, author };
            })
          );
          setRecentPosts(postsWithAuthors);
        } else {
          // fallback to recent posts
          getRecentPosts();
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRelatedPosts();
  }, [post]);

  return {
    post,
    recentPosts,
    loading,
    error,
  };
};
