import moment from "moment";
import { FiThumbsUp } from "react-icons/fi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { Dropdown, DropdownItem } from "flowbite-react";
import { useComment } from "../hooks/useComment";

export default function Comment({ comment, onLike, onDelete }) {
  const { user, currentUser } = useComment(comment);
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
        <div className="flex justify-between">
          <div className="flex items-center mb-1">
            <span className="text-sm mr-2 font-semibold">
              {user ? `@${user.username}` : "Not found!"}
            </span>
            <span className="text-xs text-gray-400">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          {currentUser?.isAdmin || currentUser?._id === comment.userId ? (
            <Dropdown
              arrowIcon={false}
              label={<PiDotsThreeOutlineFill alt="dropdown" />}
              inline
            >
              <DropdownItem
                className="text-xs"
                onClick={() => onDelete(comment._id)}
              >
                Delete
              </DropdownItem>
            </Dropdown>
          ) : null}
        </div>
        <p className=" mb-2 text-sm">{comment.content}</p>
        <div className="flex items-center text-gray-500 gap-0.5 mt-5">
          <button
            disabled={!currentUser}
            type="button"
            className={`text-md ${currentUser && "hover:text-blue-600"} ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-600"
            }`}
            onClick={() => onLike(comment._id)}
          >
            <FiThumbsUp />
          </button>
          <p className="text-sm pt-1">{comment.numberOfLikes}</p>
        </div>
      </div>
    </div>
  );
}
