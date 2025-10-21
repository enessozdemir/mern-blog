/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("");

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
    }
  };

  const handleGetPostsByCategory = async (category) => {
    try {
      const response = await fetch(
        `/api/post/posts?${category === "" ? null : `category=${category}`}`
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
        setActiveTab(category);
      }
    } catch (error) {
      console.log(error.message);
    }
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
          // <div
          //   key={post._id}
          //   className="sm:w-[31.2%] w-full sm:px-0 cursor-pointer mt-5"
          //   onClick={() => navigate(`/post/${post.slug}`)}
          // >
          //   <div className="h-[550px] rounded-tl-3xl rounded-tr-3xl overflow-hidden border dark:border-gray-600">
          //     <div className="cursor-pointer">
          //       {post.image ? (
          //         <Link to={`/post/${post.slug}`}>
          //           <img
          //             className="h-64 w-full rounded-tl-3xl rounded-tr-3xl object-fill"
          //             src={post.image}
          //             alt=""
          //           />
          //         </Link>
          //       ) : (
          //         <div className="flex justify-center pt-20">
          //           <FiCamera size={85} />
          //         </div>
          //       )}
          //       <div className="flex justify-between items-center">
          //         <div className="flex gap-2 items-center px-3 mt-5">
          //           <img
          //             src={post.author?.profilePicture || ""}
          //             alt=""
          //             className="w-8 h-8 rounded-full object-cover"
          //           />
          //           <p className="text-sm text-gray-500 font-bold">
          //             @{post.author?.username || "unknown"}
          //           </p>
          //         </div>
          //         <div className="text-gray-500 text-sm px-4 mt-4">
          //           <p>
          //             {(() => {
          //               const postDate = new Date(post.createdAt);
          //               const currentDate = new Date();
          //               if (
          //                 postDate.getFullYear() === currentDate.getFullYear()
          //               ) {
          //                 return postDate.toLocaleDateString("en-US", {
          //                   month: "short",
          //                   day: "numeric",
          //                 });
          //               } else {
          //                 return postDate.toLocaleDateString("en-US", {
          //                   year: "numeric",
          //                   month: "short",
          //                   day: "numeric",
          //                 });
          //               }
          //             })()}
          //           </p>
          //         </div>
          //       </div>
          //     </div>

          //     <div className="flex flex-col mt-5 px-3">
          //       <div className="flex flex-col h-[80px]">
          //         <h2 className="text-2xl font-semibold line-clamp-2">
          //           {post.title}
          //         </h2>
          //         <p className={`h-20px text-xs text-icon-color underline`}>
          //           {post.category}
          //         </p>
          //       </div>
          //       <div
          //         dangerouslySetInnerHTML={{
          //           __html: getPreviewContent(post.content),
          //         }}
          //         className="text-sm text-gray-500 text-justify mt-7  space-y-4"
          //       />
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
