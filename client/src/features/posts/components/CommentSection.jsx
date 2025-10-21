/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
} from "flowbite-react";
import Comment from "../../posts/components/Comment";
import { useNavigate } from "react-router-dom";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

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
        setComments([data.data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
      console.log(error);
    }
  };

  const handleFetchComments = async () => {
    try {
      const response = await fetch(`/api/comment/comments/${postId}`);
      const data = await response.json();
      if (response.ok) {
        setComments(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchComments();
  }, [postId]);

  const handleLikeComment = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/like-comment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const response = await fetch(`/api/comment/delete-comment/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2 className="mt-20 text-xl font-bold">
        Comments ({comments.length || 0})
      </h2>
      <form
        className="border dark:border-gray-600 shadow-lg mt-5 p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <Textarea
            id="comment"
            className="!bg-white dark:!bg-primary-color !border-none !focus:outline-none !ring-0 !focus:ring-0 resize-none"
            rows={currentUser && isOpen ? 7 : 1}
            maxLength={280}
            placeholder={`${
              currentUser
                ? "What are your thoughts?"
                : "What are your thoughts? Please login to write or like a comment!"
            }`}
            disabled={!currentUser}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onClick={() => setIsOpen(true)}
          />

          <div
            className={`flex flex-col gap-5 transition-all duration-500 ease-in-out ${
              isOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            } ${currentUser ? "block" : "hidden"} `}
          >
            <span className="transition-all duration-500 ease-in-out text-xs text-end pr-4 text-gray-500">
              {comment.length} / 280
            </span>
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={currentUser?.profilePicture}
                  alt={currentUser?.username}
                />
                <p className="text-light-gray">{currentUser?.username}</p>
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

      {/* Comments */}
      {comments.lenght === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLikeComment}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="text-gray-500"
      >
        <ModalHeader className="p-6">Delete Comment</ModalHeader>
        <ModalBody>
          <p className="text-sm text-justify">
            Are you sure you want to delete this comment?
          </p>

          <div className="flex justify-end gap-x-2 mt-5">
            <Button
              color="light"
              className="font-extralight text-red-600 border border-red-600"
              onClick={() => setShowModal(false)}
              size="sm"
              pill
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteComment(commentToDelete)}
              color="failure"
              className="font-extralight"
              size="sm"
              pill
            >
              Delete Comment
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
