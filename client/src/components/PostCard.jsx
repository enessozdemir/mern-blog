/* eslint-disable react/prop-types */
import { FiCamera } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const getPreviewContent = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 100
      ? plainText.substring(0, 100) + "..."
      : plainText;
  };
  return (
    <div className="mt-14 sm:mt-0">
      <div className="h-[500px] rounded-tl-3xl rounded-tr-3xl overflow-hidden border mt-10">
        <div className="border-b cursor-pointer">
          {post.image ? (
            <Link to={`/post/${post.slug}`}>
              <img
                className="w-full h-60 rounded-tl-3xl rounded-tr-3xl"
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

        <div className="flex flex-col mt-7 px-3">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className={`text-xs text-icon-color underline`}>{post.category}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: getPreviewContent(post.content),
            }}
            className="text-sm text-gray-500 text-justify py-10 space-y-4"
          />
        </div>
      </div>
    </div>
  );
}
