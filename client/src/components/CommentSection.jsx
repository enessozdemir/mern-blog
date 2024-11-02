/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";
import { Alert, Button, Textarea } from "flowbite-react";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 280) {
      return;
    }

    try {
      const response = await fetch("/api/comment/create-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId: postId,
          userId: currentUser._id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setComment("");
        setCommentError(null);
        console.log(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="mt-20 text-xl font-bold">Comments (comment number)</h2>
      <form className="border shadow-lg mt-5 p-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Textarea
            id="comment"
            className="!bg-white dark:!bg-primary-color !border-none !focus:outline-none !ring-0 !focus:ring-0 resize-none"
            rows={isOpen ? 7 : 1}
            maxLength={280}
            placeholder="What are your thoughts?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onClick={() => setIsOpen(true)}
          />

          <div
            className={`flex flex-col gap-5 transition-all duration-500 ease-in-out ${
              isOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <span className="transition-all duration-500 ease-in-out text-xs text-end pr-4 text-gray-500">
              {comment.length} / 280
            </span>
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={currentUser.profilePicture}
                  alt={currentUser.username}
                />
                <p className="text-light-gray">{currentUser.username}</p>
              </div>
              <div className="flex">
                <Button
                  className="!ring-0 !focus:ring-0 opacity-85 hover:opacity-100 transition-all duration-200 text-primary-color dark:text-white"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                  pill
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  color="success"
                  pill
                  disabled={!comment}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
        {commentError && (
          <Alert color="failure" className="mt-5">
            {commentError}
          </Alert>
        )}
      </form>
    </div>
  );
}
