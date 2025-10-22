import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useDashUserPostsComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const getUserPostsComments = async () => {
    try {
      const response = await fetch(
        `/api/post/posts/?userId=${currentUser._id}`
      );

      if (response.ok) {
        const data = await response.json();
        const posts = data.posts;

        for (let post of posts) {
          const response = await fetch(`/api/comment/comments/${post._id}`);
          const commentData = await response.json();

          if (response.ok) {
            const commentsWithAuthorsAndPosts = await Promise.all(
              commentData.data.map(async (comment) => {
                const userResponse = await fetch(
                  `/api/user/${comment.userId}`
                );
                const userData = await userResponse.json();
                return {
                  ...comment,
                  author: userResponse.ok ? userData : null,
                  post: post,
                };
              })
            );
            setComments((prev) => [...prev, ...commentsWithAuthorsAndPosts]);
          }
        }
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

  useEffect(() => {
    setComments([]);
    getUserPostsComments();
  }, [currentUser._id]);

  return {
    currentUser,
    comments,
    showMore,
    setShowMore,
    showModal,
    setShowModal,
    dropdown,
    setDropdown,
    handleShowMore,
    handleDeleteComment,
    handleDeleteClick,
  };
};
