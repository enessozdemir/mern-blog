/* eslint-disable react/prop-types */
import { FiCamera } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const getPreviewContent = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 150
      ? plainText.substring(0, 150) + "..."
      : plainText;
  };
  return (
    <div
      className="mt-0 cursor-pointer hover:scale-[98%] transition-all duration-300"
      onClick={() => navigate(`/post/${post.slug}`)}
    >
      <div className="h-[520px] rounded-tl-3xl rounded-tr-3xl overflow-hidden border dark:border-gray-600 mt-10">
        <div className="cursor-pointer">
          {post.image ? (
            <Link to={`/post/${post.slug}`}>
              <img
                className="h-60 w-full rounded-tl-3xl border-b dark:border-gray-600 rounded-tr-3xl"
                src={post.image}
                alt=""
              />
            </Link>
          ) : (
            <div className="flex justify-center pt-20">
              <FiCamera size={85} />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center px-3 mt-5">
            <img
              src={post.author?.profilePicture || ""}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-sm text-gray-500 font-bold">
              @{post.author?.username || "unknown"}
            </p>
          </div>
          <div className="text-gray-500 text-sm px-4 mt-4">
            <p>
              {(() => {
                const postDate = new Date(post.createdAt);
                const currentDate = new Date();
                if (postDate.getFullYear() === currentDate.getFullYear()) {
                  return postDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                } else {
                  return postDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                }
              })()}
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-7 px-3">
          <div className="flex flex-col h-[80px]">
            <h2 className="text-2xl font-semibold line-clamp-2">
              {post.title}
            </h2>
            <p className={`h-20px text-xs text-icon-color underline`}>
              {post.category}
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: getPreviewContent(post.content),
            }}
            className="text-sm text-gray-500 text-justify pt-7 pb-10 space-y-4 "
          />
        </div>
      </div>
    </div>
  );
}
