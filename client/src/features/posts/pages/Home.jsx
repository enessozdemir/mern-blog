import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";

export default function Home() {
  const [activeTab, setActiveTab] = useState("");
  const { posts, getPosts, getPostsByCategory } = usePosts();

  const handleGetPostsByCategory = async (category) => {
    await getPostsByCategory(category);
    setActiveTab(category);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="min-h-screen container mx-auto sm:px-0 px-5 pt-8 pb-40">
      <div className="h-10">
        <div className="flex gap-9 text-sm text-gray-500 dark:text-silver border-b dark:border-gray-600">
          <p
            className={`pb-5 ${
              activeTab === "" &&
              "text-black dark:text-soft-white border-b border-black dark:border-white"
            } cursor-pointer transition-all ease-out duration-75 hover:text-black dark:hover:text-soft-white`}
            onClick={() => handleGetPostsByCategory("")}
          >
            For you
          </p>
          <p
            className={`pb-5 ${
              activeTab === "technology" &&
              "text-black dark:text-soft-white border-b border-black dark:border-white"
            } cursor-pointer transition-all ease-out duration-75 hover:text-black dark:hover:text-soft-white`}
            onClick={() => handleGetPostsByCategory("technology")}
          >
            Technology
          </p>
          <p
            className={`pb-5 ${
              activeTab === "business" &&
              "text-black dark:text-soft-white border-b border-black dark:border-white"
            } cursor-pointer transition-all ease-out duration-75 hover:text-black dark:hover:text-soft-white`}
            onClick={() => handleGetPostsByCategory("business")}
          >
            Business
          </p>
          <p
            className={`pb-5 ${
              activeTab === "travel" &&
              "text-black dark:text-soft-white border-b border-black dark:border-white"
            } cursor-pointer transition-all ease-out duration-75 hover:text-black dark:hover:text-soft-white`}
            onClick={() => handleGetPostsByCategory("travel")}
          >
            Travel
          </p>
          <p
            className={`pb-5 ${
              activeTab === "other" &&
              "text-black dark:text-soft-white border-b border-black dark:border-white"
            } cursor-pointer transition-all ease-out duration-75 hover:text-black dark:hover:text-soft-white`}
            onClick={() => handleGetPostsByCategory("other")}
          >
            Other
          </p>
        </div>
      </div>

      {/* posts */}
      <div className="flex flex-wrap justify-center gap-2">
        {posts.map((post) => (
          <div key={post._id} className="sm:w-[32.8%] w-full">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
