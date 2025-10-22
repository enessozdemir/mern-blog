import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const getUsers = async () => {
    try {
      const response = await fetch("/api/user/users?limit=5");
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPosts = async () => {
    try {
      const response = await fetch("/api/post/posts?limit=5");
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        "/api/comment/getCommentsByUser?sort=desc&limit=6"
      );
      const data = await response.json();
      if (response.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      getUsers();
      getPosts();
      getComments();
    }
  }, [currentUser]);

  return {
    users,
    posts,
    comments,
    totalUsers,
    totalPosts,
    totalComments,
    lastMonthUsers,
    lastMonthPosts,
    lastMonthComments,
    dropdown,
    setDropdown,
  };
};
