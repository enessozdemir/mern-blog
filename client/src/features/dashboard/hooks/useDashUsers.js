import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useDashUsers = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleUsers = async () => {
    try {
      const response = await fetch("/api/user/users/");
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    try {
      const response = await fetch(
        `/api/user/users/?userId?startIndex=${users.length}`
      );
      const data = await response.json();
      if (response.ok) {
        setUsers([...users, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteClick = (id) => {
    setUserId(id);
    setShowModal(true);
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      handleUsers();
    }
  }, [currentUser._id]);

  return {
    users,
    showMore,
    dropdown,
    setDropdown,
    showModal,
    setShowModal,
    handleShowMore,
    handleDeleteUser,
    handleDeleteClick,
  };
};
