import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useComments = (postId) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
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

  const handleDeleteClick = (commentId) => {
    setShowModal(true);
    setCommentToDelete(commentId);
  };

  useEffect(() => {
    handleFetchComments();
  }, [postId]);

  return {
    comment,
    setComment,
    comments,
    commentError,
    isOpen,
    setIsOpen,
    showModal,
    setShowModal,
    currentUser,
    handleSubmit,
    handleLikeComment,
    handleDeleteComment,
    handleDeleteClick,
  };
};
