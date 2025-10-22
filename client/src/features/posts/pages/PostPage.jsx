import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { usePostPage } from "../hooks/usePostPage";

export default function PostPage() {
  const { post, recentPosts, loading } = usePostPage();

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
