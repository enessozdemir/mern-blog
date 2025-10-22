import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useDashPosts = () => {
  const [posts, setPosts] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handlePosts = async () => {
    try {
      const response = await fetch(
        `/api/post/posts/?userId=${currentUser._id}`
      );
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const response = await fetch(
        `/api/post/delete/${postId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (id) => {
    setPostId(id);
    setShowModal(true);
  };

  useEffect(() => {
    handlePosts();
  }, [currentUser._id]);

  return {
    posts,
    dropdown,
    setDropdown,
    showModal,
    setShowModal,
    handleDeletePost,
    handleDeleteClick,
  };
};
