import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useDashComments = () => {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const getUserComments = async () => {
    try {
      const response = await fetch(
        `/api/comment/getCommentsByUser/${currentUser._id}?sort=desc`
      );
      if (response.ok) {
        const commentData = await response.json();
        const commentsWithPosts = await Promise.all(
          commentData.comments.map(async (comment) => {
            const postResponse = await fetch(
              `/api/post/posts/?postId=${comment.postId}`
            );
            const postData = await postResponse.json();
            return {
              ...comment,
              post: postResponse.ok ? postData : null,
            };
          })
        );
        setComments((prev) => [...prev, ...commentsWithPosts]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      const response = await fetch("/api/comment/all-comments?sort=desc");
      if (response.ok) {
        const commentData = await response.json();
        const uniquePostIds = [
          ...new Set(commentData.comments.map((comment) => comment.postId)),
        ];

        const postResponses = await Promise.all(
          uniquePostIds.map((id) => fetch(`/api/post/${id}`))
        );

        const posts = await Promise.all(
          postResponses.map((response) =>
            response.ok ? response.json() : null
          )
        );

        const postsById = posts.reduce((acc, post) => {
          if (post) acc[post._id] = post;
          return acc;
        }, {});

        const uniqueUserIds = [
          ...new Set(commentData.comments.map((comment) => comment.userId)),
        ];

        const userResponses = await Promise.all(
          uniqueUserIds.map((id) => fetch(`/api/user/${id}`))
        );

        const users = await Promise.all(
          userResponses.map((response) =>
            response.ok ? response.json() : null
          )
        );

        const usersById = users.reduce((acc, user) => {
          if (user) acc[user._id] = user;
          return acc;
        }, {});

        setComments(
          commentData.comments.map((comment) => ({
            ...comment,
            author: usersById[comment.userId],
            post: postsById[comment.postId],
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/comments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/delete-comment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteClick = (id) => {
    setCommentIdToDelete(id);
    setShowModal(true);
  };

  return {
    comments,
    setComments,
    showMore,
    setShowMore,
    showModal,
    setShowModal,
    dropdown,
    setDropdown,
    getUserComments,
    getAllComments,
    handleShowMore,
    handleDeleteComment,
    handleDeleteClick,
  };
};
