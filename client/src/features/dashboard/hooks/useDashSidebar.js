import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { signOutSuccess } from "../../auth/store/userSlice";

export const useDashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const currentTab = new URLSearchParams(location.search);
    const tabFromUrl = currentTab.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
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

  return {
    theme,
    currentUser,
    tab,
    showModal,
    setShowModal,
    handleSignOut,
  };
};
