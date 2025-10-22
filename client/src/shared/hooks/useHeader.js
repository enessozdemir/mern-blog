import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { signOutSuccess } from "../../features/auth/store/userSlice";

export const useHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
      } else {
        window.location.href = "/sign-in";
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      window.location.href = `/search?searchTerm=${searchTerm}`;
    }
  };

  return {
    showModal,
    setShowModal,
    searchTerm,
    setSearchTerm,
    handleSignOut,
    handleSubmit,
  };
};
