/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
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
      const response = await fetch("/api/post/posts?limit=4");
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="flex flex-col mx-auto max-w-3xl min-h-screen pt-10 pb-20 px-5">
      {/* post title */}
      <h1 className="font-bold text-3xl mt-5 max-w-3xl lg:text-5xl">
        {post && post.title}
      </h1>
      {/* author */}
      <div className="flex gap-5 mt-10">
        <img
          src={post?.author?.profilePicture}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div>
            <p className="text-sm text-gray-400 font-bold">
              {post?.author?.username}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mt-2">
              <span>{post && new Date(post.createdAt).toDateString()}</span>
              <span className="mx-2">•</span>
              <span>
                {post && (post.content.length / 1000).toFixed(0)} mins read
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* post image */}
      <div className="mt-10">
        <img
          src={post && post.image}
          alt=""
          className="w-full h-[450px] object-cover p-1"
        />
      </div>

      {/* post content */}
      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className="mt-14 post-content text-justify"
      />

      {/* post tags */}
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-10 w-0"
      >
        {post && post.category ? (
          <Button color="gray" pill>
            {post.category}
          </Button>
        ) : null}
      </Link>

      {/* post comments */}
      <CommentSection postId={post && post._id} />

      {/* more posts */}
      <div className="mt-20">
        <h3 className="">More Posts</h3>
        <div className="flex flex-wrap gap-5">
          {recentPosts &&
            recentPosts.map((post) => (
              <div key={post._id} className="sm:w-[48%] w-full">
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
