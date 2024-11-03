/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from "moment";
import { FiThumbsUp } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${comment.userId}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-3 border-b dark:border-gray-600 mt-10">
      <div className="flex shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user && user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div>
          <div className="flex items-center mb-1">
            <span className="text-sm mr-2 font-semibold">
              {user ? `@${user.username}` : "Not found!"}
            </span>
            <span className="text-xs text-gray-400">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <p className=" mb-2 text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center text-gray-500 gap-0.5 mt-5">
          <button
            type="button"
            className={`hover:text-blue-600 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-600"
            }`}
            onClick={() => onLike(comment._id)}
          >
            <FiThumbsUp />
          </button>
          <p className="pt-0.5">{comment.numberOfLikes}</p>
        </div>
      </div>
    </div>
  );
}
