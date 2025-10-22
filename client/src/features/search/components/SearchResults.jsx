import PostCard from "../../posts/components/PostCard";

export default function SearchResults({ posts, loading }) {
  if (!loading && posts.length === 0) {
    return (
      <p className="text-5xl mt-5 font-bold">No post found!</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {!loading &&
        posts &&
        posts.map((post) => (
          <div key={post._id} className="sm:w-[32.8%] w-full">
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
}
